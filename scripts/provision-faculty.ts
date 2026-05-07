import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase credentials");
}

const adminClient = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function provisionFaculty() {
  const email = "prof.reyes@edushare.edu";
  const password = "Faculty@123456";
  const name = "Prof. Maria Reyes";

  console.log(`Provisioning faculty: ${email}`);

  // 1. Create user in Supabase Auth
  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    user_metadata: { role: "FACULTY", name },
    email_confirm: true,
  });

  if (createError) {
    if (createError.message.includes("already exists")) {
      console.log("Auth user already exists. We will proceed to update Prisma.");
      // If user already exists, let's fetch their UUID
      const { data: list } = await adminClient.auth.admin.listUsers();
      const existingUser = list.users.find(u => u.email === email);
      if (existingUser) {
          await adminClient.auth.admin.updateUserById(existingUser.id, {
            password,
            user_metadata: { role: "FACULTY", name },
          });
          await syncPrisma(existingUser.id, email, name);
      }
      return;
    }
    throw createError;
  }

  const authUserId = created.user.id;
  console.log(`Created Auth user: ${authUserId}`);

  await syncPrisma(authUserId, email, name);
}

async function syncPrisma(authUserId: string, email: string, name: string) {
  // 2. Sync with Prisma
  const existingPrismaUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingPrismaUser && existingPrismaUser.id !== authUserId) {
    console.log(`Replacing fake Prisma seed ID: ${existingPrismaUser.id} -> ${authUserId}`);

    // Update foreign keys carefully
    await prisma.notification.updateMany({
      where: { userId: existingPrismaUser.id },
      data: { userId: authUserId },
    });
    
    await prisma.post.updateMany({
        where: { authorId: existingPrismaUser.id },
        data: { authorId: authUserId },
    });
    
    await prisma.class.updateMany({
        where: { facultyId: existingPrismaUser.id },
        data: { facultyId: authUserId },
    });
    
    // Create new record
    await prisma.user.create({
      data: {
        id: authUserId,
        email: existingPrismaUser.email,
        name: existingPrismaUser.name,
        department: existingPrismaUser.department,
        role: existingPrismaUser.role,
        isActive: existingPrismaUser.isActive,
      },
    });

    // Delete old record
    await prisma.user.delete({ where: { id: existingPrismaUser.id } });
  }

  console.log(`✅ Faculty account ready! You can log in with:`);
  console.log(`Email: ${email}`);
  console.log(`Password: Faculty@123456`);
}

provisionFaculty()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

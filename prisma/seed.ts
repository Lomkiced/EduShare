/**
 * prisma/seed.ts
 *
 * Development seed script — populates EduShare with realistic test data.
 *
 * Run with: npx prisma db seed
 *
 * Creates:
 *  - 1 Admin user
 *  - 2 Faculty users
 *  - 6 Students
 *  - 2 Classes (each with its own faculty, students, posts, comments, submissions)
 *  - Sample notifications
 *  - Sample reports
 *
 * NOTE: This seed creates Prisma records only.
 *       Supabase Auth records must be created separately (or via the UI).
 *       Match the `id` values here with the Supabase Auth user UUIDs in production.
 */

import { PrismaClient, Role, ReportReason, ReportStatus, SubmissionStatus } from "@prisma/client";
import { generateClassCode } from "../src/lib/utils";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting EduShare seed...\n");

  // ─── Clean existing data (order matters for FK constraints) ───────────────
  console.log("🧹 Clearing existing data...");
  await prisma.notification.deleteMany();
  await prisma.report.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.postFile.deleteMany();
  await prisma.post.deleteMany();
  await prisma.classMembership.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Cleared.\n");

  // ─── Users ────────────────────────────────────────────────────────────────
  console.log("👤 Creating users...");

  const admin = await prisma.user.create({
    data: {
      id: "admin-001",
      email: "admin@edushare.edu",
      name: "System Administrator",
      department: "IT Department",
      role: Role.ADMIN,
      isActive: true,
    },
  });

  const faculty1 = await prisma.user.create({
    data: {
      id: "faculty-001",
      email: "prof.reyes@edushare.edu",
      name: "Prof. Maria Reyes",
      department: "Information Technology",
      role: Role.FACULTY,
      isActive: true,
    },
  });

  const faculty2 = await prisma.user.create({
    data: {
      id: "faculty-002",
      email: "prof.santos@edushare.edu",
      name: "Prof. Juan Santos",
      department: "Computer Science",
      role: Role.FACULTY,
      isActive: true,
    },
  });

  const students = await Promise.all([
    prisma.user.create({
      data: {
        id: "student-001",
        email: "john.dela.cruz@edushare.edu",
        name: "John Dela Cruz",
        department: "Information Technology",
        role: Role.STUDENT,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "student-002",
        email: "ana.garcia@edushare.edu",
        name: "Ana Garcia",
        department: "Information Technology",
        role: Role.STUDENT,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "student-003",
        email: "miguel.torres@edushare.edu",
        name: "Miguel Torres",
        department: "Computer Science",
        role: Role.STUDENT,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "student-004",
        email: "sofia.lim@edushare.edu",
        name: "Sofia Lim",
        department: "Computer Science",
        role: Role.STUDENT,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "student-005",
        email: "carlo.bautista@edushare.edu",
        name: "Carlo Bautista",
        department: "Information Technology",
        role: Role.STUDENT,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "student-006",
        email: "elena.mendoza@edushare.edu",
        name: "Elena Mendoza",
        department: "Computer Science",
        role: Role.STUDENT,
        isActive: true,
      },
    }),
  ]);

  console.log(`  ✅ Created ${2 + students.length + 1} users (1 admin, 2 faculty, ${students.length} students)`);

  // ─── Classes ──────────────────────────────────────────────────────────────
  console.log("\n📚 Creating classes...");

  const class1 = await prisma.class.create({
    data: {
      id: "class-001",
      name: "Web Development Fundamentals",
      subject: "IT 301",
      description: "An introduction to modern web development covering HTML, CSS, JavaScript, and frameworks.",
      classCode: "WEBDEV",
      inviteLink: `https://edushare.edu/join/WEBDEV`,
      facultyId: faculty1.id,
    },
  });

  const class2 = await prisma.class.create({
    data: {
      id: "class-002",
      name: "Data Structures & Algorithms",
      subject: "CS 202",
      description: "Core computer science concepts: arrays, linked lists, trees, sorting, and searching algorithms.",
      classCode: "DSALGO",
      inviteLink: `https://edushare.edu/join/DSALGO`,
      facultyId: faculty2.id,
    },
  });

  console.log(`  ✅ Created 2 classes`);

  // ─── Class Memberships ────────────────────────────────────────────────────
  console.log("\n🔗 Enrolling students...");

  // Class 1: students 1, 2, 5 (IT dept)
  await prisma.classMembership.createMany({
    data: [
      { classId: class1.id, studentId: students[0].id },
      { classId: class1.id, studentId: students[1].id },
      { classId: class1.id, studentId: students[4].id },
    ],
  });

  // Class 2: students 3, 4, 6 (CS dept)
  await prisma.classMembership.createMany({
    data: [
      { classId: class2.id, studentId: students[2].id },
      { classId: class2.id, studentId: students[3].id },
      { classId: class2.id, studentId: students[5].id },
    ],
  });

  console.log(`  ✅ Enrolled students into classes`);

  // ─── Posts ────────────────────────────────────────────────────────────────
  console.log("\n📝 Creating posts...");

  const post1 = await prisma.post.create({
    data: {
      id: "post-001",
      classId: class1.id,
      authorId: faculty1.id,
      content: "Welcome to Web Development Fundamentals! 🎉\n\nThis semester we will cover:\n- HTML5 & CSS3\n- JavaScript ES6+\n- React.js fundamentals\n- Next.js & Server-Side Rendering\n\nPlease review the course outline attached below. See you in class!",
      category: "Announcement",
      isPinned: true,
      isSubmissionPost: false,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      id: "post-002",
      classId: class1.id,
      authorId: faculty1.id,
      content: "📋 Assignment 1: Personal Portfolio Website\n\nCreate a responsive personal portfolio website using HTML5 and CSS3. Your portfolio must include:\n1. A header with your name and navigation\n2. An 'About Me' section\n3. A 'Projects' section with at least 3 projects\n4. A contact form\n5. Must be fully responsive (mobile-first)\n\nSubmit your GitHub repository link and a live deployment URL.",
      category: "Assignment",
      isPinned: false,
      isSubmissionPost: true,
      submissionDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    },
  });

  const post3 = await prisma.post.create({
    data: {
      id: "post-003",
      classId: class2.id,
      authorId: faculty2.id,
      content: "Good morning, class! 👋\n\nWelcome to Data Structures & Algorithms. This is one of the most important courses in your CS curriculum. By the end of this semester, you will have a deep understanding of:\n- Time and Space Complexity (Big O Notation)\n- Linear data structures (Arrays, Linked Lists, Stacks, Queues)\n- Non-linear structures (Trees, Graphs)\n- Sorting algorithms (Merge Sort, Quick Sort, Heap Sort)\n- Dynamic Programming\n\nLet's make this a great semester!",
      category: "Announcement",
      isPinned: true,
      isSubmissionPost: false,
    },
  });

  const post4 = await prisma.post.create({
    data: {
      id: "post-004",
      classId: class2.id,
      authorId: students[2].id,
      content: "Hi everyone! I found this great resource for learning Big O notation: https://www.bigocheatsheet.com/ — it helped me a lot while reviewing last night. Hope it helps you too! 😊",
      category: "Resource",
      isPinned: false,
      isSubmissionPost: false,
    },
  });

  console.log(`  ✅ Created 4 posts`);

  // ─── Comments ─────────────────────────────────────────────────────────────
  console.log("\n💬 Creating comments...");

  await prisma.comment.createMany({
    data: [
      {
        postId: post1.id,
        authorId: students[0].id,
        content: "Thank you, Prof. Reyes! Really excited for this class. 🙌",
      },
      {
        postId: post1.id,
        authorId: students[1].id,
        content: "Looking forward to learning React! I've been trying to learn it on my own but having proper guidance will be amazing.",
      },
      {
        postId: post2.id,
        authorId: students[0].id,
        content: "Ma'am, can we use Tailwind CSS for the styling?",
      },
      {
        postId: post2.id,
        authorId: faculty1.id,
        content: "Yes, John! You're allowed to use any CSS framework, but you must demonstrate understanding of the core CSS properties.",
      },
      {
        postId: post3.id,
        authorId: students[2].id,
        content: "Sir, will we be using a specific programming language for implementations?",
      },
      {
        postId: post3.id,
        authorId: faculty2.id,
        content: "We'll use Python for pseudocode and demonstrations, but you're free to implement in any language for assignments.",
      },
      {
        postId: post4.id,
        authorId: students[3].id,
        content: "Thank you Miguel! This is super helpful! Bookmarked it immediately. 📚",
      },
      {
        postId: post4.id,
        authorId: students[5].id,
        content: "This is gold! I also recommend 'Introduction to Algorithms' by CLRS if anyone wants a deep dive.",
      },
    ],
  });

  console.log(`  ✅ Created 8 comments`);

  // ─── Submissions ──────────────────────────────────────────────────────────
  console.log("\n📤 Creating submissions...");

  await prisma.submission.createMany({
    data: [
      {
        postId: post2.id,
        studentId: students[0].id,
        fileUrl: "https://mxbayvsqbhverjnjqodu.supabase.co/storage/v1/object/public/submissions/john-portfolio.pdf",
        fileName: "john-dela-cruz-portfolio.pdf",
        fileType: "application/pdf",
        status: SubmissionStatus.REVIEWED,
      },
      {
        postId: post2.id,
        studentId: students[1].id,
        fileUrl: "https://mxbayvsqbhverjnjqodu.supabase.co/storage/v1/object/public/submissions/ana-portfolio.zip",
        fileName: "ana-garcia-portfolio.zip",
        fileType: "application/zip",
        status: SubmissionStatus.SUBMITTED,
      },
    ],
  });

  console.log(`  ✅ Created 2 submissions`);

  // ─── Notifications ────────────────────────────────────────────────────────
  console.log("\n🔔 Creating notifications...");

  await prisma.notification.createMany({
    data: [
      {
        userId: students[0].id,
        type: "NEW_POST",
        message: "Prof. Maria Reyes posted a new assignment in Web Development Fundamentals.",
        isRead: false,
        referenceId: post2.id,
      },
      {
        userId: students[0].id,
        type: "COMMENT_REPLY",
        message: "Prof. Maria Reyes replied to your comment.",
        isRead: true,
        referenceId: post2.id,
      },
      {
        userId: students[1].id,
        type: "NEW_POST",
        message: "Prof. Maria Reyes posted a new assignment in Web Development Fundamentals.",
        isRead: false,
        referenceId: post2.id,
      },
      {
        userId: students[2].id,
        type: "NEW_POST",
        message: "Prof. Juan Santos posted an announcement in Data Structures & Algorithms.",
        isRead: false,
        referenceId: post3.id,
      },
      {
        userId: faculty1.id,
        type: "NEW_SUBMISSION",
        message: "John Dela Cruz submitted Assignment 1: Personal Portfolio Website.",
        isRead: false,
        referenceId: post2.id,
      },
      {
        userId: faculty1.id,
        type: "NEW_SUBMISSION",
        message: "Ana Garcia submitted Assignment 1: Personal Portfolio Website.",
        isRead: false,
        referenceId: post2.id,
      },
    ],
  });

  console.log(`  ✅ Created 6 notifications`);

  // ─── Reports ──────────────────────────────────────────────────────────────
  console.log("\n🚩 Creating sample reports...");

  await prisma.report.create({
    data: {
      reporterId: students[4].id,
      postId: post4.id,
      reason: ReportReason.SPAM,
      description: "This post appears to be promotional content for a third-party website.",
      status: ReportStatus.PENDING,
    },
  });

  console.log(`  ✅ Created 1 report`);

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log("\n" + "═".repeat(50));
  console.log("🎉 EduShare seed completed successfully!\n");
  console.log("📊 Summary:");
  console.log(`   Users:          ${1 + 2 + students.length} (1 admin, 2 faculty, ${students.length} students)`);
  console.log(`   Classes:        2`);
  console.log(`   Memberships:    6`);
  console.log(`   Posts:          4`);
  console.log(`   Comments:       8`);
  console.log(`   Submissions:    2`);
  console.log(`   Notifications:  6`);
  console.log(`   Reports:        1`);
  console.log("═".repeat(50));
  console.log("\n⚠️  Remember: These user records exist in Prisma only.");
  console.log("   Create matching Supabase Auth accounts with the same IDs for full auth to work.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

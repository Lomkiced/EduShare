"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FormInput } from "@/components/auth/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
import { registerAction } from "@/lib/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      sectionCode: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await registerAction(data);

      if (result.success) {
        toast.success("Registration successful! Please wait for your faculty to approve your account.", { duration: 6000 });
        router.push("/login");
        return; // Early return keeps isSubmitting = true during route transition
      } else {
        toast.error(result.error || "Failed to create account.");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full max-w-md animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest/80 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/40 p-8 sm:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary shadow-lg mb-4 transform hover:rotate-12 transition-transform duration-300">
            <span className="material-symbols-outlined text-white text-[28px]">
              person_add
            </span>
          </div>
          <h1 className="font-headline-lg text-on-surface tracking-tight">
            Join EduShare
          </h1>
          <p className="font-body-md text-on-surface-variant mt-2">
            Register for your class below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          id="name"
          label="Full Name"
          type="text"
          placeholder="Juan Dela Cruz"
          icon="person"
          {...register("name")}
          error={errors.name?.message}
          disabled={isSubmitting}
        />

        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="student@edushare.edu"
          icon="mail"
          {...register("email")}
          error={errors.email?.message}
          disabled={isSubmitting}
        />

        <FormInput
          id="sectionCode"
          label="Section Code"
          type="text"
          placeholder="e.g. IT101-A"
          icon="key"
          {...register("sectionCode")}
          error={errors.sectionCode?.message}
          disabled={isSubmitting}
        />
        
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4 flex gap-3 items-start">
          <span className="material-symbols-outlined text-primary mt-0.5">info</span>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            You must enter a valid Section Code provided by your instructor to register. 
            Once submitted, your account will be pending faculty approval before you can log in.
          </p>
        </div>

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          icon="lock"
          {...register("password")}
          error={errors.password?.message}
          disabled={isSubmitting}
        />

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon="lock"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          disabled={isSubmitting}
        />

        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Creating account..."
          variant="primary"
          className="group w-full py-[14px] px-[20px] rounded-xl font-bold shadow-md hover:shadow-xl hover:bg-primary-container hover:text-on-primary-container focus:ring-4 focus:ring-primary/20 transition-all duration-300 mt-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-shimmer"></div>
          <span className="flex items-center gap-2 group-hover:scale-105 transition-transform">
            Register
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </span>
        </LoadingButton>
      </form>

      <div className="mt-10 text-center font-body-sm text-on-surface-variant border-t border-outline-variant/30 pt-8">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-label-md text-primary hover:text-primary-container transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  </main>
  );
}

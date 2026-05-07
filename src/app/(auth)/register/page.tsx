"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";
import { EduShareLogo } from "@/components/auth/EduShareLogo";
import { FormInput } from "@/components/auth/FormInput";
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
      department: "",
      role: "STUDENT",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await registerAction(data);

      if (result.success) {
        toast.success("Account created! Please log in.");
        router.push("/login");
      } else {
        toast.error(result.error || "Failed to create account.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard>
      <EduShareLogo
        title="Create your account"
        subtitle="Join EduShare and start learning."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
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
          id="department"
          label="Department"
          type="text"
          placeholder="e.g. College of Engineering"
          icon="apartment"
          {...register("department")}
          error={errors.department?.message}
          disabled={isSubmitting}
        />

        <div>
          <p className="font-label-md text-on-surface mb-base">I am a...</p>
          <div className="grid grid-cols-2 gap-sm">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="STUDENT"
                {...register("role")}
                className="sr-only peer"
                disabled={isSubmitting}
              />
              <div className="w-full text-center py-sm border border-outline-variant rounded bg-surface-container-lowest text-on-surface font-label-md peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container transition-colors">
                Student
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                value="FACULTY"
                {...register("role")}
                className="sr-only peer"
                disabled={isSubmitting}
              />
              <div className="w-full text-center py-sm border border-outline-variant rounded bg-surface-container-lowest text-on-surface font-label-md peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container transition-colors">
                Faculty
              </div>
            </label>
          </div>
          {errors.role && (
            <p className="mt-1 text-error font-label-sm">
              {errors.role.message}
            </p>
          )}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center py-[8px] px-[20px] bg-secondary text-on-secondary rounded font-label-md shadow-level-1 hover:bg-secondary-container hover:text-on-secondary-container focus:ring-2 focus:ring-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-md text-center font-body-sm text-on-surface-variant">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-label-md text-primary hover:text-primary-container transition-colors"
        >
          Login
        </Link>
      </div>
    </AuthCard>
  );
}

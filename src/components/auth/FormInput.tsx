import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, icon, error, rightElement, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col w-full", className)}>
        <div className="flex justify-between items-center mb-base">
          <label htmlFor={id} className="font-label-md text-on-surface">
            {label}
          </label>
          {rightElement && <div>{rightElement}</div>}
        </div>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
              <span
                className="material-symbols-outlined text-on-surface-variant"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                {icon}
              </span>
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              "block w-full py-[10px] pr-sm bg-surface-container-lowest border rounded font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors focus:ring-1",
              icon ? "pl-10" : "pl-sm", // Using pl-10 (40px) as safe fallback for icon spacing
              error
                ? "border-error focus:border-error focus:ring-error"
                : "border-outline-variant focus:border-primary focus:ring-primary"
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${id}-error`} className="mt-1 text-error font-label-sm">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

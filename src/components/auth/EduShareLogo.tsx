import React from "react";
import { cn } from "@/lib/utils";

interface EduShareLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
}

export function EduShareLogo({ title, subtitle, className, ...props }: EduShareLogoProps) {
  return (
    <div className={cn("flex flex-col items-center text-center mb-lg", className)} {...props}>
      <div className="flex items-center gap-2 mb-6">
        <span 
          className="material-symbols-outlined text-secondary text-3xl" 
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          menu_book
        </span>
        <span className="font-headline-md text-primary font-bold tracking-tight">
          EduShare
        </span>
      </div>
      <h1 className="font-headline-md text-on-surface mb-2">{title}</h1>
      <p className="font-body-sm text-on-surface-variant">{subtitle}</p>
    </div>
  );
}

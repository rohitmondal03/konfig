import { Metadata } from "next";
import { Logo } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Sign In | Konfig",
  description: "Authentication forms built using the components.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <Logo size="default" mode="default" />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Konfig has saved us countless hours of work and helped us deliver stunning designs to our clients faster than ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}

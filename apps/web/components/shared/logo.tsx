import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const logoVariants = cva(
  "p-5 rounded-lg flex items-center gap-2 hover:scale-[1.03] transition-all duration-300",
  {
    variants: {
      variant: {
        dark: "",
        default: "p-5 rounded-lg flex items-center gap-2 hover:scale-[1.03] transition-all duration-300",
      },
      size: {
        sm: "",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type TLogoProps = {
  size: "small" | "default";
  mode: "dark" | "default";
}

export function Logo({ mode, size }: TLogoProps) {
  return (
    <Link
      href={"/"}
      className={cn(
        "p-5 rounded-lg flex items-center gap-2",
        "hover:scale-[1.03] transition-all duration-300",
      )}
    >

      <div className={cn(
        "flex items-center justify-center font-bold",
        size === "default"
          ? "size-8 rounded-lg font-bold"
          : "size-6 rounded text-xs",
        mode === "default"
          ? "bg-white  text-black"
          : "bg-white/10  text-white ",
      )}
      >
        K
      </div>
      <span
        className={cn(
          "tracking-wide",
          size === "default"
            ? "font-semibold text-xl"
            : "font-medium text-sm"
        )}
      >
        Konfig
      </span>
    </Link >
  )
}

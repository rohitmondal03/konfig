"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key01Icon, MailOpen02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../shared/icon";

export function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon icon={MailOpen02Icon} size={16} />
              </span>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon icon={Key01Icon} size={16} />
              </span>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                disabled={isLoading}
                className="pl-9"
                required
              />
            </div>
          </div>
          <Button disabled={isLoading} className="mt-2">
            {isLoading && (
              <span className="mr-2 animate-spin">⚪</span>
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

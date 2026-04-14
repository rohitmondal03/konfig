"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key01Icon, Loading03Icon, MailOpen02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../shared/icon";
import { loginUser } from "@/actions/users.action";
import { toast } from "sonner";

export function LogInForm() {
  const [isLoading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })

  // login a user
  async function login(event: React.SyntheticEvent) {
    event.preventDefault();

    setLoading(true);

    await loginUser({ ...formData })
      .then(() => {
        toast.success("Welcome Back !!");
      })
      .catch(error => {
        toast.error("Error while Login !", {
          description: error.message,
        })
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={login}>
        <div className="grid gap-4">

          {/* Email */}
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
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          {/* Password */}
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
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          </div>

          <Button
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading && (
              <span className="mr-2 animate-spin">
                <Icon icon={Loading03Icon} />
              </span>
            )}
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import * as React from "react";
import { toast } from "sonner";
import { Key01Icon, Loading03Icon, MailOpen02Icon, User03Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "../shared/icon";
import { signUpUser } from "@/actions/users.action";

export function SignUpForm() {
  const [isLoading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  // to signup user
  async function signup(e: React.SyntheticEvent) {
    e.preventDefault();

    setLoading(true);

    if (formData.password != formData.confirmPassword) {
      toast.error("Password should match")
      setLoading(false);
      return;
    }

    await signUpUser({ ...formData })
      .then(() => {
        toast.success("Account created successfully")
      })
      .catch((error) => {
        toast.error("Error while creating Account", {
          description: error.message,
        })
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={signup}>
        <div className="grid gap-4">

          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon icon={User03Icon} size={16} />
              </span>
              <Input
                id="name"
                placeholder="Jaxson Hayes"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                className="pl-9"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>

          {/* Username */}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon icon={User03Icon} size={16} />
              </span>
              <Input
                id="name"
                placeholder="jaxson.hayes"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                className="pl-9"
                required
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="signup-email">Email</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon icon={MailOpen02Icon} size={16} />
              </span>
              <Input
                id="signup-email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                className="pl-9"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon icon={Key01Icon} size={16} />
              </span>
              <Input
                id="signup-password"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                className="pl-9"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon icon={Key01Icon} size={16} />
              </span>
              <Input
                id="signup-confirm-password"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                className="pl-9"
                required
                value={formData.confirmPassword}
                onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

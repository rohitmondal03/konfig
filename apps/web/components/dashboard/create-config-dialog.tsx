"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../shared/icon";

export function CreateConfigDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden sm:flex">
          <Icon icon={Settings01Icon} size={16} className="mr-2" />
          New Config
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Configuration</DialogTitle>
          <DialogDescription>
            Create a new configuration flag or variable.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project">Project</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="konfig-web">Konfig Web App</SelectItem>
                <SelectItem value="konfig-api">Konfig API</SelectItem>
                <SelectItem value="marketing">Marketing Site</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="key">Config Key</Label>
            <Input id="key" placeholder="e.g. ENABLE_NEW_UI" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Default Value</Label>
            <Input id="value" placeholder="true, false, or string value" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>Save Config</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

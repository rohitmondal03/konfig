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

type TCreateConfigDialogProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateConfigDialog({ isOpen, setOpen }: TCreateConfigDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
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

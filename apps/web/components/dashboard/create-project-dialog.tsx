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
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/actions/projects.action";
import { toast } from "sonner";
import { Loading03FreeIcons } from "@hugeicons/core-free-icons";
import { Icon } from "../shared/icon";

type TCreateProjectDialogProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateProjectDialog({ isOpen, setOpen }: TCreateProjectDialogProps) {
  const [isLoading, setLoading] = React.useState(false);
  const [formdata, setFormdata] = React.useState({
    name: "",
    description: "",
  })

  // To create a new project
  async function createNewProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await createProject({ projectDesc: formdata.description, projectName: formdata.name })
      .then((data) => {
        console.log(data);
        toast.success("Project created successfully !!", {
          description: `Project Name: ${data.projectName}`
        })
      })
      .catch((err: any) => {
        toast.error("Error while creating new project", {
          description: err.message,
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new configuration project to your workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createNewProject}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. backend-api"
                className="col-span-3"
                value={formdata.name}
                onChange={e => setFormdata(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Short description"
                className="col-span-3"
                value={formdata.description}
                onChange={e => setFormdata(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? <Icon icon={Loading03FreeIcons} size={4} className="animate-spin" />
                : "Save Project"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
}

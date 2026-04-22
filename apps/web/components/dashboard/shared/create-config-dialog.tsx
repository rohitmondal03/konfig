"use client";

import { EConfigEnv, TProject } from "@/lib/types";
import * as React from "react";
import { toast } from "sonner";
import { Loader as LoaderIcon } from "@hugeicons/core-free-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/shared/icon";
import { createNewConfig } from "@/actions/configs.action"
import { getAllProjectsOfUser } from "@/actions/projects.action";

type TCreateConfigDialogProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateConfigDialog({ isOpen, setOpen }: TCreateConfigDialogProps) {
  const [formdata, setFormdata] = React.useState<{
    projectId: string,
    key: string,
    value: string,
    env: "production" | "development",
  }>({
    projectId: "",
    key: "",
    value: "",
    env: "development",
  })
  const [projectList, setProjectList] = React.useState<Pick<TProject, "projectId" | "projectName">[]>([]);
  const [isLoading, setLoading] = React.useState(false);

  // To fetch all projects
  React.useEffect(() => {
    (async () => {
      await getAllProjectsOfUser()
        .then(d => setProjectList(() => d.map(p => ({
          projectId: p.projectId,
          projectName: p.projectName,
        }))))
    })();
  })

  // To create Config of a project
  const submitConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formdata.projectId.trim().length === 0
      || formdata.value.trim().length === 0
      || formdata.key.trim().length === 0
    ) {
      toast.error("Project not selected OR Key & Value not entered");
      setLoading(false);
      return;
    }

    await createNewConfig({ ...formdata })
      .then((addedConfig) => {
        toast.success("Config created successfully", {
          description: `Key: ${addedConfig.key} & Value: ${addedConfig.value}`
        })
      })
      .catch((error: any) => {
        toast.error("Error while creating new Configuration", {
          description: error.message,
        })
      })
      .finally(() => setLoading(false));
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Configuration</DialogTitle>
          <DialogDescription>
            Create a new configuration flag or variable.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitConfig}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <Select
                value={formdata.projectId}
                onValueChange={val => setFormdata(prev => ({ ...prev, projectId: val }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projectList.map((p) => (
                    <SelectItem key={p.projectId} value={p.projectId}>
                      {p.projectName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="key">
                Config Key
              </Label>
              <Input
                id="key"
                placeholder="e.g. STRIPE_KEY"
                autoComplete="off"
                value={formdata.key}
                onChange={e => setFormdata(prev => ({ ...prev, key: e.target.value.trim() }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">
                Default Value
              </Label>
              <Input
                id="value"
                placeholder="e.g. sk234575yeapvj......"
                autoComplete="off"
                value={formdata.value}
                onChange={e => setFormdata(prev => ({ ...prev, value: e.target.value.trim() }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">
                Select Environment
              </Label>
              <Select
                value={formdata.env}
                onValueChange={val => setFormdata(prev => ({ ...prev, env: val as EConfigEnv }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Environment" />
                </SelectTrigger>
                <SelectContent className="border border-zinc-600">
                  <SelectItem value={EConfigEnv.PRODUCTION}>
                    Production
                  </SelectItem>
                  <SelectItem value={EConfigEnv.DEVELOPMENT}>
                    Development
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? <Icon icon={LoaderIcon} size={4} />
                : "Save Config"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

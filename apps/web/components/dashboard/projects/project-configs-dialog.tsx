"use client";

import type { TConfigs } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProjectsConfig } from "@/actions/configs.action";

type ProjectConfigsDialogProps = {
  projectId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectConfigsDialog({
  projectId,
  isOpen,
  onOpenChange,
}: ProjectConfigsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [configs, setConfigs] = useState<TConfigs[]>([]);

  // To fetch project's configs
  useEffect(() => {
    setIsLoading(true);

    (async () => {
      await getProjectsConfig({ projectId })
        .then(data => setConfigs(data))
        .finally(() => setIsLoading(false))
    })()
  }, [isOpen, projectId]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Project Configurations</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              Loading configs...
            </div>
          ) : configs.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              No configurations found for this project.
            </div>
          ) : (
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {configs.map((config) => (
                  <div
                    key={config.key}
                    className="flex flex-col justify-between rounded-lg border p-3 sm:flex-row sm:items-center"
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium font-mono text-sm">{config.key}</span>
                      <span className="text-xs text-muted-foreground">
                        Environment: {config.env}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground sm:mt-0">
                      Created {config.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

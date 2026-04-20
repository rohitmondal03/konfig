"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
// Assumes there will be a server action or fetch later for this
// import { getProjectConfigs } from "@/actions/configs.action";

type ProjectConfigsDialogProps = {
  projectId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectConfigsDialog({
  projectId,
  isOpen,
  onOpenChange,
}: ProjectConfigsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [configs, setConfigs] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen && projectId) {
      // Mock fetching configs for now
      setIsLoading(true);
      // Simulating API call
      setTimeout(() => {
        setConfigs([
          { id: "1", name: "DATABASE_URL", env: "production", updatedAt: new Date() },
          { id: "2", name: "NEXT_PUBLIC_API_KEY", env: "development", updatedAt: new Date() },
        ]);
        setIsLoading(false);
      }, 500);
    } else {
      setConfigs([]);
    }
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
                    key={config.id}
                    className="flex flex-col justify-between rounded-lg border p-3 sm:flex-row sm:items-center"
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium font-mono text-sm">{config.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Environment: {config.env}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground sm:mt-0">
                      Updated {config.updatedAt.toLocaleDateString()}
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

"use client";

import { useState } from "react";
import { TProject } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, Settings01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/shared/icon";
import { ProjectConfigsDialog } from "./project-configs-dialog";

type ProjectsTableProps = {
  projects: TProject[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[80px] text-right">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.projectId}>
                  <TableCell className="font-medium">{project.projectName}</TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-[200px] sm:max-w-[400px]">
                    {project.projectDescription || "No description"}
                  </TableCell>
                  <TableCell>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <Icon icon={MoreVerticalIcon} size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProjectId(project.projectId);
                            setIsConfigDialogOpen(true);
                          }}
                        >
                          <Icon icon={Settings01Icon} size={16} className="mr-2" />
                          Show Configs
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProjectConfigsDialog
        projectId={selectedProjectId}
        isOpen={isConfigDialogOpen}
        onOpenChange={setIsConfigDialogOpen}
      />
    </>
  );
}

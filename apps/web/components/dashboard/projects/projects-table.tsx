"use client";

import type { TProject } from "@/lib/types";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  MoreVerticalIcon,
  PlusSignIcon,
  Settings01Icon,
  Trash as TrashIcon
} from "@hugeicons/core-free-icons";
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
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";

const ProjectConfigsDialog = dynamic(() => import("./project-configs-dialog")
  .then(mod => mod.ProjectConfigsDialog))
const CreateConfigDialog = dynamic(() => import("../shared/create-config-dialog")
  .then(mod => mod.CreateConfigDialog))

type ProjectsTableProps = {
  projects: Omit<TProject, "userId">[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [isAddConfigDialogOpen, setAddConfigDialogOpen] = useState(false);

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
                      <DropdownMenuContent align="end" className="w-48 border border-zinc-600">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProjectId(project.projectId);
                            setIsConfigDialogOpen(true);
                          }}
                        >
                          <Icon icon={Settings01Icon} size={16} className="mr-2" />
                          Show Configs
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setAddConfigDialogOpen(true)}>
                          <Icon icon={PlusSignIcon} size={16} className="mr-2" />
                          Add Config
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <Icon icon={TrashIcon} size={16} className="mr-2" />
                          Delete Project
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
        projectId={selectedProjectId ? selectedProjectId : ""}
        isOpen={isConfigDialogOpen}
        onOpenChange={setIsConfigDialogOpen}
      />
      <CreateConfigDialog
        isOpen={isAddConfigDialogOpen}
        setOpen={setAddConfigDialogOpen}
      />
    </>
  );
}

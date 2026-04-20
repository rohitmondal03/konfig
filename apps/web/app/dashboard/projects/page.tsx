import { getAllProjectsOfUser } from "@/actions/projects.action";
import { ProjectsTable } from "@/components/dashboard/projects/projects-table";
import { CreateProjectDialogTriggerButton } from "@/components/dashboard/create-project-dialog-trigger";
import { Separator } from "@/components/ui/separator";
import { TProject } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: Omit<TProject, "userId">[] = [];

  try {
    const fetchedProjects = await getAllProjectsOfUser();
    // In case getAllProjectsOfUser returns a single object or needs mapping
    projects = Array.isArray(fetchedProjects) ? fetchedProjects : [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    // Continue with empty array if there's an error
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Projects
        </h1>
        <CreateProjectDialogTriggerButton />
      </div>

      <Separator orientation="horizontal" />

      <div className="mt-4">
        <ProjectsTable projects={projects} />
      </div>
    </div>
  );
}

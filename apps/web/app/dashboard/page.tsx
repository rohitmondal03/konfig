import { ComputerActivityIcon, Database01Icon, Timer02Icon } from "@hugeicons/core-free-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";
import { Icon } from "@/components/shared/icon";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Overview
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <CreateProjectDialog />
        </div>
      </div>

      <Separator orientation="horizontal" />

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Icon icon={ComputerActivityIcon} size={24} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Configurations
            </CardTitle>
            <Icon icon={Database01Icon} size={24} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              +14 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              API Requests
            </CardTitle>
            <Icon icon={Timer02Icon} size={24} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              Across all environments
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid flex-1 bg-muted/20 items-center justify-center rounded-lg border border-dashed shadow-xs h-[400px]">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no active incidents
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Everything is running smoothly. To get started, try creating a new project.
          </p>
          <CreateProjectDialog />
        </div>
      </div>
    </div>
  );
}

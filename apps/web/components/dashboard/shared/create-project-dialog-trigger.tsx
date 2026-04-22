"use client"

import dynamic from "next/dynamic";
import * as React from "react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";

const CreateProjectDialog = dynamic(() => import("./create-project-dialog")
  .then(mod => mod.CreateProjectDialog))

export function CreateProjectDialogTriggerButton() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Button
        className="w-full sm:w-auto"
        onClick={() => setDialogOpen(prev => !prev)}
      >
        <Icon
          icon={PlusSignIcon}
          size={16}
          className="mr-2"
        />
        New Project
      </Button>

      <CreateProjectDialog
        isOpen={isDialogOpen}
        setOpen={setDialogOpen}
      />
    </>
  )
}
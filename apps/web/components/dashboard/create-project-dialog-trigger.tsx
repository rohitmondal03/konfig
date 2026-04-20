"use client"

import * as React from "react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { Icon } from "../shared/icon";
import { CreateProjectDialog } from "./create-project-dialog";

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
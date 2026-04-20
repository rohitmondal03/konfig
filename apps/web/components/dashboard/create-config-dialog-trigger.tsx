import * as React from "react";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../shared/icon";
import { Button } from "../ui/button";
import { CreateConfigDialog } from "./create-config-dialog";

export function CreateConfigDialogTriggerButton() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="hidden sm:flex"
        onClick={() => setDialogOpen(prev => !prev)}
      >
        <Icon
          icon={Settings01Icon}
          size={16}
          className="mr-2"
        />
        New Config
      </Button>

      <CreateConfigDialog
        isOpen={isDialogOpen}
        setOpen={setDialogOpen}
      />
    </>
  )
}
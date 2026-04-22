import * as React from "react";
import dynamic from "next/dynamic";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";

const CreateConfigDialog = dynamic(() => import("./create-config-dialog")
  .then(mod => mod.CreateConfigDialog))

export function CreateConfigDialogTriggerButton() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size={"lg"}
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
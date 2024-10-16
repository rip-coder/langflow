import React from "react";
import { ShadToolTipType } from "../../types/components";
import { cn } from "../../utils/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ShadTooltip: React.FC<ShadToolTipType> = ({
  content,
  side,
  asChild = true,
  children,
  styleClasses,
  delayDuration = 500,
  open,
  setOpen,
  darkTooltip = false,
}) => {
  if (!content) {
    return <>{children}</>;
  }

  const tooltipContentClass = cn(
    "max-w-96",
    styleClasses,
    darkTooltip ? "bg-black text-white dark:bg-white dark:text-black" : "",
  );

  return (
    <Tooltip
      defaultOpen={!children}
      open={open}
      onOpenChange={setOpen}
      delayDuration={delayDuration}
    >
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent
        className={tooltipContentClass}
        side={side}
        avoidCollisions={false}
        sticky="always"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default ShadTooltip;

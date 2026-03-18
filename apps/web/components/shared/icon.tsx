import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

type TIconProps = {
  icon: IconSvgElement;
  fill?: string;
  size?: number;
  color?: string;
}

export function Icon({ icon, fill, color, size }: TIconProps) {
  return <HugeiconsIcon
    icon={icon}
    fill={fill}
    color={color}
    size={size}
  />
}
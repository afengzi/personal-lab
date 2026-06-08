import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { CSSProperties } from "react";

/* Lucide icon by kebab-case name (matches the design's data-lucide names).
   Uses lucide's dynamic loader so we don't bundle the whole icon set. */
export type IconProps = {
  n: string;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

export function Icon({ n, size = 16, color, className, style }: IconProps) {
  return (
    <DynamicIcon name={n as IconName} size={size} color={color} className={className} style={style} />
  );
}

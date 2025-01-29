import { ReactNode } from "react";
import "./Label.css";
type Props = {
  size: "m" | "s" | "l";
  children: ReactNode;
  bold?: boolean;
  hover?: boolean;
};

const Label: React.FC<Props> = ({
  size,
  children,
  bold = false,
  hover = false,
}) => {
  const labelClass = "label_" + size;
  const boldClass = bold ? "bold" : "";
  const hoverClass = hover ? "hover" : "";
  return (
    <span className={`${labelClass} label ${boldClass} ${hoverClass}`}>
      {children}
    </span>
  );
};

export default Label;

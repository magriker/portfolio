import { ReactNode } from "react";
import "../styles/Label.css";
type Props = {
  size: "m" | "s" | "l";
  children: ReactNode;
  bold?: boolean;
  hover?: boolean;
  white?: boolean;
};

const Label: React.FC<Props> = ({
  size,
  children,
  bold = false,
  hover = false,
  white = false,
}) => {
  const labelClass = "label_" + size;
  const boldClass = bold ? "bold" : "";
  const hoverClass = hover ? "hover" : "";
  const whiteClass = white ? "white" : "";
  return (
    <span
      className={`${labelClass} label ${boldClass} ${hoverClass} ${whiteClass}`}
    >
      {children}
    </span>
  );
};

export default Label;

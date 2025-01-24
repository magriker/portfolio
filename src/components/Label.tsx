import { ReactNode } from "react";
import "./Label.css";
type Props = {
  size: "m" | "s" | "l";
  children: ReactNode;
  bold?: boolean;
};

const Label: React.FC<Props> = ({ size, children, bold = false }) => {
  const labelClass = "label_" + size;
  const boldClass = bold ? "bold" : "";
  return <span className={`${labelClass} label ${boldClass}`}>{children}</span>;
};

export default Label;

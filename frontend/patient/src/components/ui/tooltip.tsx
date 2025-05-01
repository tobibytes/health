import React, { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = "",
  position = "top",
}) => {
  const [visible, setVisible] = useState(false);

  let positionClasses = "";
  switch (position) {
    case "top":
      positionClasses = "bottom-full left-1/2 -translate-x-1/2 mb-2";
      break;
    case "bottom":
      positionClasses = "top-full left-1/2 -translate-x-1/2 mt-2";
      break;
    case "left":
      positionClasses = "right-full top-1/2 -translate-y-1/2 mr-2";
      break;
    case "right":
      positionClasses = "left-full top-1/2 -translate-y-1/2 ml-2";
      break;
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
    >
      {children}
      {visible && (
        <span
          className={`absolute z-50 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap pointer-events-none transition-opacity duration-150 opacity-90 ${positionClasses}`}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
};

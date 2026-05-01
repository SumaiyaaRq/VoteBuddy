import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

/**
 * A reusable premium glassmorphic card component.
 */
export const GlassCard: React.FC<GlassCardProps> = ({ children, style, className, onClick }) => {
  return (
    <div 
      className={`glass card ${className || ""}`} 
      style={{ 
        padding: "1.5rem", 
        cursor: onClick ? "pointer" : "default",
        ...style 
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

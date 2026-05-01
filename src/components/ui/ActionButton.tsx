import React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger" | "warning" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/**
 * A reusable accessible button component with various variants.
 */
export const ActionButton: React.FC<ActionButtonProps> = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  disabled = false,
  fullWidth = false,
  className,
  ariaLabel,
  style
}) => {
  const getStyles = () => {
    let base = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      borderRadius: "var(--radius-md)",
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s ease",
      width: fullWidth ? "100%" : "auto",
      opacity: disabled ? 0.5 : 1,
    };

    const variants = {
      primary: { background: "var(--primary)", color: "white", border: "none" },
      secondary: { background: "rgba(255, 255, 255, 0.05)", color: "inherit", border: "1px solid var(--glass-border)" },
      outline: { background: "transparent", color: "var(--primary)", border: "1px solid var(--primary)" },
      danger: { background: "rgba(239, 68, 68, 0.1)", color: "var(--error)", border: "1px solid rgba(239, 68, 68, 0.2)" },
      warning: { background: "rgba(245, 158, 11, 0.1)", color: "var(--warning)", border: "1px solid rgba(245, 158, 11, 0.2)" },
      success: { background: "rgba(16, 185, 129, 0.1)", color: "var(--success)", border: "1px solid rgba(16, 185, 129, 0.2)" },
    };

    const sizes = {
      sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
      md: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
      lg: { padding: "1rem 2rem", fontSize: "1.125rem" },
    };

    return { ...base, ...variants[variant], ...sizes[size] };
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      aria-label={ariaLabel}
      className={`btn ${className || ""}`}
      style={{ ...getStyles(), ...style }}
    >
      {children}
    </button>
  );
};

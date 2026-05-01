import React from "react";

interface StatusBadgeProps {
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  size?: "sm" | "md";
}

/**
 * A reusable status badge for displaying states like "Active", "Pending", etc.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  label, 
  variant = "neutral",
  size = "sm"
}) => {
  const getStyles = () => {
    let base = {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "var(--radius-full)",
      fontWeight: 500,
      fontSize: size === "sm" ? "0.75rem" : "0.875rem",
      padding: size === "sm" ? "0.125rem 0.625rem" : "0.25rem 0.75rem",
    };

    const variants = {
      success: { background: "rgba(16, 185, 129, 0.1)", color: "var(--success)" },
      warning: { background: "rgba(245, 158, 11, 0.1)", color: "var(--warning)" },
      error: { background: "rgba(239, 68, 68, 0.1)", color: "var(--error)" },
      info: { background: "rgba(79, 70, 229, 0.1)", color: "var(--primary)" },
      neutral: { background: "rgba(255, 255, 255, 0.05)", color: "inherit" },
    };

    return { ...base, ...variants[variant] };
  };

  return (
    <span style={getStyles()}>
      {label}
    </span>
  );
};

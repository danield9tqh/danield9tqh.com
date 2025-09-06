import React from "react";

interface CVCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function CVCard({ title, children, className = "" }: CVCardProps) {
  return (
    <div className={`cv-card ${className}`}>
      {title && <h2 className="cv-card-title">{title}</h2>}
      <div className="cv-card-content">{children}</div>
    </div>
  );
}
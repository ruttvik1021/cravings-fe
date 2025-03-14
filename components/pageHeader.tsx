import React from "react";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
};

export default PageHeader;

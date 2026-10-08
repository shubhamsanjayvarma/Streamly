"use client";

import React from "react";

export default function CreatorTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="animate-page-enter flex-1 flex flex-col w-full">
      {children}
    </div>
  );
}

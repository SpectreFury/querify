import React from "react";
import Navigation from "@/components/Navigation";

const DatabaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default DatabaseLayout;

import React from "react";
import Navigation from "@/components/Navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default DashboardLayout;

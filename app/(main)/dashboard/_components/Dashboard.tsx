import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="p-6">
      <Card className="max-w-[400px]">
        <CardHeader>
          <CardTitle>Databases</CardTitle>
          <CardDescription>
            Your recent databases and their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>CassandraDB</p>
        </CardContent>
        <CardFooter>
          <Button>Add a new database</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;

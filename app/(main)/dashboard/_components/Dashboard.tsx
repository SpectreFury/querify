import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
          <ScrollArea className="h-[200px]">
            <div className="p-2 hover:bg-neutral-100 rounded flex justify-between items-center cursor-pointer">
              <div className="">MongoDB</div>
              <div className="text-muted-foreground text-sm">
                Last Queried: 28 mins ago
              </div>
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add a new database</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new database</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;

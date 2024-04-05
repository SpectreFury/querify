"use client";

import React, { useEffect } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDatabaseStore } from "@/store/database";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string(),
  hostname: z.string().min(2),
  password: z.string().min(2).max(100),
  dbType: z.string(),
});

const Dashboard = () => {
  const { databases, addDatabase, setDatabase } = useDatabaseStore();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hostname: "",
      role: "",
      password: "",
      dbType: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/save-database`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          hostname: values.hostname,
          role: values.role,
          password: values.password,
          type: values.dbType,
        }),
      }
    );

    const result = await response.json();

    if (result.status === "successful") {
      addDatabase({ _id: result.id, name: values.name });
    }
  };

  useEffect(() => {
    const fetchDatabases = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/database`
      );
      const result = await response.json();

      if (result.status === "successful") {
        setDatabase(result.databases);
      }
    };

    fetchDatabases();
  }, []);

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
            {databases.map((database) => (
              <div
                className="p-2 hover:bg-neutral-100 rounded flex justify-between items-center cursor-pointer"
                key={database._id}
                onClick={() => router.push(`/databases/${database._id}`)}
              >
                <div className="">{database.name}</div>
                <div className="text-muted-foreground text-sm">
                  Last Queried: 28 mins ago
                </div>
              </div>
            ))}
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hostname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hostname</FormLabel>
                        <FormControl>
                          <Input placeholder="Hostname" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input placeholder="Role" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dbType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Database Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Database Type" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="self-start">
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;

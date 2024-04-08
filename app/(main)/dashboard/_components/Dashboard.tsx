"use client";

import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { ButtonLoading } from "@/components/ButtonLoading";
import { useDatabaseStore } from "@/store/database";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string(),
  hostname: z.string().min(2),
  password: z.string().min(2).max(100),
  databaseName: z.string().min(2).max(100),
  dbType: z.string(),
});

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { databases, addDatabase, setDatabase } = useDatabaseStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hostname: "",
      role: "",
      password: "",
      databaseName: "",
      dbType: "postgres",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
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
          databaseName: values.databaseName,
          type: values.dbType,
        }),
      }
    );

    const result = await response.json();

    if (result.status === "successful") {
      addDatabase({ _id: result.id, name: values.name });
      toast.success("Saved the database");
    } else {
      toast.error("An error occured");
    }

    setLoading(false);
    setOpen(false);
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
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex justify-between items-center cursor-pointer"
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
          <Dialog open={open} onOpenChange={setOpen}>
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
                    name="databaseName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Database Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Database Name"
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the type of your database" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="postgres">Postgres</SelectItem>
                              <SelectItem value="mysql">MySQL</SelectItem>
                              <SelectItem value="mongodb">MongoDB</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {loading ? (
                    <ButtonLoading />
                  ) : (
                    <Button type="submit" className="self-start">
                      Submit
                    </Button>
                  )}
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

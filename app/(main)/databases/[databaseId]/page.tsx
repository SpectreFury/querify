"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { ButtonLoading } from "@/components/ButtonLoading";

const DatabaseId = () => {
  const [query, setQuery] = useState("");
  const params = useParams();
  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const getQuery = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ask-query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          databaseId: params.databaseId,
          query,
        }),
      }
    );

    const result = await response.json();

    if (result.status === "successful") {
      toast("Query is finished");

      setResponse(JSON.stringify(result.queryResult));
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="mt-10 text-lg font-medium">NeonDB</div>
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Ask a query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading ? <ButtonLoading /> : <Button onClick={getQuery}>Ask</Button>}
      </div>
      <div className="text-lg font-medium text-muted-foreground mt-2">
        Response
      </div>
      <div>{response}</div>
    </div>
  );
};

export default DatabaseId;

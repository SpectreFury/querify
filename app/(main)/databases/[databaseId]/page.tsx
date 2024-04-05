"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const DatabaseId = () => {
  const [query, setQuery] = useState("");
  const params = useParams();

  const getQuery = async () => {
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
        <Button onClick={getQuery}>Ask</Button>
      </div>
    </div>
  );
};

export default DatabaseId;

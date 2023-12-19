"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="min-h-full flex flex-col items-center pt-40 gap-4">
      <div className="text-6xl font-bold">Querify</div>
      <p className="text-2xl font-semibold">
        Interaction With Your Database Made <span className="underline">Simpler</span>
      </p>
      <Button onClick={() => router.push("/dashboard")}>
        Enter Querify <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Image
        src="marketing-light.svg"
        alt="Marketing poster"
        width={400}
        height={400}
        className="pt-10 dark:hidden"
      />
      <Image
        src="marketing-dark.svg"
        alt="Marketing poster"
        width={400}
        height={400}
        className="pt-10 hidden dark:block"
      />
    </div>
  );
};

export default Hero;

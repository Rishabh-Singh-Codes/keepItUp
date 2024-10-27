"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const HomeCTA = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
    </div>
  );
};

export default HomeCTA;

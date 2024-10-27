"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between w-full my-6">
      <h1 className="text-xl font-black">⬆️ Keep It Up</h1>

      <div className="flex items-center gap-4">
        <ModeToggle />
        {session?.user ? (
          <Button onClick={() => signOut()} variant="outline">
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

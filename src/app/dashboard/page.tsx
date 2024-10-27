import { Button } from "@/components/ui/button";
import UserProjects from "@/components/UserProjects";
import { authConfig } from "@/lib/auth";
import { getUserProjects } from "@/server/actions/projects";
import { PackagePlus } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect("/");
  }

  const projects = await getUserProjects(session.user.uid);

  return (
    <div className="flex flex-col">
      <Button className="w-1/6 mb-12" asChild>
        <Link href="/dashboard/addProject">
          <PackagePlus />
          Add project
        </Link>
      </Button>
      <UserProjects projects={projects} />
    </div>
  );
};

export default Dashboard;

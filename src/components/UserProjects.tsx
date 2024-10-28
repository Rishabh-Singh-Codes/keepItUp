import { Project } from "@prisma/client";
import { Ban, PackagePlus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { P } from "./ui/typography";
import { cn } from "@/lib/utils";

const UserProjects = ({ projects }: { projects: Project[] }) => {
  if (!projects.length) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <Ban className="size-12 text-muted-foreground" />
        <h2 className="text-muted-foreground">No projects added</h2>
        <Button className="mt-12" asChild>
          <Link href="/dashboard/addProject">
            <PackagePlus />
            Add project
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default UserProjects;

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <P>{project.url}</P>
        <div className="flex justify-center items-center text-xs font-semibold border-[1px] capitalize max-w-fit p-2 rounded-2xl">
          <span className="relative flex items-center justify-center size-3 mr-2">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75",
                project.status === "UP"
                  ? "bg-green-400"
                  : project.status === "DOWN"
                  ? "bg-red-400"
                  : "bg-yellow-400"
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex rounded-full size-2",
                project.status === "UP"
                  ? "bg-green-500"
                  : project.status === "DOWN"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              )}
            ></span>
          </span>
          {project.status.toLowerCase()}
        </div>
      </CardContent>
    </Card>
  );
};

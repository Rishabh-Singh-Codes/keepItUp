import { Project } from "@prisma/client";
import { Ban, PackagePlus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

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
    <div className="grid grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project}/>
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
        
      </CardContent>
    </Card>
  );
};

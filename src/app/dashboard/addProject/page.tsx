import ProjectForm from "@/components/forms/ProjectForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const AddProject = async () => {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Card className="w-1/2 mx-auto">
        <CardHeader>
          <CardTitle>Add Project</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProject;

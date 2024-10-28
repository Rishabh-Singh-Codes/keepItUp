import { Project, Status } from "@prisma/client";
import axios from "axios";
import db from "@/db";

async function pingProject(project: Project) {
  let maxTries = 3;
  let attempt = 0;
  let success = false;

  while (attempt < maxTries && !success) {
    try {
      const startTime = Date.now();
      await axios.get(project.url);
      const responseTime = Date.now() - startTime;
      await db.project.update({
        where: { id: project.id },
        data: {
          status: Status.UP,
          responseTime,
          lastPinged: new Date(),
        },
      });

      console.log(
        `Successfully pinged ${project.name} at ${new Date().toLocaleString(
          undefined,
          { timeZone: "Asia/Kolkata" }
        )}`
      );
    } catch (error) {
      attempt++;

      if (attempt >= maxTries) {
        await db.project.update({
          where: { id: project.id },
          data: {
            status: Status.DOWN,
            responseTime: null,
            lastPinged: new Date(),
          },
        });

        console.log(
          `Failed to ping ${project.name} at ${new Date().toLocaleString(
            undefined,
            { timeZone: "Asia/Kolkata" }
          )}`
        );
      }
    }
  }
}

export async function pingService() {
  const projects = await db.project.findMany();

  await Promise.all(projects.map((project) => pingProject(project)));
}

export async function pingSingleProject(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new Error("Project not found");
  }
}

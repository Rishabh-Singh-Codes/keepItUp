"use server";

import { authConfig } from "@/lib/auth";
import { projectFormSchema } from "@/schema/project";
import { getServerSession } from "next-auth";
import "server-only";
import { z } from "zod";
import db from "@/db";

export async function addProject(
  unsafeData: z.infer<typeof projectFormSchema>
) {
  const { success, data } = projectFormSchema.safeParse(unsafeData);
  const session = await getServerSession(authConfig);

  if (!session?.user || !success) {
    return { error: true };
  }

  await db.project.create({ data: { ...data, userId: session.user.uid } });

  return { success: true };
}

export async function getUserProjects(userId: string) {
  const projects = await db.project.findMany({
    where: {
      userId,
    },
  });

  return projects;
}

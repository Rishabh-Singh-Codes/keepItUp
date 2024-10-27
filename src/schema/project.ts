import { z } from "zod";

export const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  url: z.string().min(1, "Project name is required").url(),
  description: z.string().optional(),
  image: z.string().url().or(z.literal("")).optional(),
});

const projectSchema = z.object({
  lastPinged: z.date(),
  status: z.string(),
  responseTime: z.number(),
}).merge(projectFormSchema);

export type Project = z.infer<typeof projectSchema>;

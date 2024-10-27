"use client";

import { projectFormSchema } from "@/schema/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { addProject } from "@/server/actions/projects";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProjectForm = () => {
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof projectFormSchema>) => {
    const res = await addProject(values);

    if (res.error) {
      toast("Failed to save project", { style: { backgroundColor: "red" } });
    } else if (res.success) {
      toast("Project saved", { style: { backgroundColor: "green" } });
      router.push("/dashboard");
      router.refresh();
    }
  };
  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name*</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Keep It Up" {...field} />
                </FormControl>
                <FormDescription>
                  Your project&apos;s unique name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project URL*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="example.onrender.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Render deployed URL of the project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>Only URL accepted</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              disabled={form.formState.isSubmitting}
              asChild
            >
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button
              type="submit"
              className="w-1/3"
              disabled={form.formState.isSubmitting}
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;

import HomeCTA from "@/components/HomeCTA";
import { H1, H2 } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="min-w-full flex flex-col items-center">
      <H1>Keep It Up</H1>
      <H2>Keep your Render deployments up and running</H2>

      <HomeCTA />
    </div>
  );
}

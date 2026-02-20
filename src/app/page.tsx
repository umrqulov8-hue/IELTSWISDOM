import { Hero } from "@/components/Hero";
import { CourseCatalog } from "@/components/CourseCatalog";
import { ValueProps } from "@/components/ValueProps";
import { Testimonials } from "@/components/Testimonials";
import { LeadMagnet } from "@/components/LeadMagnet";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <ValueProps />
      <CourseCatalog />
      <Testimonials />
      <LeadMagnet />
    </div>
  );
}

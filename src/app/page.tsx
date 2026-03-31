import { Hero } from "@/components/Hero";
import { CourseCatalog } from "@/components/CourseCatalog";
import { ValueProps } from "@/components/ValueProps";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { SuccessRoadmap } from "@/components/SuccessRoadmap";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <ValueProps />
      <SuccessRoadmap />
      <CourseCatalog />
      <Pricing />
      <Testimonials />
    </div>
  );
}

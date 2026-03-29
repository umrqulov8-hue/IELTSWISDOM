import { Hero } from "@/components/Hero";
import { CourseCatalog } from "@/components/CourseCatalog";
import { ValueProps } from "@/components/ValueProps";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import dynamic from 'next/dynamic';

const LeadMagnet = dynamic(() => import('@/components/LeadMagnet').then(mod => mod.LeadMagnet), { ssr: true });

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <ValueProps />
      <CourseCatalog />
      <Pricing />
      <Testimonials />
      <LeadMagnet />
    </div>
  );
}

import { Hero } from "@/components/Hero";
import dynamic from 'next/dynamic';

const CourseCatalog = dynamic(() => import('@/components/CourseCatalog').then(mod => mod.CourseCatalog), { ssr: true });
const ValueProps = dynamic(() => import('@/components/ValueProps').then(mod => mod.ValueProps), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials').then(mod => mod.Testimonials), { ssr: true });
const LeadMagnet = dynamic(() => import('@/components/LeadMagnet').then(mod => mod.LeadMagnet), { ssr: true });

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

import { HeroSection } from '@/components/home/HeroSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { HappyHourBanner } from '@/components/home/HappyHourBanner';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel';
import { LocationPreview } from '@/components/home/LocationPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <HappyHourBanner />
      <WhyChooseUs />
      <TestimonialCarousel />
      <LocationPreview />
    </>
  );
}

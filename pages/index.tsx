import type { NextPage } from 'next';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedProducts } from '../components/sections/FeaturedProducts';
import { SustainabilitySection } from '../components/sections/SustainabilitySection';

const Home: NextPage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <SustainabilitySection />
    </main>
  );
};

export default Home;
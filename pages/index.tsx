import type { NextPage } from 'next';
import { Layout } from '../components/layout/Layout';
import { WelcomeHero } from '../components/intro/WelcomeHero';
import { AiDemo } from '../components/intro/AiDemo';
import { ProgressionPath } from '../components/intro/ProgressionPath';

const IntroPage: NextPage = () => {
  return (
    <Layout hideNav>
      <WelcomeHero />
      <AiDemo />
      <ProgressionPath />
    </Layout>
  );
};

export default IntroPage;
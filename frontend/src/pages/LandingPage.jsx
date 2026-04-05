import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import WhyTalentMatrix from '../components/WhyTalentMatrix';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <WhyTalentMatrix />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;

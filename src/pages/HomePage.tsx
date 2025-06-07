import React from 'react';
import Navbar from '../mycomponents/PublicNavbar';
import HeroSection from '../mycomponents/HeroSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HomePage;
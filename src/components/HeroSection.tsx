
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-telegraf font-bold text-5xl md:text-6xl text-primary mb-6">
          About Stratum PR
        </h1>
        <p className="font-telegraf text-xl text-gray-600 leading-relaxed">
          Founded in 2025, Stratum PR emerged from a simple observation: most organizations 
          have access to more data than ever before, yet struggle to make better decisions. 
          We bridge this gap by architecting solutions that transform complex information 
          into strategic advantage.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

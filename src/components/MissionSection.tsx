
import React from 'react';

const MissionSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-telegraf font-bold text-4xl text-primary mb-6">
              Our Mission
            </h2>
            <p className="font-telegraf text-lg text-gray-600 mb-8 leading-relaxed">
              We exist to democratize advanced analytics and AI capabilities for businesses 
              of all sizes. By combining deep technical expertise with strategic business 
              acumen, we help organizations build the foundation for sustained competitive 
              advantage in an increasingly data-driven world.
            </p>
            <p className="font-telegraf text-lg text-gray-600 leading-relaxed">
              Our approach goes beyond traditional consulting. We don't just provide recommendations—we 
              architect and implement complete solutions that integrate seamlessly with your existing 
              operations while positioning you for future growth.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

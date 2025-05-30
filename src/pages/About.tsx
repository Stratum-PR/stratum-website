
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Edit } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const About = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [teamImages, setTeamImages] = useState<{ [key: string]: string }>({});

  // Load saved images from localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('stratumTeamImages');
    if (savedImages) {
      setTeamImages(JSON.parse(savedImages));
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('stratumTeamImages', JSON.stringify(teamImages));
  }, [teamImages]);

  const handleImageUpload = (memberKey: string, imageData: string) => {
    setTeamImages(prev => ({
      ...prev,
      [memberKey]: imageData
    }));
  };

  const handleImageRemove = (memberKey: string) => {
    setTeamImages(prev => {
      const updated = { ...prev };
      delete updated[memberKey];
      return updated;
    });
  };

  const founders = [
    {
      key: "jovaniel",
      name: "Jovaniel Rodriguez",
      role: "Co-Founder, Operations & Growth",
      bio: "Former consultant with 8+ years in enterprise analytics. Jovaniel leads strategic initiatives and client relationships, specializing in digital transformation and data architecture.",
      expertise: ["Strategic Consulting", "Digital Transformation", "Enterprise Architecture"],
      linkedin: "https://www.linkedin.com/in/jovanielrodriguez-maldonado/",
      email: "j.rodriguez@stratumpr.com"
    },
    {
      key: "roberto",
      name: "Roberto Otero",
      role: "Co-Founder, Tech & Build",
      bio: "Data scientist and ML engineer. Roberto oversees technical delivery and innovation, with deep expertise in AI/ML implementations and big data infrastructure.",
      expertise: ["Machine Learning", "Big Data", "AI Implementation"],
      linkedin: "https://www.linkedin.com/in/roberto-otero/",
      email: "r.otero@stratumpr.com"
    },
    {
      key: "genesis",
      name: "Genesis Rodriguez",
      role: "Co-Founder, Data & Insights",
      bio: "Biostatistician, lead research scientist at the Puerto Rico Comprehensive Cancer Center (CCC). Genesis drives our analytical methodologies and ensures scientific rigor in all modeling approaches.",
      expertise: ["Statistical Modeling", "Predictive Analytics", "Research Methods"],
      linkedin: "https://www.linkedin.com/in/genesismrodriguez/",
      email: "g.rodriguez@stratumpr.com"
    }
  ];

  const values = [
    {
      title: "Technical Excellence",
      description: "We maintain the highest standards in analytical rigor and technical implementation."
    },
    {
      title: "Strategic Clarity",
      description: "Every solution is designed with clear business outcomes and measurable impact."
    },
    {
      title: "Client Partnership",
      description: "We work as an extension of your team, not just another vendor."
    },
    {
      title: "Innovation Focus",
      description: "Continuously exploring emerging technologies to deliver competitive advantages."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
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

      {/* Mission & Vision */}
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

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-telegraf font-bold text-4xl text-primary mb-6">
              Our Values
            </h2>
            <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every solution we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="font-telegraf font-semibold text-2xl text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="font-telegraf text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-6">
              <h2 className="font-telegraf font-bold text-4xl text-primary">
                Meet the Team
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
                className="text-primary border-primary hover:bg-primary hover:text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditMode ? 'Done' : 'Edit Photos'}
              </Button>
            </div>
            <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
              Our founding team brings together more than a decade of experience from leading 
             Fortune 500 companies, consulting firms, technology companies, and academic institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-primary to-secondary p-8">
                  {isEditMode ? (
                    <ImageUpload
                      currentImage={teamImages[founder.key]}
                      onImageUpload={(imageData) => handleImageUpload(founder.key, imageData)}
                      onImageRemove={() => handleImageRemove(founder.key)}
                      memberName={founder.name}
                    />
                  ) : teamImages[founder.key] ? (
                    <img
                      src={teamImages[founder.key]}
                      alt={`${founder.name} profile`}
                      className="w-32 h-32 mx-auto rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-4xl font-telegraf font-bold text-white">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-8">
                  <h3 className="font-telegraf font-bold text-2xl text-primary mb-2">
                    {founder.name}
                  </h3>
                  <p className="font-telegraf font-semibold text-secondary mb-4">
                    {founder.role}
                  </p>
                  <p className="font-telegraf text-gray-600 mb-6 leading-relaxed">
                    {founder.bio}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-telegraf font-semibold text-sm text-gray-800 mb-3">
                      EXPERTISE
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

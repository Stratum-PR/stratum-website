
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  MessageSquare,
  Clock,
  Send,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form after showing success
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@stratumpr.com",
      href: "mailto:contact@stratumpr.com",
      description: "Send us a message anytime"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Trujillo Alto, P.R.",
      href: "#",
      description: "Our Main Headquarters"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/company/stratumpr",
      href: "https://linkedin.com/company/stratumpr",
      description: "Connect with our team"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-700 to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-5xl md:text-6xl mb-6">
            Contact Us
          </h1>
          <p className="font-telegraf text-xl text-primary-100 leading-relaxed">
            Ready to transform your business with strategic analytics? Let's start 
            the conversation about your goals and how we can help achieve them.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="font-telegraf text-3xl text-primary flex items-center">
                    <MessageSquare className="h-8 w-8 mr-3" />
                    Send us a Message
                  </CardTitle>
                  <p className="font-telegraf text-gray-600 mt-2">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                      <h3 className="font-telegraf font-semibold text-2xl text-primary mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="font-telegraf text-gray-600">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="font-telegraf font-medium">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 font-telegraf"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="font-telegraf font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 font-telegraf"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="subject" className="font-telegraf font-medium">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="mt-2 font-telegraf"
                          placeholder="CRM Implementation Inquiry"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message" className="font-telegraf font-medium">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="mt-2 font-telegraf resize-none"
                          placeholder="Tell us about your project, goals, and timeline..."
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-800 font-telegraf font-semibold py-3 transition-all duration-300 hover:shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-telegraf text-2xl text-primary">
                    Get in Touch
                  </CardTitle>
                  <p className="font-telegraf text-gray-600">
                    Multiple ways to reach our team
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <info.icon className="h-5 w-5 text-primary group-hover:text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-telegraf font-semibold text-gray-900">
                          {info.title}
                        </h3>
                        <p className="font-telegraf text-primary font-medium">
                          {info.value}
                        </p>
                        <p className="font-telegraf text-sm text-gray-600">
                          {info.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary to-secondary text-white">
                <CardContent className="p-8">
                  <Clock className="h-8 w-8 mb-4" />
                  <h3 className="font-telegraf font-semibold text-xl mb-2">
                    Response Time
                  </h3>
                  <p className="font-telegraf text-primary-100 mb-4">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                  <p className="font-telegraf text-sm text-primary-200">
                    For urgent matters, please call us directly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-telegraf font-bold text-4xl text-primary mb-4">
              Visit Our Office
            </h2>
            <p className="font-telegraf text-xl text-gray-600">
              Located in the heart of San Francisco's tech district
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0197887363287!2d-122.39492668468118!3d37.78810861975844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c057a5b27%3A0x3be14d24a2b6f355!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1635534799142!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Stratum PR Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

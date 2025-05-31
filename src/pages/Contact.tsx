
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useFormSecurity } from "@/hooks/useFormSecurity";
import { sanitizeInput, validateEmail, validateRequired } from "@/utils/security";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  MessageSquare,
  Clock,
  Send,
  CheckCircle,
  Shield
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const {
    honeypotField,
    honeypotValue,
    setHoneypotValue,
    mathCaptcha,
    captchaAnswer,
    setCaptchaAnswer,
    validateSecurity,
    throttleSubmission,
    resetCaptcha,
    isSubmissionThrottled
  } = useFormSecurity();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.name, 2)) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validateRequired(formData.subject, 3)) {
      newErrors.subject = "Subject must be at least 3 characters long";
    }

    if (!validateRequired(formData.message, 10)) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting || isSubmissionThrottled) return;

    // Validate form
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    // Security validation
    const securityCheck = validateSecurity();
    if (!securityCheck.isValid) {
      toast({
        title: "Security Check Failed",
        description: securityCheck.error,
        variant: "destructive",
      });
      resetCaptcha();
      return;
    }

    setIsSubmitting(true);
    throttleSubmission();

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
    };

    console.log("Secure form submission:", {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 100),
    });

    try {
      const response = await fetch("https://formspree.io/f/xyzjgyzq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...sanitizedData,
          _subject: `Contact Form: ${sanitizedData.subject}`,
          _replyto: sanitizedData.email,
          _format: "plain",
          timestamp: new Date().toISOString(),
        }),
      });
    
      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
    
        setTimeout(() => {
          setFormData({ name: "", email: "", subject: "", message: "" });
          setIsSubmitted(false);
          resetCaptcha();
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
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
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Shield className="h-4 w-4 mr-1" />
                    This form is protected against spam and automated submissions
                  </div>
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
                      {/* Honeypot Field - Hidden from users */}
                      <input
                        type="text"
                        name={honeypotField}
                        value={honeypotValue}
                        onChange={(e) => setHoneypotValue(e.target.value)}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                      />

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
                            className={`mt-2 font-telegraf ${errors.name ? 'border-red-500' : ''}`}
                            placeholder="John Smith"
                            maxLength={100}
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                            className={`mt-2 font-telegraf ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="john@company.com"
                            maxLength={254}
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                          className={`mt-2 font-telegraf ${errors.subject ? 'border-red-500' : ''}`}
                          placeholder="Enterprise Solutions Inquiry"
                          maxLength={200}
                        />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
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
                          className={`mt-2 font-telegraf resize-none ${errors.message ? 'border-red-500' : ''}`}
                          placeholder="Tell us about your project, goals, and timeline..."
                          maxLength={2000}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>

                      {/* Math CAPTCHA */}
                      <div>
                        <Label htmlFor="captcha" className="font-telegraf font-medium">
                          Security Question *
                        </Label>
                        <p className="text-sm text-gray-600 mb-2">{mathCaptcha.question}</p>
                        <Input
                          id="captcha"
                          type="number"
                          required
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          className="mt-2 font-telegraf max-w-32"
                          placeholder="Answer"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || isSubmissionThrottled}
                        className="w-full bg-primary hover:bg-primary-800 font-telegraf font-semibold py-3 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

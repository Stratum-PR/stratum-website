
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useFormSecurity } from "@/hooks/useFormSecurity";
import { sanitizeInput, validateEmail, validateRequired } from "@/utils/security";
import { MessageSquare, Send, Shield } from "lucide-react";
import ContactFormFields from "./ContactFormFields";
import SecurityCaptcha from "./SecurityCaptcha";
import ContactFormSuccess from "./ContactFormSuccess";
import { useLanguage } from "@/contexts/LanguageContext";
import { logger } from "@/lib/logger";
import { track } from "@/lib/analytics";

const ContactForm = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
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
    validateSecurity,
    throttleSubmission,
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
    // Company, industry, and subject are now optional
    // Only validate if they have values
    if (formData.company && !validateRequired(formData.company, 2)) {
      newErrors.company = "Company name must be at least 2 characters long";
    }
    if (formData.industry && !validateRequired(formData.industry, 2)) {
      newErrors.industry = "Industry must be at least 2 characters long";
    }
    if (formData.subject && !validateRequired(formData.subject, 3)) {
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
        variant: "destructive"
      });
      return;
    }

    // Security validation
    const securityCheck = validateSecurity();
    if (!securityCheck.isValid) {
      toast({
        title: "Security Check Failed",
        description: securityCheck.error,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    throttleSubmission();

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      company: sanitizeInput(formData.company),
      industry: sanitizeInput(formData.industry),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    logger.log("Secure form submission:", {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 100)
    });

    try {
      // Send to Formspree
      const response = await fetch("https://formspree.io/f/xyzjgyzq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...sanitizedData,
          _subject: `Contact Form: ${sanitizedData.subject || 'No Subject'}`,
          _replyto: sanitizedData.email,
          _format: "plain",
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Funnel event only (no form values); sent only with analytics consent
        track("demo_requested");
        // Send confirmation email to user
        try {
          const { sendContactConfirmation } = await import('@/services/resend');
          await sendContactConfirmation(sanitizedData.email, sanitizedData.name, language === 'en' ? 'en' : 'es');
        } catch (emailError) {
          logger.error('Error sending confirmation email:', emailError);
          // Don't fail the form submission if confirmation email fails
        }
        
        setIsSubmitted(true);
        toast({
          title: t('contact.form.success.title'),
          description: t('contact.form.success.description')
        });
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            industry: "",
            subject: "",
            message: ""
          });
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      logger.error("Error submitting form:", error);
      toast({
        title: language === 'es' ? "No pudimos enviar tu mensaje" : "Submission Failed",
        description: language === 'es'
          ? "Intenta de nuevo o escríbenos a contact@stratumpr.com."
          : "Something went wrong. Please try again later.",
        variant: "destructive"
      });
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
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  return (
    <Card className="rounded-3xl border border-primary/10 bg-white shadow-[0_10px_40px_rgba(30,43,126,0.08)]">
      <CardHeader className="p-5 pb-4 md:p-6 md:pb-4">
        <CardTitle className="font-telegraf text-xl font-bold md:text-2xl text-[#0b1215] flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-primary" />
          {t('contact.form.title')}
        </CardTitle>
        <p className="font-telegraf text-sm text-gray-600 mt-1">
          {t('contact.form.description')}
        </p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Shield className="h-3 w-3 mr-1" />
          {t('contact.form.security')}
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0 md:p-6 md:pt-0">
        {isSubmitted ? (
          <ContactFormSuccess />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <SecurityCaptcha 
              honeypotField={honeypotField}
              honeypotValue={honeypotValue}
              setHoneypotValue={setHoneypotValue}
            />

            <ContactFormFields 
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
            
            <Button 
              type="submit" 
              disabled={isSubmitting || isSubmissionThrottled} 
              className="h-auto w-full rounded-2xl bg-primary py-3.5 font-telegraf text-base font-semibold transition-colors hover:bg-secondary disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  {t('contact.form.submit')}
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;

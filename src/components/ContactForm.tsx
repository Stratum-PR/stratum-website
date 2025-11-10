
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

    console.log("Secure form submission:", {
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
        // Send confirmation email to user
        try {
          const { sendEmail } = await import('@/services/resend');
          
          const confirmationSubject = language === 'es'
            ? 'Hemos recibido tu mensaje - Stratum PR'
            : 'We received your message - Stratum PR';
          
          const confirmationHtml = language === 'es'
            ? `
              <h2>Gracias por contactarnos</h2>
              <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo en 24 horas o menos.</p>
              <p>Si tienes alguna pregunta urgente, puedes contactarnos directamente en <a href="mailto:contact@stratumpr.com">contact@stratumpr.com</a></p>
              <br>
              <p style="color: #666; font-size: 12px;">Stratum PR - La Arquitectura de Mejores Decisiones</p>
            `
            : `
              <h2>Thank you for contacting us</h2>
              <p>We have received your message and will get back to you within 24 hours or less.</p>
              <p>If you have an urgent question, you can reach us directly at <a href="mailto:contact@stratumpr.com">contact@stratumpr.com</a></p>
              <br>
              <p style="color: #666; font-size: 12px;">Stratum PR - The Architecture of Better Decisions</p>
            `;
          
          await sendEmail({
            to: sanitizedData.email,
            subject: confirmationSubject,
            html: confirmationHtml,
            from: 'Stratum PR <contact@stratumpr.com>'
          });
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
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
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
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
    <Card className="border-2 border-gray-600 shadow-xl bg-gray-800">
      <CardHeader className="pb-4">
        <CardTitle className="font-telegraf text-2xl text-white flex items-center">
          <MessageSquare className="h-6 w-6 mr-2" />
          {t('contact.form.title')}
        </CardTitle>
        <p className="font-telegraf text-sm text-gray-300 mt-1">
          {t('contact.form.description')}
        </p>
        <div className="flex items-center text-xs text-gray-400 mt-1">
          <Shield className="h-3 w-3 mr-1" />
          {t('contact.form.security')}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
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
              className="w-full bg-primary hover:bg-primary-800 font-telegraf font-semibold py-2 text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-50"
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

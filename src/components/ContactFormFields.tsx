
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactFormFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    subject: string;
    message: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactFormFields = ({ formData, errors, onChange }: ContactFormFieldsProps) => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="font-telegraf font-medium">
            {t('contact.form.name')} *
          </Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            required 
            value={formData.name} 
            onChange={onChange} 
            className={`mt-2 font-telegraf ${errors.name ? 'border-red-500' : ''}`} 
            placeholder="John Smith" 
            maxLength={100} 
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="font-telegraf font-medium">
            {t('contact.form.email')} *
          </Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            required 
            value={formData.email} 
            onChange={onChange} 
            className={`mt-2 font-telegraf ${errors.email ? 'border-red-500' : ''}`} 
            placeholder="john@company.com" 
            maxLength={254} 
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className="font-telegraf font-medium">
          Phone Number
        </Label>
        <Input 
          id="phone" 
          name="phone" 
          type="tel" 
          value={formData.phone} 
          onChange={onChange} 
          className={`mt-2 font-telegraf ${errors.phone ? 'border-red-500' : ''}`} 
          placeholder="+1 (555) 123-4567" 
          maxLength={20} 
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="company" className="font-telegraf font-medium">
            Company Name *
          </Label>
          <Input 
            id="company" 
            name="company" 
            type="text" 
            required 
            value={formData.company} 
            onChange={onChange} 
            className={`mt-2 font-telegraf ${errors.company ? 'border-red-500' : ''}`} 
            placeholder="Acme Corporation" 
            maxLength={100} 
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
        </div>
        <div>
          <Label htmlFor="industry" className="font-telegraf font-medium">
            Industry *
          </Label>
          <Input 
            id="industry" 
            name="industry" 
            type="text" 
            required 
            value={formData.industry} 
            onChange={onChange} 
            className={`mt-2 font-telegraf ${errors.industry ? 'border-red-500' : ''}`} 
            placeholder="Healthcare, Finance, Technology..." 
            maxLength={100} 
          />
          {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
        </div>
      </div>
      
      <div>
        <Label htmlFor="subject" className="font-telegraf font-medium">
          {t('contact.form.subject')} *
        </Label>
        <Input 
          id="subject" 
          name="subject" 
          type="text" 
          required 
          value={formData.subject} 
          onChange={onChange} 
          className={`mt-2 font-telegraf ${errors.subject ? 'border-red-500' : ''}`} 
          placeholder="Enterprise Solutions Inquiry" 
          maxLength={200} 
        />
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
      </div>
      
      <div>
        <Label htmlFor="message" className="font-telegraf font-medium">
          {t('contact.form.message')} *
        </Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          value={formData.message} 
          onChange={onChange} 
          rows={6} 
          className={`mt-2 font-telegraf resize-none ${errors.message ? 'border-red-500' : ''}`} 
          placeholder="Tell us about your project, goals, and timeline..." 
          maxLength={2000} 
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>
    </>
  );
};

export default ContactFormFields;


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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="font-telegraf font-medium text-sm text-white">
            {t('contact.form.name')} *
          </Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            required 
            value={formData.name} 
            onChange={onChange} 
            className={`mt-1 font-telegraf h-9 text-sm ${errors.name ? 'border-red-500' : ''}`} 
            placeholder={t('contact.form.name.placeholder')}
            maxLength={100} 
          />
          {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="font-telegraf font-medium text-sm text-white">
            {t('contact.form.email')} *
          </Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            required 
            value={formData.email} 
            onChange={onChange} 
            className={`mt-1 font-telegraf h-9 text-sm ${errors.email ? 'border-red-500' : ''}`} 
            placeholder={t('contact.form.email.placeholder')}
            maxLength={254} 
          />
          {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className="font-telegraf font-medium text-sm text-white">
          {t('contact.form.phone')}
        </Label>
        <Input 
          id="phone" 
          name="phone" 
          type="tel" 
          value={formData.phone} 
          onChange={onChange} 
          className={`mt-1 font-telegraf h-9 text-sm ${errors.phone ? 'border-red-500' : ''}`} 
          placeholder={t('contact.form.phone.placeholder')}
          maxLength={20} 
        />
        {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company" className="font-telegraf font-medium text-sm text-white">
            {t('contact.form.company')}
          </Label>
          <Input 
            id="company" 
            name="company" 
            type="text" 
            value={formData.company} 
            onChange={onChange} 
            className={`mt-1 font-telegraf h-9 text-sm ${errors.company ? 'border-red-500' : ''}`} 
            placeholder={t('contact.form.company.placeholder')}
            maxLength={100} 
          />
          {errors.company && <p className="text-red-500 text-xs mt-0.5">{errors.company}</p>}
        </div>
        <div>
          <Label htmlFor="industry" className="font-telegraf font-medium text-sm text-white">
            {t('contact.form.industry')}
          </Label>
          <Input 
            id="industry" 
            name="industry" 
            type="text" 
            value={formData.industry} 
            onChange={onChange} 
            className={`mt-1 font-telegraf h-9 text-sm ${errors.industry ? 'border-red-500' : ''}`} 
            placeholder={t('contact.form.industry.placeholder')}
            maxLength={100} 
          />
          {errors.industry && <p className="text-red-500 text-xs mt-0.5">{errors.industry}</p>}
        </div>
      </div>
      
      <div>
        <Label htmlFor="subject" className="font-telegraf font-medium text-sm text-white">
          {t('contact.form.subject')}
        </Label>
        <Input 
          id="subject" 
          name="subject" 
          type="text" 
          value={formData.subject} 
          onChange={onChange} 
          className={`mt-1 font-telegraf h-9 text-sm ${errors.subject ? 'border-red-500' : ''}`} 
          placeholder={t('contact.form.subject.placeholder')}
          maxLength={200} 
        />
        {errors.subject && <p className="text-red-500 text-xs mt-0.5">{errors.subject}</p>}
      </div>
      
      <div>
        <Label htmlFor="message" className="font-telegraf font-medium text-sm text-white">
          {t('contact.form.message')} *
        </Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          value={formData.message} 
          onChange={onChange} 
          rows={4} 
          className={`mt-1 font-telegraf resize-none text-sm ${errors.message ? 'border-red-500' : ''}`} 
          placeholder={t('contact.form.message.placeholder')}
          maxLength={2000} 
        />
        {errors.message && <p className="text-red-500 text-xs mt-0.5">{errors.message}</p>}
      </div>
    </>
  );
};

export default ContactFormFields;

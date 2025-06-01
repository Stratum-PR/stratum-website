
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormFieldsProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactFormFields = ({ formData, errors, onChange }: ContactFormFieldsProps) => {
  return (
    <>
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
            onChange={onChange} 
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
            onChange={onChange} 
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
          onChange={onChange} 
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

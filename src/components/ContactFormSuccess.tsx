
import { CheckCircle } from "lucide-react";

const ContactFormSuccess = () => {
  return (
    <div className="text-center py-12">
      <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
      <h3 className="font-telegraf font-semibold text-2xl text-primary mb-2">
        Message Sent Successfully!
      </h3>
      <p className="font-telegraf text-gray-600">
        Thank you for reaching out. We'll get back to you within 24 hours.
      </p>
    </div>
  );
};

export default ContactFormSuccess;

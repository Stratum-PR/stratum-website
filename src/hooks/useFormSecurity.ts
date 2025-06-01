
import { useState, useEffect } from "react";
import { generateHoneypotField, checkRateLimit } from "@/utils/security";

export const useFormSecurity = () => {
  const [honeypotField, setHoneypotField] = useState("");
  const [honeypotValue, setHoneypotValue] = useState("");
  const [isSubmissionThrottled, setIsSubmissionThrottled] = useState(false);

  useEffect(() => {
    // Generate honeypot field name on component mount
    setHoneypotField(generateHoneypotField());
  }, []);

  const validateSecurity = (): { isValid: boolean; error?: string } => {
    // Check honeypot
    if (honeypotValue.trim() !== "") {
      console.warn("Bot detected: honeypot filled");
      return { isValid: false, error: "Security validation failed" };
    }

    // Check rate limiting
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      return { 
        isValid: false, 
        error: `Too many submissions. Please wait ${rateCheck.timeLeft} minutes before trying again.` 
      };
    }

    // Check submission throttling
    if (isSubmissionThrottled) {
      return { isValid: false, error: "Please wait before submitting again" };
    }

    return { isValid: true };
  };

  const throttleSubmission = () => {
    setIsSubmissionThrottled(true);
    setTimeout(() => setIsSubmissionThrottled(false), 2000);
  };

  return {
    honeypotField,
    honeypotValue,
    setHoneypotValue,
    validateSecurity,
    throttleSubmission,
    isSubmissionThrottled
  };
};

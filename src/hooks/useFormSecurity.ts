
import { useState, useEffect } from "react";
import { generateHoneypotField, generateMathCaptcha, checkRateLimit } from "@/utils/security";

export const useFormSecurity = () => {
  const [honeypotField, setHoneypotField] = useState("");
  const [honeypotValue, setHoneypotValue] = useState("");
  const [mathCaptcha, setMathCaptcha] = useState({ question: "", answer: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isSubmissionThrottled, setIsSubmissionThrottled] = useState(false);

  useEffect(() => {
    // Generate honeypot field name and math captcha on component mount
    setHoneypotField(generateHoneypotField());
    setMathCaptcha(generateMathCaptcha());
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

    // Check math captcha
    if (parseInt(captchaAnswer) !== mathCaptcha.answer) {
      return { isValid: false, error: "Please solve the math problem correctly" };
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

  const resetCaptcha = () => {
    setMathCaptcha(generateMathCaptcha());
    setCaptchaAnswer("");
  };

  return {
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
  };
};

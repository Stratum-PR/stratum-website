
interface SecurityCaptchaProps {
  honeypotField: string;
  honeypotValue: string;
  setHoneypotValue: (value: string) => void;
}

const SecurityCaptcha = ({ 
  honeypotField, 
  honeypotValue, 
  setHoneypotValue 
}: SecurityCaptchaProps) => {
  return (
    <input 
      type="text" 
      name={honeypotField} 
      value={honeypotValue} 
      onChange={e => setHoneypotValue(e.target.value)} 
      style={{ display: 'none' }} 
      tabIndex={-1} 
      autoComplete="off" 
    />
  );
};

export default SecurityCaptcha;

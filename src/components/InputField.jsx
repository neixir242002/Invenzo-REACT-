import "../styles/InputField.css";
import { Mail, Lock, User, Phone } from "lucide-react";

const ICONS = {
  mail: Mail,
  lock: Lock,
  user: User,
  phone: Phone,
};

const InputField = ({ label, type, placeholder, icon }) => {
  const Icon = ICONS[icon];
  return (
    <div className="input-field">
      <label>{label}</label>
      <div className="input-icon">
        {Icon && <Icon size={18} className="field-icon" />}
        <input type={type} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default InputField;

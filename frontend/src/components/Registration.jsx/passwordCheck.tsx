import React from "react";

type PasswordCheck = {
  regex: RegExp;
  label: string;
};

const passwordChecks: PasswordCheck[] = [
  { regex: /.{8,}/, label: "At least 8 characters" },
  { regex: /[A-Z]/, label: "One uppercase letter" },
  { regex: /[a-z]/, label: "One lowercase letter" },
  { regex: /[0-9]/, label: "One number" },
  { regex: /[^A-Za-z0-9]/, label: "One special character" }
];

interface PasswordValidationProps {
  password: string;
  show: boolean;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({ password, show }) => {
  if (!show) return null;
  return (
    <ul className="mb-2 text-xs text-gray-600 space-y-1">
      {passwordChecks.map((check, idx) => (
        <li
          key={idx}
          className={check.regex.test(password) ? "text-green-600" : "text-red-500"}
        >
          {check.label}
        </li>
      ))}
    </ul>
  );
};

export { passwordChecks };
export default PasswordValidation;
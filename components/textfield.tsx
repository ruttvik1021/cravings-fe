import {
  useState,
  useEffect,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type InputType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "email"
  | "date"
  | "tel";

interface TextFieldProps {
  type: InputType;
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  error?: string;
  className?: string;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  onBlur,
  required,
  placeholder,
  disabled,
  maxLength,
  error,
  className,
  countryCode,
  onCountryCodeChange,
}) => {
  const [charCount, setCharCount] = useState(value?.length || 0);

  useEffect(() => {
    setCharCount(value?.length);
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <div className="relative">
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`w-full p-2 border rounded-md resize-none ${className} ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
          />
          {maxLength && (
            <span className="absolute bottom-2 right-2 text-sm text-gray-400">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      );
    }

    if (type === "tel") {
      return (
        <div className="flex gap-2">
          {onCountryCodeChange && (
            <Select
              value={countryCode}
              onValueChange={onCountryCodeChange}
              disabled={disabled}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+1">+1 (US)</SelectItem>
                <SelectItem value="+91">+91 (IN)</SelectItem>
                <SelectItem value="+44">+44 (UK)</SelectItem>
              </SelectContent>
            </Select>
          )}
          <input
            type="tel"
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`flex-1 p-2 border rounded-md ${className} ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-md ${className} ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
    );
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {renderInput()}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;

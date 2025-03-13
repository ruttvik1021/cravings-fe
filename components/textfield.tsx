import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type InputType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "email"
  | "date"
  | "time"
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
  // countryCode,
  // onCountryCodeChange,
}) => {
  const [charCount, setCharCount] = useState(value?.length || 0);
  const [showPassword, setShowPassword] = useState(false);

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
          <Textarea
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
        <div className="flex gap-2 w-full max-w-md">
          {/* {onCountryCodeChange && (
            <Select
              value={countryCode}
              onValueChange={onCountryCodeChange}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+1">+1 (US)</SelectItem>
                <SelectItem value="+91">+91 (IN)</SelectItem>
                <SelectItem value="+44">+44 (UK)</SelectItem>
              </SelectContent>
            </Select>
          )} */}
          <Input
            type="tel"
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`flex-1 min-w-0 p-2 border rounded-md ${className} ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
      );
    }

    if (type === "password") {
      return (
        <div className="relative">
          <Input
            type={type === "password" && showPassword ? "text" : type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`w-full p-2 border rounded-md pr-10 ${className} ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      );
    }

    return (
      <Input
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
        <Label htmlFor={name} className="block text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {renderInput()}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;

import { Eye, EyeOff } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Control, Controller } from "react-hook-form";

type InputType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "email"
  | "date"
  | "time"
  | "search"
  | "tel";

interface TextFieldProps {
  type: InputType;
  label?: string;
  name: string;
  value: string | number;
  onChange: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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

interface FormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  type?: InputType;
  required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
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
}) => {
  const [charCount, setCharCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    typeof value === "string" && setCharCount(value.length);
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e);
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
            placeholder={placeholder || label}
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

    if (type === "password") {
      return (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder || label}
            className={`w-full p-2 border rounded-md pr-10 ${className} ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
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
        placeholder={placeholder || label}
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

export const FormField = memo(
  ({ control, name, label, type = "text", required }: FormFieldProps) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          type={type}
          label={label}
          name={name}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          required={required}
        />
      )}
    />
  )
);

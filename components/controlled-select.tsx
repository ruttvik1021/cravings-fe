// components/controlled-select.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Control, Controller, useFormContext } from "react-hook-form";
import { Label } from "./ui/label";

interface ControlledSelectProps {
  name: string;
  label: string;
  control: Control<any>;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function ControlledSelect({
  name,
  label,
  options,
  placeholder = "Select...",
  className,
  disabled,
  control,
}: ControlledSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={`grid gap-2 ${className}`}>
          <Label>{label}</Label>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.error && (
            <span className="text-sm text-destructive">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}

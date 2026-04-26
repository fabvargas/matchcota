"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Option = {
  value: string;
  label: string;
};

export default function CustomSelect({
  items,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  disabled = false,
  name,
  required = false,
  defaultValue,
}: {
  items: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange} name={name} required={required} defaultValue={defaultValue}>
      <SelectTrigger
        disabled={disabled}
        className="w-full mt-1 px-3 py-2 border rounded-lg"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value} >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
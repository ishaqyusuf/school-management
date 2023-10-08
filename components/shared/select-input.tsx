"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
export interface InputProps {
  form;
  label?;
  placeholder?;
  options?;
  formKey?;
  itemText?;
  itemValue?;
  rtl?: Boolean;
}
export default function SelectInput({
  form,
  label,
  placeholder,
  formKey,
  rtl,
  itemText = "label",
  itemValue = "value",
  options = [],
}: InputProps) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    setItems(
      options.map((o) => {
        return typeof o == "object"
          ? {
              label: o[itemText],
              value: o[itemValue],
              data: o,
            }
          : { label: o, value: o, data: o };
      })
    );
  }, [options, itemText, itemValue]);
  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(rtl && "text-right")}>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((o, i) => (
                <SelectItem key={i} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <FormDescription>
              You can manage email addresses in your{" "}
              <Link href="/examples/forms">email settings</Link>.
            </FormDescription> */}
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}

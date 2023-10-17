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
import { InputProps } from "./select-input";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
interface Props {}
export default function FormInput({
  form,
  label,
  placeholder,
  formKey,
  type,
  rtl,
}: InputProps & { type? }) {
  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              className={cn(rtl && "text-right")}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {/* <FormDescription>
                           This is your public display name.
                         </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

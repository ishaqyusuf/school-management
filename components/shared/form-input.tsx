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
  className,
  type,
  rtl,
}: InputProps & { type?; className? }) {
  return (
    <div className={cn(className)}>
      <FormField
        control={form.control}
        name={formKey}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                className={cn("h-8 px-2")}
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
    </div>
  );
}

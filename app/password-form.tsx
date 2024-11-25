"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FormSchema = z.object({
  password: z.string(),
});

export function PasswordForm() {
  const [showSeat, setShowSeat] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.password !== "Fantastic Mr Fox") {
      form.setError("password", {
        type: "manual",
        message: "The password is incorrect.",
      });
    } else {
      setShowSeat(true);
    }
  }

  if (showSeat) {
    return (
      <div className="text-center mt-60">
        <p className="text-7xl font-medium tracking-tight mb-14">
          Go get your skateboard
        </p>
        <h2 className="text-[180px] leading-[175px] tracking-tight font-medium">
          Row 9
          <br />
          Seat 20
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl h-screen flex flex-col items-center pb-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-2/3 m-auto"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>The final password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormDescription>
                  Hint: It&apos;s Peter&apos;s favourite book.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

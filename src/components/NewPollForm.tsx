"use client";

import { createPoll, getNewPollSlug } from "@/lib/actions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Switch } from "@/ui/switch";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { CreatePoll, createPollSchema } from "@/lib/schemas";
import { usePendingAction } from "@/lib/usePendingAction";
import { FormField } from "./FormField";
import { DEFAULT_CORE_QUESTION } from "@/lib/copy";

export function NewPollForm() {
  const [isPending, handleAction] = usePendingAction(createPoll);
  const form = useForm<CreatePoll>({
    mode: "onChange",
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      statements: "",
      with_demographic_questions: false,
      new_statements_visible_by_default: true,
      poll_type: "public",
      question: DEFAULT_CORE_QUESTION,
    },
    disabled: isPending,
  });

  return (
    <form
      onSubmit={form.handleSubmit(handleAction)}
      className="p-4 rounded-xl border grid gap-8 bg-white dark:bg-neutral-950"
    >
      <FormField
        title="Poll Title"
        description="Give it a catchy title"
        errors={form.formState.errors.title}
      >
        <Input
          {...form.register("title", {
            onBlur(event) {
              getNewPollSlug(event.target.value).then((slug) => {
                form.setValue("slug", slug);
              });
            },
          })}
          placeholder="Enter the title of the poll"
        />
      </FormField>
      <FormField
        title="Main Question"
        description={DEFAULT_CORE_QUESTION}
        errors={form.formState.errors.question}
      >
        <Input
          {...form.register("question")}
          placeholder="What do you think of the following statements?"
        />
      </FormField>
      <FormField
        title="Statements"
        description="Use a new line for each statement. Add at least five statements that people can respond to. The more the better!"
        errors={form.formState.errors.statements}
      >
        <Controller
          name="statements"
          control={form.control}
          render={({ field }) => (
            <Textarea className="leading-6" rows={5} {...field} />
          )}
        />
      </FormField>
      <Accordion type="single" collapsible className="w-full -mt-4">
        <AccordionItem value="advanced-settings">
          <AccordionTrigger>Advanced Settings</AccordionTrigger>
          <AccordionContent className="grid gap-8">
            <FormField
              title="Slug"
              description="This will be in the URL for your poll."
              errors={form.formState.errors.slug}
            >
              <Input {...form.register("slug")} />
            </FormField>
            <FormField
              title="Poll Type"
              description="Choose the visibility of your poll"
              errors={form.formState.errors.poll_type}
            >
              <Controller
                name="poll_type"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {[
                      { value: "public", label: "Public" },
                      { value: "hidden", label: "Private" },
                    ].map(({ value, label }) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <Label htmlFor={value}>{label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </FormField>

            <FormField
              title="New Statements"
              description="Should statements added by respondents initially be visible or hidden?"
              errors={form.formState.errors.new_statements_visible_by_default}
            >
              <div className="flex items-center space-x-2">
                <Controller
                  name="new_statements_visible_by_default"
                  control={form.control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="new_statements_visible_by_default">
                  Should be visible
                </Label>
              </div>
            </FormField>

            <FormField
              title="Demographic Questions"
              description="We can ask people some demographic questions to help you understand the results better."
              errors={form.formState.errors.with_demographic_questions}
            >
              <div className="flex items-center space-x-2">
                <Controller
                  name="with_demographic_questions"
                  control={form.control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="with_demographic_questions">
                  Include demographic questions?
                </Label>
              </div>
            </FormField>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button type="submit">Save & Publish</Button>
    </form>
  );
}

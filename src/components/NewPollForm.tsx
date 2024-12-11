"use client";

import { createPoll, generatePollWithAI, getNewPollSlug } from "@/lib/actions";
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
import {
  getStoredState,
  resetStore,
  saveStore,
} from "@/lib/useCreatePollStore";
import { useEffect } from "react";
import { FiLoader, FiZap } from "react-icons/fi";
import { toast } from "sonner";
import { cn } from "@/ui/cn";
import { GeneratePollDialog } from "./GeneratePollDialog";

export function NewPollForm() {
  const [isPending, handleAction] = usePendingAction(createPoll, {
    after() {
      resetStore();
    },
  });

  // load default values from store on init
  const form = useForm<CreatePoll>({
    mode: "onSubmit",
    resolver: zodResolver(createPollSchema),
    defaultValues: getStoredState(),
    disabled: isPending,
  });

  const [isGenerating, generate] = usePendingAction(generatePollWithAI, {
    // before() {
    //   // clear title, main question and statements
    //   clearForm();
    // },
    after(result) {
      if (result.success) {
        // Wrap in setTimeout to break the event loop
        setTimeout(() => {
          form.reset(
            {
              ...form.getValues(),
              title: result.poll.title,
              statements: result.poll.statements.join("\n"),
              question: result.poll.main_question || form.getValues("question"),
              with_demographic_questions:
                typeof result.poll.show_demographic_questions === "boolean"
                  ? result.poll.show_demographic_questions
                  : form.getValues("with_demographic_questions"),
            },
            {
              keepDefaultValues: true,
              keepDirty: false,
              keepErrors: false,
              keepTouched: false,
            },
          );

          // create slug
          getNewPollSlug(form.getValues("title")).then((slug) => {
            form.setValue("slug", slug);
          });
        }, 0);
      } else {
        toast.error(result.error);
      }
    },
  });

  // watch values and save to store and set expiration date in the future
  useEffect(() => {
    form.watch((values) => {
      saveStore(values);
    });
  }, [form]);

  return (
    <>
      <form
        onSubmit={form.handleSubmit(handleAction)}
        className={cn(
          "p-4 rounded-xl border grid gap-8 bg-white dark:bg-neutral-950 relative",
          { "animate-pulse": isGenerating },
        )}
      >
        <GeneratePollDialog onSubmit={generate}>
          <Button
            variant="outline"
            className="sm:absolute sm:top-4 sm:right-4"
            size="sm"
            disabled={isGenerating}
            type="button"
            data-testid="create-with-ai-button"
          >
            {isGenerating ? (
              <FiLoader className="animate-spin mr-2" />
            ) : (
              <FiZap className="mr-2" fill="currentColor" />
            )}
            Create with AI
          </Button>
        </GeneratePollDialog>
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
            shouldUnregister={false}
            render={({ field }) => (
              <Textarea className="leading-6" rows={10} {...field} />
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
    </>
  );
}

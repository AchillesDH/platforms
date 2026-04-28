import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import { rootDomain } from "#/lib/consts";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { subdomainFormSchema } from "#/lib/schemas";

export function SubdomainForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      subdomain: "",
    },
    validators: {
      onSubmit: subdomainFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
  });
  return (
    <form
      id="subdomain-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  placeholder="Enter your name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="subdomain">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Subdomain</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    placeholder="Enter your subdomain"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>.{rootDomain}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting, s.isPristine] as const}
        >
          {([canSubmit, isSubmitting, isPristine]) => (
            <Button
              disabled={!canSubmit || isSubmitting || isPristine}
              form="subdomain-form"
            >
              {isSubmitting ? "Creating..." : "Create Subdomain"}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}

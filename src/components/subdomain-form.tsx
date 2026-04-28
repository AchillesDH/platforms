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
import { useServerFn } from "@tanstack/react-start";
import { createSubdomainFn } from "#/server/functions/subdomain";

export function SubdomainForm() {
  const $fn = useServerFn(createSubdomainFn);
  const form = useForm({
    defaultValues: {
      name: "",
      subdomain: "",
    },
    validators: {
      onSubmit: subdomainFormSchema,
    },
    onSubmit: async ({ value }) => {
      toast.promise($fn({ data: value }), {
        loading: "Creating subdomain...",
        success: "Subdomain created!",
        error: (e) => `Failed to create subdomain: ${e.message}`
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
          selector={(s) => [s.canSubmit, s.isSubmitting, s.isPristine]}
        >
          {([canSubmit, isSubmitting, isPristine]) => (
            <Button
              type="submit"
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

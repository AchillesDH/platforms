import { deleteSubdomainFn } from "@/server/functions/subdomain";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteSubdomainMutationOptions } from "@/lib/queries";

type Props = {
  subdomain: string;
};

export function DeleteTenantDialog({ subdomain }: Props) {
  const mutation = useMutation(deleteSubdomainMutationOptions());

  const handleDelete = () => {
    toast.promise(
      mutation.mutateAsync({
        data: {
          subdomain,
        },
      }),
      {
        loading: "Deleting tenant...",
        success: "Tenant has been deleted.",
        error: (e) => `Failed to delete tenant: ${e.message}`,
      },
    );
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" size={"icon-sm"}>
            <HugeiconsIcon icon={Delete01Icon} />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <HugeiconsIcon icon={Delete01Icon} />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete tenant?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this tenant.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

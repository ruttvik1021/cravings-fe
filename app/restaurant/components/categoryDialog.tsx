import { FormField } from "@/components/textfield";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { Control } from "react-hook-form";

// onOpenChange(open) =>
//     setDialogState((prev) => ({
//       ...prev,
//       category: { ...prev.category, open },
//     }))

const CategoryDialog = ({
  onSubmit,
  open,
  setOpen,
  control,
  isEdit,
  isPending,
  isDeletingCategory,
  onDelete,
}: {
  onSubmit: () => void;
  open: boolean;
  setOpen: () => void;
  control: Control<any>;
  isEdit: boolean;
  isPending: boolean;
  isDeletingCategory: boolean;
  onDelete: () => void;
}) => {
  console.log("control", control);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={setOpen} variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit" : "Add"} Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField
              control={control}
              name="name"
              label="Category Name"
              required
            />
            <FormField
              control={control}
              name="description"
              label="Description"
              type="textarea"
            />
          </div>
          <DialogFooter className="flex justify-between items-center">
            {isEdit && (
              <Button
                type="button"
                loading={isDeletingCategory}
                onClick={onDelete}
                variant="destructive"
              >
                Delete Category
              </Button>
            )}
            <Button type="submit" loading={isPending}>
              {isEdit ? "Update" : "Save"} Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;

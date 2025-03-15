import React from "react";
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
import { Control, Controller } from "react-hook-form";
import FileUpload from "@/components/fileupload";
import { ControlledSelect } from "@/components/controlled-select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const MenuItemDialog = ({
  onSubmit,
  open,
  setOpen,
  control,
  isEdit,
  isPending,
  isDeletingMenuItem,
  categories = [],
  onDelete,
}: {
  onSubmit: () => void;
  open: boolean;
  setOpen: () => void;
  control: Control<any>;
  isEdit: boolean;
  isPending: boolean;
  isDeletingMenuItem: boolean;
  categories: Category[];
  onDelete: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={setOpen}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Update" : "Add"} Menu Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => (
                <FileUpload
                  label="Item Image"
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                  accept="image/*"
                  value={field.value ? Array.from(field.value) : []}
                />
              )}
            />
            <FormField
              control={control}
              name="name"
              label="Menu Name"
              required
            />
            <FormField
              control={control}
              name="description"
              label="Description"
              type="textarea"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="price"
                label="Price (₹)"
                type="number"
                required
              />
              <ControlledSelect
                control={control}
                name="category"
                label={"Category"}
                options={categories.map((category: Category) => ({
                  label: category.name,
                  value: category._id,
                }))}
              />
            </div>
            <Controller
              name="isAvailable"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label>Available for Order</Label>
                </div>
              )}
            />
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label>Is Featured ?</Label>
                </div>
              )}
            />
          </div>
          <DialogFooter className="flex justify-between items-center">
            {isEdit && (
              <Button
                type="button"
                loading={isDeletingMenuItem}
                onClick={onDelete}
                variant="destructive"
              >
                Delete Menu Item
              </Button>
            )}
            <Button type="submit" loading={isPending}>
              {isEdit ? "Update" : "Add"} Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;

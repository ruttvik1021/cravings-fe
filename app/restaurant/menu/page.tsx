"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";

// Add these imports
import {
  getCategories,
  // createMenuItem,
  createCategory,
} from "../apis/restaurants";
import PageHeader from "@/components/pageHeader";
import { Tabs } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TextField from "@/components/textfield";

// Zod Schemas
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

export type CreateCategoryForm = z.infer<typeof categorySchema>;

const menuItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price must be at least ₹1"),
  category: z.string().min(1, "Category is required"),
  image: z.instanceof(FileList).optional(),
  isAvailable: z.boolean().default(true),
});

export type AddMenuItemForm = z.infer<typeof menuItemSchema>;

export default function RestaurantMenuPage() {
  const queryClient = useQueryClient();

  // Fetch categories
  // const { data: categories = [] } = useQuery({
  //   queryKey: ["menuCategories"],
  //   // queryFn: getCategories,
  //   queryFn: () => {},
  // });

  // Category Form
  const {
    control: categoryForm,
    formState: { errors: categoryErrors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  // Menu Item Form
  const {
    control: itemForm,
    reset: resetCategoryForm,
    formState: { errors: itemFormError },
  } = useForm({
    resolver: zodResolver(menuItemSchema),
    defaultValues: { isAvailable: true },
  });

  // Create Category Mutation
  const { nutate: createCategoryMutation, isLoading: isCreatingCategory } =
    useMutation({
      mutationFn: (data: CreateCategoryForm) => createCategory(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuCategories"] });
        toast.success("Category created successfully");
        resetCategoryForm();
      },
      onError: (error) => toast.error(error.message),
    });

  // Create Menu Item Mutation
  const createMenuItemMutation = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      toast.success("Menu item created successfully");
      itemForm.reset();
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div>
      <PageHeader title={"Menu Management"} />

      {/* <Tabs defaultValue={categories[0]?.id} className="space-y-4"> */}
      <div className="flex items-center justify-between">
        {/* Add Category Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={categoryForm.handleSubmit(createCategoryMutation)}>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category to organize your menu items
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Controller
                  name="name"
                  control={categoryForm}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      label="Category Name"
                      name="name"
                      value={field.value}
                      onChange={field.onChange}
                      error={categoryErrors.name?.message as string}
                      required
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={categoryForm}
                  render={({ field }) => (
                    <TextField
                      type="textarea"
                      label="Description (Optional)"
                      name="description"
                      value={field.value}
                      onChange={field.onChange}
                      error={categoryErrors.description?.message as string}
                    />
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save Category</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Menu Item Dialog */}
        {/* <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <FormProvider {...itemForm}>
                <form
                  onSubmit={itemForm.handleSubmit(
                    createMenuItemMutation.mutate
                  )}
                >
                  <DialogHeader>
                    <DialogTitle>Add Menu Item</DialogTitle>
                    <DialogDescription>
                      Add a new item to your menu. Fill in all the details
                      below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Controller
                      name="name"
                      control={itemForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Item Name"
                          error={fieldState.error?.message}
                          required
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="description"
                      control={itemForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Description"
                          as="textarea"
                          error={fieldState.error?.message}
                          required
                          {...field}
                        />
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="price"
                        control={itemForm.control}
                        render={({ field, fieldState }) => (
                          <TextField
                            label="Price (₹)"
                            type="number"
                            step="0.01"
                            error={fieldState.error?.message}
                            required
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        )}
                      />
                      <Controller
                        name="category"
                        control={itemForm.control}
                        render={({ field, fieldState }) => (
                          <div className="grid gap-2">
                            <Label>Category</Label>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <span className="text-sm text-destructive">
                                {fieldState.error.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <Controller
                      name="image"
                      control={itemForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Item Image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files)}
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                    <Controller
                      name="isAvailable"
                      control={itemForm.control}
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
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      loading={createMenuItemMutation.isPending}
                    >
                      Save Item
                    </Button>
                  </DialogFooter>
                </form>
              </FormProvider>
            </DialogContent>
          </Dialog> */}
      </div>

      {/* Categories Tabs */}
      {/* {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            </div>
          </TabsContent>
        ))} */}
      {/* </Tabs> */}
    </div>
  );
}

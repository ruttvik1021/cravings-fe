"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Add these imports
import FileUpload from "@/components/fileupload";
import PageHeader from "@/components/pageHeader";
import TextField from "@/components/textfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Edit, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  addMenuItem,
  // createMenuItem,
  createCategory,
  getCategories,
  getMenuItems,
  toggleAvailablityOfMenuItem,
  updateCategory,
  updateMenuItem,
} from "../apis/restaurants";
import { urlToFile } from "@/app/utils";

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
  isFeatured: z.boolean().default(false),
});

export type AddMenuItemForm = z.infer<typeof menuItemSchema>;

export default function RestaurantMenuPage() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isMenuItemDialogOpen, setIsMenuItemDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | number>("");

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const resetEditCategoryState = () => {
    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };
  const resetEditAddMenuState = () => {
    setIsMenuItemDialogOpen(false);
    setEditingMenuItem(null);
  };

  const handleAddMenuItem = () => {
    setEditingMenuItem(null);
    setIsMenuItemDialogOpen(true);
  };

  const handleEditMenuItem = async (item: MenuItem) => {
    setSelectedCategory(item.category);
    setEditingMenuItem(item);
    setIsMenuItemDialogOpen(true);

    // Destructure item to separate the image
    const { image, ...rest } = item;

    // Create a copy of the item for form values
    const formValues: AddMenuItemForm = { ...rest, image: undefined }; // Only spread the rest of the properties and add image property

    // Check if image exists and is a valid string (e.g., URL)
    if (image && typeof image === "string") {
      try {
        // Convert the image URL to a file if it's a valid URL
        const logoFile = await urlToFile(image, "logo.jpg");

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(logoFile);

        // FileList is expected for the formValues.image property
        formValues.image = dataTransfer.files; // Set the FileList here
      } catch (error) {
        console.error("Error converting image URL to file:", error);
        // Handle error gracefully (e.g., provide a fallback)
      }
    }

    // Reset the form with the updated form values
    resetMenuItemForm(formValues);
  };

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["menuCategories"],
    queryFn: () => getCategories(),
  });

  const { data: menuItems } = useQuery({
    queryKey: ["menuItems"],
    queryFn: async () => {
      const items = await getMenuItems();

      items.data?.forEach((item: MenuItem) => {
        queryClient.setQueryData(["menuItem", item._id], item);
      });

      return items;
    },
  });

  // Category Form
  const {
    control: categoryForm,
    handleSubmit: handleCategorySubmit,
    reset: resetCategoryForm,
  } = useForm<CreateCategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Menu Item Form
  const {
    control: itemForm,
    handleSubmit: handleMenuItemSubmit,
    reset: resetMenuItemForm,
  } = useForm<AddMenuItemForm>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      image: undefined,
      isAvailable: true,
      isFeatured: false,
    },
  });

  // Create Category Mutation
  const { mutate: createCategoryMutation, isPending: isCreatingCategory } =
    useMutation({
      mutationFn: (data: CreateCategoryForm) => createCategory(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuCategories"] });
        toast.success("Category created successfully");
        resetCategoryForm();
        resetEditAddMenuState();
      },
      onError: (error) => toast.error(error.message),
    });

  const { mutate: updateCategoryMutation, isPending: isUpdatingCategory } =
    useMutation({
      mutationFn: (data: CreateCategoryForm) =>
        updateCategory(data, editingCategory?._id || ""),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuCategories"] });
        toast.success("Category updated successfully");
        resetEditCategoryState();
        resetEditAddMenuState();
      },
      onError: (error) => toast.error(error.message),
    });

  // Create Menu Item Mutation
  const { mutate: createMenuItemMutation, isPending: isAddingMenuItem } =
    useMutation({
      mutationFn: (data: AddMenuItemForm) => addMenuItem(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuItems"] });
        toast.success("Menu item created successfully");
        resetMenuItemForm();
      },
      onError: (error) => toast.error(error.message),
    });
  const { mutate: updateMenuItemMutation, isPending: isUpdatingMenuItem } =
    useMutation({
      mutationFn: (data: AddMenuItemForm) =>
        updateMenuItem(data, editingMenuItem?._id || ""),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuItems"] });
        toast.success("Menu item created successfully");
        resetMenuItemForm();
      },
      onError: (error) => toast.error(error.message),
    });

  const { mutate: handleToggleItemAvailability } = useMutation({
    mutationFn: (data: MenuItem) =>
      toggleAvailablityOfMenuItem(data._id, !data.isAvailable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      toast.success("Menu item updated successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div>
      <PageHeader title={"Menu Management"} />

      <div className="flex items-center justify-between">
        {/* Add Category Dialog */}
        <Dialog
          open={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
        >
          <DialogTrigger asChild>
            <Button onClick={handleAddCategory}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent onClose={resetEditCategoryState}>
            <form
              onSubmit={handleCategorySubmit((data) =>
                editingCategory
                  ? updateCategoryMutation(data)
                  : createCategoryMutation(data)
              )}
            >
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Edit" : "Add New"} Category
                </DialogTitle>
                {editingCategory && (
                  <DialogDescription>
                    Create a new category to organize your menu items
                  </DialogDescription>
                )}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Controller
                  name="name"
                  control={categoryForm}
                  render={({ field, fieldState }) => (
                    <TextField
                      type="text"
                      label="Category Name"
                      name="name"
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={categoryForm}
                  render={({ field, fieldState }) => (
                    <TextField
                      type="textarea"
                      label="Description (Optional)"
                      name="description"
                      value={field.value ? field.value : ""}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  loading={isCreatingCategory || isUpdatingCategory}
                >
                  {editingCategory ? "Update" : "Save"} Category
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Menu Item Dialog */}
        <Dialog
          open={isMenuItemDialogOpen}
          onOpenChange={setIsMenuItemDialogOpen}
        >
          <DialogTrigger asChild>
            <Button onClick={handleAddMenuItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <form
              onSubmit={handleMenuItemSubmit((data) =>
                editingMenuItem
                  ? updateMenuItemMutation(data)
                  : createMenuItemMutation(data)
              )}
            >
              <DialogHeader>
                <DialogTitle>
                  {editingMenuItem ? "Update" : "Add"} Menu Item
                </DialogTitle>
                {editingMenuItem ? (
                  <></>
                ) : (
                  <DialogDescription>
                    Add a new item to your menu. Fill in all the details below.
                  </DialogDescription>
                )}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Controller
                  name="image"
                  control={itemForm}
                  render={({ field, fieldState }) => (
                    <FileUpload
                      label="Item Image"
                      error={fieldState.error?.message}
                      onChange={(e) => field.onChange(e)}
                      required
                      accept="image/*"
                      name="image"
                      value={field.value ? Array.from(field.value) : []}
                    />
                  )}
                />
                <Controller
                  name="name"
                  control={itemForm}
                  render={({ field, fieldState }) => (
                    <TextField
                      type="text"
                      label="Menu Name"
                      name="name"
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={itemForm}
                  render={({ field, fieldState }) => (
                    <TextField
                      type="textarea"
                      label="Description"
                      name="description"
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                      required
                    />
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="price"
                    control={itemForm}
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Price (₹)"
                        type="number"
                        name="price"
                        value={field.value}
                        error={fieldState.error?.message}
                        onChange={field.onChange}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="category"
                    control={itemForm}
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
                            {categories?.data.map((category: Category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
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
                  name="isAvailable"
                  control={itemForm}
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
                  control={itemForm}
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
              <DialogFooter>
                <Button
                  type="submit"
                  loading={isAddingMenuItem || isUpdatingMenuItem}
                >
                  {editingMenuItem ? "Update" : "Add"} Item
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {categories?.data.length ? (
        <>
          <TextField
            type={"search"}
            name={"search"}
            value={searchTerm}
            onChange={(value: string | number) => {
              setSearchTerm(value);
            }}
            className="mt-3"
            placeholder="Search Category or menu item"
          />
          <div className="relative mt-3">
            <ScrollArea className="w-full whitespace-nowrap rounded-md p-0">
              <div className="flex w-max space-x-4 p-4">
                {categories?.data
                  .filter((category: Category) =>
                    category.name.toLowerCase().includes(String(searchTerm))
                  )
                  .map((category: Category) => (
                    <Card
                      key={category._id}
                      className={`w-[250px] shrink-0 cursor-pointer transition-all hover:shadow-md`}
                      // onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="relative h-32 w-full">
                        <Image
                          src={
                            menuItems?.data.find(
                              (item: MenuItem) => item.category === category._id
                            )?.image || "/placeholder.svg"
                          }
                          alt={category.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                        <div className="absolute bottom-0 left-0 p-3 text-white">
                          <h3 className="font-semibold text-lg">
                            {category.name}
                          </h3>
                          <p className="text-xs text-white/80">0 items</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            categoryForm._reset(category);
                            handleEditCategory(category);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {menuItems?.data
          .filter((menuItem: MenuItem) =>
            menuItem.name.toLowerCase().includes(String(searchTerm))
          )
          .map((item: MenuItem) => (
            <>
              <Card
                key={item._id}
                className={!item.isAvailable ? "opacity-60" : ""}
              >
                <div className="flex p-4">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden">
                    <Image
                      src={item.image || ""}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>

                        {item.isFeatured && (
                          <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`available-${item._id}`}
                          checked={item.isAvailable}
                          onCheckedChange={() =>
                            handleToggleItemAvailability(item)
                          }
                        />
                        <Label
                          htmlFor={`available-${item._id}`}
                          className="text-sm"
                        >
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </Label>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditMenuItem(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          ))}
      </div>
    </div>
  );
}

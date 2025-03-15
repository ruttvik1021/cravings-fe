"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Components
import PageHeader from "@/components/pageHeader";
import { TextField } from "@/components/textfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

// API
import { urlToFile } from "@/app/utils";
import {
  addMenuItem,
  createCategory,
  deleteCategory,
  deleteMenuItem,
  getCategories,
  getMenuItems,
  toggleAvailablityOfMenuItem,
  updateCategory,
  updateMenuItem,
} from "../apis/restaurants";
import CategoryDialog from "../components/categoryDialog";
import MenuItemDialog from "../components/menuItemDialog";

// Types
interface Category {
  _id: string;
  name: string;
  description?: string;
  menuItemCount?: number;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  isFeatured: boolean;
}

// Zod Schemas
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

const menuItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val), // Convert string to number if necessary
    z.number().min(1, "Price must be at least ₹1")
  ),
  category: z.string().min(1, "Category is required"),
  image:
    typeof window !== "undefined" ? z.instanceof(FileList).optional() : z.any(),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export type CreateCategoryForm = z.infer<typeof categorySchema>;
export type AddMenuItemForm = z.infer<typeof menuItemSchema>;

const defaultCategoryForm = {
  name: "",
  description: "",
};

const defaultMenuItemForm = {
  name: "",
  description: "",
  price: 0,
  category: "",
  image: undefined,
  isAvailable: true,
  isFeatured: false,
};

export default function RestaurantMenuPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dialogState, setDialogState] = useState<{
    category: { open: boolean; data: Category | null };
    menuItem: { open: boolean; data: MenuItem | null };
  }>({
    category: { open: false, data: null },
    menuItem: { open: false, data: null },
  });

  // Queries
  const { data: categories } = useQuery({
    queryKey: ["menuCategories"],
    queryFn: getCategories,
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

  // Memoized Data
  const filteredCategories = useMemo(
    () =>
      categories?.data.filter((c: Category) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [],
    [categories, searchTerm]
  );

  const filteredMenuItems = useMemo(
    () =>
      menuItems?.data.filter((item: MenuItem) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [],
    [menuItems, searchTerm]
  );

  // Form Hooks
  const categoryForm = useForm<CreateCategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultCategoryForm,
  });

  const itemForm = useForm<AddMenuItemForm>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: defaultMenuItemForm,
  });

  // Mutations
  const { mutate: handleCategoryMutation, isPending: isCategoryPending } =
    useMutation({
      mutationFn: (data: CreateCategoryForm) =>
        dialogState.category.data
          ? updateCategory(data, dialogState.category.data._id)
          : createCategory(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuCategories"] });
        toast.success(
          `Category ${
            dialogState.category.data ? "updated" : "created"
          } successfully`
        );
        setDialogState((prev) => ({
          ...prev,
          category: { open: false, data: null },
        }));
        categoryForm.reset(defaultCategoryForm);
      },
      onError: (error: Error) => toast.error(error.message),
    });

  const { mutate: handleDeleteCategory, isPending: isDeletingCategory } =
    useMutation({
      mutationFn: () => deleteCategory(dialogState.category.data?._id || ""),
      onSuccess: () => {
        queryClient.setQueryData(["menuCategories"], (old: any) => ({
          ...old,
          data: old.data.filter(
            (i: MenuItem) => i._id !== dialogState.category.data?._id
          ),
        }));
        toast.success(`Category ${dialogState.category.data?.name} deleted`);
        setDialogState((prev) => ({
          ...prev,
          category: { open: false, data: null },
        }));
      },
    });
  const { mutate: handleMenuItemDelete, isPending: isDeletingMenuItem } =
    useMutation({
      mutationFn: () => deleteMenuItem(dialogState.menuItem.data?._id || ""),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuCategories"] });
        queryClient.setQueryData(["menuItems"], (old: any) => ({
          ...old,
          data: old.data.filter(
            (i: MenuItem) => i._id !== dialogState.menuItem.data?._id
          ),
        }));
        toast.success(`Menu Item ${dialogState.menuItem.data?.name} deleted`);
        setDialogState((prev) => ({
          ...prev,
          menuItem: { open: false, data: null },
        }));
      },
    });

  const { mutate: handleMenuItemMutation, isPending: isMenuItemPending } =
    useMutation({
      mutationFn: (data: AddMenuItemForm) =>
        dialogState.menuItem.data
          ? updateMenuItem(data, dialogState.menuItem.data._id)
          : addMenuItem(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuItems"] });
        queryClient.invalidateQueries({ queryKey: ["menuCategories"] });
        toast.success(
          `Menu item ${
            dialogState.menuItem.data ? "updated" : "created"
          } successfully`
        );
        setDialogState((prev) => ({
          ...prev,
          menuItem: { open: false, data: null },
        }));
        itemForm.reset(defaultMenuItemForm);
      },
      onError: (error: Error) => toast.error(error.message),
    });

  const { mutate: handleToggleAvailability } = useMutation({
    mutationFn: async (item: MenuItem) => {
      const prevState = item.isAvailable;
      queryClient.setQueryData(["menuItems"], (old: any) => ({
        ...old,
        data: old.data.map((i: MenuItem) =>
          i._id === item._id ? { ...i, isAvailable: !prevState } : i
        ),
      }));
      await toggleAvailablityOfMenuItem(item._id, !prevState);
      return prevState;
    },
    onError(error, variables, context) {
      queryClient.setQueryData(["menuItems"], (old: any) => ({
        ...old,
        data: old.data.map((i: MenuItem) =>
          i._id === variables._id ? { ...i, isAvailable: context } : i
        ),
      }));
      toast.error(error.message);
    },
  });

  // Handlers
  const handleEditMenuItem = useCallback(
    async (item: MenuItem) => {
      const { image, ...rest } = item;
      const formValues: AddMenuItemForm = { ...rest, image: undefined };

      if (image && typeof image === "string") {
        try {
          const logoFile = await urlToFile(image, "logo.jpg");
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(logoFile);
          formValues.image = dataTransfer.files;
        } catch (error) {
          console.error("Error converting image:", error);
        }
      }

      itemForm.reset(formValues);
      setDialogState((prev) => ({
        ...prev,
        menuItem: { open: true, data: item },
      }));
    },
    [itemForm]
  );

  const CategoryImage = memo(({ category }: { category: Category }) => {
    const imageSrc = useMemo(
      () =>
        menuItems?.data.find((item: MenuItem) => item.category === category._id)
          ?.image || "/placeholder.svg",
      [category._id, menuItems?.data]
    );

    return (
      <div className="relative h-32 w-full">
        <Image
          src={imageSrc}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 250px"
          className="object-cover rounded-lg"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="font-semibold text-lg">{category.name}</h3>
          <p className="text-xs text-white/80">
            {category.menuItemCount || 0} items
          </p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <PageHeader title="Menu Management" />

      <div className="flex items-center justify-end gap-4 mt-3">
        <TextField
          type="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Category or menu item"
        />

        <CategoryDialog
          control={categoryForm.control}
          onSubmit={categoryForm.handleSubmit((data) =>
            handleCategoryMutation(data)
          )}
          open={dialogState.category.open}
          setOpen={() => {
            setDialogState((prev) => ({
              ...prev,
              category: { data: null, open: !dialogState.category.open },
            }));
            categoryForm.reset(defaultCategoryForm);
          }}
          onDelete={handleDeleteCategory}
          isEdit={!!dialogState.category.data}
          isPending={isCategoryPending}
          isDeletingCategory={isDeletingCategory}
        />

        {/* Menu Item Dialog */}
        <MenuItemDialog
          categories={categories?.data}
          control={itemForm.control}
          onSubmit={itemForm.handleSubmit((data) =>
            handleMenuItemMutation(data)
          )}
          open={dialogState.menuItem.open}
          setOpen={() => {
            setDialogState((prev) => ({
              ...prev,
              menuItem: { data: null, open: !dialogState.menuItem.open },
            }));
            itemForm.reset(defaultMenuItemForm);
          }}
          isEdit={!!dialogState.menuItem.data}
          isPending={isMenuItemPending}
          isDeletingMenuItem={isDeletingMenuItem}
          onDelete={handleMenuItemDelete}
        />
      </div>

      {filteredCategories.length > 0 && (
        <>
          <div className="mt-3">
            <ScrollArea className="w-full whitespace-nowrap rounded-md p-0">
              <div className="flex w-max space-x-4 p-4">
                {filteredCategories.map((category: Category) => (
                  <Card
                    key={category._id}
                    className="relative w-[250px] shrink-0 cursor-pointer transition-all hover:shadow-md"
                  >
                    <CategoryImage category={category} />
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white"
                        onClick={() => {
                          categoryForm.reset(category);
                          setDialogState((prev) => ({
                            ...prev,
                            category: { open: true, data: category },
                          }));
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {filteredMenuItems.map((item: MenuItem) => (
          <Card
            key={item._id}
            className={!item.isAvailable ? "opacity-60" : ""}
          >
            <div className="flex p-4">
              <div className="relative h-24 w-24 rounded-md overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 96px"
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
                  <p className="font-medium">₹{item.price.toFixed(2)}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={item.isAvailable}
                      onCheckedChange={() => handleToggleAvailability(item)}
                    />
                    <Label className="text-sm">
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
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

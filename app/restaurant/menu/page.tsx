import Image from "next/image";
import { Edit, Package, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function RestaurantMenuPage() {
  const navItems = [
    {
      title: "Dashboard",
      href: "/restaurant/dashboard",
      icon: Package,
    },
    {
      title: "Orders",
      href: "/restaurant/orders",
      icon: Package,
    },
    {
      title: "Menu",
      href: "/restaurant/menu",
      icon: Package,
    },
    {
      title: "Financials",
      href: "/restaurant/financials",
      icon: Package,
    },
  ];

  // Mock menu categories and items
  const menuCategories = [
    {
      id: "burgers",
      name: "Burgers",
      items: [
        {
          id: 1,
          name: "Classic Cheeseburger",
          description:
            "Beef patty with cheddar cheese, lettuce, tomato, and special sauce",
          price: 8.99,
          image: "/placeholder.svg?height=100&width=100",
          available: true,
        },
        {
          id: 2,
          name: "Double Bacon Burger",
          description: "Two beef patties with bacon, cheese, and BBQ sauce",
          price: 12.99,
          image: "/placeholder.svg?height=100&width=100",
          available: true,
        },
        {
          id: 3,
          name: "Veggie Burger",
          description:
            "Plant-based patty with avocado, lettuce, and vegan mayo",
          price: 9.99,
          image: "/placeholder.svg?height=100&width=100",
          available: false,
        },
      ],
    },
    {
      id: "sides",
      name: "Sides",
      items: [
        {
          id: 4,
          name: "French Fries",
          description: "Crispy golden fries with sea salt",
          price: 3.99,
          image: "/placeholder.svg?height=100&width=100",
          available: true,
        },
        {
          id: 5,
          name: "Onion Rings",
          description: "Crispy battered onion rings",
          price: 4.99,
          image: "/placeholder.svg?height=100&width=100",
          available: true,
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          id: 6,
          name: "Milkshake",
          description: "Creamy vanilla, chocolate, or strawberry",
          price: 5.99,
          image: "/placeholder.svg?height=100&width=100",
          available: true,
        },
        {
          id: 7,
          name: "Soft Drink",
          description: "Cola, lemon-lime, or orange soda",
          price: 2.99,
          image: "/placeholder.svg?height=100&width=100",
          available: true,
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category to organize your menu items
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    placeholder="e.g., Appetizers, Desserts"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category-description">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="category-description"
                    placeholder="Describe this category..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue={menuCategories[0].id} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              {menuCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add Menu Item</DialogTitle>
                  <DialogDescription>
                    Add a new item to your menu. Fill in all the details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input id="item-name" placeholder="e.g., Deluxe Burger" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="item-description">Description</Label>
                    <Textarea
                      id="item-description"
                      placeholder="Describe this item..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="item-price">Price ($)</Label>
                      <Input
                        id="item-price"
                        type="number"
                        step="0.01"
                        placeholder="9.99"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="item-category">Category</Label>
                      <Select>
                        <SelectTrigger id="item-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {menuCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="item-image">Item Image</Label>
                    <Input id="item-image" type="file" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="item-available" defaultChecked />
                    <Label htmlFor="item-available">Available for Order</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {menuCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <Card
                    key={item.id}
                    className={!item.available ? "opacity-60" : ""}
                  >
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription className="mt-1">
                          ${item.price.toFixed(2)}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="flex items-center mt-4 space-x-2">
                            <Switch
                              id={`available-${item.id}`}
                              checked={item.available}
                            />
                            <Label
                              htmlFor={`available-${item.id}`}
                              className="text-sm"
                            >
                              {item.available ? "Available" : "Unavailable"}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}

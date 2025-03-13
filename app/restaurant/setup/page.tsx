"use client";

import ErrorMessage from "@/components/errorMessage";
import FileUpload from "@/components/fileupload";
import TextField from "@/components/textfield";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { setupRestaurantApi } from "../apis/restaurants";

// Zod schema for validation
const restaurantSetupSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  restaurantType: z.string().min(1, "Restaurant type is required"),
  foodCategory: z.string().min(1, "Food category is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(1, "Pincode is required"),
  branchNumber: z.string().optional(),
  logo: z
    .instanceof(FileList, { message: "Please upload at least one image" })
    .refine((files) => files.length > 0, "Logo is required")
    .refine((files) => files[0].size <= 5_000_000, "Max file size is 5MB"),
  images: z
    .instanceof(FileList, { message: "Please upload at least one image" })
    .refine((files) => files.length <= 5, "Maximum 5 images allowed")
    .refine(
      (files) => Array.from(files).every((file) => file.size <= 5_000_000),
      "Max file size is 5MB"
    ),
  openingTime: z.string().min(1, "Opening time is required"),
  closingTime: z.string().min(1, "Closing time is required"),
});

export type RestaurantSetupFormData = z.infer<typeof restaurantSetupSchema>;

export default function RestaurantSetupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantSetupFormData>({
    resolver: zodResolver(restaurantSetupSchema),
  });

  const { mutate: setupRestaurant, isPending } = useMutation({
    mutationFn: async (data: RestaurantSetupFormData) =>
      setupRestaurantApi(data),
    onSuccess: () => router.push("/dashboard"),
    onError: (error) => setError(error.message),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Restaurant Setup</CardTitle>
          <CardDescription>
            Complete your restaurant profile to start receiving orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) => setupRestaurant(data))}
            className="grid gap-6"
          >
            {/* Restaurant Name */}
            <Controller
              name="restaurantName"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  label="Restaurant Name"
                  name="restaurantName"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.restaurantName?.message}
                  required
                />
              )}
            />

            {/* Restaurant Type and Food Category */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="restaurantType"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label>Restaurant Type</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fast-food">Fast Food</SelectItem>
                        <SelectItem value="casual-dining">
                          Casual Dining
                        </SelectItem>
                        <SelectItem value="fine-dining">Fine Dining</SelectItem>
                        <SelectItem value="cafe">Café</SelectItem>
                        <SelectItem value="food-truck">Food Truck</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.restaurantType && (
                      <span className="text-sm text-destructive">
                        {errors.restaurantType.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="foodCategory"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label>Food Category</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="thai">Thai</SelectItem>
                        <SelectItem value="mediterranean">
                          Mediterranean
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.foodCategory && (
                      <span className="text-sm text-destructive">
                        {errors.foodCategory.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  type="textarea"
                  label="Description"
                  name="description"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.description?.message}
                  required
                />
              )}
            />

            {/* Address */}
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  label="Address"
                  name="address"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.address?.message}
                  required
                />
              )}
            />

            {/* City and Pincode */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    label="City"
                    name="city"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.city?.message}
                    required
                  />
                )}
              />

              <Controller
                name="pincode"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    label="Pincode"
                    name="pincode"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.pincode?.message}
                    required
                  />
                )}
              />
            </div>

            {/* Logo */}
            <Controller
              name="logo"
              control={control}
              render={({ field }) => (
                <FileUpload
                  label="Restaurant Logo"
                  error={errors.logo?.message}
                  onChange={(e) => field.onChange(e)}
                  required
                  accept="image/*"
                  name="logo"
                />
              )}
            />

            {/* Images */}
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <FileUpload
                  label="Restaurant Images"
                  error={errors.images?.message}
                  onChange={(e) => field.onChange(e)}
                  accept="image/*"
                  required
                  multiple
                  name="images"
                />
              )}
            />

            {/* Opening and Closing Time */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="openingTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="time"
                    label="Opening Time"
                    name="openingTime"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.openingTime?.message}
                    required
                  />
                )}
              />

              <Controller
                name="closingTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="time"
                    label="Closing Time"
                    name="closingTime"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.closingTime?.message}
                    required
                  />
                )}
              />
            </div>

            {/* Global Error Message */}
            {error && <ErrorMessage message={error} />}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Submitting..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

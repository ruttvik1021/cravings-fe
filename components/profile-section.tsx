"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/authContext";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "./textfield";
import { Button } from "./ui/button";
import { getUserDetails, updateProfileApi } from "@/app/commonAPIs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Label } from "./ui/label";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(25, "Name must be less than 25 characters"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileSection = () => {
  const fileUpload = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  useLayoutEffect(() => {
    if (userData?.data) {
      reset({
        name: userData.data.name || "",
      });
    }
  }, [userData, reset]);

  // Name update mutation
  const { mutate: updateName, isPending: isUpdatingName } = useMutation({
    mutationFn: async (data: { name: string }) => updateProfileApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      setIsEditMode(false);
    },
  });

  // Profile Photo update mutation
  const { mutate: updateProfilePhoto, isPending: isUploadingPhoto } =
    useMutation({
      mutationFn: async (data: { profilePhoto: FileList }) => {
        return updateProfileApi(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userDetails"] });
        if (fileUpload.current) {
          fileUpload.current = null;
        }
      },
    });

  // Handle name update
  const handleNameSubmit = (data: { name: string }) => {
    updateName({ name: data.name });
  };

  // Handle profile photo update
  const handleProfilePhotoChange = async (e: FileList | null) => {
    e && updateProfilePhoto({ profilePhoto: e });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </div>
          {isEditMode ? (
            <Button
              onClick={() => {
                setIsEditMode(false);
                control._resetDefaultValues();
              }}
              variant="destructive"
            >
              Discard
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditMode(true)}
              className="bg-cerulean hover:bg-cerulean/90 text-white dark:bg-cerulean-dark dark:hover:bg-cerulean-dark/90"
            >
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Profile Photo Update */}
        <div className="flex flex-col md:flex-row gap-6 mt-3">
          <div className="flex flex-col items-center space-y-4 max-w-40">
            <div>
              <Label
                htmlFor="profile-photo"
                className="block text-sm font-medium"
              >
                Profile Photo
              </Label>
              <div
                className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-non-photo-blue dark:border-non-photo-blue-dark mt-2 cursor-pointer"
                onClick={() => fileUpload?.current?.click()}
              >
                <Image
                  src={user?.profilePhoto || "/placeholder.svg"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
                <input
                  ref={fileUpload}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleProfilePhotoChange(e.target.files)}
                />
                {isUploadingPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Name Update Form */}
          <div className="flex-1 space-y-4">
            <form onSubmit={handleSubmit(handleNameSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        type="text"
                        label="Name"
                        name="name"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        required
                        disabled={!isEditMode}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <TextField
                    type="email"
                    label="Email"
                    name="email"
                    value={user?.email || ""}
                    disabled
                    required
                    onChange={() => null}
                  />
                </div>
                <div className="space-y-2">
                  <TextField
                    type="tel"
                    label="Mobile Number"
                    name="phone"
                    value={user?.phone || ""}
                    disabled
                    required
                    onChange={() => null}
                  />
                </div>
              </div>

              {/* Save Name Button */}
              {isEditMode && (
                <div className="flex justify-end">
                  <Button
                    variant="default"
                    type="submit"
                    loading={isUpdatingName}
                    className="bg-cerulean hover:bg-cerulean/90 text-white dark:bg-cerulean-dark dark:hover:bg-cerulean-dark/90 mt-3"
                  >
                    {isUpdatingName ? "Saving..." : "Save Name"}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;

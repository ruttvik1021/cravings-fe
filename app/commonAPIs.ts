import { AjaxUtils } from "@/ajax/ajax";
import { ProfileFormData } from "@/components/profile-section";

export const getUserDetails = () => {
  const url = `/auth/profile`;
  return AjaxUtils.getAjax(url, true);
};

export const updateProfileApi = (value: {
  name?: string;
  profilePhoto?: FileList;
}) => {
  const formData = new FormData();

  Object.entries(value).forEach(([key, value]) => {
    if (key === "profilePhoto") return;
    if (typeof value === "string") formData.append(key, value);
  });

  value.profilePhoto &&
    Array.from(value.profilePhoto).forEach((file) => {
      formData.append("profilePhoto", file as File);
    });

  const url = `/auth/profile`;
  return AjaxUtils.putAjax(url, formData, true);
};

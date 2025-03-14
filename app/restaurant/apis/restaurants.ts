import { AjaxUtils } from "@/ajax/ajax";
import { RestaurantSetupFormData } from "../setup/page";
import { CreateCategoryForm } from "../menu/page";

export const restaurantSignUpApi = (
  values: RestaurantAndDeliveryAgentRegistration
) => {
  const url = "/auth/register/restaurant";

  const formData = new FormData();

  // Append all non-file fields dynamically
  for (const [key, value] of Object.entries(values)) {
    if (value) {
      // Check if the field is a file
      if (key === "profilePhoto" || key === "idCard") {
        formData.append(key, value as File);
      } else {
        formData.append(key, String(value)); // Convert non-file values to string
      }
    }
  }

  return AjaxUtils.postAjax(url, formData, false);
};

export const getRestaurantsDetails = () => {
  const url = "/restaurants/setup";
  return AjaxUtils.getAjax(url, true);
};

export const setupRestaurantApi = (data: RestaurantSetupFormData) => {
  const url = "/restaurants/setup";

  const formData = new FormData();

  // Append basic fields
  Object.entries(data).forEach(([key, value]) => {
    if (key === "logo" || key === "images") return;
    if (typeof value === "string") formData.append(key, value);
  });

  // Append files
  formData.append("logo", data.logo[0]);
  Array.from(data.images).forEach((file) => {
    formData.append("images", file);
  });
  return AjaxUtils.postAjax(url, formData, true);
};

export const getCategories = () => {
  const url = "/menu/categories";
  return AjaxUtils.getAjax(url, true);
};

export const createCategory = (data: CreateCategoryForm) => {
  const url = "/menu/category";
  return AjaxUtils.postAjax(url, data, true);
};
export const updateCategory = (data: CreateCategoryForm, id: string) => {
  const url = `/menu/category/${id}`;
  return AjaxUtils.putAjax(url, data, true);
};
export const deleteCategory = (id: string) => {
  const url = "/menu/category";
  return AjaxUtils.deleteAjax(url, true);
};

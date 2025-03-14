import { AjaxUtils } from "@/ajax/ajax";
import { RestaurantSetupFormData } from "../setup/page";
import { AddMenuItemForm, CreateCategoryForm } from "../menu/page";

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
    formData.append("images", file as File);
  });
  return AjaxUtils.postAjax(url, formData, true);
};

export const updateRestaurantApi = (
  data: RestaurantSetupFormData,
  id: string
) => {
  const url = `/restaurants/setup/${id}`;

  const formData = new FormData();

  // Append basic fields
  Object.entries(data).forEach(([key, value]) => {
    if (key === "logo" || key === "images") return;
    if (typeof value === "string") formData.append(key, value);
  });

  // Append files
  formData.append("logo", data.logo[0]);
  Array.from(data.images).forEach((file) => {
    formData.append("images", file as File);
  });
  return AjaxUtils.putAjax(url, formData, true);
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
  const url = `/menu/category/${id}`;
  return AjaxUtils.deleteAjax(url, true);
};

export const getMenuItems = () => {
  const url = "/menu/items";
  return AjaxUtils.getAjax(url, true);
};

export const addMenuItem = (data: AddMenuItemForm) => {
  const url = "/menu/item";

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "image") return;
    formData.append(key, String(value));
  });

  data.image && formData.append("image", data.image[0]);
  return AjaxUtils.postAjax(url, formData, true);
};
export const updateMenuItem = (data: AddMenuItemForm, id: string) => {
  const url = `/menu/item/${id}`;

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "image") return;
    formData.append(key, String(value));
  });

  data.image && formData.append("image", data.image[0]);
  return AjaxUtils.putAjax(url, formData, true);
};
export const deleteMenuItem = (id: string) => {
  const url = `/menu/item/${id}`;
  return AjaxUtils.deleteAjax(url, true);
};

export const toggleAvailablityOfMenuItem = (
  id: string,
  isAvailable: boolean
) => {
  const url = `/menu/item/available/${id}`;
  return AjaxUtils.putAjax(url, { isAvailable }, true);
};

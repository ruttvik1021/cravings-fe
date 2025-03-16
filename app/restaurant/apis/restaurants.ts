import { AjaxUtils } from "@/ajax/ajax";
import { RestaurantSetupFormData } from "../setup/page";
import { AddMenuItemForm, CreateCategoryForm } from "../menu/page";

export const restaurantSignUpApi = (
  data: RestaurantAndDeliveryAgentRegistration
) => {
  const url = "/auth/register/restaurant";

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "profilePhoto" || key === "idCard") return;
    if (typeof value === "string") formData.append(key, value);
  });

  Array.from(data.profilePhoto).forEach((file) => {
    formData.append("profilePhoto", file as File);
  });
  Array.from(data.idCard).forEach((file) => {
    formData.append("idCard", file as File);
  });

  return AjaxUtils.postAjax(url, formData, false);
};

export const getRestaurantsDetails = () => {
  const url = "/restaurants/setup/details";
  return AjaxUtils.getAjax(url, true);
};

export const setupRestaurantApi = (data: RestaurantSetupFormData) => {
  const url = "/restaurants/setup/details";

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "logo" || key === "images") return;
    if (typeof value === "string") formData.append(key, value);
  });

  Array.from(data.logo).forEach((file) => {
    formData.append("logo", file as File);
  });
  Array.from(data.images).forEach((file) => {
    formData.append("images", file as File);
  });
  return AjaxUtils.postAjax(url, formData, true);
};

export const updateRestaurantApi = (
  data: RestaurantSetupFormData,
  id: string
) => {
  const url = `/restaurants/setup/details/${id}`;

  const formData = new FormData();

  // Append basic fields
  Object.entries(data).forEach(([key, value]) => {
    if (key === "logo" || key === "images") return;
    if (typeof value === "string") formData.append(key, value);
  });

  Array.from(data.logo).forEach((file) => {
    formData.append("logo", file as File);
  });
  Array.from(data.images).forEach((file) => {
    formData.append("images", file as File);
  });
  return AjaxUtils.putAjax(url, formData, true);
};

export const getCategories = () => {
  const url = "/menu/categories/all";
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

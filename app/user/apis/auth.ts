import { AjaxUtils } from "../../../ajax/ajax";

export const userLoginApi = (values: UserLogin) => {
  const url = "/auth/login";
  return AjaxUtils.postAjax(url, values, false);
};

export const userSignUpApi = (values: UserRegistration) => {
  const url = "/auth/register/user";
  return AjaxUtils.postAjax(url, values, false);
};

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

export const deliveryAgentSignUpApi = (
  values: RestaurantAndDeliveryAgentRegistration
) => {
  const url = "/auth/register/delivery";
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

  // Send FormData (No need for JSON headers)
  return AjaxUtils.postAjax(url, formData, false);
};

import { AjaxUtils } from "../../../ajax/ajax";

export const userLoginApi = (values: UserLogin) => {
  const url = "/users/login";
  return AjaxUtils.postAjax(url, values, false);
};

export const userSignUpApi = (values: UserRegistration) => {
  const url = "/users/register";
  return AjaxUtils.postAjax(url, values, false);
};

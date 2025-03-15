import { AjaxUtils } from "@/ajax/ajax";

export const getRestaurantsDetails = (id: string) => {
  const url = `/restaurants/${id}`;
  return AjaxUtils.getAjax(url, true);
};

export const getRestaurantsList = () => {
  const url = `/restaurants`;
  return AjaxUtils.getAjax(url, true);
};

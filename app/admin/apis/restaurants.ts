import { AjaxUtils } from "@/ajax/ajax";

export const getRestaurants = () => {
  const url = "/restaurants/restaurant_owners";
  return AjaxUtils.getAjax(url, true);
};

export const getRestaurantsRequests = () => {
  const url = "/restaurants/restaurant_owners/requests";
  return AjaxUtils.getAjax(url, true);
};

export const approveRestaurantOwner = (id: string) => {
  const url = `/restaurants/${id}/approve`;
  return AjaxUtils.patchAjax(url, id, true);
};

export const rejectRestaurantOwner = (id: string) => {
  const url = `/restaurants/${id}/reject`;
  return AjaxUtils.patchAjax(url, id, true);
};

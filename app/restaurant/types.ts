interface Restaurant {
  _id: string;
  restaurantName: string;
  restaurantType: string;
  foodCategory: string;
  description: string;
  address: string;
  city: string;
  pincode: string;
  branchNumber?: string;
  logo: string;
  images: string[];
  openingTime: string;
  closingTime: string;
  owner: string;
  isApproved: boolean;
}
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  isFeatured: boolean;
}

interface Order {
  _id: string;
  items: Array<{
    item: MenuItem;
    quantity: number;
  }>;
  total: number;
  status: "pending" | "preparing" | "ready" | "picked-up" | "delivered";
  createdAt: Date;
  restaurant: Pick<Restaurant, "_id">;
}

interface Category {
  _id: string;
  name: string;
  description: string;
}

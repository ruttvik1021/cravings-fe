interface UserRegistration {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  pincode: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  role: "user";
}

interface Restaurant {
  _id: string;
  name: string;
  type: string;
  foodType: "veg" | "non-veg";
  address: string;
  rating: number;
  image: string;
  isOpen: boolean;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
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
  restaurant: Pick<Restaurant, "_id" | "name" | "address">;
}

interface UserRegistration {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  pincode: string;
}

interface RestaurantAndDeliveryAgentRegistration extends UserRegistration {
  profilePhoto: File;
  idCard: File;
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

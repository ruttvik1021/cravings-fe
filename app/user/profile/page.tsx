"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, CreditCard, Edit, MapPin, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AddressModal } from "@/app/user/components/address-modal";
import { PaymentMethodModal } from "@/app/user/components/payment-method-modal";

export default function UserProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555-123-4567",
    bio: "Food enthusiast and avid traveler. Always looking for new culinary experiences!",
    profileImage: "/placeholder.svg?height=200&width=200",
  });

  // Mock addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Business Ave, Floor 12",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false,
    },
  ]);

  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      cardNumber: "**** **** **** 4567",
      expiryDate: "12/25",
      cardHolder: "John Doe",
      isDefault: true,
    },
    {
      id: 2,
      type: "Credit Card",
      cardNumber: "**** **** **** 8901",
      expiryDate: "09/24",
      cardHolder: "John Doe",
      isDefault: false,
    },
  ]);

  const handleSaveProfile = () => {
    // In a real app, this would save the profile data to the backend
    setIsEditMode(false);
  };

  const handleAddAddress = (address: any) => {
    setAddresses([...addresses, { ...address, id: addresses.length + 1 }]);
    setIsAddressModalOpen(false);
  };

  const handleAddPaymentMethod = (paymentMethod: any) => {
    setPaymentMethods([
      ...paymentMethods,
      { ...paymentMethod, id: paymentMethods.length + 1 },
    ]);
    setIsPaymentModalOpen(false);
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  const handleSetDefaultPayment = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-primary">My Profile</h1>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="bg-cerulean border border-non-photo-blue text-primiary">
            <TabsTrigger
              value="profile"
              // className="data-[state=active]:bg-non-photo-blue data-[state=active]:text-berkeley-blue"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              // className="data-[state=active]:bg-non-photo-blue data-[state=active]:text-berkeley-blue"
            >
              Addresses
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              // className="data-[state=active]:bg-non-photo-blue data-[state=active]:text-berkeley-blue"
            >
              Payment Methods
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Manage your personal details
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="border-cerulean text-cerulean hover:bg-cerulean/10"
                  >
                    {isEditMode ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-non-photo-blue">
                        <Image
                          src={userData.profileImage || "/placeholder.svg"}
                          alt="Profile"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      {isEditMode && (
                        <Button
                          size="icon"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-cerulean hover:bg-cerulean/90"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">
                            Change profile picture
                          </span>
                        </Button>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-lg">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                          }
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={userData.bio}
                        onChange={(e) =>
                          setUserData({ ...userData, bio: e.target.value })
                        }
                        disabled={!isEditMode}
                        className="min-h-[100px]"
                      />
                    </div>
                    {isEditMode && (
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSaveProfile}
                          className="bg-cerulean hover:bg-cerulean/90 text-white"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="space-y-4">
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <CardTitle>My Addresses</CardTitle>
                    <CardDescription>
                      Manage your delivery addresses
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="bg-cerulean hover:bg-cerulean/90 text-white"
                  >
                    Add New Address
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 ${
                        address.isDefault
                          ? "border-cerulean bg-non-photo-blue/10"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{address.type}</h3>
                            {address.isDefault && (
                              <span className="px-2 py-0.5 rounded-full bg-cerulean text-white text-xs">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                              <div>
                                <p>{address.address}</p>
                                <p>
                                  {address.city}, {address.state}{" "}
                                  {address.zipCode}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!address.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleSetDefaultAddress(address.id)
                              }
                              className="border-cerulean text-cerulean hover:bg-cerulean/10"
                            >
                              Set as Default
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cerulean text-cerulean hover:bg-cerulean/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment options
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="bg-cerulean hover:bg-cerulean/90 text-white"
                  >
                    Add Payment Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border rounded-lg p-4 ${
                        method.isDefault
                          ? "border-cerulean bg-non-photo-blue/10"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{method.type}</h3>
                            {method.isDefault && (
                              <span className="px-2 py-0.5 rounded-full bg-cerulean text-white text-xs">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="flex items-start gap-2">
                              <CreditCard className="h-4 w-4 mt-0.5 text-muted-foreground" />
                              <div>
                                <p>{method.cardNumber}</p>
                                <p>Expires: {method.expiryDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!method.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultPayment(method.id)}
                              className="border-cerulean text-cerulean hover:bg-cerulean/10"
                            >
                              Set as Default
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cerulean text-cerulean hover:bg-cerulean/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddressModal
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        onSave={handleAddAddress}
      />

      <PaymentMethodModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSave={handleAddPaymentMethod}
      />
    </>
  );
}

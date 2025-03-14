import Image from "next/image";
import { Clock, MapPin, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function DeliveryOrdersPage() {
  const navItems = [
    {
      title: "Available Orders",
      href: "/delivery/orders",
      icon: Package,
    },
    {
      title: "My Deliveries",
      href: "/delivery/my-deliveries",
      icon: Package,
    },
    {
      title: "History",
      href: "/delivery/history",
      icon: Package,
    },
    {
      title: "Profile",
      href: "/delivery/profile",
      icon: Package,
    },
  ];

  // Mock available orders
  const availableOrders = [
    {
      id: "ORD-12345",
      restaurant: {
        name: "Burger Palace",
        address: "123 Burger St, Foodville",
        image: "/placeholder.svg?height=80&width=80",
      },
      customer: {
        address: "456 Main St, Anytown",
        distance: "2.3 km",
      },
      items: [
        { name: "Classic Cheeseburger", quantity: 2 },
        { name: "French Fries", quantity: 1 },
      ],
      total: 21.97,
      readyTime: "5 minutes ago",
    },
    {
      id: "ORD-12346",
      restaurant: {
        name: "Pizza Heaven",
        address: "789 Pizza Ave, Foodville",
        image: "/placeholder.svg?height=80&width=80",
      },
      customer: {
        address: "101 Park Rd, Anytown",
        distance: "3.1 km",
      },
      items: [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 },
        { name: "Soda", quantity: 2 },
      ],
      total: 28.45,
      readyTime: "Just now",
    },
    {
      id: "ORD-12347",
      restaurant: {
        name: "Sushi World",
        address: "222 Sushi Ln, Foodville",
        image: "/placeholder.svg?height=80&width=80",
      },
      customer: {
        address: "333 Lake St, Anytown",
        distance: "4.5 km",
      },
      items: [
        { name: "California Roll", quantity: 2 },
        { name: "Miso Soup", quantity: 2 },
      ],
      total: 32.5,
      readyTime: "10 minutes ago",
    },
  ];

  // Mock active deliveries
  const activeDeliveries = [
    {
      id: "ORD-12340",
      restaurant: {
        name: "Taco Fiesta",
        address: "555 Taco Blvd, Foodville",
        image: "/placeholder.svg?height=80&width=80",
      },
      customer: {
        name: "John Smith",
        address: "777 Oak St, Anytown",
        phone: "+1 555-123-4567",
        distance: "1.8 km",
      },
      items: [
        { name: "Beef Tacos", quantity: 3 },
        { name: "Nachos", quantity: 1 },
        { name: "Horchata", quantity: 2 },
      ],
      total: 26.75,
      status: "Picked up", // Picked up or On the way
      pickupTime: "12:30 PM",
    },
  ];

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>

        <Tabs defaultValue="available" className="space-y-4">
          <TabsList>
            <TabsTrigger value="available">Available Orders</TabsTrigger>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {availableOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Package className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">
                    No orders available right now
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check back soon for new delivery opportunities
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          Ready: {order.readyTime}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex gap-3 mb-3">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          <Image
                            src={order.restaurant.image || "/placeholder.svg"}
                            alt={order.restaurant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {order.restaurant.name}
                          </h3>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {order.restaurant.address}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 mb-3">
                        <div className="text-sm font-medium">Order Items:</div>
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.quantity} × {item.name}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>Delivery: {order.customer.distance}</span>
                        </div>
                        <div className="font-medium">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Accept Order</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeDeliveries.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Package className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No active deliveries</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accept an order to start delivering
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeDeliveries.map((delivery) => (
                  <Card key={delivery.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{delivery.id}</CardTitle>
                        <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {delivery.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          <Image
                            src={
                              delivery.restaurant.image || "/placeholder.svg"
                            }
                            alt={delivery.restaurant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {delivery.restaurant.name}
                          </h3>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {delivery.restaurant.address}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Picked up: {delivery.pickupTime}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium mb-1">Customer Details</div>
                        <div className="text-sm">{delivery.customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {delivery.customer.address}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {delivery.customer.phone}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium mb-1">Order Items:</div>
                        {delivery.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.quantity} × {item.name}
                          </div>
                        ))}
                        <div className="text-sm font-medium mt-2">
                          Total: ${delivery.total.toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1">Navigate</Button>
                      <Button className="flex-1" variant="default">
                        {delivery.status === "Picked up"
                          ? "Delivered"
                          : "Picked Up"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

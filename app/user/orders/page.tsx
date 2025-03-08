import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function OrdersPage() {
  // Mock active order
  const activeOrder = {
    id: "ORD-12345",
    restaurant: {
      name: "Burger Palace",
      image: "/placeholder.svg?height=80&width=80",
    },
    status: "preparing", // preparing, ready_for_pickup, out_for_delivery, delivered
    statusText: "Preparing your order",
    estimatedDelivery: "25-30 min",
    items: [
      { name: "Classic Cheeseburger", quantity: 2 },
      { name: "French Fries", quantity: 1 },
    ],
    total: 21.97,
    deliveryAddress: "123 Main St, Anytown, 12345",
    deliveryPerson: {
      name: "John D.",
      phone: "+1 555-123-4567",
      image: "/placeholder-user.jpg",
    },
    orderPlaced: "12:45 PM",
  };

  // Calculate progress based on status
  const getProgress = (status: string) => {
    switch (status) {
      case "preparing":
        return 25;
      case "ready_for_pickup":
        return 50;
      case "out_for_delivery":
        return 75;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Order #{activeOrder.id}</CardTitle>
          <Button variant="outline" size="sm">
            Help
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-md overflow-hidden">
              <Image
                src={activeOrder.restaurant.image || "/placeholder.svg"}
                alt={activeOrder.restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{activeOrder.restaurant.name}</h3>
              <div className="text-sm text-muted-foreground mt-1">
                Order placed at {activeOrder.orderPlaced}
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{activeOrder.statusText}</span>
              <span className="text-sm text-muted-foreground">
                <Clock className="h-4 w-4 inline mr-1" />
                ETA: {activeOrder.estimatedDelivery}
              </span>
            </div>
            <Progress value={getProgress(activeOrder.status)} className="h-2" />

            <div className="grid grid-cols-4 mt-2 text-center text-sm">
              <div
                className={
                  activeOrder.status === "preparing"
                    ? "text-primary font-medium"
                    : ""
                }
              >
                Preparing
              </div>
              <div
                className={
                  activeOrder.status === "ready_for_pickup"
                    ? "text-primary font-medium"
                    : ""
                }
              >
                Ready
              </div>
              <div
                className={
                  activeOrder.status === "out_for_delivery"
                    ? "text-primary font-medium"
                    : ""
                }
              >
                On the way
              </div>
              <div
                className={
                  activeOrder.status === "delivered"
                    ? "text-primary font-medium"
                    : ""
                }
              >
                Delivered
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Delivery Details</h3>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Delivery Address</div>
                    <div className="text-sm text-muted-foreground">
                      {activeOrder.deliveryAddress}
                    </div>
                  </div>
                </div>
              </div>

              {activeOrder.status === "out_for_delivery" && (
                <div className="flex-1">
                  <div className="font-medium">Delivery Person</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={activeOrder.deliveryPerson.image}
                        alt="Delivery Person"
                      />
                      <AvatarFallback>
                        {activeOrder.deliveryPerson.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm">
                        {activeOrder.deliveryPerson.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activeOrder.deliveryPerson.phone}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-2">
              {activeOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${activeOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">Cancel Order</Button>
            <Link href="/user/history">
              <Button variant="outline">View Order History</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

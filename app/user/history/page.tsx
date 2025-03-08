"use client";

import { Calendar, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { OrderDetailsDialog } from "@/app/user/components/order-details-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function OrderHistoryPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock order history data
  const orderHistory = [
    {
      id: "ORD-12340",
      date: "Mar 8, 2023",
      restaurant: {
        name: "Burger Palace",
        image: "/placeholder.svg?height=80&width=80",
      },
      items: [
        { name: "Classic Cheeseburger", quantity: 2, price: 8.99 },
        { name: "French Fries", quantity: 1, price: 3.99 },
      ],
      total: 21.97,
      status: "Delivered",
      deliveryAddress: "123 Main St, Anytown, 12345",
    },
    {
      id: "ORD-12339",
      date: "Mar 5, 2023",
      restaurant: {
        name: "Pizza Heaven",
        image: "/placeholder.svg?height=80&width=80",
      },
      items: [
        { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
        { name: "Garlic Bread", quantity: 1, price: 4.99 },
        { name: "Soda", quantity: 2, price: 1.99 },
      ],
      total: 23.96,
      status: "Delivered",
      deliveryAddress: "123 Main St, Anytown, 12345",
    },
    {
      id: "ORD-12338",
      date: "Feb 28, 2023",
      restaurant: {
        name: "Sushi World",
        image: "/placeholder.svg?height=80&width=80",
      },
      items: [
        { name: "California Roll", quantity: 2, price: 8.99 },
        { name: "Miso Soup", quantity: 2, price: 3.99 },
      ],
      total: 25.96,
      status: "Delivered",
      deliveryAddress: "123 Main St, Anytown, 12345",
    },
    {
      id: "ORD-12337",
      date: "Feb 20, 2023",
      restaurant: {
        name: "Taco Fiesta",
        image: "/placeholder.svg?height=80&width=80",
      },
      items: [
        { name: "Beef Tacos", quantity: 3, price: 3.99 },
        { name: "Nachos", quantity: 1, price: 7.99 },
        { name: "Horchata", quantity: 2, price: 2.99 },
      ],
      total: 25.94,
      status: "Delivered",
      deliveryAddress: "123 Main St, Anytown, 12345",
    },
    {
      id: "ORD-12336",
      date: "Feb 15, 2023",
      restaurant: {
        name: "Curry House",
        image: "/placeholder.svg?height=80&width=80",
      },
      items: [
        { name: "Chicken Tikka Masala", quantity: 1, price: 14.99 },
        { name: "Garlic Naan", quantity: 2, price: 3.99 },
        { name: "Mango Lassi", quantity: 1, price: 4.99 },
      ],
      total: 27.96,
      status: "Delivered",
      deliveryAddress: "123 Main St, Anytown, 12345",
    },
  ];

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-primary">Order History</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        <Card className="bg-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Your Past Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:border-honeydew transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <Image
                          src={order.restaurant.image || "/placeholder.svg"}
                          alt={order.restaurant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{order.restaurant.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {order.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="px-2 py-1 rounded-full bg-berkeley-blue text-berkeley-blue text-xs font-medium">
                        {order.status}
                      </div>
                      <div className="text-sm font-medium mt-1">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm mb-3">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="text-muted-foreground">
                        {item.quantity} × {item.name}
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="text-muted-foreground">
                        +{order.items.length - 2} more items
                      </div>
                    )}
                  </div>

                  <Separator className="my-3" />

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Order #{order.id}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-honeydew text-primary hover:bg-honeydew/20 hover:text-cerulean"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
}

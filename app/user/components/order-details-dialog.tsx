"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface OrderDetailsDialogProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
          <DialogDescription>{order.date}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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
              <div className="px-2 py-0.5 rounded-full bg-berkeley-blue text-berkeley-blue text-xs font-medium inline-block mt-1">
                {order.status}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Order Items</h4>
            <div className="space-y-2">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Delivery Details</h4>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm">{order.deliveryAddress}</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-honeydew text-primary hover:bg-honeydew hover:text-primary"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            className="bg-cerulean hover:bg-honeydew/80 text-white"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Reorder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

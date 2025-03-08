"use client";

import { User } from "lucide-react";

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

interface UserDetailsDialogProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            User information and order history
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-berkeley-blue flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Phone
              </h4>
              <div>{user.phone}</div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Status
              </h4>
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.status === "Active"
                    ? "bg-honeydew/30 text-primary"
                    : "bg-non-photo-blue/30 text-primary"
                }`}
              >
                {user.status}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Join Date
              </h4>
              <div>{user.joinDate}</div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Total Orders
              </h4>
              <div>{user.orders}</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Address
            </h4>
            <div className="text-sm">{user.address}</div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Order Statistics
            </h4>
            <div className="flex justify-between mt-2">
              <div className="text-center p-2 bg-berkeley-blue/20 rounded-md flex-1 mr-2">
                <div className="text-lg font-semibold">{user.orders}</div>
                <div className="text-xs text-muted-foreground">Orders</div>
              </div>
              <div className="text-center p-2 bg-honeydew/20 rounded-md flex-1">
                <div className="text-lg font-semibold">
                  ${user.totalSpent.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Total Spent</div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-honeydew text-primary hover:bg-honeydew/20"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button className="bg-honeydew hover:bg-honeydew/80 text-white">
            Edit User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

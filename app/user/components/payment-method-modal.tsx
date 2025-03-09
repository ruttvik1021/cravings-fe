"use client";

import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (paymentMethod: any) => void;
  existingPaymentMethod?: any;
}

export function PaymentMethodModal({
  open,
  onOpenChange,
  onSave,
  existingPaymentMethod,
}: PaymentMethodModalProps) {
  const [paymentMethod, setPaymentMethod] = useState(
    existingPaymentMethod || {
      type: "Credit Card",
      cardNumber: "",
      expiryDate: "",
      cardHolder: "",
      isDefault: false,
    }
  );

  const handleChange = (field: string, value: any) => {
    setPaymentMethod({ ...paymentMethod, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(paymentMethod);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {existingPaymentMethod
              ? "Edit Payment Method"
              : "Add Payment Method"}
          </DialogTitle>
          <DialogDescription>
            {existingPaymentMethod
              ? "Update your payment method details below."
              : "Enter your payment method details below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="**** **** **** ****"
                value={paymentMethod.cardNumber}
                onChange={(e) => handleChange("cardNumber", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input
                  id="expiry-date"
                  placeholder="MM/YY"
                  value={paymentMethod.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-holder">Card Holder</Label>
                <Input
                  id="card-holder"
                  placeholder="John Doe"
                  value={paymentMethod.cardHolder}
                  onChange={(e) => handleChange("cardHolder", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="default"
                checked={paymentMethod.isDefault}
                onCheckedChange={(checked) =>
                  handleChange("isDefault", checked)
                }
              />
              <Label htmlFor="default">Set as default payment method</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-cerulean hover:bg-cerulean/90 text-white"
            >
              Save Payment Method
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

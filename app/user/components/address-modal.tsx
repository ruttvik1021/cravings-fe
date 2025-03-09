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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface AddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (address: any) => void;
  existingAddress?: any;
}

export function AddressModal({
  open,
  onOpenChange,
  onSave,
  existingAddress,
}: AddressModalProps) {
  const [address, setAddress] = useState(
    existingAddress || {
      type: "Home",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      isDefault: false,
    }
  );

  const handleChange = (field: string, value: any) => {
    setAddress({ ...address, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(address);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {existingAddress ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          <DialogDescription>
            {existingAddress
              ? "Update your delivery address details below."
              : "Enter your delivery address details below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="address-type">Address Type</Label>
              <RadioGroup
                id="address-type"
                value={address.type}
                onValueChange={(value) => handleChange("type", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Home" id="home" />
                  <Label htmlFor="home">Home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Work" id="work" />
                  <Label htmlFor="work">Work</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={address.address}
                onChange={(e) => handleChange("address", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={address.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={address.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="default"
                checked={address.isDefault}
                onCheckedChange={(checked) =>
                  handleChange("isDefault", checked)
                }
              />
              <Label htmlFor="default">Set as default address</Label>
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
              Save Address
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

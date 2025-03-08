"use client";

import { Truck } from "lucide-react";

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

interface DeliveryAgentDetailsDialogProps {
  agent: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeliveryAgentDetailsDialog({
  agent,
  open,
  onOpenChange,
}: DeliveryAgentDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delivery Agent Details</DialogTitle>
          <DialogDescription>
            Agent information and delivery history
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-berkeley-blue flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{agent.name}</h3>
              <div className="text-sm text-muted-foreground">{agent.email}</div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Phone
              </h4>
              <div>{agent.phone}</div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Vehicle
              </h4>
              <div>{agent.vehicle}</div>
            </div>
            {agent.status && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Status
                </h4>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    agent.status === "Active"
                      ? "bg-honeydew/30 text-primary"
                      : "bg-non-photo-blue/30 text-primary"
                  }`}
                >
                  {agent.status}
                </div>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Area
              </h4>
              <div>{agent.area}</div>
            </div>
            {agent.joinDate && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Join Date
                </h4>
                <div>{agent.joinDate}</div>
              </div>
            )}
            {agent.registeredDate && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Registered Date
                </h4>
                <div>{agent.registeredDate}</div>
              </div>
            )}
          </div>

          {agent.documents && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Documents
              </h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {agent.documents.map((doc: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-berkeley-blue/30 px-2 py-0.5 text-xs text-primary"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {agent.deliveries && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Delivery Statistics
              </h4>
              <div className="flex justify-between mt-2">
                <div className="text-center p-2 bg-berkeley-blue/20 rounded-md flex-1 mr-2">
                  <div className="text-lg font-semibold">
                    {agent.deliveries}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Deliveries
                  </div>
                </div>
                <div className="text-center p-2 bg-honeydew/20 rounded-md flex-1">
                  <div className="text-lg font-semibold">{agent.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
          )}
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
            Edit Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

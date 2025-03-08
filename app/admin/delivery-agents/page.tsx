"use client";

import { Check, Package, Search, Store, Truck, Users, X } from "lucide-react";
import { useState } from "react";

import { ConfirmDialog } from "@/app/admin/components/confirm-dialog";
import { DeliveryAgentDetailsDialog } from "@/app/admin/components/delivery-agent-details-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDeliveryAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<
    "approve" | "reject" | "suspend" | "activate"
  >("approve");
  const [agentToAction, setAgentToAction] = useState<any>(null);

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Package,
    },
    {
      title: "Restaurants",
      href: "/admin/restaurants",
      icon: Store,
    },
    {
      title: "Delivery Agents",
      href: "/admin/delivery-agents",
      icon: Truck,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: Package,
    },
  ];

  // Mock delivery agents data
  const pendingAgents = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 555-123-4567",
      vehicle: "Motorcycle",
      area: "Downtown",
      registeredDate: "2023-06-15",
      documents: ["ID Card", "Vehicle Registration", "Insurance"],
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "+1 555-987-6543",
      vehicle: "Bicycle",
      area: "Midtown",
      registeredDate: "2023-06-14",
      documents: ["ID Card", "Proof of Address"],
    },
    {
      id: 3,
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1 555-789-0123",
      vehicle: "Car",
      area: "Uptown",
      registeredDate: "2023-06-13",
      documents: [
        "ID Card",
        "Vehicle Registration",
        "Driver's License",
        "Insurance",
      ],
    },
  ];

  const activeAgents = [
    {
      id: 4,
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "+1 555-111-2222",
      vehicle: "Motorcycle",
      area: "Downtown",
      status: "Active",
      deliveries: 145,
      rating: 4.8,
      joinDate: "2023-01-15",
    },
    {
      id: 5,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1 555-333-4444",
      vehicle: "Car",
      area: "Suburbs",
      status: "Active",
      deliveries: 87,
      rating: 4.7,
      joinDate: "2023-02-20",
    },
    {
      id: 6,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 555-555-6666",
      vehicle: "Bicycle",
      area: "Midtown",
      status: "Suspended",
      deliveries: 65,
      rating: 3.9,
      joinDate: "2023-03-10",
    },
    {
      id: 7,
      name: "Jennifer Davis",
      email: "jennifer@example.com",
      phone: "+1 555-777-8888",
      vehicle: "Motorcycle",
      area: "Downtown",
      status: "Active",
      deliveries: 112,
      rating: 4.9,
      joinDate: "2023-01-25",
    },
  ];

  const handleViewDetails = (agent: any) => {
    setSelectedAgent(agent);
    setIsDetailsDialogOpen(true);
  };

  const handleAction = (
    agent: any,
    type: "approve" | "reject" | "suspend" | "activate"
  ) => {
    setAgentToAction(agent);
    setActionType(type);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmAction = () => {
    // In a real app, this would call an API to perform the action
    alert(`Agent ${agentToAction.name} would be ${actionType}d here`);
    setIsConfirmDialogOpen(false);
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 ">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Delivery Agent Management
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search agents..."
                className="w-full md:w-[300px] pl-8 bg-white"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
            <CardDescription>
              Review and approve new delivery agent registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-berkeley-blue/30">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>
                      <div>{agent.email}</div>
                      <div className="text-sm text-muted-foreground">
                        {agent.phone}
                      </div>
                    </TableCell>
                    <TableCell>{agent.vehicle}</TableCell>
                    <TableCell>{agent.area}</TableCell>
                    <TableCell>{agent.registeredDate}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {agent.documents.map((doc, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-berkeley-blue/30 px-2 py-0.5 text-xs text-primary"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-honeydew text-primary hover:bg-honeydew/20"
                          onClick={() => handleViewDetails(agent)}
                        >
                          View
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-honeydew hover:bg-honeydew/80 text-white"
                          onClick={() => handleAction(agent, "approve")}
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleAction(agent, "reject")}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle>Active Delivery Agents</CardTitle>
            <CardDescription>
              Manage all registered and active delivery agents on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-berkeley-blue/30">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deliveries</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>
                      <div>{agent.email}</div>
                      <div className="text-sm text-muted-foreground">
                        {agent.phone}
                      </div>
                    </TableCell>
                    <TableCell>{agent.vehicle}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          agent.status === "Active"
                            ? "bg-honeydew/30 text-primary"
                            : "bg-non-photo-blue/30 text-primary"
                        }`}
                      >
                        {agent.status}
                      </div>
                    </TableCell>
                    <TableCell>{agent.deliveries}</TableCell>
                    <TableCell>{agent.rating}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-honeydew text-primary hover:bg-honeydew/20"
                          onClick={() => handleViewDetails(agent)}
                        >
                          View
                        </Button>
                        <Button
                          variant={
                            agent.status === "Active"
                              ? "destructive"
                              : "default"
                          }
                          size="sm"
                          className={
                            agent.status === "Active"
                              ? ""
                              : "bg-honeydew hover:bg-honeydew/80 text-white"
                          }
                          onClick={() =>
                            handleAction(
                              agent,
                              agent.status === "Active" ? "suspend" : "activate"
                            )
                          }
                        >
                          {agent.status === "Active" ? "Suspend" : "Activate"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedAgent && (
        <DeliveryAgentDetailsDialog
          agent={selectedAgent}
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}

      <ConfirmDialog
        title={`${
          actionType.charAt(0).toUpperCase() + actionType.slice(1)
        } Delivery Agent`}
        description={`Are you sure you want to ${actionType} ${agentToAction?.name}?`}
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}

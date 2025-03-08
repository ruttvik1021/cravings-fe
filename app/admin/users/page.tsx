"use client";

import { useState } from "react";
import { Package, Search, Store, Trash, Users } from "lucide-react";

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
import { DashboardLayout } from "@/components/dashboard-layout";
import { UserDetailsDialog } from "@/app/admin/components/user-details-dialog";
import { ConfirmDialog } from "@/app/admin/components/confirm-dialog";

export default function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  // Mock users data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 555-123-4567",
      address: "123 Main St, Anytown, 12345",
      joinDate: "2023-01-15",
      status: "Active",
      orders: 24,
      totalSpent: 487.35,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 555-987-6543",
      address: "456 Oak Ave, Anytown, 12345",
      joinDate: "2023-02-20",
      status: "Active",
      orders: 18,
      totalSpent: 356.42,
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      phone: "+1 555-456-7890",
      address: "789 Pine St, Anytown, 12345",
      joinDate: "2023-03-05",
      status: "Inactive",
      orders: 5,
      totalSpent: 98.75,
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily@example.com",
      phone: "+1 555-789-0123",
      address: "101 Maple Dr, Anytown, 12345",
      joinDate: "2023-03-10",
      status: "Active",
      orders: 12,
      totalSpent: 245.6,
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      phone: "+1 555-234-5678",
      address: "202 Cedar Ln, Anytown, 12345",
      joinDate: "2023-04-01",
      status: "Active",
      orders: 8,
      totalSpent: 176.25,
    },
  ];

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailsDialogOpen(true);
  };

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would call an API to delete the user
    alert(`User ${userToDelete.name} would be deleted here`);
    setIsConfirmDialogOpen(false);
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 ">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            User Management
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="w-full md:w-[300px] pl-8 bg-white"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage all registered users on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-berkeley-blue/30">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-honeydew/30 text-primary"
                            : "bg-non-photo-blue/30 text-primary"
                        }`}
                      >
                        {user.status}
                      </div>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.orders}</TableCell>
                    <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-honeydew text-primary hover:bg-honeydew/20"
                          onClick={() => handleViewDetails(user)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-non-photo-blue text-primary hover:bg-non-photo-blue/20"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <Trash className="h-4 w-4" />
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

      {selectedUser && (
        <UserDetailsDialog
          user={selectedUser}
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}

      <ConfirmDialog
        title="Delete User"
        description={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

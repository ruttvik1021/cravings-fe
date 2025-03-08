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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Search, X } from "lucide-react";

export default function AdminRestaurantsPage() {
  // Mock restaurant data
  const pendingRestaurants = [
    {
      id: 1,
      name: "Pizza Heaven",
      owner: "Jane Smith",
      email: "jane@pizzaheaven.com",
      phone: "+1 555-123-4567",
      type: "Casual Dining",
      cuisine: "Italian",
      registeredDate: "2023-06-15",
    },
    {
      id: 2,
      name: "Sushi World",
      owner: "David Lee",
      email: "david@sushiworld.com",
      phone: "+1 555-987-6543",
      type: "Fine Dining",
      cuisine: "Japanese",
      registeredDate: "2023-06-14",
    },
    {
      id: 3,
      name: "Taco Fiesta",
      owner: "Maria Rodriguez",
      email: "maria@tacofiesta.com",
      phone: "+1 555-789-0123",
      type: "Fast Food",
      cuisine: "Mexican",
      registeredDate: "2023-06-13",
    },
  ];

  const activeRestaurants = [
    {
      id: 4,
      name: "Burger Palace",
      owner: "John Doe",
      email: "john@burgerpalace.com",
      phone: "+1 555-111-2222",
      type: "Fast Food",
      cuisine: "American",
      status: "Active",
      orders: 1245,
      rating: 4.5,
    },
    {
      id: 5,
      name: "Curry House",
      owner: "Raj Patel",
      email: "raj@curryhouse.com",
      phone: "+1 555-333-4444",
      type: "Casual Dining",
      cuisine: "Indian",
      status: "Active",
      orders: 987,
      rating: 4.7,
    },
    {
      id: 6,
      name: "Pasta Paradise",
      owner: "Sophia Romano",
      email: "sophia@pastaparadise.com",
      phone: "+1 555-555-6666",
      type: "Casual Dining",
      cuisine: "Italian",
      status: "Active",
      orders: 765,
      rating: 4.3,
    },
    {
      id: 7,
      name: "Noodle Bar",
      owner: "Li Wei",
      email: "li@noodlebar.com",
      phone: "+1 555-777-8888",
      type: "Casual Dining",
      cuisine: "Chinese",
      status: "Active",
      orders: 543,
      rating: 4.2,
    },
    {
      id: 8,
      name: "Falafel House",
      owner: "Ahmed Hassan",
      email: "ahmed@falafelhouse.com",
      phone: "+1 555-999-0000",
      type: "Fast Food",
      cuisine: "Mediterranean",
      status: "Suspended",
      orders: 321,
      rating: 4.0,
    },
  ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Restaurant Management
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants..."
                className="w-full md:w-[300px] pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="american">American</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Restaurants</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Restaurants</CardTitle>
                <CardDescription>
                  Manage all registered and active restaurants on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Cuisine</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeRestaurants.map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell className="font-medium">
                          {restaurant.name}
                        </TableCell>
                        <TableCell>{restaurant.owner}</TableCell>
                        <TableCell>{restaurant.cuisine}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              restaurant.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-primary-800"
                            }`}
                          >
                            {restaurant.status}
                          </div>
                        </TableCell>
                        <TableCell>{restaurant.orders}</TableCell>
                        <TableCell>{restaurant.rating}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button
                              variant={
                                restaurant.status === "Active"
                                  ? "destructive"
                                  : "default"
                              }
                              size="sm"
                            >
                              {restaurant.status === "Active"
                                ? "Suspend"
                                : "Activate"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Restaurants</CardTitle>
                <CardDescription>
                  Review and approve new restaurant registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Cuisine</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRestaurants.map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell className="font-medium">
                          {restaurant.name}
                        </TableCell>
                        <TableCell>{restaurant.owner}</TableCell>
                        <TableCell>
                          <div>{restaurant.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {restaurant.phone}
                          </div>
                        </TableCell>
                        <TableCell>{restaurant.type}</TableCell>
                        <TableCell>{restaurant.cuisine}</TableCell>
                        <TableCell>{restaurant.registeredDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="default" size="sm">
                              <Check className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button variant="destructive" size="sm">
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
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

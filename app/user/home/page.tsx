import { MapPin, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  // Mock data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Burger Palace",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Fast Food",
      rating: 4.5,
      deliveryTime: "25-30 min",
      distance: "1.2 km",
    },
    {
      id: 2,
      name: "Pizza Heaven",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Italian",
      rating: 4.7,
      deliveryTime: "30-40 min",
      distance: "1.5 km",
    },
    {
      id: 3,
      name: "Sushi World",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "35-45 min",
      distance: "2.0 km",
    },
    {
      id: 4,
      name: "Taco Fiesta",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Mexican",
      rating: 4.3,
      deliveryTime: "20-30 min",
      distance: "0.8 km",
    },
    {
      id: 5,
      name: "Curry House",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "30-40 min",
      distance: "1.7 km",
    },
    {
      id: 6,
      name: "Noodle Bar",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Chinese",
      rating: 4.4,
      deliveryTime: "25-35 min",
      distance: "1.3 km",
    },
  ];

  return (
    <div>
      {/* Location and Search */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-medium">Deliver to:</span>
          <span>123 Main St, Anytown, 12345</span>
          <Button variant="ghost" size="sm">
            Change
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for restaurants, cuisines, or dishes..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Food Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Explore Categories</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 flex w-full overflow-x-auto pb-2 justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fast-food">Fast Food</TabsTrigger>
            <TabsTrigger value="italian">Italian</TabsTrigger>
            <TabsTrigger value="indian">Indian</TabsTrigger>
            <TabsTrigger value="chinese">Chinese</TabsTrigger>
            <TabsTrigger value="japanese">Japanese</TabsTrigger>
            <TabsTrigger value="mexican">Mexican</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <Link
                  href={`/user/restaurant/${restaurant.id}`}
                  key={restaurant.id}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {restaurant.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {restaurant.cuisine}
                          </p>
                        </div>
                        <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-primary fill-primary mr-1" />
                          <span className="text-sm font-medium">
                            {restaurant.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                        <span>{restaurant.deliveryTime}</span>
                        <span>{restaurant.distance}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs would have filtered content */}
          <TabsContent value="fast-food" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants
                .filter((r) => r.cuisine === "Fast Food")
                .map((restaurant) => (
                  <Link
                    href={`/user/restaurant/${restaurant.id}`}
                    key={restaurant.id}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48 w-full">
                        <Image
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {restaurant.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {restaurant.cuisine}
                            </p>
                          </div>
                          <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
                            <Star className="h-4 w-4 text-primary fill-primary mr-1" />
                            <span className="text-sm font-medium">
                              {restaurant.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                          <span>{restaurant.deliveryTime}</span>
                          <span>{restaurant.distance}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>

          {/* Similar structure for other cuisine types */}
        </Tabs>
      </div>
    </div>
  );
}

"use client";
import { MapPin, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantsList } from "@/app/user/apis/restaurant";
import { toTitleCase } from "@/app/utils";

export default function HomePage() {
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurantsList,
  });
  return (
    <div>
      {/* Location and Search */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-medium">Deliver to:</span>
          <span>123 Main St, Anytown, 12345</span>
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
        <h2 className="text-xl font-semibold mb-4">Explore Restaurants</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants?.data?.map((restaurant: Restaurant) => (
            <Link
              href={`/user/restaurant/${restaurant._id}`}
              key={restaurant._id}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={restaurant.images[0] || "/placeholder.svg"}
                    alt={restaurant.restaurantName}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {restaurant.restaurantName}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {toTitleCase(restaurant.foodCategory)} -{" "}
                        {toTitleCase(restaurant.restaurantType)}
                      </p>
                    </div>
                    <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
                      <span className="text-sm font-medium">
                        {restaurant.city}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                    <span>{restaurant.openingTime}</span>
                    <span>{restaurant.closingTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

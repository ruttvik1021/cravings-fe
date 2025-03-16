"use client";
import { Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toTitleCase } from "../../../utils";
import { getRestaurantsDetails } from "../../apis/restaurant";

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = params.id as string;

  const { data: restaurant, isLoading } = useQuery<RestaurantDetails>({
    queryKey: [`restaurant-${params.id}`],
    queryFn: async () => {
      const restaurant = await getRestaurantsDetails(restaurantId);
      return restaurant.data;
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!restaurant) {
    return <>No restaurant found...</>;
  }

  return (
    <>
      <div className="relative h-60 md:h-96 mb-2">
        <Image
          src={restaurant.images[0]}
          alt={`Restaurant Image`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white w-full">
          <h1 className="text-2xl md:text-3xl font-bold">
            {restaurant.restaurantName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span>
              {toTitleCase(restaurant.foodCategory)},{" "}
              {toTitleCase(restaurant.restaurantType)}
            </span>
            <span className="h-1 w-1 rounded-full bg-white"></span>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-white mr-1" />
              <span>4.4</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm">
                    {restaurant.openingTime} - {restaurant.closingTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm">
                    {restaurant.city} - {restaurant.pincode}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground">
                {restaurant.description}
              </p>
              <div className="mt-4 text-sm">
                <div className="font-medium">Address</div>
                <div className="text-muted-foreground">
                  {restaurant.address}
                </div>
              </div>
              <div className="mt-2 text-sm">
                <div className="font-medium">Hours</div>
                <div className="text-muted-foreground">
                  {restaurant.openingTime} - {restaurant.closingTime}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Your Order</h3>
              <div className="text-sm text-muted-foreground mb-4">
                Start adding items to your order
              </div>
              <Link href="/user/cart">
                <Button className="w-full">View Cart (3 items)</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>

          <Accordion type="multiple" className="w-full">
            {restaurant.categories.map((category, index) =>
              category.menuItems.length ? (
                <AccordionItem
                  value={category._id}
                  key={index}
                  className=" border-none"
                >
                  <AccordionTrigger className="bg-primary/10 p-2 rounded-lg mb-2">
                    <div className="flex flex-col text-left gap-2">
                      <Label>{category.categoryName}</Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 border-b-primary">
                    {category.menuItems.map((item, index) => (
                      <div
                        key={item._id}
                        className={cn(
                          "flex flex-col sm:flex-row gap-4 border-b p-4 items-center sm:items-start",
                          {
                            ["border-none"]:
                              index === category.menuItems.length - 1,
                          }
                        )}
                      >
                        {/* Image at the top on mobile */}
                        <div className="relative h-24 w-24 sm:h-20 sm:w-20 rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Text Section Below Image on Mobile */}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="font-medium text-base sm:text-lg">
                            {item.name}
                          </h3>
                          <p className="text-sm sm:text-base text-muted-foreground mt-1">
                            {item.description}
                          </p>
                          <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                            <span className="font-medium text-lg">
                              ${item.price.toFixed(2)}
                            </span>
                            <Button size="sm">Add</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : null
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}

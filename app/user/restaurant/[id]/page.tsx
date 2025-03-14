"use client";
import { Clock, Info, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantsDetails } from "../../apis/restaurant";
import { useParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { toTitleCase } from "../../../utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function RestaurantPage() {
  const params = useParams(); // ✅ Use useParams() to unwrap the params
  const restaurantId = "67d3de749cfcad4c69019fc6" as string; // Convert to string explicitly

  const { data: restaurant, isLoading } = useQuery({
    queryKey: [`restaurant-${params.id}`],
    queryFn: async () => {
      const restaurant = await getRestaurantsDetails(restaurantId);
      console.log("restaurant", restaurant);
      return restaurant.data;
    },
  });
  // Mock restaurant data
  // const restaurant = {
  //   id: params.id,
  //   name: "Burger Palace",
  //   image: "/placeholder.svg?height=300&width=800",
  //   cuisine: "Fast Food",
  //   rating: 4.5,
  //   deliveryTime: "25-30 min",
  //   distance: "1.2 km",
  //   address: "123 Burger St, Foodville, 12345",
  //   description:
  //     "Serving the juiciest burgers in town since 2010. Our ingredients are locally sourced and our recipes are crafted to perfection.",
  //   openingHours: "10:00 AM - 10:00 PM",
  // };

  // Mock menu categories and items
  const menuCategories = [
    {
      id: "burgers",
      name: "Burgers",
      items: [
        {
          id: 1,
          name: "Classic Cheeseburger",
          description:
            "Beef patty with cheddar cheese, lettuce, tomato, and special sauce",
          price: 8.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
        },
        {
          id: 2,
          name: "Double Bacon Burger",
          description: "Two beef patties with bacon, cheese, and BBQ sauce",
          price: 12.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 3,
          name: "Veggie Burger",
          description:
            "Plant-based patty with avocado, lettuce, and vegan mayo",
          price: 9.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: "sides",
      name: "Sides",
      items: [
        {
          id: 4,
          name: "French Fries",
          description: "Crispy golden fries with sea salt",
          price: 3.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
        },
        {
          id: 5,
          name: "Onion Rings",
          description: "Crispy battered onion rings",
          price: 4.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          id: 6,
          name: "Milkshake",
          description: "Creamy vanilla, chocolate, or strawberry",
          price: 5.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 7,
          name: "Soft Drink",
          description: "Cola, lemon-lime, or orange soda",
          price: 2.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
  ];

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log("restaurant", restaurant);

  return (
    <>
      <div className="relative h-64 md:h-80 mb-2">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {restaurant.images.map((img: string, index: number) => (
              <CarouselItem key={index}>
                <Image
                  src={img}
                  alt={`Restaurant Image ${index}`}
                  fill
                  className="object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
              <span>{restaurant.rating}</span>
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
                <Button variant="outline" size="sm" className="ml-auto">
                  <Info className="h-4 w-4 mr-1" />
                  More Info
                </Button>
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

          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={[menuCategories[0].id]}
          >
            {menuCategories.map((category, index) => (
              <AccordionItem value={category.id} key={index}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent className="p-4 border-b-primary">
                  {category.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex flex-col sm:flex-row gap-4 border-b p-4 items-center sm:items-start",
                        {
                          ["border-none"]: index === category.items.length - 1,
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
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}

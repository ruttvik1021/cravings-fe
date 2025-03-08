"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#f1faee] text-center">
      {/* Hero Section with Carousel */}
      <div className="relative w-full max-w-4xl mx-auto mt-6 px-4 md:px-0">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Image
                src="https://c.ndtvimg.com/2024-04/q3qj2t6g_food-art_625x300_05_April_24.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350?im=FaceCrop,algorithm=dnn,width=800,height=400"
                alt="Delicious Food 1"
                width={800}
                height={400}
                className="rounded-xl w-full h-auto"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src="https://saturo.com/cdn/shop/files/junkfood.jpg"
                alt="Delicious Food 2"
                width={800}
                height={400}
                className="rounded-xl w-full h-auto"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src="https://www.heartandstroke.ca/-/media/images/articles/food-guide-plate.jpg?rev=3e5a0dc07a0c4a96b4a84113d4eb1e47"
                alt="Delicious Food 3"
                width={800}
                height={400}
                className="rounded-xl w-full h-auto"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <motion.h1
        className="text-3xl md:text-4xl font-bold text-[#e63946] my-6 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to Cravings
      </motion.h1>
      <p className="text-base md:text-lg text-[#457b9d] mb-8 max-w-lg mx-auto px-4">
        Order your favorite food, manage your restaurant, or deliver with ease!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 px-4">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="w-full p-4 shadow-lg">
            <CardContent>
              <Button
                className="w-full bg-[#e63946] text-white hover:bg-[#d62839]"
                onClick={() => router.push("/user/login")}
              >
                Sign Up/Login as User
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="w-full p-4 shadow-lg">
            <CardContent>
              <Button
                className="w-full bg-[#457b9d] text-white hover:bg-[#355d7a]"
                onClick={() => router.push("/restaurant/login")}
              >
                Sign Up/Login as Restaurant Admin
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="w-full p-4 shadow-lg">
            <CardContent>
              <Button
                className="w-full bg-[#1d3557] text-white hover:bg-[#14233d]"
                onClick={() => router.push("/delivery/login")}
              >
                Sign Up/Login as Delivery Agent
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-[#1d3557] text-white py-6 text-center mt-auto px-4">
        <p className="text-sm md:text-lg">
          &copy; {new Date().getFullYear()} Cravings. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

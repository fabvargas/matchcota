"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/frontend/components/ui/carousel";
import { Heart } from "lucide-react";

interface Props {
  images: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function Carouselmascota({
  images,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="mt-6 w-full max-w-sm mx-auto lg:max-w-lg lg:mx-0">

      <div className="relative overflow-hidden rounded-2xl">

        {/*btn  fav */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 z-50 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              isFavorite
                ? "fill-red-500 text-red-500 scale-110"
                : "text-gray-400"
            }`}
          />
        </button>

        {/* CARRUSEL */}
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="p-0">
                <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]">
                  <img
                    src={img}
                    alt={`Mascota ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
              current === index
                ? "border-[#4CAF7A]"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`thumb ${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
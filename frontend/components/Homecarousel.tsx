import * as React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent
} from "@/frontend/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/frontend/components/ui/carousel";



export default function Homecarousel() {
  return (
    <Carousel className="w-full max-w-[12rem] sm:max-w-xl">
      <CarouselContent>

            <CarouselItem >
                <div className="p-1">
                <Card className="relative mx-auto w-full max-w-l pt-0">
                    <div className="absolute inset-0 z-30 aspect-video" />
                    <img
                        src="/images/luna.jpg"
                        alt="Event cover"
                    />
                    <CardHeader>
                        <CardAction>
                        </CardAction>
                        <CardTitle>Luna</CardTitle>
                        <CardDescription>
                        Luna hace tres meses encontró un hogar permanente gracias a MatchCota. 
                        Antes de ser adoptada, vivía en la calle y enfrentaba muchos desafíos. 
                        Ahora, es una perrita feliz y saludable que disfruta de su nuevo hogar lleno de amor.
                        </CardDescription>
                    </CardHeader>
                    </Card>
                </div>
            </CarouselItem>

            <CarouselItem>
                <div className="p-1">
                <Card className="relative mx-auto w-full max-w-l pt-0">
                    <div className="absolute inset-0 z-30 aspect-video" />
                    <img
                        src="/images/Thor.jpg"
                        alt="Event cover"
                    />
                    <CardHeader>
                        <CardAction>
                        </CardAction>
                        <CardTitle>Thor</CardTitle>
                        <CardDescription>
                        Thor es un perro muy juguetón y cariñoso. 
                        Después de pasar tiempo en el refugio, finalmente encontró su hogar ideal con una familia que lo ama.
                        </CardDescription>
                    </CardHeader>
                </Card>
                </div>
            </CarouselItem>

            <CarouselItem>
                <div className="p-1">
                <Card className="relative mx-auto w-full max-w-l pt-0">
                    <div className="absolute inset-0 z-30 aspect-video" />
                    <img
                        src="/images/Mili.jpg"
                        alt="Event cover"
                    />
                    <CardHeader>
                        <CardAction>
                        </CardAction>
                        <CardTitle>Mili</CardTitle>
                        <CardDescription>
                        Mili es una perrita muy juguetona y cariñosa. 
                        Le gustan los paseos largos y jugar con otros perros.
                        Gracias a MatchCota, Mili encontró un hogar lleno de amor y cuidado.
                        
                        </CardDescription>
                    </CardHeader>
                </Card>
                </div>
            </CarouselItem>

            <CarouselItem>
                <div className="p-1">
                <Card className="relative mx-auto w-full max-w-l pt-0">
                    <div className="absolute inset-0 z-30 aspect-video" />
                    <img
                        src="/images/Valki.jpg"
                        alt="Event cover"
                    />
                    <CardHeader>
                        <CardAction>
                        </CardAction>
                        <CardTitle>Valki</CardTitle>
                        <CardDescription>
                        Valki es un perro muy cariñoso y le encanta estar rodeado de personas. 
                        Antes de ser adoptado, vivía en la calle y enfrentaba muchos desafíos. 
                        Ahora, es un perro feliz y saludable que disfruta de su nuevo hogar lleno de amor.
                        </CardDescription>
                    </CardHeader>
                </Card>
                </div>
            </CarouselItem>



            





      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
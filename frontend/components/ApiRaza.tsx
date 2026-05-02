"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/frontend/components/ui/card";
import { Badge } from "@/frontend/components/ui/badge";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { PawPrint, Search, Sparkles, HeartPulse, Scale } from "lucide-react";
import { Input } from "@/frontend/components/ui/input";

type Breed = {
  id: string;
  attributes: {
    name: string;
    description: string;
    life: {
      min: number;
      max: number;
    };
    male_weight: {
      min: number;
      max: number;
    };
    female_weight: {
      min: number;
      max: number;
    };
    hypoallergenic: boolean;
  };
};

/* MAPPING MANUAL*/
const DOG_API_MAP: Record<string, string[]> = {
  affenpinscher: [],
  african: ["wild"],
  airedale: [],
  akita: [],
  appenzeller: [],
  australian: ["kelpie", "shepherd", "cattle"],
  basenji: [],
  beagle: [],
  boxer: [],
  bulldog: ["boston", "english", "french"],
  chihuahua: [],
  chow: [],
  dalmatian: [],
  doberman: [],
  husky: [],
  labrador: [],
  malamute: [],
  maltese: [],
  pug: [],
  rottweiler: [],
  samoyed: [],
  shiba: [],
  shihtzu: [],
  weimaraner: [],
  whippet: [],
  wolfhound: ["irish"],
};

const normalizeBreed = (name: string) =>
  name.toLowerCase().split(" ")[0];

const buildImageUrl = (breedName: string) => {
  const base = normalizeBreed(breedName);

  if (!DOG_API_MAP[base]) return null;

  const subBreeds = DOG_API_MAP[base];

  if (subBreeds.length > 0) {
    return `https://dog.ceo/api/breed/${base}/${subBreeds[0]}/images/random`;
  }

  return `https://dog.ceo/api/breed/${base}/images/random`;
};

export default function Apiraza() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Breed[]>([]);
  

  /* TRAER TODAS LAS RAZAS */
useEffect(() => {
  fetch("https://dogapi.dog/api/v2/breeds?page[size]=1000")
    .then((res) => res.json())
    .then((data) => {

      const allBreeds: Breed[] = data.data;

      const filtered = allBreeds.filter(
        (b) =>
          DOG_API_MAP[normalizeBreed(b.attributes.name)] &&
          !b.attributes.name.toLowerCase().includes("kelpie") &&
          !b.attributes.name.toLowerCase().includes("terrier") &&
          !b.attributes.name.toLowerCase().includes("cattle")
      );

      setBreeds(filtered);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  /*  CARGAR IMÁGENES */
  useEffect(() => {
    const loadImages = async () => {
      const newImages: Record<string, string> = {};

      for (const breed of breeds) {
        const url = buildImageUrl(breed.attributes.name);

        if (!url) continue;

        try {
          const res = await fetch(url);
          const data = await res.json();
          newImages[breed.id] = data.message;
        } catch {
          newImages[breed.id] = "/images/fallback.jpg";
        }
      }

      setImages(newImages);
    };

    if (breeds.length) loadImages();
  }, [breeds]);

  /* AUTOCOMPLETE */
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = breeds.filter((b) =>
      b.attributes.name.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
  }, [search, breeds]);

  const filteredBreeds = breeds.filter((b) =>
    b.attributes.name.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#4CAF7A]">
          Razas de perros
        </h1>
        <p className="text-sm text-muted-foreground">
            Información detallada sobre diferentes razas de perros para ayudarte a elegir la que mejor se adapte a tu estilo de vida y preferencias.
        </p>
      </div>

      {/* BUSCADOR */}
      <div className="relative max-w-md bg-white rounded-xl shadow-sm">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Buscar raza..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />

        {suggestions.length > 0 && (
          <div className="absolute z-50 w-full bg-white border mt-2 rounded-xl shadow-lg">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSearch(s.attributes.name);
                  setSuggestions([]);
                }}
                className="w-full text-left px-4 py-2 hover:bg-muted"
              >
                {s.attributes.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      )}

      {/* CARDS */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {filteredBreeds.map((breed) => (
            <Card
              key={breed.id}
              className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* IMAGEN*/}
              <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src={images[breed.id] || "/images/fallback.jpg"}
                  alt={breed.attributes.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PawPrint className="w-4 h-4 text-[#4CAF7A]" />
                  {breed.attributes.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">

                <CardDescription
                  className={`text-sm ${
                    expanded[breed.id] ? "" : "line-clamp-3"
                  }`}
                >
                  {breed.attributes.description}
                </CardDescription>

                <div className="flex flex-wrap gap-3">

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59] text-xs font-medium">
                    <HeartPulse className="w-4 h-4" />
                    <span>
                    {breed.attributes.life.min} - {breed.attributes.life.max} años
                    </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59] text-xs font-medium">
                    <Scale className="w-4 h-4" />
                    <span>
                    {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg
                    </span>
                </div>
                
                {breed.attributes.hypoallergenic && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4CAF7A]/10 text-[#4CAF7A] text-xs font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>Hipoalergénico</span>
                    </div>
                )}

                </div>

                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [breed.id]: !prev[breed.id],
                    }))
                  }
                  className="text-xs text-[#4CAF7A] font-medium hover:underline"
                >
                  {expanded[breed.id] ? "Ver menos" : "Ver más"}
                </button>

              </CardContent>
            </Card>
          ))}

        </div>
      )}
    </div>
  );
}
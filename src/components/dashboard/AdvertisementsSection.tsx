import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ads = [
  {
    id: 1,
    title: "Summer Sale - Up to 50% Off!",
    description: "Limited time offer on electronics and accessories",
    badge: "HOT DEAL",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    id: 2,
    title: "New Arrivals - Fashion Collection",
    description: "Check out the latest trends for this season",
    badge: "NEW",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Flash Sale - Today Only!",
    description: "Grab your favorites before they're gone",
    badge: "ENDING SOON",
    gradient: "from-green-500 to-teal-500",
  },
];

export const AdvertisementsSection = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextAd = () => setCurrentAd((prev) => (prev + 1) % ads.length);
  const prevAd = () => setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Deals</h2>
      <div className="relative">
        <Card className="border-none shadow-card overflow-hidden">
          <CardContent className="p-0 relative">
            <div className={`bg-gradient-to-r ${ads[currentAd].gradient} p-8 md:p-12 text-white`}>
              <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30">
                {ads[currentAd].badge}
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">{ads[currentAd].title}</h3>
              <p className="text-lg text-white/90 mb-6">{ads[currentAd].description}</p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90"
              >
                Shop Now
              </Button>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              onClick={prevAd}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              onClick={nextAd}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAd(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentAd ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

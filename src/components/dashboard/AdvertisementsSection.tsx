import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ads = [
  {
    id: 1,
    title: "Free Health Checkup This Month!",
    description: "Comprehensive health screening for all new patients",
    badge: "LIMITED OFFER",
    gradient: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Vaccination Drive - Get Protected",
    description: "All vaccines available with special discount packages",
    badge: "IMPORTANT",
    gradient: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "24/7 Emergency Care Available",
    description: "Round-the-clock medical assistance for urgent cases",
    badge: "ALWAYS OPEN",
    gradient: "from-red-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=400&fit=crop",
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
      <h2 className="text-2xl font-bold mb-4">Health Announcements</h2>
      <div className="relative">
        <Card className="border-none shadow-card overflow-hidden">
          <CardContent className="p-0 relative">
            <div className="relative h-64 md:h-80">
              <img
                src={ads[currentAd].image}
                alt={ads[currentAd].title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${ads[currentAd].gradient} opacity-60`}></div>
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center text-white">
                <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30 w-fit">
                  {ads[currentAd].badge}
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{ads[currentAd].title}</h3>
                <p className="text-lg text-white/90 mb-6">{ads[currentAd].description}</p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90 w-fit"
                >
                  Learn More
                </Button>
              </div>
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

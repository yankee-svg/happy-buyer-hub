import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { AddProductCard } from "@/components/dashboard/AddProductCard";
import { AdvertisementsSection } from "@/components/dashboard/AdvertisementsSection";
import { RecommendedItems } from "@/components/dashboard/RecommendedItems";

const Index = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 animate-fade-in">
        <AdvertisementsSection />
        <StatsSection />
        <RecommendedItems />
        <AddProductCard />
      </div>
    </DashboardLayout>
  );
};

export default Index;

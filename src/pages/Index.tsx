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
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <StatsSection />
        <AddProductCard />
        <AdvertisementsSection />
        <RecommendedItems />
      </div>
    </DashboardLayout>
  );
};

export default Index;

import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AddProductCard = () => {
  return (
    <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-primary/5 to-accent/5 shadow-card hover:shadow-card-hover mb-8">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Register a New Patient</h3>
            <p className="text-muted-foreground">
              Register a patient record in Hosweb to manage visits, contact details, and appointments.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-hover hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl group"
          >
            <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            Register Patient
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

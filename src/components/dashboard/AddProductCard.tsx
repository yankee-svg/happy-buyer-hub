import { Card, CardContent } from "@/components/ui/card";
import { PatientRegistrationForm } from "@/components/forms/PatientRegistrationForm";

export const AddProductCard = () => {
  return (
    <Card className="mb-8 border-dashed border-2 hover:border-primary/50 transition-colors">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">New Patient Registration</h3>
        <p className="text-muted-foreground mb-4">
          Register as a patient to book appointments and access medical services
        </p>
        <PatientRegistrationForm />
      </CardContent>
    </Card>
  );
};

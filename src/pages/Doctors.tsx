import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Doctors = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      degree: 'MD, FACC',
      hours: 'Mon-Fri: 9AM-5PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      available: true,
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      degree: 'MD, FAAP',
      hours: 'Mon-Sat: 8AM-6PM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      available: true,
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Dermatologist',
      degree: 'MD, FAAD',
      hours: 'Tue-Thu: 10AM-4PM',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
      available: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              My Favorite Doctors
            </h1>
            <p className="text-muted-foreground">
              {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'} saved
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 w-full relative overflow-hidden bg-muted">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{doctor.name}</CardTitle>
                <CardDescription className="text-base font-medium">{doctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Degree</p>
                  <p className="font-semibold">{doctor.degree}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Working Hours</p>
                  <p className="font-semibold">{doctor.hours}</p>
                </div>
                <div>
                  {doctor.available ? (
                    <span className="text-green-600 font-medium">Available</span>
                  ) : (
                    <span className="text-red-600 font-medium">Unavailable</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1" disabled={!doctor.available}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Doctors;

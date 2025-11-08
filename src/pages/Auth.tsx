import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md space-y-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="gap-2"
        >
          ← Back to Home
        </Button>
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Hosweb</CardTitle>
            <CardDescription>Authentication placeholder - implement your auth system</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>Clerk authentication has been removed.</p>
            <p className="mt-2">Implement Supabase Auth or another authentication system.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

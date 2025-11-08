import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';

const Messages = () => {
  const messages = [
    {
      id: 1,
      sender: 'Laboratory',
      subject: 'Lab results ready',
      preview: 'Your recent blood test results are available. Click to view the full report.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      sender: 'Clinic Reception',
      subject: 'Appointment reminder',
      preview: 'Reminder: Your appointment with Dr. Smith is scheduled for tomorrow at 10:00 AM.',
      time: '1 day ago',
      unread: true,
    },
    {
      id: 3,
      sender: 'Pharmacy',
      subject: 'Prescription ready for pickup',
      preview: 'Your prescription for Atorvastatin is ready at the pharmacy. Bring your ID.',
      time: '3 days ago',
      unread: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            Health Messages
          </h1>
          <p className="text-muted-foreground">
            {messages.filter((m) => m.unread).length} unread notifications
          </p>
        </div>

        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                message.unread ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {message.sender.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <CardTitle className="text-lg truncate">{message.sender}</CardTitle>
                      <div className="flex items-center gap-2 shrink-0">
                        {message.unread && <Badge variant="default">New</Badge>}
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {message.time}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="font-medium">{message.subject}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{message.preview}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;

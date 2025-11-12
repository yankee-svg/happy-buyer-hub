import { Card, CardContent } from "@/components/ui/card";
import React from "react";

// Inline medical-themed SVG icons to avoid external icon name issues and match a medical vibe
const PillIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.59 3.41a4 4 0 0 0-5.66 0L3.7 14.64a4 4 0 0 0 5.66 5.66L20.59 9.07a4 4 0 0 0 0-5.66z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.46 15.54l7.08-7.08" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarCheckIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="white" strokeWidth="1.5" />
    <path d="M16 3v4M8 3v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 13l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StethoscopeIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 7v3a5 5 0 0 1-5 5h0a5 5 0 0 1-5-5V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17a3 3 0 1 0 6 0v-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17.5" cy="17.5" r="2.5" stroke="white" strokeWidth="1.5" />
  </svg>
);

const WalletIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="white" strokeWidth="1.5" />
    <path d="M16 10h2v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const stats = [
  {
    icon: PillIcon,
    label: "Medicines Purchased",
    value: "42",
    change: "+12%",
    positive: true,
    colors: 'from-sky-400 to-indigo-500'
  },
  {
    icon: CalendarCheckIcon,
    label: "Active Appointments",
    value: "3",
    change: "2 upcoming today",
    positive: true,
    colors: 'from-teal-400 to-cyan-500'
  },
  {
    icon: StethoscopeIcon,
    label: "Preferred Doctors",
    value: "5",
    change: "Most visited",
    positive: true,
    colors: 'from-emerald-400 to-sky-500'
  },
  {
    icon: WalletIcon,
    label: "Insurance Balance",
    value: "$2,500",
    change: "Remaining",
    positive: true,
    colors: 'from-indigo-400 to-violet-500'
  },
];

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="border-none shadow-colored hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-fade-in bg-gradient-to-br from-card to-primary-light/30"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">{stat.value}</p>
                  <p
                    className={`text-sm font-medium ${
                      stat.positive ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.colors}`}>
                  {/* render icon component */}
                  {React.createElement(stat.icon, { className: 'h-6 w-6' })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

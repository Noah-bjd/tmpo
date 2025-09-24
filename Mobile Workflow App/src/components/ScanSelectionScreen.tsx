import { UtensilsCrossed, LogIn, LogOut, Calendar, Menu, Edit3 } from "lucide-react";
import { Button } from "./ui/button";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

interface ScanSelectionScreenProps {
  onSelectMeal: () => void;
  onSelectScan: (type: string) => void;
  onManualEntry: () => void;
  onLogout: () => void;
}

export function ScanSelectionScreen({ onSelectMeal, onSelectScan, onManualEntry, onLogout }: ScanSelectionScreenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scanOptions = [
    {
      id: 'meal',
      label: 'Meal',
      icon: UtensilsCrossed,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      onClick: onSelectMeal
    },
    {
      id: 'checkin',
      label: 'Check-In',
      icon: LogIn,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      onClick: () => onSelectScan('checkin')
    },
    {
      id: 'checkout',
      label: 'Check-Out',
      icon: LogOut,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      onClick: () => onSelectScan('checkout')
    },
    {
      id: 'event',
      label: 'Enter Event',
      icon: Calendar,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      onClick: () => onSelectScan('event')
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="flex-1 text-center text-foreground lg:text-left">Choose What to Scan</h1>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-6">
          {/* Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 rounded-[55px]">
            {scanOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.onClick}
                className={`
                  aspect-square rounded-2xl shadow-sm border border-border bg-card
                  flex flex-col items-center justify-center space-y-4 p-6
                  transition-all duration-200 hover:shadow-md active:scale-95
                `}
              >
                <div className={`w-16 h-16 rounded-xl ${option.color} ${option.hoverColor} flex items-center justify-center transition-colors`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-card-foreground text-lg">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Manual Entry Button */}
          <div className="max-w-sm mx-auto w-full">
            <Button
              onClick={onManualEntry}
              variant="outline"
              className="w-full h-14 bg-background border-border text-foreground hover:bg-muted/50"
            >
              <Edit3 className="w-5 h-5 mr-3" />
              Add Info Manually
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface ScanningScreenProps {
  onBack: () => void;
  scanType: string;
}

export function ScanningScreen({ onBack, scanType }: ScanningScreenProps) {
  const [scanLinePosition, setScanLinePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLinePosition((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleConfirm = () => {
    // Handle scan confirmation
    console.log("Scan confirmed for:", scanType);
    onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <h1 className="text-center text-foreground">Scanning in Progress</h1>
      </div>

      {/* Scanning Frame */}
      <div className="px-6 flex-1 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full">
          {/* Scanning Frame */}
          <div className="relative bg-card border-2 border-primary rounded-2xl p-8 mb-6 overflow-hidden">
            <div className="aspect-square bg-muted/20 rounded-xl border-2 border-dashed border-muted-foreground/30 relative">
              {/* Corner indicators */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-primary"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-primary"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary"></div>
              
              {/* Scanning line */}
              <div 
                className="absolute left-0 right-0 h-0.5 bg-primary/80 transition-all duration-75 ease-linear"
                style={{ top: `${scanLinePosition}%` }}
              ></div>
            </div>
          </div>

          {/* Instructions */}
          <p className="text-center text-muted-foreground mb-8">
            Align the QR or barcode inside the frame
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 h-12 bg-background border-border text-foreground hover:bg-muted/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
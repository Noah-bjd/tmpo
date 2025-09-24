import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { format } from "date-fns";

interface ManualEntryScreenProps {
  onBack: () => void;
}

export function ManualEntryScreen({ onBack }: ManualEntryScreenProps) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [date, setDate] = useState<Date>();
  const [actionType, setActionType] = useState("");
  const [mealType, setMealType] = useState("");

  const handleReset = () => {
    setNom("");
    setPrenom("");
    setDate(undefined);
    setActionType("");
    setMealType("");
  };

  const handleAdd = () => {
    // Handle form submission
    console.log({ nom, prenom, date, actionType, mealType });
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
        <h1 className="text-center text-foreground">Manual Entry</h1>
      </div>

      {/* Form */}
      <div className="px-6 pb-6">
        <div className="max-w-sm mx-auto space-y-6">
          {/* Nom */}
          <div className="space-y-2">
            <Label htmlFor="nom" className="text-foreground">Nom</Label>
            <Input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez le nom"
              className="h-12 bg-input-background border-border"
            />
          </div>

          {/* Prénom */}
          <div className="space-y-2">
            <Label htmlFor="prenom" className="text-foreground">Prénom</Label>
            <Input
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Entrez le prénom"
              className="h-12 bg-input-background border-border"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-foreground">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left bg-input-background border-border hover:bg-input-background/80"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Sélectionnez une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Type of Action */}
          <div className="space-y-2">
            <Label className="text-foreground">Type of Action</Label>
            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger className="h-12 bg-input-background border-border">
                <SelectValue placeholder="Sélectionnez le type d'action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meal">Meal</SelectItem>
                <SelectItem value="checkin">Check-In</SelectItem>
                <SelectItem value="checkout">Check-Out</SelectItem>
                <SelectItem value="event">Enter Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Meal Type (conditional) */}
          {actionType === "meal" && (
            <div className="space-y-2">
              <Label className="text-foreground">Meal Type</Label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger className="h-12 bg-input-background border-border">
                  <SelectValue placeholder="Sélectionnez le type de repas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 h-12 bg-background border-border text-foreground hover:bg-muted/50"
            >
              Reset
            </Button>
            <Button
              onClick={handleAdd}
              className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { ArrowLeft, Sunrise, Sun, Moon } from "lucide-react";

interface MealSubcategoryScreenProps {
  onBack: () => void;
  onSelectMeal: (mealType: string) => void;
}

export function MealSubcategoryScreen({ onBack, onSelectMeal }: MealSubcategoryScreenProps) {
  const mealTypes = [
    {
      id: 'breakfast',
      label: 'Breakfast',
      icon: Sunrise,
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600'
    },
    {
      id: 'lunch',
      label: 'Lunch',
      icon: Sun,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      id: 'dinner',
      label: 'Dinner',
      icon: Moon,
      color: 'bg-violet-600',
      hoverColor: 'hover:bg-violet-700'
    }
  ];

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
        <h1 className="text-center text-foreground">Select Meal Type</h1>
      </div>

      {/* Meal options */}
      <div className="px-6">
        <div className="space-y-4 max-w-sm mx-auto">
          {mealTypes.map((meal) => (
            <button
              key={meal.id}
              onClick={() => onSelectMeal(meal.id)}
              className={`
                w-full h-20 rounded-2xl shadow-sm border border-border bg-card
                flex items-center space-x-4 px-6
                transition-all duration-200 hover:shadow-md active:scale-95
              `}
            >
              <div className={`w-12 h-12 rounded-xl ${meal.color} ${meal.hoverColor} flex items-center justify-center transition-colors flex-shrink-0`}>
                <meal.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-card-foreground flex-1 text-left">{meal.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
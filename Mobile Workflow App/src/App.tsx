import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { ScanSelectionScreen } from './components/ScanSelectionScreen';
import { MealSubcategoryScreen } from './components/MealSubcategoryScreen';
import { ManualEntryScreen } from './components/ManualEntryScreen';
import { ScanningScreen } from './components/ScanningScreen';

type Screen = 'login' | 'scan-selection' | 'meal-subcategory' | 'manual-entry' | 'scanning';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [scanType, setScanType] = useState<string>('');

  const handleLogin = () => {
    setCurrentScreen('scan-selection');
  };

  const handleSelectMeal = () => {
    setCurrentScreen('meal-subcategory');
  };

  const handleSelectScan = (type: string) => {
    setScanType(type);
    setCurrentScreen('scanning');
  };

  const handleManualEntry = () => {
    setCurrentScreen('manual-entry');
  };

  const handleMealSelection = (mealType: string) => {
    setScanType(`meal-${mealType}`);
    setCurrentScreen('scanning');
  };

  const handleBackToMain = () => {
    setCurrentScreen('scan-selection');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="size-full max-w-6xl mx-auto bg-background">
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}
      
      {currentScreen === 'scan-selection' && (
        <ScanSelectionScreen 
          onSelectMeal={handleSelectMeal}
          onSelectScan={handleSelectScan}
          onManualEntry={handleManualEntry}
          onLogout={handleLogout}
        />
      )}
      
      {currentScreen === 'meal-subcategory' && (
        <MealSubcategoryScreen 
          onBack={handleBackToMain}
          onSelectMeal={handleMealSelection}
        />
      )}

      {currentScreen === 'manual-entry' && (
        <ManualEntryScreen onBack={handleBackToMain} />
      )}

      {currentScreen === 'scanning' && (
        <ScanningScreen 
          onBack={handleBackToMain}
          scanType={scanType}
        />
      )}
    </div>
  );
}
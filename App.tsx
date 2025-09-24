import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LoginScreen } from './components/LoginScreen';
import { ScanSelectionScreen } from './components/ScanSelectionScreen';
import { MealSubcategoryScreen } from './components/MealSubcategoryScreen';
import { ManualEntryScreen } from './components/ManualEntryScreen';
import { ScanningScreen } from './components/ScanningScreen';
type Screen = 'login' | 'scan-selection' | 'meal-subcategory' | 'manual-entry' | 'scanning';
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [previousScreen, setPreviousScreen] = useState<Screen>('login');
  const [scanType, setScanType] = useState<string>('');
  
  // Animation values for page transitions
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate when screen changes
    if (currentScreen === 'meal-subcategory') {
      // Slide in from right when entering meal subcategory
      slideAnim.setValue(1);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (previousScreen === 'meal-subcategory') {
      // Slide out to right when leaving meal subcategory
      slideAnim.setValue(0);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    
    // Update previous screen for next transition
    setPreviousScreen(currentScreen);
  }, [currentScreen]);

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

  // Get the slide animation value for MealSubcategoryScreen
  const getMealScreenSlideAnim = () => {
    if (currentScreen === 'meal-subcategory') {
      return slideAnim;
    }
    // Return a static value for other screens
    return new Animated.Value(0);
  };

  return (
    <View style={styles.container}>
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
      {/* Other screens remain unchanged */}
      {/* 

      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
});
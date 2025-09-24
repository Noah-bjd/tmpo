import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Sunrise, Sun, Moon } from 'lucide-react-native';

interface MealSubcategoryScreenProps {
  onBack: () => void;
  onSelectMeal: (mealType: string) => void;
}

type MealType = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
};

export function MealSubcategoryScreen({ onBack, onSelectMeal }: MealSubcategoryScreenProps) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const backButtonScale = React.useRef(new Animated.Value(1)).current;
  const headerLineAnimation = React.useRef(new Animated.Value(0)).current;

  const mealTypes: MealType[] = [
    {
      id: 'breakfast',
      label: 'Breakfast',
      icon: Sunrise,
      color: '#eab308', // yellow-500
    },
    {
      id: 'lunch',
      label: 'Lunch',
      icon: Sun,
      color: '#2563eb', // blue-600
    },
    {
      id: 'dinner',
      label: 'Dinner',
      icon: Moon,
      color: '#7c3aed', // violet-600
    },
  ];
  const buttonAnimations = React.useRef(mealTypes.map(() => new Animated.Value(0))).current;
  
  React.useEffect(() => {
    // Staggered animation for meal buttons
    const animations = buttonAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    // Animate header line
    Animated.sequence([
      Animated.timing(headerLineAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.stagger(100, animations)
    ]).start();
  }, []);

  const handleBackPress = () => {
    // Clean, smooth animation with proper timing
    Animated.sequence([
      Animated.timing(backButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start(() => {
      onBack();
    });
  };

  const handleMealPressIn = (index: number) => {
    Animated.spring(buttonAnimations[index], {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  const handleMealPressOut = (index: number) => {
    Animated.spring(buttonAnimations[index], {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  const getBackButtonStyle = () => ({
    transform: [{ scale: backButtonScale }],
  });

  const getHeaderLineStyle = () => ({
    transform: [
      {
        scaleX: headerLineAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    opacity: headerLineAnimation,
  });

  const getMealButtonStyle = (index: number, meal: MealType) => [
    styles.mealButton,
    {
      transform: [
        {
          scale: buttonAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
      ],
      opacity: buttonAnimations[index],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Lowered placement */}
      <View style={[styles.header, { paddingHorizontal: screenWidth * 0.06 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButtonTouchable}
            activeOpacity={0.6}
          >
            <Animated.View style={[styles.backButtonContent, getBackButtonStyle()]}>
              <ArrowLeft size={20} color="#6b7280" />
            </Animated.View>
          </TouchableOpacity>
          
          <Text style={styles.title}>Select Meal Type</Text>
          
          {/* Spacer to balance the layout */}
          <View style={styles.headerSpacer} />
        </View>
        
        {/* Animated line under header */}
        <Animated.View style={[styles.headerLine, getHeaderLineStyle()]} />
      </View>

      {/* Meal options */}
      <View style={[styles.content, { paddingHorizontal: screenWidth * 0.06 }]}>
        <View style={[styles.mealContainer, { maxWidth: Math.min(screenWidth * 0.8, 400) }]}>
          {mealTypes.map((meal, index) => (
            <Animated.View
              key={meal.id}
              style={getMealButtonStyle(index, meal)}
            >
              <TouchableOpacity
                onPressIn={() => handleMealPressIn(index)}
                onPressOut={() => handleMealPressOut(index)}
                onPress={() => onSelectMeal(meal.id)}
                style={styles.mealButtonInner}
                activeOpacity={0.9}
              >
                <View style={[styles.iconContainer, { backgroundColor: meal.color }]}>
                  <meal.icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.mealLabel}>{meal.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: Dimensions.get('window').height * 0.07,
    paddingBottom: Dimensions.get('window').height * 0.02,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  backButtonTouchable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  headerLine: {
    height: 1,
    backgroundColor: '#e5e7eb',
    width: '100%',
    transformOrigin: 'left',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  mealContainer: {
    width: '100%',
    alignSelf: 'center',
    gap: 16,
  },
  mealButton: {
    width: '100%',
    height: 80,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealButtonInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mealLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
    textAlign: 'left',
  },
});

export default MealSubcategoryScreen;
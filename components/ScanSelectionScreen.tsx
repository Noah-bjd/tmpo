import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Edit3, Menu, Calendar, LogOut, LogIn, UtensilsCrossed } from 'lucide-react-native';
import { Sidebar } from './Sidebar';

interface ScanSelectionScreenProps {
  onSelectMeal: () => void;
  onSelectScan: (type: string) => void;
  onManualEntry: () => void;
  onLogout: () => void;
}

export function ScanSelectionScreen({ 
  onSelectMeal, 
  onSelectScan, 
  onManualEntry, 
  onLogout 
}: ScanSelectionScreenProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const buttonScale = React.useRef(new Animated.Value(1)).current;

  const scanOptions = [
    {
      id: 'meal',
      label: 'Repat',
      icon: UtensilsCrossed,
      color: '#f97316',
      onClick: onSelectMeal
    },
    {
      id: 'checkin',
      label: 'Check-In',
      icon: LogIn,
      color: '#22c55e',
      onClick: () => onSelectScan('checkin')
    },
    {
      id: 'checkout',
      label: 'Check-Out',
      icon: LogOut,
      color: '#ef4444',
      onClick: () => onSelectScan('checkout')
    },
    {
      id: 'event',
      label: 'Événement',
      icon: Calendar,
      color: '#a855f7',
      onClick: () => onSelectScan('event')
    }
  ];

  const animatePress = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => callback());
  };

  // Get screen dimensions
  const { width, height } = Dimensions.get('window');
  const isSmallScreen = width < 375; // iPhone SE, small Android devices
  const isLargeScreen = width > 414; // Large phones, tablets
  const isTablet = width > 768; // iPad and larger tablets

  // Responsive calculations
  const gridItemSize = isTablet ? 
    Math.min(180, width * 0.22) : 
    isSmallScreen ? 
      (width - 60) / 2 : 
      (width - 80) / 2;
  
  const iconSize = isTablet ? 40 : isSmallScreen ? 28 : 32;
  const titleFontSize = isTablet ? 24 : isSmallScreen ? 18 : 20;
  const labelFontSize = isTablet ? 18 : isSmallScreen ? 14 : 16;
  const gridGap = isTablet ? 20 : isSmallScreen ? 12 : 16;
  const horizontalPadding = isTablet ? 32 : isSmallScreen ? 16 : 24;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />
      
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
          <TouchableOpacity
            onPress={() => setSidebarOpen(true)}
            style={styles.menuButton}
          >
            <Menu size={isTablet ? 28 : 24} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.title, { fontSize: titleFontSize }]}>
            Sélectionnez le scan 
          </Text>
          <View style={[styles.headerSpacer, { width: isTablet ? 48 : 40 }]} />
        </View>

        {/* Main Content - Centered */}
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContent, 
            { 
              paddingHorizontal: horizontalPadding,
              minHeight: height - (isTablet ? 300 : 200),
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Grid */}
          <View style={styles.gridContainer}>
            <View style={[styles.grid, { gap: gridGap, maxWidth: isTablet ? 600 : 400 }]}>
              {scanOptions.map((option) => (
                <Animated.View
                  key={option.id}
                  style={[
                    styles.gridItem,
                    { 
                      width: gridItemSize,
                      transform: [{ scale: buttonScale }] 
                    }
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => animatePress(option.onClick)}
                    style={styles.gridButton}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.iconContainer, 
                      { 
                        backgroundColor: option.color,
                        width: isTablet ? 80 : isSmallScreen ? 56 : 64,
                        height: isTablet ? 80 : isSmallScreen ? 56 : 64,
                        marginBottom: isTablet ? 20 : isSmallScreen ? 12 : 16,
                      }
                    ]}>
                      <option.icon size={iconSize} color="#fff" />
                    </View>
                    <Text style={[styles.gridLabel, { fontSize: labelFontSize }]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Manual Entry Button */}
          <View style={[styles.manualEntryContainer, { maxWidth: isTablet ? 600 : 400 }]}>
            <TouchableOpacity
              onPress={onManualEntry}
              style={[
                styles.manualEntryButton,
                { height: isTablet ? 64 : isSmallScreen ? 48 : 56 }
              ]}
              activeOpacity={0.7}
            >
              <Edit3 size={isTablet ? 24 : isSmallScreen ? 18 : 20} color="#000" />
              <Text style={[
                styles.manualEntryText, 
                { fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16 }
              ]}>
                Ajouter 
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom spacer for better centering */}
          <View style={[styles.bottomSpacer, { height: isTablet ? 60 : 40 }]} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 10,
  },
  headerSpacer: {
    // Width set dynamically based on screen size
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  gridContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Changed to center for better tablet layout
    width: '100%',
  },
  gridItem: {
    aspectRatio: 1,
    marginBottom: 16,
  },
  gridButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16, // Reduced base padding, increased dynamically
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLabel: {
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false, // Better text alignment
  },
  manualEntryContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  manualEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    width: '100%',
    marginTop: 20,
  },
  manualEntryText: {
    fontWeight: '500',
    color: '#000',
    marginLeft: 12,
    includeFontPadding: false,
  },
  bottomSpacer: {
    // Height set dynamically
  },
});

// Additional responsive utility component
export const ResponsiveView = ({ children, style, ...props }: any) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;
  
  return (
    <View 
      style={[
        style,
        isTablet && { paddingHorizontal: 32 } // Extra padding for tablets
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

// Hook for responsive values
export const useResponsive = () => {
  const { width, height } = Dimensions.get('window');
  
  return {
    width,
    height,
    isSmallScreen: width < 375,
    isMediumScreen: width >= 375 && width <= 414,
    isLargeScreen: width > 414,
    isTablet: width > 768,
    
  
    responsiveSize: (small: number, medium: number, large: number, tablet: number) => {
      if (width > 768) return tablet;
      if (width > 414) return large;
      if (width >= 375) return medium;
      return small;
    },
    
    responsivePadding: () => {
      if (width > 768) return 32;
      if (width > 414) return 24;
      if (width >= 375) return 20;
      return 16;
    }
  };
};

export default ScanSelectionScreen;
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { User, X,LogOut  } from 'lucide-react-native';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const { height: screenHeight } = Dimensions.get('window');
  React.useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, slideAnim]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}
      
      {/* Sidebar */}
      <Animated.View 
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
            >
              <X size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* User Profile Section */}
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <User size={24} color="#374151" />
              </View>
              <View>
                <Text style={styles.userName}>Appah Doe</Text>
                <Text style={styles.userRole}>Employee</Text>
              </View>
            </View>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Logout Button at Bottom */}
          <View style={styles.logoutSection}>
            <TouchableOpacity
              onPress={onLogout}
              style={styles.logoutButton}
              activeOpacity={0.7}
            >
              <LogOut size={16} color="#000" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 40,
  },
  sidebar: {
    ...StyleSheet.absoluteFillObject, // full screen
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    backgroundColor: '#f8f9fa',
    borderRightWidth: 1,
    borderRightColor: '#e5e5e5',
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
  },
  userSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: '#e5e7eb',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#6b7280',
  },
  spacer: {
    flex: 1,
  },
  logoutSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 8,
  },
});
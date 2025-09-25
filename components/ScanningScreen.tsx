import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";

interface ScanningScreenProps {
  onBack: () => void;
  scanType: string;
}

export function ScanningScreen({ onBack, scanType }: ScanningScreenProps) {
  const [scanLinePosition] = useState(new Animated.Value(0));

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLinePosition, {
            toValue: 100,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(scanLinePosition, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };
    animate();
  }, []);

  const handleConfirm = () => {
    console.log("Scan confirmed for:", scanType);
    onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={20} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scanning in Progress</Text> */}
      </View>

      {/* Scanning Frame */}
      <View style={styles.frameWrapper}>
        <View style={styles.frame}>
          {/* Corner indicators */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Scanning line */}
          <Animated.View
            style={[
              styles.scanLine,
              {
                top: scanLinePosition.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Align the QR or barcode inside the frame
      </Text>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={onBack} style={[styles.button, styles.cancel]}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleConfirm} style={[styles.button, styles.confirm]}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // matches "bg-background"
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee", // bg-muted
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  frameWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: width * 0.8,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#007AFF", // primary
    backgroundColor: "#f9f9f9",
    position: "relative",
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#007AFF",
  },
  topLeft: { top: 8, left: 8, borderLeftWidth: 2, borderTopWidth: 2 },
  topRight: { top: 8, right: 8, borderRightWidth: 2, borderTopWidth: 2 },
  bottomLeft: { bottom: 8, left: 8, borderLeftWidth: 2, borderBottomWidth: 2 },
  bottomRight: {
    bottom: 8,
    right: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(0,122,255,0.8)",
  },
  instructions: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  cancel: {
    backgroundColor: "#f0f0f0",
  },
  confirm: {
    backgroundColor: "#007AFF",
  },
  cancelText: {
    color: "#333",
    fontSize: 16,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
  },
});

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import CameraKitCameraScreen from 'react-native-camera-kit';

interface ScanningScreenProps {
  onBack: () => void;
  scanType: string;
}

export function ScanningScreen({ onBack, scanType }: ScanningScreenProps) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to scan codes.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setHasCameraPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setHasCameraPermission(false);
      }
    } else {
      setHasCameraPermission(true);
    }
  };

  const onBarcodeScan = (event: any) => {
    if (event.nativeEvent.codeStringValue && !scannedData) {
      const data = event.nativeEvent.codeStringValue;
      setScannedData(data);
      setIsCameraActive(false);
      
      Alert.alert(
        'Scan Successful',
        `Scanned: ${data}`,
        [
          {
            text: 'OK',
            onPress: () => handleScanResult(data)
          },
          {
            text: 'Scan Again',
            onPress: () => {
              setScannedData(null);
              setIsCameraActive(true);
            }
          }
        ]
      );
    }
  };

  const handleScanResult = (data: string) => {
    console.log(`Scan result for ${scanType}:`, data);
    // Process the scanned data here
  };

  const handleManualConfirm = () => {
    if (scannedData) {
      handleScanResult(scannedData);
    } else {
      console.log("Manual confirmation for:", scanType);
    }
    onBack();
  };

  const handleScanAgain = () => {
    setScannedData(null);
    setIsCameraActive(true);
  };

  const getResponsiveSize = (size: number) => {
    const baseWidth = 375;
    return (size / baseWidth) * screenWidth;
  };

  if (hasCameraPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Camera permission is required to scan codes.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: screenWidth * 0.05 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { width: getResponsiveSize(40), height: getResponsiveSize(40) }]}
            activeOpacity={0.7}
          >
            <ArrowLeft size={getResponsiveSize(20)} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { fontSize: getResponsiveSize(24) }]}>
          Scanning {scanType.replace('meal-', '').toUpperCase()}
        </Text>
      </View>

      {/* Camera View or Scan Result */}
      <View style={styles.cameraContainer}>
        {isCameraActive ? (
          <CameraKitCameraScreen
            style={styles.camera}
            scanBarcode={true}
            onReadCode={onBarcodeScan}
            showFrame={true}
            laserColor="#3b82f6"
            frameColor="#3b82f6"
            colorForScannerFrame="black"
            hideControls={true}
          />
        ) : (
          <View style={styles.scanResultContainer}>
            <Text style={styles.scanResultTitle}>Scan Complete!</Text>
            <Text style={styles.scanResultData}>{scannedData}</Text>
            <TouchableOpacity style={styles.scanAgainButton} onPress={handleScanAgain}>
              <Text style={styles.scanAgainText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Instructions */}
      {isCameraActive && (
        <View style={styles.instructionsContainer}>
          <Text style={[styles.instructions, { fontSize: getResponsiveSize(16) }]}>
            Align the QR or barcode inside the frame
          </Text>
        </View>
      )}

      {/* Buttons */}
      <View style={[styles.footer, { paddingHorizontal: screenWidth * 0.05 }]}>
        <View style={[styles.buttonContainer, { gap: getResponsiveSize(16) }]}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.button, styles.cancelButton, {
              height: getResponsiveSize(48),
              borderRadius: getResponsiveSize(8),
            }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText, {
              fontSize: getResponsiveSize(16),
            }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleManualConfirm}
            style={[styles.button, styles.confirmButton, {
              height: getResponsiveSize(48),
              borderRadius: getResponsiveSize(8),
            }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.confirmButtonText, {
              fontSize: getResponsiveSize(16),
            }]}>
              {scannedData ? 'Confirm' : 'Manual Entry'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  permissionText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    paddingTop: Dimensions.get('window').height * 0.03,
    paddingBottom: Dimensions.get('window').height * 0.02,
    backgroundColor: '#000000',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.01,
  },
  backButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  scanResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  scanResultTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  scanResultData: {
    color: '#3b82f6',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    padding: 15,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
  },
  scanAgainButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },
  scanAgainText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructions: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '400',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  footer: {
    paddingVertical: Dimensions.get('window').height * 0.02,
    backgroundColor: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  confirmButton: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    fontWeight: '500',
  },
  cancelButtonText: {
    color: '#ffffff',
  },
  confirmButtonText: {
    color: '#ffffff',
  },
});

export default ScanningScreen;
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();

  async function startScanning() {
    if (!permission?.granted) {
      await requestPermission();
    }
    setScanning(true);
  }

  if (scanning) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8", "qr"] }}
          onBarcodeScanned={(result) => {
            console.log(result);
            setScanResult(result);
            setScanning(false);
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={startScanning}
        style={{ padding: 16, backgroundColor: "#007AFF", borderRadius: 8, margin: 24 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
          Open Camera
        </Text>
      </Pressable>
    </View>
  );
}

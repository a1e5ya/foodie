import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardLabel: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    letterSpacing: 2,
  },
  cardType: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 6,
    textTransform: "uppercase",
  },
  button: {
    padding: 16,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

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
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      {scanResult && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Barcode scanned</Text>
          <Text style={styles.cardValue}>{scanResult.data}</Text>
          <Text style={styles.cardType}>{scanResult.type}</Text>
        </View>
      )}
      <Pressable
        onPress={startScanning}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {scanResult ? "Scan again" : "Open Camera"}
        </Text>
      </Pressable>
    </View>
  );
}

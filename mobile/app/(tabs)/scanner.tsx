import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';
import { searchBookByISBN } from '@/services/openLibrary';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleBarcodeScanned({
    data,
    type,
  }: {
    data: string;
    type: string;
  }) {
    if (scanned || loading) {
      return;
    }

    setScanned(true);
    setLoading(true);
    setError('');

    try {
      console.log('Scanned ISBN:', data);
      console.log('Barcode type:', type);

      const results = await searchBookByISBN(data);

      if (results.length === 0) {
        setError('We could not find that book in the Open Library database. Try searching for it or adding it manually');
        setScanned(false);
        return;
      }

      const book = results[0];

      router.replace({
        pathname: '/book-details',
        params: {
          id: book.id,
          title: book.title,
          authors: book.authors.join(', '),
          coverUrl: book.coverUrl ?? '',
          firstPublishYear: book.firstPublishYear?.toString() ?? '',
          isbn: book.isbn ?? '',
        },
      });
    } catch (error) {
      console.error(error);
      setError('Something went wrong while looking up that book.');
      setScanned(false);
    } finally {
      setLoading(false);
    }
  }

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.forest} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Ionicons
          name="camera-outline"
          size={48}
          color={colors.forest}
        />

        <Text style={styles.permissionTitle}>
          Camera Permission Needed
        </Text>

        <Text style={styles.permissionText}>
          BookScout needs access to your camera to scan ISBN barcodes.
        </Text>

        <Pressable
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            Allow Camera
          </Text>
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8'],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <View style={styles.overlay}>
        <Pressable
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="close"
            size={30}
            color={colors.white}
          />
        </Pressable>

        <View style={styles.scannerBox} />

        <Text style={styles.instruction}>
          Point your camera at the barcode on your book
        </Text>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={colors.white}
            />

            <Text style={styles.loadingText}>
              Finding your book...
            </Text>
          </View>
        )}

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.tryAgainButton}
              onPress={() => {
                setError('');
                setScanned(false);
              }}
            >
              <Text style={styles.tryAgainText}>
                Try Again
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },

  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },

  scannerBox: {
    width: 280,
    height: 180,
    borderWidth: 3,
    borderColor: colors.cream,
    borderRadius: 16,
  },

  instruction: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },

  loadingContainer: {
    alignItems: 'center',
    marginTop: 24,
  },

  loadingText: {
    color: colors.white,
    fontSize: 16,
    marginTop: 10,
  },

  errorContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 30,
  },

  errorText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },

  tryAgainButton: {
    backgroundColor: colors.cream,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  tryAgainText: {
    color: colors.forest,
    fontWeight: '600',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
    padding: 30,
  },

  permissionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.dark,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },

  permissionText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 24,
  },

  permissionButton: {
    backgroundColor: colors.forest,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },

  permissionButtonText: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: '700',
  },

  cancelButton: {
    marginTop: 12,
    padding: 10,
  },

  cancelButtonText: {
    color: colors.forest,
    fontSize: 16,
    fontWeight: '600',
  },
});
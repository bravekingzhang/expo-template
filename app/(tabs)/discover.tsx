import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function Discover() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    (async () => {
      // 请求相机权限
      const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (imagePermission.status !== 'granted') {
        Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
      }

      // 请求位置权限
      const locationPermission = await Location.requestForegroundPermissionsAsync();
      if (locationPermission.status !== 'granted') {
        Alert.alert('Permission needed', 'Sorry, we need location permissions to make this work!');
      }
    })();
  }, []);

  // 图片选择器
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // 获取位置
  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    }
  };

  // 动画样式
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}deg` },
    ],
  }));

  // 手势
  const tap = Gesture.Tap().onStart(() => {
    rotation.value = withSequence(
      withTiming(10),
      withSpring(0)
    );
  });

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expo 功能展示</Text>

      {/* 图片选择器展示 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>图片选择器</Text>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>选择图片</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </View>

      {/* 地图展示 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>地图功能</Text>
        <TouchableOpacity style={styles.button} onPress={getLocation}>
          <Text style={styles.buttonText}>获取当前位置</Text>
        </TouchableOpacity>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          </MapView>
        )}
      </View>

      {/* 动画和手势展示 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>动画与手势</Text>
        <Text style={styles.description}>点击或缩放下面的框</Text>
        <GestureDetector gesture={Gesture.Race(tap, pinch)}>
          <Animated.View style={[styles.animatedBox, animatedStyle]} />
        </GestureDetector>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  animatedBox: {
    width: 100,
    height: 100,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
});

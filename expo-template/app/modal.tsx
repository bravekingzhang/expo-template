import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import i18n from '@/i18n';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl font-bold text-gray-900 dark:text-white">
        {i18n.t('modal.title')}
      </Text>
      <View className="mt-4 px-4">
        <Text className="text-gray-700 dark:text-gray-300 text-center">
          {i18n.t('modal.description')}
        </Text>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

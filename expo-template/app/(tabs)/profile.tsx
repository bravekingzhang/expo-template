import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";
import UserProfile from "@/components/UserProfile";
import { useThemeStore } from "@/store/theme";
import i18n from "@/i18n";

export default function Profile() {
  const router = useRouter();
  const { colorScheme, language, toggleTheme, setLanguage } = useThemeStore();
  const isDarkMode = colorScheme === 'dark';

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("currentUser");
    router.replace("/login");
  };

  const handleLanguageChange = () => {
    const newLang = language === "en" ? "zh" : "en";
    setLanguage(newLang);
    i18n.locale = newLang;
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        {/* 用户信息组件 */}
        <UserProfile />

        {/* 设置区域 */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {i18n.t("profile.settings")}
          </Text>

          {/* 暗黑模式设置 */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <FontAwesome6
                className="w-10"
                name="moon"
                size={20}
                color={isDarkMode ? "#60a5fa" : "#6b7280"}
              />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">
                {i18n.t("profile.darkMode")}
              </Text>
            </View>
            <Switch thumbColor={isDarkMode ? "#60a5fa" : "#6b7280"} value={isDarkMode} onValueChange={toggleTheme} />
          </View>

          {/* 语言设置 */}
          <TouchableOpacity
            onPress={handleLanguageChange}
            className="flex-row items-center justify-between mb-4"
          >
            <View className="flex-row items-center">
              <FontAwesome6
                className="w-10"
                name="language"
                size={20}
                color={isDarkMode ? "#60a5fa" : "#6b7280"}
              />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">
                {i18n.t("profile.language")}
              </Text>
            </View>
            <Text className="text-sky-600 dark:text-sky-400">
              {language.toUpperCase()}
            </Text>
          </TouchableOpacity>

          {/* 其他设置项 */}
          <TouchableOpacity
            className="flex-row items-center justify-between mb-4"
            onPress={() => {
              Alert.alert(
                i18n.t("profile.settings"),
                i18n.t("profile.settingsDescription")
              );
            }}
          >
            <View className="flex-row items-center">
              <FontAwesome6
                className="w-10"
                name="bell"
                size={20}
                color={isDarkMode ? "#60a5fa" : "#6b7280"}
              />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">
                {i18n.t("profile.notifications")}
              </Text>
            </View>
            <FontAwesome6
              name="chevron-right"
              size={16}
              color={isDarkMode ? "#60a5fa" : "#6b7280"}
            />
          </TouchableOpacity>

          {/* 隐私设置 */}
          <TouchableOpacity
            className="flex-row items-center justify-between mb-4"
            onPress={() => {
              Alert.alert(
                i18n.t("profile.privacy"),
                i18n.t("profile.privacyDescription")
              );
            }}
          >
            <View className="flex-row items-center">
              <FontAwesome6
                className="w-10"
                name="lock"
                size={20}
                color={isDarkMode ? "#60a5fa" : "#6b7280"}
              />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">
                {i18n.t("profile.privacy")}
              </Text>
            </View>
            <FontAwesome6
              name="chevron-right"
              size={16}
              color={isDarkMode ? "#60a5fa" : "#6b7280"}
            />
          </TouchableOpacity>
        </View>

        {/* 退出登录按钮 */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-sky-600 dark:bg-sky-700 px-6 py-3 rounded-lg w-full"
        >
          <Text className="text-white font-semibold text-center">
            {i18n.t("auth.logout")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

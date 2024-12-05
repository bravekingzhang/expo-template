import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSWR from "swr";
import { api } from "../../lib/api/index";
import type { AppUser } from "../../types/user";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Profile() {
  const router = useRouter();

  // 获取用户信息
  const {
    data: user,
    error,
    isLoading,
  } = useSWR<AppUser>("currentUser", api.user.getProfile);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("currentUser");
    router.replace("/login");
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Text className="text-red-500 text-center mb-4">
          Failed to load profile
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-sky-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-gray-600 dark:text-gray-400">
          No profile data available
        </Text>
      </View>
    );
  }



  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* 顶部个人信息 */}
      <View className="items-center pt-8 pb-6">
        <View className="items-center">
          <Image
            source={{ uri: user.avatar }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </Text>
          {user.bio && (
            <Text className="text-gray-600 dark:text-gray-300 text-center mt-2">
              {user.bio}
            </Text>
          )}
        </View>

        {/* 统计信息 */}
        <View className="flex-row justify-around mb-6 bg-white dark:bg-gray-800 rounded-lg p-4">
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {user.postsCount}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {user.followersCount}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {user.followingCount}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Following</Text>
          </View>
        </View>

        {/* 用户信息列表 */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          {user.company && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6
                name="building"
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">
                {user.company}
              </Text>
            </View>
          )}
          {user.location && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6
                name="location-dot"
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">
                {user.location}
              </Text>
            </View>
          )}
          {user.email && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6
                name="envelope"
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">
                {user.email}
              </Text>
            </View>
          )}
        </View>

        {/* 退出登录按钮 */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-sky-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

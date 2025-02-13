import * as React from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import type { AppUser } from "@/types/user";
import useSWR from "swr";
import { api } from "@/lib/api";
import { useThemeStore } from "@/store/theme";

/**
 * 用户信息组件
 * @component
 * @returns {JSX.Element} 用户信息组件
 */
export default function UserProfile() {
  const router = useRouter();
  const { colorScheme } = useThemeStore();
  const isDarkMode = colorScheme === 'dark';

  // 获取用户信息
  const {
    data: user,
    error,
    isLoading,
  } = useSWR<AppUser>("currentUser", api.user.getProfile);

  if (isLoading) {
    return (
      <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 items-center justify-center">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 items-center justify-center">
        <Text className="text-gray-600 dark:text-gray-400">
          Failed to load profile
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
      {/* 用户基本信息 */}
      <View className="items-center mb-6">
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
      <View className="flex-row justify-around mb-6">
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

      {/* 详细信息 */}
      <View>
        {user.company && (
          <View className="flex-row items-center mb-4">
            <FontAwesome6
              name="building"
              size={20}
              color={isDarkMode ? "#9CA3AF" : "#6B7280" }
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
              color={isDarkMode ? "#9CA3AF" : "#6B7280" }
            />
            <Text className="ml-3 text-gray-700 dark:text-gray-300">
              {user.location}
            </Text>
          </View>
        )}
        {user.email && (
          <View className="flex-row items-center">
            <FontAwesome6
              name="envelope"
              size={20}
              color={isDarkMode ? "#9CA3AF" : "#6B7280" }
            />
            <Text className="ml-3 text-gray-700 dark:text-gray-300">
              {user.email}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

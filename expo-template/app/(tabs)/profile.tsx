import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSWR from 'swr';
import { githubApi } from '../../lib/api';
import type { GithubUser } from '../../types/user';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Profile() {
  const router = useRouter();
  
  // 使用 SWR 获取用户信息
  const { data: user, error, isLoading } = useSWR<GithubUser>(
    'userProfile',
    () => githubApi.getUserInfo(),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/welcome');
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
          Failed to load user profile
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

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        {/* Profile Header */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: user?.avatar_url }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.name || user?.login}
          </Text>
          {user?.bio && (
            <Text className="text-gray-600 dark:text-gray-300 text-center mt-2">
              {user.bio}
            </Text>
          )}
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mb-6 bg-white dark:bg-gray-800 rounded-lg p-4">
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {user?.public_repos}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Repositories</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {user?.followers}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {user?.following}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Following</Text>
          </View>
        </View>

        {/* Info List */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          {user?.company && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6 name="building" size={20} className="text-gray-500 dark:text-gray-400" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">{user.company}</Text>
            </View>
          )}
          {user?.location && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6 name="location-dot" size={20} className="text-gray-500 dark:text-gray-400" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">{user.location}</Text>
            </View>
          )}
          {user?.email && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6 name="envelope" size={20} className="text-gray-500 dark:text-gray-400" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">{user.email}</Text>
            </View>
          )}
          {user?.blog && (
            <View className="flex-row items-center">
              <FontAwesome6 name="link" size={20} className="text-gray-500 dark:text-gray-400" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">{user.blog}</Text>
            </View>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-sky-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold text-center">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

import React,{useState} from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSWR from 'swr';
import { api, githubApi } from '../../lib/api/index';
import type { GithubUser } from '../../types/user';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Profile() {
  const router = useRouter();
  // 获取 GitHub 用户信息
  const { data: githubProfile, error: githubError, isLoading } = useSWR<GithubUser>(
    'githubUser',
    async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Current token:', token ? 'exists' : 'null');
      if (!token) {
        router.replace('/login');
        return null;
      }
      const data = await githubApi.getUserInfo(token);
      console.log('GitHub API Response:', data);
      return data;
    }
  );

  console.log('Component State:', {
    isLoading,
    hasError: !!githubError,
    hasData: !!githubProfile,
    githubProfile
  });

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/login');
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (!githubProfile) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-gray-600 dark:text-gray-400">No profile data available</Text>
      </View>
    );
  }

  if (githubError) {
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

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        {/* Profile Header - 使用 GitHub 头像和名称 */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: githubProfile.avatar_url }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            { githubProfile.name || githubProfile.login}
          </Text>
          {githubProfile.bio && (
            <Text className="text-gray-600 dark:text-gray-300 text-center mt-2">
              {githubProfile.bio}
            </Text>
          )}
        </View>

        {/* 用户统计信息 - 可以是应用内的统计 */}
        <View className="flex-row justify-around mb-6 bg-white dark:bg-gray-800 rounded-lg p-4">
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {githubProfile.postsCount || 0}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {githubProfile.followersCount || 0}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {githubProfile.followingCount || 0}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">Following</Text>
          </View>
        </View>

        {/* 用户信息列表 */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          {githubProfile.company && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6 name="building" size={20} className="text-gray-500 dark:text-gray-400" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">{githubProfile.company}</Text>
            </View>
          )}
          {githubProfile.location && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6 name="location-dot" size={20} className="text-gray-500 dark:text-gray-400" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">{githubProfile.location}</Text>
            </View>
          )}
          {githubProfile.email && (
            <View className="flex-row items-center mb-4">
              <FontAwesome6 name="envelope" size={20} className="text-gray-500 dark:text-gray-400" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300">{githubProfile.email}</Text>
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

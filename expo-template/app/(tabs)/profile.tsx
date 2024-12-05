import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Profile() {
  const router = useRouter();
  const version = Constants.expoConfig?.version || "1.0.0";

  const handleLogout = async () => {
    Alert.alert(
      "退出登录",
      "确定要退出登录吗？",
      [
        {
          text: "取消",
          style: "cancel"
        },
        {
          text: "确定",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("userToken");
            router.replace("/welcome");
          }
        }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      {/* 用户信息卡片 */}
      <View className="px-4 py-6 mb-6">
        <View className="flex-row items-center mb-4">
          <View className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center">
            <FontAwesome6 name="user" size={32} color="#9CA3AF" />
          </View>
          <View className="ml-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              用户名
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              user@example.com
            </Text>
          </View>
        </View>
      </View>

      {/* 设置列表 */}
      <View className="px-4">
        <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          设置
        </Text>
        
        <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <FontAwesome6 name="bell" size={20} color="#4B5563" className="mr-3" />
              <Text className="text-gray-900 dark:text-white">通知设置</Text>
            </View>
            <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <FontAwesome6 name="lock" size={20} color="#4B5563" className="mr-3" />
              <Text className="text-gray-900 dark:text-white">隐私设置</Text>
            </View>
            <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-row items-center">
              <FontAwesome6 name="circle-info" size={20} color="#4B5563" className="mr-3" />
              <Text className="text-gray-900 dark:text-white">关于我们</Text>
            </View>
            <Text className="text-gray-500 dark:text-gray-400">
              v{version}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 退出登录按钮 */}
      <View className="px-4 mt-8 mb-8">
        <TouchableOpacity
          className="bg-red-500 rounded-2xl py-4"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-semibold text-lg">
            退出登录
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

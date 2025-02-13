import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 px-4">
      {/* 欢迎标语 */}
      <View className="flex-1 justify-center items-center">
        <MaterialIcons
          name="rocket-launch"
          size={64}
          color="#007AFF"
          className="mb-6"
        />
        <Text className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          欢迎使用我们的应用
        </Text>
        <Text className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
          发现更多精彩内容
        </Text>
      </View>

      {/* 按钮区域 */}
      <View className="mb-12 gap-4">
        <TouchableOpacity
          className="bg-blue-500 rounded-xl py-4"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white text-center font-semibold text-lg">
            登录/注册
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-gray-300 dark:border-gray-600 rounded-xl py-4"
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text className="text-gray-900 dark:text-white text-center font-semibold text-lg">
            先随便看看
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

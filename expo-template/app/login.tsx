import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Google OAuth
  const redirectUri = makeRedirectUri({
    path: '/oauth/callback',
    scheme: 'myapp'
  });

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    clientId: "YOUR_GOOGLE_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
  });

  // GitHub OAuth
  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
  };

  const [githubRequest, githubResponse, githubPromptAsync] = useAuthRequest({
    clientId: "Ov23lixGHnIHE3h8VwJn",
    scopes: ['identity'],
    redirectUri: makeRedirectUri({
      scheme: 'myapp' // app.json 中的 scheme
    }),
  }, discovery);

  // 处理 OAuth 响应
  const handleOAuthSuccess = async (token: string) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("登录失败", "请稍后重试");
    }
  };

  // 发送验证码
  const sendVerificationCode = async () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      Alert.alert("提示", "请输入正确的手机号");
      return;
    }

    setIsCodeSent(true);
    let timeLeft = 60;
    const timer = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      if (timeLeft === 0) {
        clearInterval(timer);
        setIsCodeSent(false);
        setCountdown(60);
      }
    }, 1000);
  };

  // 验证码登录
  const handlePhoneLogin = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      Alert.alert("提示", "请输入6位验证码");
      return;
    }

    try {
      await AsyncStorage.setItem("userToken", "demo-token");
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("登录失败", "请稍后重试");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-12">
          {/* 标题区域 */}
          <View className="mb-12">
            <Text className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              欢迎回来
            </Text>
            <Text className="text-lg text-gray-600 dark:text-gray-400">
              请登录您的账号继续使用
            </Text>
          </View>

          {/* 手机号登录区域 */}
          <View className="gap-4 mb-12">
            <View className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-2.5 flex-row items-center border-2 border-gray-100 dark:border-gray-700">
              <Text className="text-gray-600 dark:text-gray-400 mr-2 font-medium">
                +86
              </Text>
              <TextInput
                className="flex-1 text-gray-900 dark:text-white text-base"
                placeholder="请输入手机号"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={11}
              />
            </View>

            <View className="flex-row">
              <View className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-2.5 border-2 border-gray-100 dark:border-gray-700 mr-2">
                <TextInput
                  className="text-gray-900 dark:text-white text-base"
                  placeholder="请输入验证码"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  maxLength={6}
                />
              </View>
              <TouchableOpacity
                className={`px-5 rounded-2xl items-center justify-center ${
                  isCodeSent
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "bg-blue-500"
                }`}
                onPress={sendVerificationCode}
                disabled={isCodeSent}
              >
                <Text className={`text-sm font-medium ${
                  isCodeSent ? "text-gray-600 dark:text-gray-400" : "text-white"
                }`}>
                  {isCodeSent ? `${countdown}s` : "获取验证码"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="bg-blue-500 rounded-2xl py-3.5 shadow-sm shadow-blue-500/50"
              onPress={handlePhoneLogin}
            >
              <Text className="text-white text-center font-medium text-base">
                登录
              </Text>
            </TouchableOpacity>
          </View>

          {/* 分割线 */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-700" />
            <Text className="mx-4 text-gray-500 dark:text-gray-400 font-medium">
              或使用其他方式登录
            </Text>
            <View className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-700" />
          </View>

          {/* 第三方登录按钮 */}
          <View>
            <TouchableOpacity
              className="flex-row items-center justify-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl py-4 border-2 border-gray-100 dark:border-gray-700 mb-4"
              disabled={!googleRequest}
              onPress={() => googlePromptAsync()}
            >
              <FontAwesome6 name="google" size={22} color="#DB4437" />
              <Text className="text-gray-900 dark:text-white font-semibold text-lg">
                使用 Google 登录
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl py-4 border-2 border-gray-100 dark:border-gray-700"
              onPress={() => githubPromptAsync()}
              disabled={!githubRequest}
            >
              <FontAwesome6 name="github" size={22} color="#333" />
              <Text className="text-gray-900 dark:text-white font-semibold text-lg">
                使用 GitHub 登录
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

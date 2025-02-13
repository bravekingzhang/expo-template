import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // 检查是否是首次访问
      const hasVisited = await AsyncStorage.getItem("hasVisited");
      if (!hasVisited) {
        setIsFirstTime(true);
        await AsyncStorage.setItem("hasVisited", "true");
      } else {
        setIsFirstTime(false);
      }

      // 检查登录状态
      const token = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // 或者返回一个加载指示器
  }

  // 如果是首次访问，重定向到欢迎页
  if (isFirstTime) {
    return <Redirect href="/welcome" />;
  }

  // 如果已登录，重定向到主页标签
  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  // 如果未登录且不是首次访问，重定向到登录页
  return <Redirect href="/login" />;
}

import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Platform, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// 配置通知处理
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const showLocalNotification = async () => {
    // await Notifications.scheduleNotificationAsync({
    //   title: "本地通知",
    //   body: "这是一个即时本地通知示例！",
    //   data: { data: "本地通知数据" },
    //   sound: true,
    // });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "本地通知",
        body: "这是一个即时本地通知示例！",
        data: { data: "本地通知数据" },
        sound: true,
      },
      trigger: null,
    });
  };

  const scheduleLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "定时通知",
        body: "这是一个定时通知示例！将在5秒后显示",
        data: { data: "定时通知数据" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>通知演示</Text>
      <View style={styles.separator} />

      <View style={styles.buttonContainer}>
        <Button
          title="发送即时本地通知"
          onPress={showLocalNotification}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="设置5秒后的定时通知"
          onPress={scheduleLocalNotification}
        />
      </View>

      {notification && (
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>最近收到的通知:</Text>
          <Text>标题: {notification.request.content.title}</Text>
          <Text>内容: {notification.request.content.body}</Text>
        </View>
      )}
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Constants.platform?.ios) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });
  }

  return token?.data;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
  notificationInfo: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

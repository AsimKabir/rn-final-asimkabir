// ./App.js

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  requestUserPermission,
  NotificationListner,
  GetFCMToken,
} from './screens/pushnotification_helpler';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';

import BottomTabNavigator from './navigation/TabNavigator';
import ChatStack from './screens/ChatStack';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        JSON.stringify(remoteMessage.notification.title),
        JSON.stringify(remoteMessage.notification.body),
      );
      // instead of alert I want to show a pop up notification
    });
    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      {/* <ChatStack /> */}
    </NavigationContainer>
  );
};
export default App;

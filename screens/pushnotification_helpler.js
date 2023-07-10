import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export var ffccmmttookkeenn;

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authentication status:', authStatus);
    var fcmTokken = await GetFCMToken();
    return String(fcmTokken);
  } else {
  }
}

export async function GetFCMToken() {
  //   console.log('in the GetFCMToken');
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      //   console.log('in the !fcmtoken');

      let fcmtoken = await messaging().getToken();
      console.log('---=======  in the body of fcm token =========');
      if (fcmtoken) {
        console.log(fcmtoken, 'new token');
        ffccmmttookkeenn = fcmtoken;
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
        return String(fcmtoken);
      }
    } catch (error) {
      console.log(error, 'error in fcmtoken');
    }
  } else {
    console.log('token is ===>>>', fcmtoken);
    return String(fcmtoken);
  }
}

export const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('Notification on foreground state ........', remoteMessage);
  });
};

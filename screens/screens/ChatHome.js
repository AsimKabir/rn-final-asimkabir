import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
// import ChatScreen from './screens/ChatScreen';
import ChatScreen from './ChatScreen';
import SignupScreen from './SignupScreen';
// import SigninScreen from './SigninScreen';
import MessageScreen from './MessageScreen';
import {StyleSheet, Button, View} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import auth from '@react-native-firebase/auth';
// import { Button } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ChatHome = ({route}) => {
  const [user, setUser] = useState('');
  const navigation = route.params.navigation;
  useEffect(() => {
    const userCheck = auth().onAuthStateChanged(userExist => {
      if (userExist) setUser(userExist);
      else setUser('');
    });
    return () => {
      userCheck();
      console.log(user);
    };
  }, []);

  return (
    <View>
      {user ? (
        <Button
          title="Go to Login"
          onPress={() => {
            navigation.navigate('ChatScreen');
          }}
        />
      ) : (
        <Button
          title="Go to Login"
          onPress={() => {
            navigation.navigate('SigninScreen');
          }}
        />
      )}
    </View>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconColor: {
    color: '009387',
  },
});

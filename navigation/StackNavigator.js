// ./navigation/StackNavigator.js

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
// import About from '../screens/drawerScreens/About';
import Contact from '../screens/Contact';
import Appointment from '../screens/Appointment';
import TEST_Appointment from '../screens/drawerScreens/TEST_Appointment';
import Search_Doctor_Screen from '../screens/Search_Doctor_Screen';
import Login_Screen from '../screens/Login_Screen';
import Verify_otp_Screen from '../screens/Verify_otp_Screen';
import Order_Medicine_Screen from '../screens/Order_Medicine_Screen';
import Order_Success_Screen from '../screens/Order_Success_Screen';
import Doctor_Profile_Screen from '../screens/Doctor_Profile_Screen';
import Calender_Screen from '../screens/Calender_Screen';
import Patient_Detail_Screen from '../screens/Patient_Detail_Screen';
import Booking_Success_Screen from '../screens/Booking_Success_Screen';
// import Chat from '../screens/chat/chatScreens/Chat';
// import ChatLogin from '../screens/chat/passwordScreens/ChatLogin';
// import ChatScreen from '../screens/chat/ChatScreen';
import SignUpScreen from '../screens/chat/SignUpScreen';
import LoginScreen from '../screens/chat/LoginScreen';
import ChatHome from '../screens/screens/ChatHome';
import SigninScreen from '../screens/screens/SigninScreen';
import SignupScreen from '../screens/screens/SignupScreen';
import ProfileScreen from '../screens/screens/ProfileScreen';
import ChatScreen from '../screens/screens/ChatScreen';
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'blue',
  headerBackTitle: 'grey',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{screenOptionStyle, headerShown: false}}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen
        name="Search_Doctor_Screen"
        component={Search_Doctor_Screen}
      />
      <Stack.Screen name="Login_Screen" component={Login_Screen} />
      <Stack.Screen name="Verify_otp_Screen" component={Verify_otp_Screen} />
      <Stack.Screen
        name="Order_Medicine_Screen"
        component={Order_Medicine_Screen}
      />
      <Stack.Screen
        name="Order_Success_Screen"
        component={Order_Success_Screen}
      />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen
        name="Doctor_Profile_Screen"
        component={Doctor_Profile_Screen}
      />
      <Stack.Screen name="Calender_Screen" component={Calender_Screen} />
      <Stack.Screen
        name="Patient_Detail_Screen"
        component={Patient_Detail_Screen}
      />
      <Stack.Screen
        name="Booking_Success_Screen"
        component={Booking_Success_Screen}
      />
      {/* <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> */}

      <Stack.Screen name="ChatHome" component={ChatHome} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{screenOptionStyle, headerShown: false}}>
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

const AppointmentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{screenOptionStyle, headerShown: false}}>
      <Stack.Screen name="Appointment" component={Appointment} />
    </Stack.Navigator>
  );
};

const TEST_AppointmentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{screenOptionStyle, headerShown: false}}>
      <Stack.Screen name="Appointment" component={TEST_Appointment} />
    </Stack.Navigator>
  );
};

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{screenOptionStyle, headerShown: false}}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
export {
  MainStackNavigator,
  ContactStackNavigator,
  AppointmentStackNavigator,
  TEST_AppointmentStackNavigator,
  ChatStackNavigator,
};

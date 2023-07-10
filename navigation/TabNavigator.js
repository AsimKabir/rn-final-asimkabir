// ./navigation/TabNavigator.js

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ContactStackNavigator,
  AppointmentStackNavigator,
} from './StackNavigator';
import DrawerNavigator from './DrawerNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();
// screenOptions={{headerShown: false}}
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          tabBarIcon: () => {
            return <Icon name="home" size={20} color="black" />;
          },
          tabBarIconStyle: {
            color: 'red',
            borderRadius: 20,
          },
          //   tabBarActiveBackgroundColor: 'orange',
          tabBarActiveTintColor: 'grey',
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactStackNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return <Icon name="home" size={20} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentStackNavigator}
        options={{
          tabBarIcon: () => {
            return <Icon name="home" size={20} color="black" />;
          },
          tabBarIconStyle: {
            color: 'red',
            borderRadius: 20,
          },
          //   tabBarActiveBackgroundColor: 'orange',
          tabBarActiveTintColor: 'grey',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

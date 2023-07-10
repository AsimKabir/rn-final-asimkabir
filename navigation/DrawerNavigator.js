// ./navigation/DrawerNavigator.js

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ContactStackNavigator, MainStackNavigator} from './StackNavigator';
import {View, Button, Text, TouchableHighlight, StyleSheet} from 'react-native';
import All_Example_Code_Practice from '../screens/drawerScreens/All_Example_Code_Practice';
import About from '../screens/About';
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="HomeDrawer"
        component={MainStackNavigator}
        options={{
          headerRight: () => <Button_on_Drawer />,
          title: '() => <Main_Header_Heading />',
          headerStyle: {
            backgroundColor: '#242C81',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 14,
          },
        }}
      />
      <Drawer.Screen name="Contact" component={ContactStackNavigator} />
      <Drawer.Screen
        name="All_Example_Code_Practice"
        component={All_Example_Code_Practice}
      />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

const Button_on_Drawer = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center',
        // padding: 10,
      }}>
      <Icon name="credit-card" size={20} color="orange" />
      <Text
        style={{fontSize: 16, fontWeight: '400', color: 'white', padding: 5}}>
        Rs. 3487
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // backgroundColor: '#242C81',
    // padding: 10,
  },
  mainText: {
    // fontSize: 20,
    // fontWeight: '400',
    // color: 'white',
  },
  secondaryText: {
    // fontSize: 16,
    // fontWeight: '400',
    // color: 'white',
    // padding: 5,
  },
});
export default DrawerNavigator;

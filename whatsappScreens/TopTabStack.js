import {React, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Button,
  Alert,
  SafeAreaView,
  // Alert,
  Modal,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Chats from './Chats';
import Call from './Call';
import Status from './Status';
import ChatDetail from './ChatDetail';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabStack = ({route}) => {
  // const navigation = route.params.navigation;
  // const selfUserEmail = route.params.selfUserEmail;
  // const selfName = route.params.selfName;
  // console.log('   =======>   ', selfUserEmail);

  const selfUserEmail = route.params.selfUserEmail;
  const selfName = route.params.selfName;
  const navigation = route.params.navigation;
  console.log('routttttteee ===>>>> ', route);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: '#633689',
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: 12,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="Chats"
        component={Chats}
        initialParams={{
          selfUserEmail: selfUserEmail,
          selfName: selfName,
          navigation: navigation,
        }}
        options={{
          tabBarLabel: 'Chats',
        }}
      />
      <Tab.Screen
        name="Status"
        component={Status}
        options={{
          tabBarLabel: 'Status',
        }}
      />
      <Tab.Screen
        name="Call"
        component={Call}
        options={{
          tabBarLabel: 'Call',
        }}
      />
    </Tab.Navigator>
  );
};

const TopTabStack = ({route}) => {
  // console.log('   A=======>   ', route.params.selfUserEmail);
  // console.log('   A=======>   ', route.params.selfName);
  // console.log('   A=======>   ', route.params.navigation);

  const selfUserEmail = route.params.selfUserEmail;
  const selfName = route.params.selfName;
  const navigation = route.params.navigation;

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#633689'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: '300', fontSize: 24},
        }}>
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          initialParams={{
            selfUserEmail: selfUserEmail,
            selfName: selfName,
            navigation: navigation,
          }}
          options={{
            headerTitle: props => (
              <Text style={{fontSize: 24, color: 'white'}}>Hello</Text>
            ),
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="camera"
                  color="white"
                  size={20}
                  style={{marginRight: 15}}
                />
                <Icon
                  name="search"
                  color="white"
                  size={20}
                  style={{marginRight: 15}}
                />
                <Icon name="align-center" color="white" size={20} />
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="ChatDetail"
          component={ChatDetail}
          options={{
            headerTitle: props => HeaderTitle(),
            // headerLeft: () => HeaderTitle(),
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="video-camera"
                  color="white"
                  size={20}
                  style={{marginRight: 15}}
                />
                <Icon
                  name="phone"
                  color="white"
                  size={20}
                  style={{marginRight: 15}}
                />
                <Icon name="align-center" color="white" size={20} />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HeaderTitle = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../images/earth.gif')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
          alignSelf: 'center',
        }}
      />

      <View style={{}}>
        <Text
          style={[
            {fontWeight: '400', textAlignVertical: 'center', color: 'white'},
          ]}>
          Dr. Asim Kabir Ahmed
        </Text>
        <Text
          style={{
            fontWeight: '400',
            textAlignVertical: 'center',
            color: 'white',
          }}>
          Gynecologist
        </Text>
      </View>
    </View>
  );
};

export default TopTabStack;

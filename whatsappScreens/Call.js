import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  SectionList,
  Button,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  Pressable,
  StatusBar,
  Platform,
  Image,
  TextInput,
  ImageBackground,
  Alert,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Call = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <CallPill />
        <Text style={{fontWeight: '600', marginVertical: 10, fontSize: 16}}>
          Recent
        </Text>
        <CallPill />
        <CallPill />
        <CallPill />
      </View>
      <Call_Floating_Buttom />
    </SafeAreaView>
  );
};
const CallPill = () => {
  const theme = useColorScheme();

  const isDarkTheme = theme === 'dark';

  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <Image
        source={require('../images/earth.gif')}
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          alignSelf: 'center',
        }}
      />

      <View style={{flex: 1, paddingLeft: 8}}>
        <Text
          style={[
            {fontWeight: '700', textAlignVertical: 'center'},
            isDarkTheme ? {color: 'black'} : null,
          ]}>
          Dr. Asim Kabir Ahmed
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Icon name="phone" color="red" size={15} />
          <Text style={{textAlignVertical: 'center', marginLeft: 8}}>
            Gynecologist
          </Text>
        </View>
      </View>
      <Icon name="phone" color="green" size={25} />
    </View>
  );
};
const Call_Floating_Buttom = props => {
  const navigation = props.navigation;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ChatHome', {navigation: navigation});
        // Alert.alert('hahaha wapis');
      }}
      style={{
        // paddingBottom: 100,
        // marginBottom: 100,
        fontSize: 20,
        backgroundColor: 'green',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 15,
        right: 20,
        // backgroundColor: '#fff',
        borderRadius: 100,
      }}>
      <Icon name="phone" color="white" size={20} />
    </Pressable>
  );
};
export default Call;

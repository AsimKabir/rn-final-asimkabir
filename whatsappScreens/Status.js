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
  Alert,
  SafeAreaView,
  Modal,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Status = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        {/* <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Home{'\n'}(You are on Status)
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chats')}>
            <Text>Go to settng Tab</Text>
          </TouchableOpacity>
        </View> */}
        <StatusPill />
        <Text>Recent updates</Text>
        <StatusPill />
        <StatusPill />
        <StatusPill />
        <StatusPill />
        <StatusPill />
        <StatusPill />
      </View>
      <Camera_Floating_Buttom />
      <Write_Floating_Buttom />
    </SafeAreaView>
  );
};
const Camera_Floating_Buttom = props => {
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
      <Icon name="camera" color="white" size={20} />
    </Pressable>
  );
};

const Write_Floating_Buttom = props => {
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
        backgroundColor: 'grey',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 85,
        right: 20,
        // backgroundColor: '#fff',
        borderRadius: 100,
      }}>
      <Icon name="edit" color="white" size={30} />
    </Pressable>
  );
};
const StatusPill = () => {
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

      <View style={{paddingLeft: 8}}>
        <Text
          style={[
            {fontWeight: '700', textAlignVertical: 'center'},
            isDarkTheme ? {color: 'black'} : null,
          ]}>
          Dr. Asim Kabir Ahmed
        </Text>
        <Text style={{textAlignVertical: 'center'}}>Gynecologist</Text>
      </View>
    </View>
  );
};

export default Status;

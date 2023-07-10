import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  Pressable,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

Login_Screen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Login_Screen_Top_Header />
        <View style={{paddingHorizontal: 16}}>
          <Main_Heading_Section />
          <Login_Screen_SearchBar_Section />
          <Login_Screen_Informational_Section />
        </View>
      </ScrollView>
      <Login_Screen_Floating_Buttom navigation={navigation} />
    </View>
  );
};

const Login_Screen_Informational_Section = () => {
  return (
    <View style={styles.Login_Screen_Informational_Section_Main}>
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <Icon
          name="phone"
          size={40}
          style={{
            padding: 10,
            backgroundColor: '#E5E5F0',
            borderRadius: 100,
            alignSelf: 'center',
            marginHorizontal: 100,
          }}
        />
        <Icon
          name="ambulance"
          size={40}
          style={{
            padding: 10,
            backgroundColor: '#E5E5F0',
            borderRadius: 100,
            alignSelf: 'center',
          }}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 21,
          marginVertical: 16,
        }}>
        Why share your phone number?
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: '400',
          lineHeight: 21,
          marginBottom: 20,
          marginHorizontal: 10,
        }}>
        Providing us with your phone number allows us to ensure a smooth
        delivery process by sending order confirmations and delivery updates via
        SMS.
      </Text>
    </View>
  );
};

const Login_Screen_SearchBar_Section = () => {
  return (
    <View style={styles.searchSection}>
      <View
        style={{
          backgroundColor: '#E5E5F0',
          borderRadius: 8,
          margin: 5,
          padding: 15,
        }}>
        <Text style={{fontSize: 14, fontWeight: '600'}}>+92</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="3016335810"
        // underlineColorAndroid="transparent"
      />
    </View>
  );
};

const Main_Heading_Section = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 31,
          marginTop: 32,
        }}>
        Enter Phone Number
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 21,
          marginTop: 16,
          marginBottom: 5,
        }}>
        Phone Number
      </Text>
    </View>
  );
};
const Login_Screen_Top_Header = () => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        backgroundColor: 'white',
        height: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#FFFFFF',
        elevation: 10,
      }}>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <Icon name="arrow-left" color="black" size={20} style={{}} />
      </View>
      <Text
        style={{
          textAlignVertical: 'center',
          fontSize: 22,
        }}>
        Phone number
      </Text>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        {/* <Icon name="phone" color="black" size={25} style={{}} /> */}
      </View>
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;

const Login_Screen_Floating_Buttom = ({navigation}) => {
  return (
    <View
      style={{
        // paddingBottom: 100,
        // marginBottom: 100,
        backgroundColor: 'white',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        width: windowWidth,
        height: 98,
        bottom: 0,
        right: 0,
        elevation: 100,
        // alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => navigation.navigate('Verify_otp_Screen')}
        style={{
          backgroundColor: '#000066',
          width: windowWidth - 40,
          height: 50,
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          Submit
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#CFD3D7',
    borderWidth: 1,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    // marginTop:16,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  Login_Screen_Informational_Section_Main: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#CFD3D7',
    borderRadius: 8,
  },
});
export default Login_Screen;

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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Verify_otp_Screen({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Verify_otp_Screen_Top_Header />
        <View style={{paddingHorizontal: 16}}>
          <Main_Heading_Section />
          <Login_Screen_SearchBar_Section />
          <Text style={{textAlign: 'center', marginTop: 20}}>
            Resend code in 0:12s
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 100,
            }}>
            <Icon
              name="phone"
              size={20}
              color="black"
              style={{marginRight: 20}}
            />
            <Text style={{fontSize: 20, color: '#000066', textAlign: 'center'}}>
              Resend code in 0:12s
            </Text>
          </View>

          {/* <Login_Screen_Informational_Section /> */}
        </View>
      </ScrollView>
      <Verify_otp_Floating_Buttom navigation={navigation} />
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;

const Verify_otp_Floating_Buttom = ({navigation}) => {
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
        onPress={() => navigation.navigate('Order_Medicine_Screen')}
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

const Login_Screen_SearchBar_Section = () => {
  const [pin1, setPin1] = useState(null);
  const [pin2, setPin2] = useState(null);
  const [pin3, setPin3] = useState(null);
  const [pin4, setPin4] = useState(null);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
      }}>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChange={pin1 => {
            setPin1(pin1);
            console.log(pin1);
          }}
        />
      </View>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChange={pin2 => {
            setPin2(pin2);
            console.log(pin2);
          }}
        />
      </View>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChange={pin3 => {
            setPin3(pin3);
            console.log(pin3);
          }}
        />
      </View>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChange={pin4 => {
            setPin4(pin4);
            console.log(pin4);
          }}
        />
      </View>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChange={pin4 => {
            setPin4(pin4);
            console.log(pin4);
          }}
        />
      </View>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChange={pin4 => {
            setPin4(pin4);
            console.log(pin4);
          }}
        />
      </View>
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
        Verify OTP Code
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 21,
          marginTop: 16,
          marginBottom: 5,
        }}>
        A code was sent to 03016335810 (edit)
      </Text>
    </View>
  );
};

const Verify_otp_Screen_Top_Header = () => {
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
const styles = StyleSheet.create({
  TextInputView: {
    borderWidth: 1,
    width: 60,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#E5E5F0',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
  },
  input: {
    fontSize: 30,
    textAlign: 'center',
    // width: 50,
    // marginTop:16,
    // paddingTop: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    // paddingLeft: 0,
  },
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
  Login_Screen_Informational_Section_Main: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#CFD3D7',
    borderRadius: 8,
  },
});

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

export default function Order_Success_Screen({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Order_Success_Screen_Top_Header />
        <View style={{paddingHorizontal: 16}}>
          <Main_Heading_Section />
          <Order_Details_Section />
        </View>
      </ScrollView>
      <Order_Success_Screen_Floating_Buttom navigation={navigation} />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const Order_Success_Screen_Floating_Buttom = ({navigation}) => {
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
        onPress={() => navigation.navigate('HomeMain')}
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
          Return to homescreen
        </Text>
      </Pressable>
    </View>
  );
};

const Order_Details_Section = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 26,
          fontWeight: '600',
          lineHeight: 26,
          // marginTop: 32,
          color: '#232426',
          marginTop: 60,
          borderBottomWidth: 1,
          borderColor: '#E5E5F0',
        }}>
        Order Details
      </Text>

      <View style={{}}>
        <View style={{flexDirection: 'row', marginTop: 35, marginLeft: 20}}>
          <Icon name="apple" size={40} />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 17,
                // marginTop: 32,
                color: '#8C9196',
              }}>
              Patient Name
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 21,
                // marginTop: 32,
                color: '#232426',
              }}>
              Ahmed daud
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 20}}>
          <Icon name="apple" size={40} />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 17,
                // marginTop: 32,
                color: '#8C9196',
              }}>
              Date ordered
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 21,
                // marginTop: 32,
                color: '#232426',
              }}>
              Feb 20, 2020 at 8:00 PM
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 20}}>
          <Icon name="apple" size={40} />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 17,
                // marginTop: 32,
                color: '#8C9196',
              }}>
              Address
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 21,
                // marginTop: 32,
                color: '#232426',
              }}>
              290 CCA Sector FF, DHA Phase IV, Lahore, Pakistan, 54660
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#F7F8FB',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#E5E5F0',
          margin: 10,
          marginTop: 50,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 21,
            // marginTop: 32,
            color: '#232426',
            margin: 20,
            // padding: 10,
            textAlign: 'center',
          }}>
          Find details about this order in the “My Orders” section in the app’s
          menu.
        </Text>
      </View>
    </View>
  );
};

const Main_Heading_Section = () => {
  return (
    <View
      style={{
        // alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
      }}>
      <View
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: '#4A8A82',
          width: 100,
          height: 100,
          borderColor: '#4A8A82',
        }}>
        <Icon
          name="apple"
          size={40}
          color="#4A8A82"
          style={{
            margin: 30,
            //   padding: 10,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 31,
          marginTop: 32,
        }}>
        Your order has been placed!
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 21,
          marginTop: 16,
          marginBottom: 5,
        }}>
        Our pharmacist will call you shortly for confirmation.
      </Text>
    </View>
  );
};
const Order_Success_Screen_Top_Header = () => {
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
        Success
      </Text>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        {/* <Icon name="phone" color="black" size={25} style={{}} /> */}
      </View>
    </View>
  );
};

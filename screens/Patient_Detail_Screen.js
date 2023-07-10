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
  ProgressBarAndroid,
  //   Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;

export default function Patient_Detail_Screen({route}) {
  const navigation = route.params.navigation;

  return (
    <View style={{backgroundColor: '#E5E5E5'}}>
      <ScrollView>
        <View>
          <Patient_Detail_Top_Header />
          {/* <Doctor_Profile_Doctor_Card
            is_partner={is_partner}
            doctor_name={doctor_name}
            doctor_picture={doctor_picture}
            doctor_specialization={doctor_specialization}
            navigation={navigation}
          /> */}
          {/* <TimeSlots_Section available_slots={available_slots} /> */}
        </View>
      </ScrollView>
      <Patient_Detail_Floating_Buttom navigation={navigation} />
    </View>
  );
}

const Patient_Detail_Top_Header = () => {
  return (
    <View style={{}}>
      <View style={{}}>
        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: 'white',
            height: 60,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Icon name="chevron-left" color="black" size={20} style={{}} />
          </View>
          <Text
            style={{
              textAlignVertical: 'center',
              fontSize: 22,
            }}>
            Enter Details
          </Text>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Icon name="phone" color="black" size={25} style={{}} />
          </View>
        </View>
      </View>
    </View>
  );
};

const Patient_Detail_Floating_Buttom = ({navigation}) => {
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
        height: 100,
        bottom: -25,
        right: 0,
        elevation: 100,
        // alignContent: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            borderRadius: 20,
            backgroundColor: '#F7F8FB',
          }}>
          <Icon
            name="clock-o"
            size={20}
            color="black"
            style={{marginRight: 8}}
          />
          <Text>Mar 26, 10:00 AM</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            borderRadius: 20,
            backgroundColor: '#F7F8FB',
          }}>
          <Icon
            name="sun-o"
            size={20}
            color="#FF9E15"
            style={{marginRight: 8}}
          />
          <Text>Dr. Saqib Mansoor</Text>
        </View>
      </View>
      <View
        style={{
          // alignContent: 'center',
          // justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 1,
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate('Booking_Success_Screen', {
              navigation: navigation,
            })
          }
          style={{
            backgroundColor: '#FF9E15',
            width: windowWidth - 30,
            height: 50,
            borderRadius: 8,
            // alignContent: 'center',
            // justifyContent: 'center',
            // alignItems: 'center',
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
            Confirm Booking
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

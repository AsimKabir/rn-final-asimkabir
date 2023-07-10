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
// import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function Calender_Screen({route}) {
  const navigation = route.params.navigation;
  const is_partner = route.params.is_partner;
  const doctor_name = route.params.doctor_name;
  const doctor_picture = route.params.doctor_picture;
  const doctor_specialization = route.params.doctor_specialization;
  const [data, setData] = useState([]);
  const [available_slots, setAvailableSlots] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const api_key = 'uXJxebFfgRVQxRLSozrp8U6A';
  const CF_Access_Client_Id = 'a5c99fb69a8aff66ba4a9a30f10f2b5d.access';
  const CF_Access_Client_Secret =
    '8eb187f378254b1ed34bb99ff43c78a841c867ab00a1743f378ec474364ab089';
  const API_url =
    'https://oladoc.com/api/v4/user/time_slots?doctor_id=2397&show_future_available_days=100&start_date=2023-06-20&number_of_days=20&hospital_id=267';
  //   console.log('worker ==> ', API_url);

  const getTimeSlots = async () => {
    try {
      const response = await fetch(API_url, {
        method: 'GET',
        headers: {
          x_api_key: api_key,
          'CF-Access-Client-Id': CF_Access_Client_Id,
          'CF-Access-Client-Secret': CF_Access_Client_Secret,
        },
      });
      const json = await response.json();
      setData(json);
      setAvailableSlots(json.available_slots);
      //   console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTimeSlots();
  }, []);
  console.log(available_slots.length);
  return (
    <View style={{backgroundColor: '#E5E5E5'}}>
      <ScrollView>
        <View>
          <Doctor_Profile_Top_Header />
          <Doctor_Profile_Doctor_Card
            is_partner={is_partner}
            doctor_name={doctor_name}
            doctor_picture={doctor_picture}
            doctor_specialization={doctor_specialization}
            navigation={navigation}
          />
          <TimeSlots_Section available_slots={available_slots} />
        </View>
      </ScrollView>
      <Login_Screen_Floating_Buttom navigation={navigation} />
    </View>
  );
}
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
            navigation.navigate('Patient_Detail_Screen', {
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

const Pick_A_Date_Section = () => {
  return (
    <View style={{backgroundColor: 'white', marginHorizontal: 5}}>
      <View style={{flexDirection: 'row'}}>
        <Icon name="sun-o" size={20} color="#FF9E15" />
        <Text style={{marginLeft: 5}}>Morning Slots</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <TimeSlot_Pill />
          <TimeSlot_Pill />
          <TimeSlot_Pill />
          <TimeSlot_Pill />
          <TimeSlot_Pill />
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Icon name="sun-o" size={20} color="#FF9E15" />
        <Text style={{marginLeft: 5}}>After noon Slots</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <TimeSlot_Pill />
          <TimeSlot_Pill />
          <TimeSlot_Pill />
          <TimeSlot_Pill />
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Icon name="sun-o" size={20} color="#FF9E15" />
        <Text style={{marginLeft: 5}}>Night Slots</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <TimeSlot_Pill />
          <TimeSlot_Pill />
          <TimeSlot_Pill />
          <TimeSlot_Pill />
        </View>
      </View>
    </View>
  );
};
const TimeSlot_Pill = () => {
  return (
    <Text
      style={{
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: '#FF9E15',
        backgroundColor: '#FFF5E8',
        borderColor: '#FF9E15',
      }}>
      10:00 AM
    </Text>
  );
};
const Doctor_Profile_Doctor_Card = props => {
  // console.log('is Partner Doctor ==> ', is_partner);
  //   console.log(props);

  const is_partner = props.is_partner;
  const doctor_name = props.doctor_name;
  const doctor_specialization = props.doctor_specialization;
  const doctor_degree = props.doctor_degree;
  const doctor_picture = props.doctor_picture;

  const navigation = props.navigation;

  return (
    <Pressable
      onPress={() => {
        // Alert.alert('hello');
        navigation.navigate('Doctor_Profile_Screen');
      }}
      style={{
        margin: 5,
        paddingVertical: 16,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
      }}>
      <Doctor_Detail_Section_on_Doctor_Card_Doctor_Profile
        doctor_name={doctor_name}
        doctor_specialization={doctor_specialization}
        doctor_degree={doctor_degree}
        doctor_picture={doctor_picture}
        doctor_is_partner={is_partner}
      />
    </Pressable>
  );
};

const TimeSlots_Section = props => {
  //   const date = props.available_slots[0]['date'];
  //   const formatted_date = props.available_slots[0]['formatted_date'];
  //   const slots = props.available_slots[0]['slots'];
  //   console.log('date ==> ', date);
  //   console.log('formatted_date ==> ', formatted_date);
  //   console.log('slots ==> ', slots);
  return (
    <View style={{backgroundColor: 'white', padding: 10}}>
      <Text style={{color: '#232426'}}>Pick a Time Slot</Text>
      <ScrollView horizontal={true}>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
          }}>
          <Date_Selection_Component day="Today" date="28" />
          <Date_Selection_Component day="Tomorrow" date="29" />
          <Date_Selection_Component day="Today" date="30" />
          <Date_Selection_Component day="Tomorrow" date="31" />
          <Date_Selection_Component day="Today" date="32" />
          <Date_Selection_Component day="Tomorrow" date="33" />
          <Date_Selection_Component day="Today" date="34" />
        </View>
      </ScrollView>
      <Pick_A_Date_Section />
    </View>
  );
};

const Date_Selection_Component = props => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#FFF5E8',
        borderColor: '#FF9E15',
        marginRight: 10,
        height: 90,
        width: 90,
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          // marginRight: 10,
          paddingTop: 10,
          textAlign: 'center',
          color: '#FF9E15',
          fontSize: 16,
        }}>
        {props.day}
      </Text>
      <Text
        style={{
          // marginRight: 10,
          paddingBottom: 10,
          color: '#FF9E15',
          textAlign: 'center',
          fontSize: 18,
        }}>
        {props.date}
      </Text>
    </View>
  );
};

const Doctor_Detail_Section_on_Doctor_Card_Doctor_Profile = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        // paddingLeft: 20,
      }}>
      <View>
        <Image
          source={{uri: props.doctor_picture}}
          style={{
            width: 70,
            height: 70,
            borderRadius: 400 / 2,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{marginLeft: 10}}>
        {props.doctor_is_partner == '1' ? (
          <Image
            source={require('../images/PlatinumBadge.png')}
            style={{
              width: 195,
              height: 34,
            }}
          />
        ) : null}
        <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 24}}>
          {props.doctor_name}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '400', lineHeight: 21}}>
          {props.doctor_specialization}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '400', lineHeight: 21}}>
          {props.doctor_degree}
        </Text>
      </View>
    </View>
  );
};

const Doctor_Profile_Top_Header = () => {
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
            Pick a time slot
          </Text>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Icon name="phone" color="black" size={25} style={{}} />
          </View>
        </View>
      </View>
    </View>
  );
};

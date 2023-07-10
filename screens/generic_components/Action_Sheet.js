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
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;

const Action_Sheet = ({
  displayActionSheet,
  setDisplayActionSheet,
  bookable_hospitals,
  doctor_name,
  navigation,
  is_partner,
  doctor_picture,
  doctor_specialization,
}) => {
  return (
    <Modal
      visible={displayActionSheet}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setDisplayActionSheet(false);
      }}>
      <Doctor_Locations_Action_Sheet
        setDisplayActionSheet={setDisplayActionSheet}
        bookable_hospitals={bookable_hospitals}
        doctor_name={doctor_name}
        /////////////////   passing data to navigate on calender page with previous data   ///////////////////
        navigation={navigation}
        is_partner={is_partner}
        doctor_picture={doctor_picture}
        doctor_specialization={doctor_specialization}
        /////////////////   passing data to navigate on calender page with previous data   ///////////////////
      />
    </Modal>
  );
};

const Doctor_Locations_Action_Sheet = ({
  setDisplayActionSheet,
  bookable_hospitals,
  doctor_name,
  navigation,
  is_partner,
  doctor_picture,
  doctor_specialization,
}) => {
  // console.log(doctor_name);

  return (
    <Pressable
      onPress={() => {
        setDisplayActionSheet(false);
      }}
      style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <View
          style={{
            width: '100%',
            // height: '50%',
            backgroundColor: '#E5E5F0',
            overflow: 'hidden',
            paddingBottom: 20,
            paddingHorizontal: 20,
            paddingTop: 10,
          }}>
          <Pressable
            onPress={() => {
              // Alert.alert('asdasdasd');
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 31}}>
              Book appointment with {doctor_name}
            </Text>
            <Icon name="close" size={20} />
          </Pressable>
          <Text style={{textAlign: 'center'}}>Please select one</Text>
          {bookable_hospitals.map((item, index) => (
            <Locations_On_Action_Sheet
              item={item}
              /////////////////   passing data to navigate on calender page with previous data   ///////////////////
              doctor_name={doctor_name}
              navigation={navigation}
              is_partner={is_partner}
              doctor_picture={doctor_picture}
              doctor_specialization={doctor_specialization}
              /////////////////   passing data to navigate on calender page with previous data   ///////////////////
            />
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const Locations_On_Action_Sheet = props => {
  const subs_name = props.item.subs_name;
  const locality = props.item.locality;
  // const instantly_bookable = props.item.instantly_bookable;
  const has_active_subs = props.item.has_active_subs;
  // const is_bookable = props.item.is_bookable;
  const allow_online_booking = props.item.allow_online_booking;
  const app_discount_text = props.item.app_discount_text;
  const prepayment_allowed = props.item.prepayment_allowed;
  const video_consultation = props.item.video_consultation;
  const when_available = props.item.when_available;
  const when_available_timestamp = props.item.when_available_timestamp;
  const fee = props.item.fee;
  const doc_schedule = props.item.doc_schedule;
  const discount_available = props.item.discount_available;
  const covered_by_insurance = props.item.covered_by_insurance;
  const city = props.item.city;
  const call_number_app = props.item.call_number_app;
  const buttons_text = props.item.buttons_text;
  const phone = props.item.phone;
  /////////////////   passing data to navigate on calender page with previous data   ///////////////////
  const doctor_name = props.doctor_name;
  const navigation = props.navigation;
  const is_partner = props.is_partner;
  const doctor_picture = props.doctor_picture;
  const doctor_specialization = props.doctor_specialization;
  /////////////////   passing data to navigate on calender page with previous data   ///////////////////

  return (
    <TouchableOpacity
      // onPress={() => {
      //   setDisplayActionSheet(true);
      // }}
      onPress={() =>
        navigation.navigate('Calender_Screen', {
          navigation: navigation,
          is_partner: is_partner,
          doctor_name: doctor_name,
          doctor_picture: doctor_picture,
          doctor_specialization: doctor_specialization,
        })
      }
      style={{
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 12,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 21}}>
          {subs_name}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '400', lineHeight: 21}}>
          Rs. {fee}
        </Text>
      </View>
      {locality != '' ? (
        <View style={{flexDirection: 'row', marginTop: 3}}>
          {video_consultation == '1' ? (
            <Icon name="mobile" size={20} />
          ) : (
            <Icon name="map-marker" size={20} />
          )}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 21,
              marginLeft: 8,
            }}>
            {locality}
          </Text>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="circle" size={15} color="#2A872E" />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 21,
              color: '#2A872E',
              marginLeft: 8,
            }}>
            Available {when_available}
          </Text>
        </View>
        <Icon name="arrow-circle-right" size={20} />
      </View>
      {app_discount_text != '' ? (
        <View style={{flexDirection: 'row'}}>
          <Icon name="ra" size={18} color="#000066" />
          <Text style={{color: '#000066', marginLeft: 5}}>
            {app_discount_text}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default Action_Sheet;

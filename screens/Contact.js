import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Contact = () => {
  return (
    <ScrollView>
      <Top_Header_Appointment_Screen />
      <Appointment_Card />
      <Appointment_Card />
      <Appointment_Card />
      <Appointment_Card />
    </ScrollView>
  );
};

const Top_Header_Appointment_Screen = () => {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 20,
          fontWeight: '400',
          backgroundColor: 'white',
          height: 50,
          elevation: 10,
        }}>
        My Appointments
      </Text>
    </View>
  );
};
const Appointment_Card = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginHorizontal: 15,
          marginVertical: 10,
          borderRadius: 10,
          elevation: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#ECECF4',
              alignContent: 'center',
              textAlignVertical: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                color: 'black',
                fontWeight: '800',
                textAlignVertical: 'bottom',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              17
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                textAlignVertical: 'bottom',
                justifyContent: 'space-between',
                // paddingTop: 220,
                // marginTop: 220,
              }}>
              MAY
            </Text>
          </View>
          <View style={{marginLeft: 10}}>
            <View style={{}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  margin: 2,
                  backgroundColor: '#2A872E',
                }}>
                Paid online
              </Text>
            </View>
            <Text style={{fontSize: 18, fontWeight: '400'}}>
              Dr. Arif Zuberi
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'flex-end',
                // justifyContent: 'space-between',
                // paddingLeft: 'auto',
                // backgroundColor: 'gold',
              }}>
              <Text style={{fontSize: 18, fontWeight: '400'}}>
                Doctors Hospital
              </Text>
              <Text
                style={{
                  marginLeft: 'auto',
                  //   textAlign: 'left',
                  //   justifyContent: 'flex-end',
                  //   alignSelf: 'flex-end',
                  //   backgroundColor: 'white',
                  //   paddingLeft: 100,
                }}>
                Fee: Rs. 2500
              </Text>
            </View>
            <Text style={{fontSize: 12, fontWeight: '400'}}>
              Pt: Usman Kabir .. Wednessday, 4:25 pm
            </Text>
          </View>
        </View>
        <Text style={{marginVertical: 10}}>
          Your feedback can help people get good medical care
        </Text>
        <View
          style={{
            // borderWidth: 1,
            backgroundColor: '#E5E5F0',
            margin: 10,
            // elevation: 10,
          }}>
          <Text style={{paddingVertical: 10, paddingHorizontal: 10}}>
            Were you able to see doctor?
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1}}>
              <View
                style={{
                  // flex: 1,
                  backgroundColor: '#E5E5F0',
                  //   borderRadius: 10,
                  // height: 16,
                  // borderWidth: 1,
                  elevation: 5,
                  //   flexDirection: 'row',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                  }}>
                  <Icon name="close" size={20} color="grey" />
                  <Text
                    style={{
                      // color: 'white',
                      fontSize: 14,
                      fontWeight: '400',
                      // textAlign: 'center',
                      // justifyContent: 'center',
                      // alignSelf: 'center',
                      alignContent: 'center',
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}>
                    No
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <View
                style={{
                  // flex: 1,
                  backgroundColor: '#E5E5F0',
                  //   borderRadius: 10,
                  // height: 16,
                  //   flexDirection: 'row',
                  // borderWidth: 1,
                  elevation: 5,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                  }}>
                  <Icon name="check" size={20} color="grey" />
                  <Text
                    style={{
                      // color: 'white',
                      fontSize: 14,
                      fontWeight: '400',
                      // textAlign: 'center',
                      // justifyContent: 'center',
                      // alignSelf: 'center',
                      alignContent: 'center',
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}>
                    Yes
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={{padding: 10}}>
          <View
            style={{
              // flex: 1,
              backgroundColor: '#000066',
              borderRadius: 10,
              // height: 16,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '400',
                textAlign: 'center',
                paddingTop: 15,
                paddingBottom: 15,
              }}>
              Book Video Consultation
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Contact;

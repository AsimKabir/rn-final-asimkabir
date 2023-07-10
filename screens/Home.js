// ./screens/About.js

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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
// import ChatHome from './screens/ChatHome';

import {
  requestUserPermission,
  NotificationListner,
  GetFCMToken,
} from './pushnotification_helpler';

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [topHospitals, setTopHospitals] = useState([]);

  const api_key = 'uXJxebFfgRVQxRLSozrp8U6A';
  const CF_Access_Client_Id = 'a5c99fb69a8aff66ba4a9a30f10f2b5d.access';
  const CF_Access_Client_Secret =
    '8eb187f378254b1ed34bb99ff43c78a841c867ab00a1743f378ec474364ab089';
  const API_url = 'https://oladoc.com/api/v5/home/fetch_home_screen';
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const fetch_home_screen = async () => {
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
      setTopHospitals(json['top_hospitals']);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // console.log('Top hospitals ===>>> \n', topHospitals);
      // setLandingLoadings(false);
    }
  };
  // console.log(topSpecialitiesList);
  useEffect(() => {
    fetch_home_screen();
    getFirebaseData();
  }, []);

  const windowWidth = Dimensions.get('window').width;

  const getFirebaseData = async () => {
    // const users = await firestore()
    //   .collection('ChatMessages')
    //   .doc('user-1')
    //   .get();

    var x = [];
    firestore()
      .collection('ChatMessages')
      .doc('user-1')
      .get()
      .then(documentSnapshot => {
        // console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          x = documentSnapshot.data();
          // console.log('User data x: ', x);
          // console.log('User data x: ', x.fname);
        }
      });

    // console.log(users['_data']['lname']);
  };

  return (
    <View style={{}}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View style={{}}>
              {/* <Main_Header_Bar /> */}
              <Top_Header_SearchBar navigation={navigation} />
              <Pressable
                onPress={() => {
                  // firestore()
                  //   .collection('ChatUsers')
                  //   .add({
                  //     name: 'hiran',
                  //     age: 100,
                  //   })
                  //   .then(() => {
                  //     console.log('User added!');
                  //   });
                  ///////////////////////////////////////////////////////////////////////////////////////////////
                  // firestore()
                  //   .collection('ChatUsers')
                  //   .get()
                  //   .then(documentSnapshot => {
                  //     console.log(
                  //       'User exists: ',
                  //       documentSnapshot._docs['1']._data,
                  //     );
                  //     if (documentSnapshot.exists) {
                  //       var x = documentSnapshot.data();
                  //       // console.log('User data x: ', x);
                  //       // console.log('User data x: ', x.fname);
                  //     }
                  //   });
                  ////////////////////////////////////////////////////////////////////////////////////////////////
                  // Alert.alert('Comming soon...');
                }}>
                <Book_Doctor_Section
                  lab_discount_banner_text={data.lab_discount_banner_text}
                  online_now_doctors_count={data.online_now_doctors_count}
                />
              </Pressable>
              {/* <I_Am_Looking_For_Section
                navigation={navigation}
                // topSpecialitiesList={topSpecialitiesList}
              /> */}
              <HealthZone_Section />
              <Recent_Doctors_Section />
              <Corporate_Insurance_HomeScreen_Section navigation={navigation} />
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Top_Hospitals_Section top_hospitals={topHospitals} />
              )}

              <Text style={{textAlign: 'center', paddingBottom: 10}}>
                5.25.12
              </Text>
            </View>
          );
        }}
      />
      <Home_Screen_Floating_Buttom navigation={navigation} />
    </View>
  );
};

const Home_Screen_Floating_Buttom = props => {
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
        backgroundColor: '#FF9E15',
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
      <Icon name="phone" color="white" size={30} />
    </Pressable>
  );
};

const Top_Hospitals_Section = props => {
  // console.log(props.top_hospitals[0]);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const topHospitals = props.top_hospitals;
  return (
    <View
      style={{
        margin: 20,
        paddingVertical: 20,
        paddingLeft: 20,
        backgroundColor: 'white',
        borderRadius: 20,
      }}>
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
        <Text
          style={[
            {
              flex: 5,
              fontSize: 18,
              fontWeight: '600',
            },
            isDarkTheme ? {color: 'black'} : null,
          ]}>
          Popular Hospitals
        </Text>
      </View>
      <View style={{}}>
        <ScrollView horizontal={true} style={{}}>
          {topHospitals.map((item, index) => (
            <Top_Hospital_Card topHospital={item} hospitalIndex={index} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const Top_Hospital_Card = props => {
  // console.log(props.topHospital);
  // console.log(props.hospitalIndex);

  const hospital_name = props.topHospital['hosp_name'];
  const hospital_picture = props.topHospital['picture'];

  // console.log(hospital_name);

  return (
    <View
      style={{
        // height: 170,
        backgroundColor: '#EFF0F2',
        borderRadius: 10,
        marginRight: 10,
      }}>
      <Image
        source={{uri: hospital_picture}}
        style={{
          width: 200,
          height: 130,
          // borderRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontWeight: '400',
          margin: 10,
        }}>
        {hospital_name}
      </Text>
    </View>
  );
};
const Corporate_Insurance_HomeScreen_Section = ({navigation}) => {
  // const navigation = useNavigation();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 16,
      }}>
      <View style={{flexDirection: 'row', margin: 10}}>
        <Icon name="shield" color="green" size={25} />
        <Text
          style={[
            {
              fontSize: 22,
              fontWeight: '400',
              justifyContent: 'center',
              // textAlign: 'center',
              textAlignVertical: 'center',
            },
            isDarkTheme ? {color: 'black'} : null,
          ]}>
          Have Corporate Insurance?
        </Text>
      </View>
      <View style={{marginLeft: 10}}>
        <View horizontal={true}>
          <Text style={[isDarkTheme ? {color: 'black'} : null]}>
            Free Unlimited Video Consultations{' '}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{padding: 16}}
        onPress={() => navigation.navigate('Search_Doctor_Screen')}>
        <View
          style={{
            // flex: 1,
            backgroundColor: '#FF9E15',
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
            Connect Now
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Recent_Doctors_Section = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <View
      style={{
        margin: 20,
        // marginLeft: 20,
        // padding: 20,
        paddingVertical: 20,
        paddingLeft: 20,
        // paddingTop: 20,
        backgroundColor: 'white',
        borderRadius: 20,
      }}>
      <View style={{flex: 1, marginBottom: 10}}>
        <Text
          style={[
            {
              flex: 5,
              fontSize: 18,
              fontWeight: '600',
            },
            isDarkTheme ? {color: 'black'} : null,
          ]}>
          Consult with Previous Doctors
        </Text>
      </View>
      <ScrollView horizontal={true}>
        <Recent_Doctor_Card />
        <Recent_Doctor_Card />
        <Recent_Doctor_Card />
        <Recent_Doctor_Card />
      </ScrollView>
    </View>
  );
};
const Recent_Doctor_Card = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <View
      style={{
        backgroundColor: '#EFF0F2',
        width: 220,
        padding: 15,
        borderRadius: 10,
        elevation: 1,
        marginRight: 10,
      }}>
      <ScrollView horizontal={true} style={{}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../images/earth.gif')}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              alignSelf: 'center',
            }}
          />
          <View style={{paddingLeft: 10}}>
            <Text
              style={[
                {fontWeight: '700'},
                isDarkTheme ? {color: 'black'} : null,
              ]}>
              Dr. Asim Kabir Ahmed
            </Text>
            <Text>Gynecologist</Text>
            <Text>13 days ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const HealthZone_Section = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <View
      style={{
        marginHorizontal: 16,
        // marginLeft: 20,
        // padding: 20,
        paddingVertical: 20,
        paddingLeft: 20,
        // paddingTop: 20,
        backgroundColor: 'white',
        borderRadius: 20,
      }}>
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
        <Text
          style={[
            {
              flex: 5,
              fontSize: 18,
              fontWeight: '600',
            },

            isDarkTheme ? {color: 'black'} : null,
          ]}>
          Latest on Health Zone
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: '400',
            color: '#000066',
            textDecorationLine: 'underline',
          }}>
          View all
        </Text>
      </View>
      <View style={{}}>
        <ScrollView horizontal={true} style={{}}>
          <Image
            source={require('../images/earth.gif')}
            style={{
              width: 200,
              height: 130,
              borderRadius: 10,
              alignSelf: 'center',
            }}
          />
          <Image
            source={require('../images/healthVideo1.jpg')}
            style={{
              width: 200,
              height: 130,
              borderRadius: 10,
              alignSelf: 'center',
              marginLeft: 10,
            }}
          />
          <Image
            source={require('../images/healthVideo1.jpg')}
            style={{
              width: 200,
              height: 130,
              borderRadius: 10,
              alignSelf: 'center',
              marginLeft: 10,
            }}
          />
          <Image
            source={require('../images/healthVideo1.jpg')}
            style={{
              width: 200,
              height: 130,
              borderRadius: 10,
              alignSelf: 'center',
              marginLeft: 10,
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const I_Am_Looking_For_Section = props => {
  // const navigation = useNavigation();
  const navigation = props.navigation;
  const topSpecialitiesList = [
    {
      name: 'Skin Specialist',
      slug: 'dermatologist',
      id: 15,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Gynecologist',
      slug: 'gynecologist',
      id: 72,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Urologist',
      slug: 'urologist',
      id: 70,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Child Specialist',
      slug: 'child-specialist',
      id: 52,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Orthopadic Surgon',
      slug: 'orthopedic-surgeon',
      id: 47,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Consultant Physician',
      slug: 'consultant-physician',
      id: 196,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'ENT Specialist',
      slug: 'ent-specialist',
      id: 17,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Neurologist',
      slug: 'neurologist',
      id: 36,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Eye Specialist',
      slug: 'eye-specialist',
      id: 20,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Psychiatrist',
      slug: 'psychiatrist',
      id: 59,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Dentist',
      slug: 'dentist',
      id: 14,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Gastroenterologist',
      slug: 'gastroenterologist',
      id: 22,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Heart Specialist',
      slug: 'cardiologist',
      id: 6,
      icon: '../images/top_speciality_icons/child-specialist.png',
    },
    {
      name: 'Pulmonologist',
      slug: 'pulmonologist',
      id: 61,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'General Physician',
      slug: 'general-physician',
      id: 58,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Diabetes Specialist',
      slug: 'diabetologist',
      id: 79,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'General Surgeon',
      slug: 'general-surgeon',
      id: 23,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Endocrinologist',
      slug: 'endocrinologist',
      id: 19,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Kidney Specialist',
      slug: 'nephrologist',
      id: 35,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
    {
      name: 'Pain Management Specialist',
      slug: 'dermatologist',
      id: 12,
      icon: '../images/top_speciality_icons/general-physician.png',
    },
  ];
  // console.log(topSpecialitiesList);

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 16,
      }}>
      <Text
        style={[
          {margin: 10, fontSize: 22, fontWeight: '400'},
          isDarkTheme ? {color: 'black'} : null,
        ]}>
        I'm looking for
      </Text>
      <View style={{flexDirection: 'row'}}>
        <ScrollView horizontal={true}>
          {topSpecialitiesList.map((item, index) => (
            <Speciality_Icon_With_Name item={item} navigation={navigation} />
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={{padding: 16}}
        onPress={() => navigation.navigate('Search_Doctor_Screen')}>
        <View
          style={{
            // flex: 1,
            backgroundColor: '#EFF0F2',
            borderRadius: 10,
            // height: 16,
          }}>
          <Text
            style={{
              color: '#000066',
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
              paddingTop: 15,
              paddingBottom: 15,
            }}>
            All Specialization
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Speciality_Icon_With_Name = props => {
  const speciality_name = props.item.name;
  var speciality_icon = props.item.icon;
  speciality_icon = '"' + speciality_icon + '"';
  const speciality_slug = props.item.slug;
  const speciality_id = props.item.id;
  const navigation = props.navigation;

  // console.log(speciality_name);
  // console.log(speciality_icon);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  // const imageasimkabir = '../images/top_speciality_icons/general-physician.png';
  return (
    <Pressable
      onPress={() => {
        // Alert.alert('hello');
        navigation.navigate('Appointment', {
          speciality_name: speciality_name,
          speciality_slug: speciality_slug,
          speciality_id: speciality_id,
          navigation: navigation,
        });
      }}
      style={{flexDirection: 'row', paddingHorizontal: 10}}>
      <View>
        <Image
          source={require('../images/top_speciality_icons/general-physician.png')}
          style={{
            width: 60,
            height: 60,
            borderRadius: 400 / 2,
            alignSelf: 'center',
          }}
        />
        <Text style={[{fontSize: 12}, isDarkTheme ? {color: 'black'} : null]}>
          {speciality_name}
        </Text>
      </View>
    </Pressable>
  );
};

const Book_Doctor_Section = props => {
  // console.log(props.online_now_doctors_count);

  const lab_discount_banner_text = props.lab_discount_banner_text;
  const online_now_doctors_count = props.online_now_doctors_count;
  return (
    <View style={styles.book_doctor_main}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          onPress={() => {
            // requestUserPermission();
            // NotificationListner();
            // console.log('called');
            // GetFCMToken();
          }}
          style={{
            width: '55%',
            backgroundColor: '#FFD79D',
            borderRadius: 20,
            margin: 5,
          }}>
          <Text style={[styles.mainText, {color: 'black', margin: 10}]}>
            Doctor Appointment
          </Text>
          <Image
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'flex-end',
            }}
            source={require('../images/doctor1.png')}
          />
        </Pressable>
        <View
          style={{
            width: '40%',
            backgroundColor: '#D4D4FF',
            borderRadius: 20,
            margin: 5,
          }}>
          <Text style={[styles.mainText, {color: 'black', margin: 10}]}>
            Video Consultation
          </Text>
          <Image
            style={{
              // flex: 1,
              alignSelf: 'center',
              alignItems: 'flex-end',
            }}
            source={require('../images/Mobile.png')}
          />
        </View>
      </View>
      <View style={{}}>
        <ImageBackground
          source={require('../images/Frame_OnlineNow_Doctors.png')}
          // resizeMode="cover"
          style={{height: 130}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                justifyContent: 'center',
                margin: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#232426',
                  fontWeight: '600',
                  lineHeight: 19,
                }}>
                Instant Video Consultation
              </Text>
              <View
                style={{
                  borderRadius: 40,
                  backgroundColor: '#000066',
                  alignContent: 'center',
                  // margin: 10,
                  marginTop: 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'white',
                    fontWeight: '400',
                    lineHeight: 19,
                    textAlignVertical: 'center',
                    // paddingTop: 6,
                    paddingVertical: 6,
                    paddingRight: 10,
                    // margin: 10,
                  }}>
                  {online_now_doctors_count} Doctors online now
                </Text>
                <Icon name="circle" size={20} color="green" />
              </View>
            </View>
            <View>
              <Image
                style={{
                  flex: 1,
                  height: 90,
                  width: 80,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                }}
                source={require('../images/Mobile2.png')}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          backgroundColor: '#E5E5F0',
          borderRadius: 20,
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              borderRadius: 20,
            }}
            source={require('../images/Lab_Image.png')}
          />
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 20,
              alignItems: 'flex-end',
              alignSelf: 'center',
            }}>
            <Text style={{fontSize: 18, color: '#000066', fontWeight: '400'}}>
              Lab tests
            </Text>
            <View
              style={{
                borderRadius: 20,
                backgroundColor: 'white',
                alignContent: 'center',
                marginTop: 10,
                flexDirection: 'row',
                paddingLeft: 10,
                paddingRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="certificate"
                size={20}
                color="blue"
                style={{alignContent: 'center'}}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'black',
                  textAlignVertical: 'center',
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 15,
                }}>
                {lab_discount_banner_text}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Top_Header_SearchBar = ({navigation}) => {
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable onPress={() => navigation.navigate('Login_Screen')}>
          <Icon name="bars" size={30} color="white" />
        </Pressable>

        <View style={{marginLeft: 20}}>
          <Text style={styles.mainText}>Current City</Text>
          <Text style={styles.secondaryText}>Lahore</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 'auto',
            alignItems: 'center',
            // padding: 10,
          }}>
          <Icon name="credit-card" size={20} color="orange" />
          <Text style={styles.secondaryText}>Rs. 3487</Text>
        </View>
      </View>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Find Doctor, Speciality, Diseases and Hospitals"
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#242C81',
    padding: 10,
  },
  book_doctor_main: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'red',
    margin: 10,
    padding: 10,
  },
  mainText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    padding: 5,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 5,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    // flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    // backgroundColor: '#fff',
    // color: '#424242',
  },
});

export default Home;

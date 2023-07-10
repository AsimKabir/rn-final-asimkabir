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
import Action_Sheet from './generic_components/Action_Sheet';

import Modal from 'react-native-modal';

export default function Doctor_Profile_Screen({route}) {
  const {
    is_partner,
    doctor_name,
    doctor_specialization,
    doctor_degree,
    wait_time,
    experience,
    featured_review,
    feedback_percentage,
    users_who_recommended,
    navigation,
    list_of_doctor_hospitals,
    bookable_hospitals,
    doctor_picture,
    worker,
  } = route.params;

  const [data, setData] = useState([]);
  const [doctorReviews, setDoctorReviews] = useState([]);
  const [doctorFeedback, setDoctorFeedback] = useState([]);
  const [doctorServices, setDoctorServices] = useState([]);
  const [doctorConditions, setDoctorConditions] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const api_key = 'uXJxebFfgRVQxRLSozrp8U6A';
  const CF_Access_Client_Id = 'a5c99fb69a8aff66ba4a9a30f10f2b5d.access';
  const CF_Access_Client_Secret =
    '8eb187f378254b1ed34bb99ff43c78a841c867ab00a1743f378ec474364ab089';
  const API_url =
    'https://oladoc.com/api/v5/od/provider/profile?doctor_id=' + worker;
  //   console.log('worker ==> ', API_url);

  const getMovies = async () => {
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
      setDoctorReviews(json.doc.text_reviews);
      setDoctorFeedback(json['doc']['feedback']);
      setDoctorServices(json['profile']['services'].split(','));
      setDoctorConditions(json['profile']['conditions'].split(','));
      //   console.log(json['doc']['text_reviews']);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      //   console.log(data);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  //   console.log(worker);
  //   console.log(doctorServices);
  //   console.log('doctorConditions ==>', doctorServices[1]);

  return (
    <View style={{backgroundColor: '#E5E5E5'}}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={{}}>
                <Doctor_Profile_Top_Header />
                <Doctor_Profile_Doctor_Card
                  is_partner={is_partner}
                  featured_review={featured_review}
                  doctor_name={doctor_name}
                  doctor_picture={doctor_picture}
                  doctor_specialization={doctor_specialization}
                  // doctor_picture="../images/doctor1.png"
                  wait_time={wait_time}
                  experience={experience}
                  feedback_percentage={feedback_percentage}
                  users_who_recommended={users_who_recommended}
                  navigation={navigation}
                />
                <Detailed_Patient_Rating_Doctor_Card
                  doctorFeedback={doctorFeedback}
                  doctor_name={doctor_name}
                />
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 35,
                    fontWeight: '500',
                    borderBottomColor: '#F0F3F6',
                    borderBottomWidth: 1,
                    backgroundColor: 'white',
                    padding: 10,
                  }}>
                  Clinic Locations of {doctor_name} (
                  {list_of_doctor_hospitals.length})
                </Text>
                {list_of_doctor_hospitals.map((item, index) => (
                  <Clinic_Detail_Section_Doctor_Profile
                    doctor_location_data={item}
                    // no_of_doctor_location={list_of_doctor_hospitals.length}
                    // doctor_name={doctor_name}
                    doctor_location_index={index}
                  />
                ))}
                {isLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <View style={{marginVertical: 10, backgroundColor: 'white'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 35,
                        fontWeight: '500',
                        borderBottomColor: '#F0F3F6',
                        borderBottomWidth: 1,
                        backgroundColor: 'white',
                        padding: 10,
                      }}>
                      Reviews about {doctor_name} (246)
                    </Text>
                    {doctorReviews.map((item, index) => (
                      <Detailed_Review_Doctor_Profile doctorReviews={item} />
                    ))}
                    <Pressable
                      onPress={() => {
                        Alert.alert(
                          'Roko zara sabar kro\nsakhat sy sakhat saza di jay',
                        );
                      }}
                      style={{
                        height: 50,
                        width: 150,
                        borderWidth: 1,
                        borderRadius: 10,
                        alignItems: 'center',
                        textAlignVertical: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                      }}>
                      <Text style={{color: 'black'}}>Load More</Text>
                    </Pressable>
                  </View>
                )}

                <Services_Section_Doctor_Profile
                  title="Services Treated"
                  doctorServices={doctorServices}
                />

                <Services_Section_Doctor_Profile
                  title="Condition Treated"
                  doctorServices={doctorConditions}
                />
              </View>
              <HealthZone_Section />

              <View style={{backgroundColor: 'red', margin: 20, padding: 20}}>
                <Text style={{fontSize: 20, color: 'white', fontWeight: '400'}}>
                  Similar Doctors
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <ScrollView horizontal={true}>
                    <Carousel_Doctor_Card />
                    <Carousel_Doctor_Card />
                    <Carousel_Doctor_Card />
                    <Carousel_Doctor_Card />
                  </ScrollView>
                </View>
              </View>
            </View>
          );
        }}
      />
      <Doctor_Profile_Sticky_Button
        navigation={navigation}
        doctor_name={doctor_name}
        bookable_hospitals={bookable_hospitals}
        doctor_picture={doctor_picture}
        doctor_specialization={doctor_specialization}
        is_partner={is_partner}
      />
    </View>
  );
}

const Carousel_Doctor_Card = props => {
  //   const doctor_name = props.name[props.currentindex]['doc_name'];
  //   const experinace = props.name[props.currentindex]['experience'];
  //   const doctor_fee = props.name[props.currentindex]['fee'];
  const doctor_name = 'asim kabir';
  const experinace = '13';
  const doctor_fee = '5000';
  return (
    <View
      style={{
        backgroundColor: 'white',
        // marginHorizontal: 20,
        marginLeft: 15,
        width: 220,
        borderRadius: 8,
        padding: 16,
        marginBottom: 100,
        marginTop: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{}}>
          <Image
            source={require('../images/doctor1.png')}
            style={{
              width: 60,
              height: 60,
              borderRadius: 400 / 2,
              alignSelf: 'center',
              marginRight: 8,
            }}
          />
        </View>
        <View>
          <Text style={{fontSize: 14, fontWeight: '600', lineHeight: 21}}>
            {doctor_name}
          </Text>
          <Text style={{fontSize: 12, fontWeight: '400', lineHeight: 18}}>
            {experinace} years experiance
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400', lineHeight: 18}}>
            Rs. {doctor_fee}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 25,
          height: 30,
          borderRadius: 20,
          backgroundColor: '#FF9E15',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '400',
            verticalAlign: 'middle',
            // marginHorizontal: 20,
          }}>
          Start Consultation
        </Text>
        <Icon name="arrow-right" size={20} color="#000066" />
      </TouchableOpacity>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const Doctor_Profile_Sticky_Button = props => {
  const navigation = props.navigation;
  const doctor_name = props.doctor_name;
  const bookable_hospitals = props.bookable_hospitals;
  const is_partner = props.is_partner;
  const doctor_picture = props.doctor_picture;
  const doctor_specialization = props.doctor_specialization;
  ///////////////////////////////////////////////////////
  const [displayActionSheet, setDisplayActionSheet] = useState(false);
  //////////////////////////////////////////////////////
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
        height: 80,
        bottom: 0,
        right: 0,
        elevation: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          onPress={() => Alert.alert('action sheet place kro')}
          style={{
            backgroundColor: '#000066',
            width: 200,
            height: 50,
            borderRadius: 8,
            margin: 5,
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
            Call Now
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setDisplayActionSheet(true);
          }}
          // onPress={() =>
          //   navigation.navigate('Calender_Screen', {
          //     navigation: navigation,
          //     is_partner: is_partner,
          //     doctor_name: doctor_name,
          //     doctor_picture: doctor_picture,
          //     doctor_specialization: doctor_specialization,
          //   })
          // }
          style={{
            backgroundColor: '#FF9E15',
            width: 200,
            height: 50,
            borderRadius: 8,
            margin: 5,
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
            Book Appointment
          </Text>
        </Pressable>
      </View>

      <Action_Sheet
        displayActionSheet={displayActionSheet}
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
            Skin Specialist in Pakistan
          </Text>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Icon name="phone" color="black" size={25} style={{}} />
          </View>
        </View>
      </View>
    </View>
  );
};

const Doctor_Profile_Doctor_Card = props => {
  // console.log('is Partner Doctor ==> ', is_partner);
  //   console.log(props);

  const is_partner = props.is_partner;
  const featured_review = props.featured_review;
  const doctor_name = props.doctor_name;
  const doctor_specialization = props.doctor_specialization;
  const doctor_degree = props.doctor_degree;
  const doctor_picture = props.doctor_picture;

  const wait_time = props.wait_time;
  const experience = props.experience;
  const feedback_percentage = props.feedback_percentage;
  const users_who_recommended = props.users_who_recommended;
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
      {/* featured_review */}
      <Patient_Rating_Doctor_Card
        wait_time={wait_time}
        experience={experience}
        feedback_percentage={feedback_percentage}
        users_who_recommended={users_who_recommended}
      />
    </Pressable>
  );
};
const HealthZone_Section = () => {
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
          style={{
            flex: 5,
            fontSize: 18,
            fontWeight: '600',
          }}>
          Doctor Videos
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
const Detailed_Patient_Rating_Doctor_Card = props => {
  const total_reviews = props.doctorFeedback.total_reviews;
  const detail_feedback_percentage_color_threshold =
    props.doctorFeedback.detail_feedback_percentage_color_threshold;
  const overall_experience = props.doctorFeedback.overall_experience;
  const clinic_environment = props.doctorFeedback.clinic_environment;
  const staff_behaviour = props.doctorFeedback.staff_behaviour;
  const doctor_checkup = props.doctorFeedback.doctor_checkup;
  const doctor_name = props.doctor_name;
  //   console.log('total_reviews ==> ', total_reviews);
  return (
    <View style={{backgroundColor: 'white', marginVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: '#EFF0F2',
          borderBottomWidth: 1,
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
        <Icon name="star" size={20} color="black" />
        <Text
          style={{
            textAlignVertical: 'center',
            marginLeft: 10,
            fontSize: 16,
            lineHeight: 20,
            fontWeight: '500',
          }}>
          {doctor_name}’s Reviews ({total_reviews})
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 25,
        }}>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: 10,
              //   margin: 20,
              borderRadius: 50,
              width: 80,
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: 18,
              lineHeight: 58,
              fontWeight: '400',
            }}>
            {overall_experience}%
          </Text>
          <Text>Satisfied out of {total_reviews} </Text>
          <Text>Patients</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text>Doctor Checkup</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: 143}}>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                // progress={doctor_checkup / 105}
                progress={0.9}
                animating={true}
                color="black"
              />
            </View>
            <Text style={{color: '#232426', fontSize: 16, marginLeft: 10}}>
              {doctor_checkup}%
            </Text>
          </View>
          <Text>Clinic Environment</Text>
          <View
            style={{
              //   flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{width: 143}}>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                // progress={clinic_environment / 105}
                progress={0.6}
                color="black"
              />
            </View>
            <Text style={{color: '#232426', fontSize: 16, marginLeft: 10}}>
              {clinic_environment}%
            </Text>
          </View>
          <Text>Staff Behaviour</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: 143}}>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                // progress={staff_behaviour / 105}
                progress={0.9}
                color="black"
              />
            </View>
            <Text style={{color: '#232426', fontSize: 16, marginLeft: 10}}>
              {staff_behaviour}%
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          margin: 20,
          padding: 10,
          borderColor: '#EFF0F2',
        }}>
        <Text style={{fontSize: 16, color: 'black'}}>
          "very nice and calm doctor... she listened to me carefully and treated
          me nicely ...totally satisfied"
        </Text>
        <Text>Verified patient: A**a . 9 months ago</Text>
      </View>
      <View
        style={{
          height: 50,
          width: 370,
          borderWidth: 1,
          borderRadius: 10,
          alignItems: 'center',
          textAlignVertical: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Text style={{color: 'black'}}>Read all 246 reviews</Text>
      </View>
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

const Patient_Rating_Doctor_Card = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginHorizontal: 30,
      }}>
      <View>
        <Text style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>
          {props.wait_time}
        </Text>
        <Text style={{fontSize: 12, textAlign: 'center'}}>Wait Time</Text>
      </View>
      <View
        style={{
          width: 1,
          backgroundColor: '#E5E5F0',
          textAlign: 'center',
        }}></View>
      <View>
        <Text style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>
          {props.experience} Years
        </Text>
        <Text style={{fontSize: 12, textAlign: 'center'}}>Experiance</Text>
      </View>
      <View
        style={{
          width: 1,
          backgroundColor: '#E5E5F0',
          textAlign: 'center',
        }}></View>
      <View>
        <Text style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>
          {props.feedback_percentage} ({props.users_who_recommended})
        </Text>
        <Text style={{fontSize: 12}}>Satisfied Patients</Text>
      </View>
    </View>
  );
};

const Detailed_Review_Doctor_Profile = props => {
  //   console.log(props);

  const recommended = props.doctorReviews['recommended'];
  const verified = props.doctorReviews['verified'];
  const complete_review = props.doctorReviews['complete_review'];
  const patient_name = props.doctorReviews['patient_name'];
  const time = props.doctorReviews['time'];

  //   console.log('===============================================');
  //   console.log('recommended ==> ', recommended);
  //   console.log('verified ==> ', verified);
  //   console.log('complete_review ==> ', complete_review);
  //   console.log('patient_name ==> ', patient_name);
  //   console.log('time ==> ', time);

  return (
    <View style={{backgroundColor: 'white', padding: 2}}>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          margin: 10,
          padding: 10,
          borderColor: '#EFF0F2',
        }}>
        <View style={{flexDirection: 'row'}}>
          {recommended == '1' ? (
            <Icon name="thumbs-o-up" size={20} color="black" />
          ) : (
            <Icon name="thumbs-down" size={20} color="black" />
          )}
          <Text style={{fontSize: 16, color: 'black'}}>"Satisfied"</Text>
        </View>
        <Text style={{fontSize: 16, color: 'black'}}>"{complete_review}"</Text>
        <Text>
          Verified patient: {patient_name} . {time}
        </Text>
      </View>
    </View>
  );
};

const Clinic_Detail_Section_Doctor_Profile = props => {
  //   console.log(props);
  const has_active_subs = props.doctor_location_data['has_active_subs'];
  const allow_online_booking =
    props.doctor_location_data['allow_online_booking'];
  const hospital_name = props.doctor_location_data['subs_name'];
  const hospital_fee = props.doctor_location_data['fee'];
  const app_discount_text = props.doctor_location_data['app_discount_text'];
  const when_available = props.doctor_location_data['when_available'];
  const hospital_locality = props.doctor_location_data['locality'];
  const is_video_consultation =
    props.doctor_location_data['video_consultation'];
  const hospital_address = props.doctor_location_data['address'];
  //   const doctor_name = props.doctor_name;
  //   const no_of_doctor_location = props.no_of_doctor_location;

  //   console.log(
  //     '=======================================================================================',
  //   );
  //   console.log('has_active_subs ==> ', has_active_subs);
  //   console.log('allow_online_booking ==> ', allow_online_booking);
  //   console.log('hospital_name ==> ', hospital_name);
  //   console.log('hospital_fee ==> ', hospital_fee);
  //   console.log('app_discount_text ==> ', app_discount_text);
  //   console.log('when_available ==> ', when_available);
  //   console.log('hospital_locality ==> ', hospital_locality);
  //   console.log('is_video_consultation ==> ', is_video_consultation);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0F2',
      }}>
      <Text style={{fontSize: 14, fontWeight: '500', marginTop: 20}}>
        {hospital_name}
      </Text>
      <Text style={{fontSize: 14, marginTop: 5}}>{hospital_address}</Text>

      <Text style={{fontSize: 14, fontWeight: '500', marginTop: 20}}>
        Fee: Rs. {hospital_fee} ({app_discount_text})
      </Text>
      <View style={{fontSize: 14, fontWeight: '500', marginVertical: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Today</Text>
          <Text>09:00 AM - 06:00 PM</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Tomorrow</Text>
          <Text>09:00 AM - 06:00 PM</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text>View all timings</Text>
          <Icon name="caret-down" size={22} color="black" />
        </View>
      </View>

      <View
        style={[
          is_video_consultation == '1'
            ? {backgroundColor: '#000066', borderWidth: 1}
            : {backgroundColor: '#FF9E15'},

          {
            height: 50,
            width: 400,
            borderRadius: 20,
            alignItems: 'center',
            //   textAlignVertical: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            //   marginBottom: 20,
            flexDirection: 'row',
          },
        ]}>
        {is_video_consultation == '1' ? (
          <Icon name="video-camera" size={22} color="white" />
        ) : null}
        <Text style={{color: 'white', marginLeft: 10}}>
          {is_video_consultation == '1'
            ? 'Book Video Consultation'
            : 'Book Appointment'}
        </Text>
      </View>
    </View>
  );
};

const Services_Section_Doctor_Profile = props => {
  //   console.log(props.doctorServices);
  const doctorServices = props.doctorServices;
  return (
    <View style={{backgroundColor: 'white', padding: 20, marginVertical: 10}}>
      <Text
        style={{
          fontSize: 16,
          lineHeight: 18,
          fontWeight: '600',
          borderBottomColor: '#F0F3F6',
          borderBottomWidth: 1,
        }}>
        {props.title}
      </Text>
      <View style={{margin: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {/* {doctorServices.map((item, index) => (
            <Service_Pill item={item} />
          ))} */}
          <FlatList
            numColumns={2}
            data={doctorServices}
            renderItem={({item}) => <Service_Pill item={item} />}
          />
        </View>
      </View>
      <Text>See 12 more</Text>
    </View>
  );
};

const Service_Pill = props => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon name="circle" size={7} />
      <Text numberOfLines={1} style={{marginLeft: 5, width: 150}}>
        {props.item.substring(0, 10)}
      </Text>
    </View>
  );
};

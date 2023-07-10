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
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Action_Sheet from './generic_components/Action_Sheet';

const windowWidth = Dimensions.get('window').width;

const Appointment = ({route}) => {
  const [isLoading, setLoading] = useState(false);
  const [isLandingLoading, setLandingLoadings] = useState(true);
  const [data, setData] = useState([]);
  const [Asimdata, setAsimdata] = useState([]);
  const [listOfDoctors, setListOfDoctors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayActionSheet, setDisplayActionSheet] = useState(false);

  const api_key = 'uXJxebFfgRVQxRLSozrp8U6A';
  const CF_Access_Client_Id = 'a5c99fb69a8aff66ba4a9a30f10f2b5d.access';
  const CF_Access_Client_Secret =
    '8eb187f378254b1ed34bb99ff43c78a841c867ab00a1743f378ec474364ab089';
  const API_url =
    'https://oladoc.com/api/v5/od/provider/search_doctors?specialization=' +
    route.params.speciality_id +
    '&service=&disease=&online_now=0&oladoc_care=0&availability=&gender=male&city=Lahore&page=' +
    pageNumber;

  // console.log('URL=========>>>>> ', API_url);
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
      setListOfDoctors(json['doctors']);

      setAsimdata(json['doctors']);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
      setLandingLoadings(false);
    }
  };

  const loadMoreFunction = async () => {
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
      Asimdata.push(...json.doctors);
      setAsimdata(Asimdata);
      for (let i = 0; i < Asimdata.length; i++) {
        console.log('Load more AsimData ==>>>', Asimdata[i].doc_name);
      }
      setListOfDoctors(Asimdata);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // console.log(
  //   'speciality_name ===>',
  //   route.params.speciality_name,
  //   '\nspeciality_id ===>',
  //   route.params.speciality_id,
  //   '\nspeciality_slug ===>',
  //   route.params.speciality_slug,
  // );
  return (
    <View style={{backgroundColor: '#E5E5E5'}}>
      <ScrollView>
        <View style={{}}>
          <Listing_Top_Header />
          <Listing_SearchBar_Section />
          <Listing_Filters_Section />
          <Text
            style={{
              color: '#232426',
              fontWeight: '600',
              fontSize: 14,
              lineHeight: 28,
              marginHorizontal: 16,
              marginTop: 12,
            }}>
            Top {data['total_records']} {route.params.speciality_name} Available
          </Text>

          {isLandingLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            data['doctors'].map((item, index) =>
              index == 1 ? (
                <View>
                  <Carousel_Online_Now
                    carousel_data={data['online_now_config_and_doctors']}
                  />
                  <Listing_Doctor_Card
                    doctors_data={listOfDoctors}
                    doctor_index={index}
                    navigation={route.params.navigation}
                  />
                </View>
              ) : (
                <Listing_Doctor_Card
                  doctors_data={listOfDoctors}
                  doctor_index={index}
                  navigation={route.params.navigation}
                />
              ),
            )
          )}
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button
              title="Load more"
              onPress={() => {
                // Alert.alert('hello');
                setPageNumber(pageNumber + 1);
                console.log('PAGE NUMBER ==>>> ', pageNumber);
                setLoading(true);
                loadMoreFunction();
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const Carousel_Online_Now = props => {
  const [online_doctors, setOnlineDoctors] = useState(
    props.carousel_data['online_now_doctors'],
  );
  return (
    <View style={{}}>
      <ImageBackground
        source={require('../images/onlineNowMobile.png')}
        style={{}}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: '500',
            lineHeight: 31,
            marginTop: 24,
            marginBottom: 8,
            paddingLeft: 16,
          }}>
          {/* Gynecologists asim Online Now */}
          {props.carousel_data['online_now_carousel_title']}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#000066',
            width: 178,
            justifyContent: 'space-between',
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 20,
            marginLeft: 16,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 21,
            }}>
            {props.carousel_data['online_now_doctors'].length} doctors online
            now
          </Text>
          <Icon name="circle" color="green" size={18} />
        </View>
        <ScrollView
          horizontal={true}
          style={{
            marginTop: 25,
          }}>
          {props.carousel_data['online_now_doctors'].length > 0
            ? online_doctors.map((item, index) => (
                // <Text>asd</Text>
                <Carousel_Doctor_Card
                  // doctor_name={item}
                  name={online_doctors}
                  currentindex={index}
                  // experiance={item['experience']}
                  // price={item['fee']}
                  // pic={item['pic']}
                />
              ))
            : null}

          {/* <Carousel_Doctor_Card online_doctors_data={online_doctors} /> */}
          {/* <Carousel_Doctor_Card online_doctors_data={online_doctors} /> */}
        </ScrollView>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            textAlign: 'right',
            padding: 20,
          }}>
          View all
        </Text>
      </ImageBackground>
    </View>
  );
};

const Carousel_Doctor_Card = props => {
  const doctor_name = props.name[props.currentindex]['doc_name'];
  const experinace = props.name[props.currentindex]['experience'];
  const doctor_fee = props.name[props.currentindex]['fee'];
  return (
    <View
      style={{
        backgroundColor: 'white',
        // marginHorizontal: 20,
        marginLeft: 15,
        width: 220,
        borderRadius: 8,
        padding: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{}}>
          <Image
            source={{uri: props.name[props.currentindex]['pic']}}
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
          paddingTop: 25,
        }}>
        <Text
          style={{
            color: '#000066',
            fontSize: 16,
            fontWeight: '400',
          }}>
          Start Consultation
        </Text>
        <Icon name="arrow-right" size={20} color="#000066" />
      </TouchableOpacity>
    </View>
  );
};
const Listing_Doctor_Card = props => {
  const is_partner = props.doctors_data[props.doctor_index]['is_partner'];
  const list_of_doctor_hospitals =
    props.doctors_data[props.doctor_index]['hospitals'];
  const featured_review =
    props.doctors_data[props.doctor_index]['featured_review'];
  const doctor_name = props.doctors_data[props.doctor_index]['doc_name'];
  const doctor_specialization =
    props.doctors_data[props.doctor_index]['specializations'];
  const doctor_degree = props.doctors_data[props.doctor_index]['degree'];
  const doctor_picture = props.doctors_data[props.doctor_index]['pic'];
  const is_bookable = props.doctors_data[props.doctor_index]['is_bookable'];
  const has_active_subscription =
    props.doctors_data[props.doctor_index]['has_active_subscription'];

  const wait_time = props.doctors_data[props.doctor_index]['wait_time'];
  const experience = props.doctors_data[props.doctor_index]['experience'];
  const feedback_percentage =
    props.doctors_data[props.doctor_index]['feedback_percentage'];
  const users_who_recommended =
    props.doctors_data[props.doctor_index]['users_who_recommended'];
  const worker = props.doctors_data[props.doctor_index]['worker'];
  const navigation = props.navigation;
  const [displayActionSheet, setDisplayActionSheet] = useState(false);

  const bookable_hospitals =
    props.doctors_data[props.doctor_index]['bookable_hospitals'];

  // console.log('worker ==> ', bookable_hospitals);
  return (
    <View
      style={{
        margin: 5,
        paddingVertical: 16,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
      }}>
      <Pressable
        onPress={() => {
          // Alert.alert('hello');
          navigation.navigate('Doctor_Profile_Screen', {
            is_partner: is_partner,
            doctor_name: doctor_name,
            doctor_picture: doctor_picture,
            doctor_specialization: doctor_specialization,
            doctor_degree: doctor_degree,
            wait_time: wait_time,
            experience: experience,
            featured_review: featured_review,
            feedback_percentage: feedback_percentage,
            users_who_recommended: users_who_recommended,
            list_of_doctor_hospitals: list_of_doctor_hospitals,
            bookable_hospitals: bookable_hospitals,
            navigation: navigation,
            worker: worker,
          });
        }}>
        <Doctor_Detail_Section_on_Doctor_Card_Listing
          doctor_name={doctor_name}
          doctor_specialization={doctor_specialization}
          doctor_degree={doctor_degree}
          doctor_picture={doctor_picture}
          doctor_is_partner={is_partner}
        />
      </Pressable>
      {/* featured_review */}
      <Patient_Rating_Doctor_Card
        wait_time={wait_time}
        experience={experience}
        feedback_percentage={feedback_percentage}
        users_who_recommended={users_who_recommended}
      />
      {featured_review['text'] != '' ? (
        <Patient_Review_On_Doctor_Card_Component
          featured_review={featured_review}
        />
      ) : null}
      <ScrollView horizontal={true}>
        {list_of_doctor_hospitals.map((item, index) => (
          <Doctor_Location_On_Doctor_Card_Listing
            // is_Video={true}
            doctor_location_data={list_of_doctor_hospitals}
            doctor_location_index={index}
          />
        ))}

        {/* <Doctor_Location_On_Doctor_Card_Listing is_Video={false} />
        <Doctor_Location_On_Doctor_Card_Listing is_Video={true} /> */}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          marginHorizontal: 10,
          // margin: 20,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('Doctor_Profile_Screen', {
              is_partner: is_partner,
              doctor_name: doctor_name,
              doctor_picture: doctor_picture,
              doctor_specialization: doctor_specialization,
              doctor_degree: doctor_degree,
              wait_time: wait_time,
              experience: experience,
              featured_review: featured_review,
              feedback_percentage: feedback_percentage,
              users_who_recommended: users_who_recommended,
              list_of_doctor_hospitals: list_of_doctor_hospitals,
              navigation: navigation,
              worker: worker,
            });
          }}
          style={{
            height: 43,

            width: windowWidth * 0.45,
            justifyContent: 'center',
            // borderWidth: 1,
            borderRadius: 10,
            // borderColor: 'red',
            backgroundColor: '#000066',
            elevation: 5,
          }}>
          <Text
            style={{color: 'white', textAlign: 'center', textAlign: 'center'}}>
            View Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setDisplayActionSheet(true);
          }}
          style={{
            marginLeft: 10,
            height: 43,
            width: windowWidth * 0.45,
            borderRadius: 10,
            borderColor: 'red',
            backgroundColor: 'white',
            elevation: 5,
            justifyContent: 'center',
            backgroundColor: '#FF9E15',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            Book Appointment
          </Text>
        </TouchableOpacity>
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

const Patient_Review_On_Doctor_Card_Component = props => {
  // console.log(props);
  return (
    <ImageBackground
      source={require('../images/patientReview.png')}
      resizeMode="stretch"
      style={{marginHorizontal: 16, marginTop: 16}}>
      <Text style={{fontSize: 12, margin: 10}}>
        {props.featured_review['text']}
      </Text>
    </ImageBackground>
  );
};

const Doctor_Detail_Section_on_Doctor_Card_Listing = props => {
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
        <Text
          numberOfLines={2}
          style={{fontSize: 14, fontWeight: '400', lineHeight: 21}}>
          {props.doctor_specialization}
        </Text>
        <Text
          numberOfLines={2}
          style={{fontSize: 14, fontWeight: '400', lineHeight: 21}}>
          {props.doctor_degree}
        </Text>
      </View>
    </View>
  );
};

const Doctor_Location_On_Doctor_Card_Listing = props => {
  const has_active_subs = parseInt(
    props.doctor_location_data[props.doctor_location_index]['has_active_subs'],
  );
  const allow_online_booking = parseInt(
    props.doctor_location_data[props.doctor_location_index][
      'allow_online_booking'
    ],
  );
  const doc_schedule =
    props.doctor_location_data[props.doctor_location_index]['doc_schedule'];
  const hospital_name =
    props.doctor_location_data[props.doctor_location_index]['subs_name'];
  const hospital_fee = parseInt(
    props.doctor_location_data[props.doctor_location_index]['fee'],
  );
  const maximum_fee = parseInt(
    props.doctor_location_data[props.doctor_location_index]['maximum_fee'],
  );
  const app_discount_text =
    props.doctor_location_data[props.doctor_location_index][
      'app_discount_text'
    ];
  const when_available =
    props.doctor_location_data[props.doctor_location_index]['when_available'];
  const hospital_locality =
    props.doctor_location_data[props.doctor_location_index]['locality'];
  const is_video_consultation =
    props.doctor_location_data[props.doctor_location_index][
      'video_consultation'
    ];
  // console.log(maximum_fee);
  return (
    <View
      style={[
        is_video_consultation == '1'
          ? {borderColor: '#000066'}
          : {borderColor: '#E5E5F0'},
        is_video_consultation == '1' ? null : {maxHeight: 60},
        {
          borderWidth: 1,
          borderRadius: 8,
          width: 300,
          marginTop: 16,
          marginHorizontal: 5,
        },
      ]}>
      <View style={{flexDirection: 'row', padding: 8}}>
        {is_video_consultation == '1' &&
        has_active_subs == 1 &&
        allow_online_booking == 1 ? (
          <Icon name="video-camera" size={18} color="#000" />
        ) : null}
        <Text
          style={{fontWeight: '600', fontSize: 12, paddingLeft: 5}}
          numberOfLines={1}>
          {hospital_name} ({hospital_locality})
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: 3,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {has_active_subs == 1 &&
          allow_online_booking == 1 &&
          when_available != '' ? (
            <Icon
              style={{marginRight: 5}}
              name="circle"
              size={12}
              color="#337F37"
            />
          ) : (
            <Icon
              style={{marginRight: 5}}
              name="calendar"
              size={12}
              color="black"
            />
          )}
          {has_active_subs == 1 &&
          allow_online_booking == 1 &&
          doc_schedule.length != 0 &&
          when_available.length != 0 ? (
            <Text style={{fontWeight: '600', fontSize: 12, color: '#2A872E'}}>
              Available {when_available}
            </Text>
          ) : doc_schedule.length === 0 ? (
            <Text>N/A</Text>
          ) : doc_schedule.length != 0 ? (
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: 'black',
              }}>
              {doc_schedule}
            </Text>
          ) : null}
        </View>
        <View style={{flexDirection: 'row'}}>
          {has_active_subs == 1 &&
          allow_online_booking == 1 &&
          maximum_fee > hospital_fee ? (
            <Text
              style={{
                textDecorationLine: 'line-through',
                fontWeight: '600',
                fontSize: 12,
              }}>
              Rs. {maximum_fee}
            </Text>
          ) : null}
          <Text style={{fontWeight: '600', fontSize: 12}}>
            Rs. {hospital_fee}
          </Text>
        </View>
      </View>
      {is_video_consultation == '1' && app_discount_text != '' ? (
        <View
          style={{
            backgroundColor: '#000066',
            borderBottomStartRadius: 7,
            borderBottomEndRadius: 7,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '500',
              padding: 2,
            }}>
            {app_discount_text}
          </Text>
        </View>
      ) : null}
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
        marginHorizontal: 10,
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

const Listing_Filters_Section = () => {
  // const [showRightScrollButton, setshowRightScrollButton] = useState(true);
  // const [showLeftScrollButton, setshowLeftScrollButton] = useState(false);
  const [showGenericScrollButton, setshowGenericScrollButton] = useState(1); // used for show scroll button on filters --> 1 for left button && 2 for right button
  return (
    <View>
      <ScrollView
        horizontal={true}
        style={{}}
        ref={node => (this.scroll = node)}
        onScroll={({nativeEvent}) => {
          if (isCloseToRight(nativeEvent)) {
            // show the left button
            // setshowRightScrollButton(false);
            // setshowLeftScrollButton(true);
            console.log('RIGHTTTTT');
            setshowGenericScrollButton(2);
          } else if (isCloseToLeft(nativeEvent)) {
            // show the right button
            // setshowRightScrollButton(true);
            // setshowLeftScrollButton(false);
            console.log('LEEEFFFTTTTTTT');
            setshowGenericScrollButton(1);
          }
        }}>
        <View>
          <View
            style={{flex: 1, flexDirection: 'row', backgroundColor: 'gold'}}>
            <Listing_Single_Filter_Component
              text="Doctors Near Me"
              slug=""
              icon="map-marker"
            />
            <Listing_Single_Filter_Component
              text="Most Experiance"
              slug=""
              icon="suitcase"
            />
            <Listing_Single_Filter_Component
              text="Female Doctors"
              slug=""
              icon="female"
            />
            <Listing_Single_Filter_Component text="Online Now" icon="female" />
            <Listing_Single_Filter_Component
              text="Platinum Doctors"
              slug=""
              icon="female"
            />
            <Listing_Single_Filter_Component
              text="Doctors Below Rs. 1000"
              slug=""
              icon="video-camera"
            />
          </View>
          <View
            style={{flex: 1, flexDirection: 'row', backgroundColor: 'gold'}}>
            <Listing_Single_Filter_Component
              text="Lowest Fee"
              slug=""
              icon="shield"
            />
            <Listing_Single_Filter_Component
              text="Available Today"
              slug=""
              icon="calendar-o"
            />
            <Listing_Single_Filter_Component
              text="Heighest Rated"
              slug=""
              icon="thumbs-up"
            />
            <Listing_Single_Filter_Component
              text="Video Consultation"
              slug=""
              icon="video-camera"
            />
            <Listing_Single_Filter_Component
              text="Male Doctors"
              slug=""
              icon="male"
            />
            <Listing_Single_Filter_Component
              text="Discounts"
              slug=""
              icon="female"
            />
          </View>
        </View>
      </ScrollView>
      {/* {showRightScrollButton ? <Filter_Scroll_Button_Right /> : null}
      {showLeftScrollButton ? <Filter_Scroll_Button_Left /> : null} */}
      <Filter_Scroll_Button_Generic whichButton={showGenericScrollButton} />
    </View>
  );
};
// var screenWidth = Dimensions.get('window').width;

isCloseToRight = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToRight = 1;
  return (
    layoutMeasurement.width + contentOffset.x >=
    contentSize.width - paddingToRight
  );
};
isCloseToLeft = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToLeft = 20;
  return contentOffset.x == 0;
};

// var genericScroll = 200;
const Filter_Scroll_Button_Generic = props => {
  const [scrollValue, setScrollValue] = useState(200);

  if (scrollValue < 200) {
    setScrollValue(200);
    console.log('now scroll value is', scrollValue);
  }
  if (scrollValue > 800) {
    setScrollValue(800);
    console.log('now scroll value is', scrollValue);
  }
  return props.whichButton == 1 ? (
    <Pressable
      onPress={() => {
        // this.scroll.scrollTo({x: rightScroll});
        // rightScroll = rightScroll + 200;

        if (scrollValue >= 200 && scrollValue <= 800) {
          setScrollValue(scrollValue + 200);

          this.scroll.scrollTo({x: scrollValue});
        }
        console.log('Right Scroll button Clicked', scrollValue);
      }}
      style={{
        // paddingBottom: 100,
        // marginBottom: 100,
        // fontSize: 20,
        backgroundColor: '#F4F4F4',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 60,
        right: 1,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        elevation: 20,
      }}>
      <Icon name="angle-right" color="#232426" size={30} />
    </Pressable>
  ) : props.whichButton == 2 ? (
    <Pressable
      onPress={() => {
        // this.scroll.scrollTo({x: leftScroll});
        // leftScroll = leftScroll - 200;

        if (scrollValue >= 0 && scrollValue <= 800) {
          setScrollValue(scrollValue - 200);

          this.scroll.scrollTo({x: scrollValue});
        }
        console.log('Left Scroll button Clicked', scrollValue);
      }}
      style={{
        // paddingBottom: 100,
        // marginBottom: 100,
        // fontSize: 20,
        backgroundColor: '#F4F4F4',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 60,
        // right: 1,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 20,
      }}>
      <Icon name="angle-right" color="#232426" size={30} />
    </Pressable>
  ) : null;
};

const Listing_Single_Filter_Component = props => {
  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
      }}>
      <View
        style={{
          width: 60,
          height: 70,
          backgroundColor: '#D4D4FF',
          borderTopLeftRadius: 10,
          justifyContent: 'space-around',
          alignItems: 'center',

          borderBottomLeftRadius: 10,
        }}>
        <Icon style={{}} name={props.icon} size={30} color="#000" />
      </View>
      <View
        style={{
          width: 120,
          height: 70,
          backgroundColor: '#F7F8FB',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
          }}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

const Listing_SearchBar_Section = () => {
  return (
    <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
      <TextInput
        style={styles.input}
        placeholder="Find Doctor, Speciality, Diseases and Hospitals"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const Listing_Top_Header = () => {
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#242C81',
    padding: 10,
  },
  text: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
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
  verticalDivider: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Appointment;

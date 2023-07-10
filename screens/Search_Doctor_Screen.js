import {withTheme} from '@rneui/themed';
import {React, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import img1 from '../images/top_speciality_icons/heart-specialist.png';
const Search_Doctor_Screen = ({navigation}) => {
  return (
    <ScrollView>
      <Top_Search_Header_Section navigation={navigation} />
      <Recent_Searches_Section />
      <Search_By_Speciality_Section navigation={navigation} />
    </ScrollView>
  );
};

const Search_By_Speciality_Section = ({navigation}) => {
  const topSpecialitiesList = [
    {
      name: 'Skin Specialist',
      slug: 'dermatologist',
      id: 15,
      icon: require('../images/top_speciality_icons/general-physician.png'),
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
  console.log('length ==>>', topSpecialitiesList.length);
  return (
    <View
      style={{
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10}}>
        Search by Speciality
      </Text>
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[0]}
        speciality_1={topSpecialitiesList[1]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[2]}
        speciality_1={topSpecialitiesList[3]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[4]}
        speciality_1={topSpecialitiesList[5]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[6]}
        speciality_1={topSpecialitiesList[7]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[8]}
        speciality_1={topSpecialitiesList[9]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[10]}
        speciality_1={topSpecialitiesList[11]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[12]}
        speciality_1={topSpecialitiesList[13]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[14]}
        speciality_1={topSpecialitiesList[15]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[16]}
        speciality_1={topSpecialitiesList[17]}
        navigation={navigation}
      />
      <Search_By_Speciality_Icon_Row
        speciality_0={topSpecialitiesList[18]}
        speciality_1={topSpecialitiesList[19]}
        navigation={navigation}
      />
      {/* <Search_By_Speciality_Icon_Row /> */}
    </View>
  );
};

const Search_By_Speciality_Icon_Row = props => {
  const speciality_0_name = props.speciality_0.name;
  const speciality_0_icon = props.speciality_0.icon;
  const speciality_0_slug = props.speciality_0.slug;
  const speciality_0_id = props.speciality_0.id;
  // console.log(speciality_0_icon);

  const speciality_1_name = props.speciality_1.name;
  const speciality_1_icon = props.speciality_1.icon;
  const speciality_1_slug = props.speciality_1.slug;
  const speciality_1_id = props.speciality_1.id;
  console.log('asdasd ===>', speciality_1_icon);
  navigation = props.navigation;
  return (
    <View style={{}}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          onPress={() => {
            // Alert.alert('hello');
            navigation.navigate('Appointment', {
              speciality_name: speciality_0_name,
              speciality_slug: speciality_0_slug,
              speciality_id: speciality_0_id,
              navigation: navigation,
            });
          }}
          style={{
            backgroundColor: 'white',
            flex: 1,
            margin: 10,
            elevation: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 5,
            }}>
            <Image
              source={require('../images/top_speciality_icons/general-physician.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 400 / 2,
                alignSelf: 'center',
                backgroundColor: 'red',
              }}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                textAlignVertical: 'center',
                fontSize: 14,
                fontWeight: '500',
                marginRight: 20,
                // padding: 200,
                // backgroundColor: 'red',
              }}>
              {speciality_0_name}
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            // Alert.alert('hello');
            navigation.navigate('Appointment', {
              speciality_name: speciality_1_name,
              speciality_slug: speciality_1_slug,
              speciality_id: speciality_1_id,
              navigation: navigation,
            });
          }}
          style={{
            backgroundColor: 'white',
            flex: 1,
            margin: 10,
            elevation: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 5,
            }}>
            <Image
              source={require('../images/top_speciality_icons/ent-specialist.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 400 / 2,
                alignSelf: 'center',
              }}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                textAlignVertical: 'center',
                fontSize: 14,
                fontWeight: '500',
                marginRight: 20,
                // padding: 200,
              }}>
              {speciality_1_name}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

// const Search_by_speciality_component = () => {
//   return (

//   );
// };

const Top_Search_Header_Section = ({navigation}) => {
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>

        <View style={{marginLeft: 30}}>
          <Text style={styles.mainText}>Current City</Text>
          <Text style={styles.secondaryText}>Lahore</Text>
        </View>
      </View>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Find Doctor, Speciality, Diseases and Hospitals"
        />
      </View>
    </View>
  );
};

const Recent_Searches_Section = navigation => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        margin: 16,
      }}>
      <Text style={{margin: 10, fontSize: 16, fontWeight: '400'}}>
        Recent searches
      </Text>
      <View style={{flexDirection: 'row'}}>
        <ScrollView horizontal={true}>
          <Speciality_Icon_With_Name />
          <Speciality_Icon_With_Name />
          <Speciality_Icon_With_Name />
          <Speciality_Icon_With_Name />
          <Speciality_Icon_With_Name />
          <Speciality_Icon_With_Name />
          <Speciality_Icon_With_Name />
          <Speciality_Icon_With_Name />
          <Speciality_Icon_With_Name />
        </ScrollView>
      </View>
    </View>
  );
};

const Speciality_Icon_With_Name = () => {
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
      <View>
        <Image
          source={require('../images/doctor1.png')}
          style={{
            width: 40,
            height: 40,
            borderRadius: 400 / 2,
            alignSelf: 'center',
          }}
        />
        <Text style={{fontSize: 12}}> Skin Specialist</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#242C81',
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
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
});

export default Search_Doctor_Screen;

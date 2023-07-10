/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Pressable} from 'react-native';

Icon.loadFont().then();

const ProfileScreen = ({route}) => {
  const [users, setUsers] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigation = route.params.navigation;
  const selfUserEmail = route.params.selfUserEmail;
  const selfName = route.params.selfName;
  //   const [messages, setMessages] = useState([]);
  // console.log(user);
  //
  const getUsers = async () => {
    const querySanp = await firestore()
      .collection('AsimUsers')
      // .where('uid', '==', user.uid)
      .get();
    const allUsers = querySanp.docs.map(docSnap => docSnap.data());
    // console.log(allUsers.length);
    setUsers(allUsers);
    // console.log(users[0].name);
    setLoader(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.card}>
        <Image
          style={styles.userImageST}
          source={require('../../images/doctor1.png')}
        />
        <View style={styles.textArea}>
          <Text style={styles.nameText}>{selfName}</Text>
          <Text style={styles.msgContent}>{selfUserEmail}</Text>
          <TouchableOpacity
            onPress={() => auth().signOut()}
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
                },
              ]}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {loader ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {users.map((item, index) => (
              <UserTile
                item={item}
                navigation={navigation}
                selfUserEmail={selfUserEmail}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const UserTile = props => {
  // console.log(props.item.name);
  const name = props.item.name;
  const email = props.item.email;
  const navigation = props.navigation;
  const selfUserEmail = props.selfUserEmail;
  // console.log('name ==>> ', name);
  // console.log('email ==>> ', email);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ChatScreen', {
          selfUserEmail: selfUserEmail,
          userToChat: email,
        });
      }}
      style={{
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        padding: 10,
        margin: 10,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
        </View>
        <Text style={{textAlignVertical: 'center'}}>Start Chat</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    paddingTop: 30,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'red',
  },
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 200,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '900',
    fontFamily: 'Verdana',
  },
  msgTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default ProfileScreen;

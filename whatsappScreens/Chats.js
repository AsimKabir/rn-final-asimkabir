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
  SafeAreaView,
  Modal,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import ChatDetail from './ChatDetail';

const Chats = ({route}) => {
  const [users, setUsers] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigation = route.params.navigation;
  const selfUserEmail = route.params.selfUserEmail;
  const selfName = route.params.selfName;

  // console.log('   =======   ', selfUserEmail);

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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {loader ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {users.map((item, index) => (
              <ChatPill
                item={item}
                navigation={navigation}
                selfUserEmail={selfUserEmail}
                selfName={selfName}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <Message_Floating_Buttom
      //  navigation={navigation}
      />
    </SafeAreaView>
  );
};
const Message_Floating_Buttom = props => {
  const navigation = props.navigation;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ChatHome', {navigation: navigation});
        // Alert.alert('hahaha wapis');
      }}
      style={{
        fontSize: 20,
        backgroundColor: 'green',
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
      <Icon name="comment" color="white" size={20} />
    </Pressable>
  );
};
const ChatPill = props => {
  const name = props.item.name;
  const email = props.item.email;
  const navigation = props.navigation;
  const selfUserEmail = props.selfUserEmail;
  const selfName = props.selfName;
  console.log('SSEELLFFF ==>>> ', navigation);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  // console.log(email, '  ========  ', name, '   =======   ', selfUserEmail);
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', marginVertical: 10}}
      onPress={() => {
        // navigation.navigate('ChatDetail');
        navigation.navigate('ChatDetail', {
          selfUserEmail: selfUserEmail,
          selfName: selfName,
          navigation: navigation,
        });
      }}>
      <Image
        source={require('../images/earth.gif')}
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          alignSelf: 'center',
        }}
      />

      <View style={{flex: 1, paddingLeft: 8}}>
        <Text
          style={[
            {fontWeight: '700', textAlignVertical: 'center'},
            isDarkTheme ? {color: 'black'} : null,
          ]}>
          {name}
        </Text>
        <Text style={{textAlignVertical: 'center'}}>{email}</Text>
      </View>
      <Text
        style={{
          textAlignVertical: 'center',
          alignItems: 'flex-end',
        }}>
        12:00 PM
      </Text>
    </TouchableOpacity>
  );
};

export default Chats;

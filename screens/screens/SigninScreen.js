import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SigninScreen = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const updateSecureText = () => {
    setData({
      secureTextEntry: !data.secureTextEntry,
    });
  };
  // console.log(email);
  // console.log(password);
  //User Login
  const userSignin = async () => {
    if (!email || !password) {
      alert('Please fill out the empty fields');
    }
    try {
      // const newReg = await auth().signInWithEmailAndPassword(email, password);
      // console.log(email);
      // console.log(password);
      try {
        firestore()
          .collection('AsimUsers')
          .where('email', '==', email)
          .get()
          .then(querySnapshot => {
            console.log('LENGTH +++++>>>> ', querySnapshot._docs.length);
            if (querySnapshot._docs.length > 0) {
              var fb_email;
              var fb_password;
              var fb_name;

              for (let x in querySnapshot._docs) {
                console.log(querySnapshot._docs[x]._data);
                fb_email = querySnapshot._docs[x]._data.email;
                fb_password = querySnapshot._docs[x]._data.password;
                fb_name = querySnapshot._docs[x]._data.name;
              }
              // console.log('fb_email ==>> ', fb_email);
              // console.log('email ==>> ', email);
              // console.log('fb_Password ==>> ', fb_password);
              // console.log('Password ==>> ', password);

              if (fb_email == email && fb_password == password) {
                console.log('Sign in done');
                navigation.navigate('ProfileScreen', {
                  selfUserEmail: fb_email,
                  selfName: fb_name,
                  navigation: navigation,
                });
              } else {
                Alert.alert('Wrong password -- -- Please try again');
              }
              // Alert.alert('Email Already Exsists');
            } else {
              // console.log('data Does not exsists ---  Wrong email');
              Alert.alert('Wrong email -- Please try again');
              try {
                // console.log('name ==>> ', name);
                // console.log('email ==>> ', email);
                // console.log('password ==>> ', password);
                // firestore()
                //   .collection('AsimUsers')
                //   .add({
                //     name: name,
                //     email: email,
                //     password: password,
                //   })
                //   .then(() => {
                //     console.log('User added successfully!');
                //     Alert.alert('User added successfully!');
                //   });
              } catch (err) {
                Alert.alert('Registration Unsuccessful! Try again');
              }
            }
          });
      } catch (error) {
        console.log('TRY/CATCH ERROR ===>>>> ', error);
        Alert.alert(error);
      }
    } catch (err) {
      alert('Email or Password incorrect');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: 35,
        },
      ]}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Login </Text>
        <Text style={styles.headerTitle}>
          Input your Email address and Password in the form below to login.
        </Text>
      </View>
      <View style={styles.footer}>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 25,
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 25,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            value={password}
            onChangeText={text => {
              setPassword;
              setPassword(text);
            }}
          />
          <TouchableOpacity onPress={updateSecureText}>
            {data.secureTextEntry ? <Text>Show</Text> : <Text>Hide</Text>}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => userSignin()}
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
            {' '}
            Sign in{' '}
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.text_footer}>Are you new here? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SigninScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  title: {
    color: '#05375a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerTitle: {
    paddingTop: 5,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
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
});

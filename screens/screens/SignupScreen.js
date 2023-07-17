import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Pressable} from 'react-native';
import ImageResizer from 'react-native-image-resizer';

export default SignupScreen = ({navigation}) => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState();

  const updateSecureText = () => {
    // setData({
    //   secureTextEntry: !data.secureTextEntry,
    // });
  };
  const validateEmail = email => {
    console.log(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log('Email is Not Correct');
      return false;
    } else {
      console.log('Email is Correct');
      return true;
    }
  };
  //Register user
  const userRegistration = () => {
    if (!email || !password || !name) {
      Alert.alert('Please fill out the empty fields');
    } else {
      var isEmailValid = validateEmail(email);
      if (isEmailValid) {
        try {
          firestore()
            .collection('AsimUsers')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
              console.log('LENGTH +++++>>>> ', querySnapshot._docs.length);
              if (querySnapshot._docs.length > 0) {
                for (let x in querySnapshot._docs) {
                  console.log(querySnapshot._docs[x]._data);
                }
                Alert.alert('Email Already Exsists');
              } else {
                console.log('data Does not exsists');
                try {
                  console.log('name ==>> ', name);
                  console.log('email ==>> ', email);
                  console.log('password ==>> ', password);
                  firestore()
                    .collection('AsimUsers')
                    .add({
                      name: name,
                      email: email,
                      password: password,
                      profileImage: profileImage,
                    })
                    .then(() => {
                      console.log('User added successfully!');
                      Alert.alert('User added successfully!');
                    });
                } catch (err) {
                  Alert.alert('Registration Unsuccessful! Try again');
                }
              }
            });
        } catch (error) {
          console.log('TRY/CATCH ERROR ===>>>> ', error);
          Alert.alert(error);
        }
      } else {
        Alert.alert('Email is not valid');
      }
    }

    //////////////////////////////////////
  };
  function uploadImageFromCamera() {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        console.log('Response = ', response);
        // console.log('Response LENGTH = ', response.length);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          if (response != null) {
            // console.log(
            //   'COUNT ====>> Current uploaded images --->> ',
            //   response['assets'].length,
            // );
            // for (let i = 0; i < response['assets'].length; i++) {
            //   imageResponse.push(response['assets'][i]['uri']);
            // }
            // setLoader(true);
            // setimageResponse(imageResponse);
            setProfileImage(response['assets'][0]['uri']);

            // setLoader(false);
            // ImageResizer(response['assets'][0]['uri']);
            console.log('IMAGE PATH ==>>> ', response['assets'][0]['uri']);
            // console.log('IMAGE PATH ==>>> ', profileImage);
          }
        }
      },
    );
  }
  console.log('IMAGE PATH ==>>> ', profileImage);

  function ImageResizer(Imagee) {
    let newWidth = 100;
    let newHeight = 100;
    let compressFormat = 'PNG';
    let quality = 100;
    let rotation = 0;
    let outputPath = null;
    let imageUri = Imagee;
    ImageResizer.createResizedImage(
      imageUri,
      newWidth,
      newHeight,
      compressFormat,
      quality,
      rotation,
      outputPath,
    )
      .then(response => {
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        //resized image uri
        let uri = response.uri;
        //generating image name
        let imageName = 'profile' + this.state.userId;
        //to resolve file path issue on different platforms
        let uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        //setting the image name and image uri in the state
        // this.setState({
        //   uploadUri,
        //   imageName,
        // });

        setProfileImage(uploadUri);
      })
      .catch(err => {
        console.log('image resizing error => ', err);
      });
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: 35,
        },
      ]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            console.log('Button pressed');
            uploadImageFromCamera();
          }}>
          <Image
            style={{
              width: 110,
              height: 110,
              borderRadius: 100,
              // alignContent: 'center',
              alignSelf: 'center',
            }}
            source={{uri: profileImage}}
          />
        </Pressable>
        <Text style={styles.text_header}>Sign up</Text>
        <Text style={styles.headerTitle}>
          Input your Email address and Password in the form below to Register.
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
          Full Name
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Full Name"
            style={styles.textInput}
            autoCapitalize="none"
            value={name}
            onChangeText={text => {
              setName(text);
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
            secureTextEntry={password ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <TouchableOpacity onPress={updateSecureText}>
            {password ? <Text>Show</Text> : <Text>Hide</Text>}
          </TouchableOpacity>
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <Button
            title="Open camera"
            onPress={() => {
              console.log('Button pressed');
              uploadImageFromCamera();
            }}
          />
          <Image
            style={{width: 110, height: 110, borderRadius: 100}}
            source={{uri: profileImage}}
          />
        </View> */}
        <TouchableOpacity
          onPress={() => userRegistration()}
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
            Sign up
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('SigninScreen')}>
            <Text style={styles.text_footer}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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

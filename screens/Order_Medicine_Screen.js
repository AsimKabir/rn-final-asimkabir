import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  Pressable,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from './ActionSheet';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native-elements';

// import ActionSheet1 from 'react-native-actionsheet';

export default function Order_Medicine_Screen({navigation}) {
  const [imageResponse, setimageResponse] = useState([]);
  // const [cameraResponse, setcameraResponse] = useState(null);
  // const [imagesResponse, setImagesResponse] = useState(null);
  const [loader, setLoader] = useState(true);
  // console.log('Images are ===>>> ', imageResponse);
  const [displayActionSheet, setDisplayActionSheet] = useState(false);

  // setimageResponse(imageResponse);

  return (
    <View style={{}}>
      <View style={{backgroundColor: '#E5E5E5'}}>
        <ScrollView>
          <Order_Medicine_Screen_Top_Header />

          <View style={{paddingHorizontal: 16}}>
            <Main_Heading_Section />
            <Pressable
              onPress={() => {
                setDisplayActionSheet(true);
              }}>
              <Upload_prescription
                imageResponse={imageResponse}
                loader={loader}
              />
            </Pressable>
            <Text
              style={{
                color: '#46484B',
                marginVertical: 16,
                fontSize: 12,
                fontWeight: '400',
              }}>
              *Up to 5 files
            </Text>
            <Pressable onPress={() => {}}>
              <Order_Details />
            </Pressable>
            <How_It_Works_Section />
          </View>
        </ScrollView>
        <Order_Medicine_Place_Order_Floating_Buttom navigation={navigation} />
      </View>
      {displayActionSheet ? (
        <Action_Sheet_Upload_Preciption
          displayActionSheet={displayActionSheet}
          setDisplayActionSheet={setDisplayActionSheet}
          setimageResponse={setimageResponse}
          imageResponse={imageResponse}
          setLoader={setLoader}
          loader={loader}
        />
      ) : null}
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;

const Order_Medicine_Place_Order_Floating_Buttom = ({navigation}) => {
  ///////////////////////////////////////////////////////
  const actionItems = [
    {
      id: 1,
      label: 'Add from oladoc records',
      onPress: () => {
        console.log('action sheet button # 1 clicked');
        navigation.navigate('Order_Success_Screen');
      },
    },
    {
      id: 2,
      label: 'Upload from gallery',
      onPress: () => {
        console.log('action sheet button # 2 clicked');
      },
    },
    {
      id: 3,
      label: 'Take a picture',
      onPress: () => {},
    },
  ];

  const [actionSheet, setActionSheet] = useState(false);
  const closeActionSheet = () => setActionSheet(false);
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
        height: 98,
        bottom: 0,
        right: 0,
        elevation: 100,
        // alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        // onPress={showActionSheet1}
        onPress={() => setActionSheet(true)}
        style={{
          backgroundColor: '#000066',
          width: windowWidth - 40,
          height: 50,
          borderRadius: 8,
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
          Submit
        </Text>
      </Pressable>

      <Modal
        isVisible={actionSheet}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}>
        <ActionSheet actionItems={actionItems} onCancel={closeActionSheet} />
      </Modal>
    </View>
  );
};

const How_It_Works_Section = () => {
  // const [value, onChangeText] = useState('Useless Multiline Placeholder');

  return (
    <View
      style={{
        paddingBottom: 100,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 31,
          marginTop: 32,
        }}>
        How it works
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 2,
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name="medkit"
            size={25}
            color={'black'}
            style={{
              padding: 15,
              backgroundColor: '#E5E5F0',
              borderRadius: 100,
              marginRight: 10,
            }}
          />
          <Text>Upload prescription & add details</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Icon
            name="medkit"
            size={25}
            color={'black'}
            style={{
              padding: 15,
              backgroundColor: '#E5E5F0',
              borderRadius: 100,
              marginRight: 10,
            }}
          />
          <Text>Get a confirmation call</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Icon
            name="medkit"
            size={25}
            color={'black'}
            style={{
              padding: 15,
              backgroundColor: '#E5E5F0',
              borderRadius: 100,
              marginRight: 10,
            }}
          />
          <Text>Receive your order, pay at your doorstep</Text>
        </View>
      </View>
    </View>
  );
};
const More_Info_Section = () => {
  const [value, onChangeText] = useState(
    'Add instructions \n (apartment floor/dont knock etc.)',
  );

  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 31,
          marginTop: 32,
        }}>
        More info (optional)
      </Text>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        // maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 10, borderRadius: 10, borderWidth: 1}}
      />
    </View>
  );
};
const Order_Details = () => {
  return (
    <View>
      <Text
        style={{
          color: '#46484B',
          marginVertical: 16,
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 24,
        }}>
        Order details
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
        }}>
        <Text
          style={{
            color: '#232426',
            marginVertical: 16,
            fontSize: 14,
            fontWeight: '600',
            lineHeight: 21,
          }}>
          Patient’s name
        </Text>
        <TextInput placeholder="Asim Kabir" style={styles.orderDetails_input} />
        <Text
          style={{
            color: '#232426',
            marginVertical: 16,
            fontSize: 14,
            fontWeight: '600',
            lineHeight: 21,
          }}>
          Phone number
        </Text>
        <TextInput
          placeholder="0324 6543243"
          style={styles.orderDetails_input}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: '#232426',
              marginVertical: 16,
              fontSize: 14,
              fontWeight: '600',
              lineHeight: 21,
            }}>
            Home Address
          </Text>
          <Text>Locate me</Text>
        </View>
        <TextInput placeholder="City" style={styles.orderDetails_input} />
        <TextInput
          placeholder="Enter your home address"
          style={[styles.orderDetails_input, {marginTop: 10}]}
        />
        <Text style={{marginTop: 20}}>⚡ Delivery time - 2 hours</Text>
        <More_Info_Section />
      </View>
    </View>
  );
};

const Upload_prescription = props => {
  console.log(props.imageResponse);
  console.log(props.loader);
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
        marginTop: 24,
        borderStyle: 'dashed',
        borderWidth: 1,
      }}>
      {props.loader ? (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Icon name="upload" size={40} />
          <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 22}}>
            Upload prescription*
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 22,
              color: '#878787',
            }}>
            Maximum file size: 5 MB
          </Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {props.imageResponse.map((item, index) => (
            <Image
              style={{width: 70, height: 70, margin: 8}}
              source={{uri: item}}
            />
          ))}
          <Image
            style={{
              width: 80,
              height: 80,
              margin: 5,
            }}
            source={require('../images/uploadImage1.png')}
          />
        </View>
      )}
    </View>
  );
};

const Main_Heading_Section = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 31,
          marginTop: 32,
        }}>
        Order your medicines
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 21,
          marginTop: 16,
          marginBottom: 5,
        }}>
        Fill in your order details
      </Text>
    </View>
  );
};
const Order_Medicine_Screen_Top_Header = () => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        backgroundColor: 'white',
        height: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#FFFFFF',
        elevation: 10,
      }}>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <Icon name="arrow-left" color="black" size={20} style={{}} />
      </View>
      <Text
        style={{
          textAlignVertical: 'center',
          fontSize: 22,
        }}>
        Order Medicine
      </Text>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        {/* <Icon name="phone" color="black" size={25} style={{}} /> */}
      </View>
    </View>
  );
};

const Action_Sheet_Upload_Preciption = ({
  displayActionSheet,
  setDisplayActionSheet,
  setimageResponse,
  imageResponse,
  setLoader,
  loader,
}) => {
  function uploadImageFromGallery() {
    launchImageLibrary(
      {
        selectionLimit: 0,
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
            console.log(
              'COUNT ====>> Current uploaded images --->> ',
              response['assets'].length,
            );

            for (let i = 0; i < response['assets'].length; i++) {
              imageResponse.push(response['assets'][i]['uri']);
            }
            setLoader(true);

            setimageResponse(imageResponse);

            setLoader(false);
          }
        }
      },
    );

    if (imageResponse == null) {
      // console.log('Images are NULLLLLLLLL ===>>> ', imageResponse);
    } else {
      // console.log('Images  ===>>> ', imageResponse);
    }
  }

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
            console.log(
              'COUNT ====>> Current uploaded images --->> ',
              response['assets'].length,
            );
            for (let i = 0; i < response['assets'].length; i++) {
              imageResponse.push(response['assets'][i]['uri']);
            }
            setLoader(true);
            setimageResponse(imageResponse);
            setLoader(false);
          }
        }
      },
    );
  }
  return (
    <Modal
      visible={displayActionSheet}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        // setDisplayActionSheet(false);
      }}
      style={{}}>
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
              paddingBottom: 20,
              paddingHorizontal: 20,
              paddingTop: 10,
            }}>
            <Pressable
              onPress={() => {
                uploadImageFromGallery();
                setDisplayActionSheet(false);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Icon name="file-image-o" size={30} color="blue" />
              <Text
                style={{
                  fontSize: 20,
                }}>
                Choose From Gallery
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                uploadImageFromCamera();
                setDisplayActionSheet(false);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Icon name="camera" size={30} color="blue" />
              <Text
                style={{
                  fontSize: 20,
                }}>
                Choose From Camera
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {}}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Icon name="medkit" size={30} color="blue" />
              <Text
                style={{
                  fontSize: 20,
                }}>
                Choose From Medical Records
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  orderDetails_input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5F0',
  },
});

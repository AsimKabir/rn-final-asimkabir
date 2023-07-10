import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Alert,
  FlatList,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import {
  requestUserPermission,
  NotificationListner,
  GetFCMToken,
} from '../pushnotification_helpler';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [selfFCMToken, setSelfFCMToken] = useState(null);
  const selfUserEmail = route.params.selfUserEmail;
  const userToChat = route.params.userToChat;
  const iidd = selfUserEmail + '-' + userToChat;
  const iiddReverse = userToChat + '-' + selfUserEmail;
  const setChatRoom = () => {
    try {
      firestore()
        .collection('AsimChats')
        .where('id', 'in', [iidd, iiddReverse])
        .get()
        .then(querySnapshot => {
          // console.log('LENGTH +++++>>>> ', querySnapshot._docs.length);
          if (querySnapshot._docs.length > 0) {
            for (let x in querySnapshot._docs) {
              // console.log(querySnapshot._docs[x]._data);
            }
            Alert.alert('EXSISTING Chat');
          } else {
            Alert.alert('NEW Chat');
            try {
              firestore()
                .collection('AsimChats')
                .doc(iidd)
                .set({
                  id: iidd,
                  chat: [],
                  fcmToken: selfFCMToken,
                })
                .then(() => {
                  // console.log('User added successfully!');
                  Alert.alert(
                    'successfully! New chat room setup successfully!',
                  );
                });
            } catch (err) {
              Alert.alert(' Unsuccessful! New chat room setup... Try again');
            }
          }
        });
    } catch (error) {
      console.log('TRY/CATCH ERROR ===>>>> ', error);
      Alert.alert(error);
    }
  };

  const getAllMessages = async () => {
    try {
      firestore()
        .collection('AsimChats')
        .where('id', 'in', [iidd, iiddReverse])
        .get()
        .then(querySnapshot => {
          var newMessage = querySnapshot._docs;
          // console.log(querySnapshot._docs[0]._data.id);
          newMessage = newMessage[0]._data.chat;
          setMessages(newMessage);
        });
    } catch (error) {
      console.log('TRY/CATCH ERROR ===>>>> ', error);
      Alert.alert(error);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    // const msgResponse = await firestore()
    //   .collection('Chats')
    //   .doc(docid)
    //   .collection('messages')
    //   .orderBy('createdAt', 'desc')
    //   .get();
    // const allTheMsgs = msgResponse.docs.map(docSanp => {
    //   return {
    //     ...docSanp.data(),
    //     createdAt: docSanp.data().createdAt.toDate(),
    //   };
    // });
    // setMessages(allTheMsgs);
  };

  function onResult(QuerySnapshot) {
    console.log('\n\n\nGot Users collection result.\n\n\n');
    getAllMessages();
  }

  function onError(error) {
    console.error(error);
  }
  // const hello = async () => {
  //   GetFCMToken().then(fcm => {
  //     console.log('FFCCMMM ======>>>> ', fcm);
  //   });
  // };
  useEffect(() => {
    firestore().collection('AsimChats').onSnapshot(onResult, onError);
    setChatRoom();
    getAllMessages();
    // hello();
    GetFCMToken().then(fcm => {
      console.log('FFCCMMM ======>>>> ', fcm);
      setSelfFCMToken(fcm);
    });
  }, []);

  const onSend = msgArray => {
    // console.log('user is in the onSend function');
    var msg = msgArray[0];
    console.log('msg user ===>>>> ', msg.user);
    ////////////////////////////////////////////////////////
    msg = {
      _id: msg._id,
      createdAt: msg.createdAt,
      text: msg.text,
      sentby: selfUserEmail,
      sentTo: userToChat,
      fcmToken: selfFCMToken,
    };

    try {
      firestore()
        .collection('AsimChats')
        // .doc('hxMcyKtDF3BtSW89SZLR')
        .where('id', 'in', [iidd, iiddReverse])
        .get()
        .then(querySnapshot => {
          var newMessage = querySnapshot._docs;
          // console.log(querySnapshot._docs[0]._data.id);
          newMessage = newMessage[0]._data.chat;
          const fb_id = querySnapshot._docs[0]._data.id;
          newMessage.push(msg);
          setMessages(newMessage);
          // console.log('Messaagggeeesss ===>>>>>>', messages);
          ////////////////////////////////////////////////////
          var sss = 0;
          firestore()
            .collection('AsimChats')
            .doc(fb_id)
            // .where('id', 'in', [iidd, iiddReverse])
            .update({
              id: iidd,
              chat: newMessage,
            })
            .then(() => {
              console.log('User updated!');
              sss = 1;
            });
          if (sss == 0) {
            firestore()
              .collection('AsimChats')
              .doc(iidd)
              // .where('id', 'in', [iidd, iiddReverse])
              .update({
                id: iidd,
                chat: newMessage,
              })
              .then(() => {
                console.log('User updated!');
              });
          }

          // setMessages(previousMessages =>
          //   GiftedChat.append(previousMessages, usermsg),
          // );
        });
    } catch (error) {
      console.log('TRY/CATCH ERROR ===>>>> ', error);
      Alert.alert(error);
    }

    ////////////////////////////////////////////////////////

    // const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;

    // firestore()
    //   .collection('AsimChats')
    //   .doc(fb_id)
    //   .collection('messages')
    //   .add({...usermsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  return (
    <GiftedChat
      style={{flex: 1}}
      messages={messages}
      onSend={text => onSend(text)}
      // user={{
      //   _id: user.uid,
      // }}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#009387',
              },
            }}
          />
        );
      }}
      renderInputToolbar={props => {
        return (
          <InputToolbar
            {...props}
            containerStyle={{borderTopWidth: 1.5, borderTopColor: '#009387'}}
            textInputStyle={{color: 'black'}}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  Contain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',
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
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 300,
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

export default ChatScreen;

import {Text, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

export default ChatDetail = ({route}) => {
  const navigation = route.params.navigation;
  const selfUserEmail = route.params.selfUserEmail;
  const selfName = route.params.selfName;
  // console.log('SSEELLFFF ==>>> ', route);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessage = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={{backgroundColor: 'red'}}>{selfUserEmail}</Text>
      <Text style={{backgroundColor: 'red'}}>{selfName}</Text>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        // text="hello"
        isTyping={true}
        // onSend={messages => {
        //   console.log(messages);
        // }}
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: 'asim@oladoc.com',
          name: 'Asim Kabir',
          avatar: 'https://ibb.co/9Ztdd9s',
        }}
      />
    </View>
  );
};

// ./screens/About.js

// import React from "react";
// import { View, StyleSheet, Text } from "react-native";

// const About = () => {
//   return (
//     <View style={styles.center}>
//       <Text>This is the about screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
// });

// export default About;

///////////////////////////////////////////////

import React from 'react';
import {ScrollView, Text, Button} from 'react-native';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 0;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

ifCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
  return contentOffset.y == 0;
};

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

const About = ({enableSomeButton}) => (
  <ScrollView
    horizontal={true}
    onScroll={({nativeEvent}) => {
      // if (ifCloseToTop(nativeEvent)) {
      //   console.log('TTOOOOOOOOPPPPPPPPP');
      // }
      // if (isCloseToBottom(nativeEvent)) {
      //   console.log('BOTTTTOOOOOOOMMMMMMMMMMM');
      // }
      if (isCloseToRight(nativeEvent)) {
        console.log('RIGHTTTTT');
      }
      if (isCloseToLeft(nativeEvent)) {
        console.log('LEEEFFFTTTTTTT');
      }
    }}>
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{marginToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
    <Button title="HElloo " style={{paddingToBottom: 20}} />
  </ScrollView>
);

export default About;

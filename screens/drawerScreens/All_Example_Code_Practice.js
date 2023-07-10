import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  SectionList,
  Button,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { ActivityIndicator } from 'react-native-paper';
// import {black} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
// import {ScrollView} from 'react-native-gesture-handler';

const All_Example_Code_Practice = () => {
  return (
    // <FlatList_example />
    // <Map_Array_example />
    // <Grid_example />
    // <Sectionlist_example />
    // <LifeCycle_didMount_useEffect_example />
    // <LifeCycle_unmount_useEffect_example />
    // <Button_Custom_Example />
    // <Radio_Button_Custom_Example />
    // <Multiple_Radio_Button_Custom_Example />
    // <Loader_ActivityIndecator_Example />
    // <Modal_Custom_Example />
    // <Pressable_Example />
    // <StatusBar_Example />
    <WebView_Example />
  );
};
const WebView_Example = () => {
  return (
    <View style={{flex: 1}}>
      <WebView source={{uri: 'https://oladoc.com'}} />
      {/* <Icon name="All_Example_Code_Practice" size={80} color="#006600" /> */}
    </View>
  );
};

const StatusBar_Example = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <StatusBar
        backgroundColor="orange"
        barStyle="dark-content"
        hidden={true}
      />
      <Text style={{color: 'red', fontSize: 24, textAlign: 'center'}}>
        Platform is :: {Platform.OS}
      </Text>
      <Text style={{color: 'red', fontSize: 24, textAlign: 'center'}}>
        React Native Version is ::{' '}
        {JSON.stringify(Platform.constants.reactNativeVersion)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textboxstyle: {
    color: 'lightblue',
    backgroundColor: 'blue',
    fontSize: 24,
    padding: 10,
    marginTop: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    height: 50,
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 50,
  },
  gridTextboxesstyle: {
    fontSize: 30,
    color: 'red',
    backgroundColor: 'white',
    width: 120,
    height: 120,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
    margin: 5,
    borderColor: 'green',
    borderWidth: 2,
  },
  selfButtonStyle: {
    color: '#fff',
    backgroundColor: '#bbb',
    fontSize: 24,
    margin: 10,
    textAlign: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    shadowColor: 'purple',
    elevation: 10,
    shadowOpacity: 1,
  },
  primaryButton: {backgroundColor: 'blue'},
  successButton: {backgroundColor: 'green'},
  errorButton: {backgroundColor: 'red'},
  warningButton: {backgroundColor: 'gold'},
  radioButtonText: {fontSize: 30, textAlign: 'center'},
  radioButton: {
    width: 40,
    height: 40,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 20,
  },
  checkboxBG: {
    backgroundColor: 'black',
    width: 28,
    height: 28,
    padding: 2,
    borderRadius: 20,
  },
  pressableText: {textAlign: 'center', fontSize: 24},
  pressableButton: {
    // color: 'grey',
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    shadowColor: 'black',
    elevation: 10,
    borderRadius: 10,
  },
});

const Pressable_Example = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Pressable
        style={styles.pressableButton}
        onPressIn={() => console.log('simple press occuss')}
        onPressOut={() => console.log('LONG press occuss')}>
        <Text style={styles.pressableText}>pressable</Text>
      </Pressable>
    </View>
  );
};

const Modal_Custom_Example = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={{flex: 1}}>
      {showModal == true ? (
        <View>
          <Modal transparent={true} animationType="slide">
            <View
              style={{
                flex: 1,
                // backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
                // width: 400,
                // height: 300,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 30,
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 20,
                  elevation: 5,
                }}>
                <Text style={{color: 'red', fontSize: 30, padding: 10}}>
                  This is the Custom Modal
                </Text>
                <Button
                  title="hide modal"
                  onPress={() => {
                    setShowModal(false);
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <Text style={{color: 'red', fontSize: 40}}>no modal</Text>
      )}
      <View style={{flex: 1, justifyContent: 'flex-end', padding: 20}}>
        <Button
          title="open modal"
          onPress={() => {
            setShowModal(true);
            console.log('setShowModal', showModal);
          }}
        />
      </View>
    </View>
  );
};

const Loader_ActivityIndecator_Example = () => {
  const [showLoader, setShowLoader] = useState(true);
  return (
    <View>
      <Text>Activity Indecator</Text>
      <ActivityIndicator size={100} animating={showLoader} />
      <Button
        title="Show/hide circular indecator"
        onPress={() => {
          setTimeout(() => {
            showLoader ? setShowLoader(false) : setShowLoader(true);
          }, 3000);
          //   showLoader ? setShowLoader(false) : setShowLoader(true);
        }}
      />
    </View>
  );
};

const Multiple_Radio_Button_Custom_Example = () => {
  return <Test_Radio_Buttons />;
};

const Test_Radio_Buttons = () => {
  const [checkbox, setCheckbox] = useState(1);

  const user = [
    {id: 1, language: 'C++'},
    {id: 2, language: 'React Native'},
    {id: 3, language: 'Python'},
    {id: 4, language: 'JAVA'},
    {id: 5, language: 'SQL'},
  ];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{textAlign: 'center', paddingTop: 50, fontSize: 24}}>
        Radio Buttons
      </Text>
      {user.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setCheckbox(item.id);

            console.log('\ncheckbox Index :: ', item.id);
            console.log('\ncheckbox id :: ', item.id);
            console.log('checkbox value :: ', checkbox);
            console.log('checkbox language :: ', item.language);

            console.log(checkbox);
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'row',
            }}>
            <View style={[styles.radioButton]}>
              {checkbox == item.id ? (
                <View style={styles.checkboxBG}></View>
              ) : null}
            </View>
            <Text style={[styles.radioButtonText]}>{item.language} </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Radio_Button_Custom_Example = () => {
  const [checkbox, setCheckbox] = useState(1);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{textAlign: 'center', paddingTop: 50, fontSize: 24}}>
        Radio Buttons
      </Text>
      <TouchableOpacity
        onPress={() => {
          checkbox == 2 ? setCheckbox(1) : setCheckbox(1);
          console.log(checkbox);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={[styles.radioButton]}>
            {checkbox == 1 ? <View style={styles.checkboxBG}></View> : null}
          </View>
          <Text style={[styles.radioButtonText]}>check box 1</Text>
        </View>
      </TouchableOpacity>

      <TouchableHighlight
        underlayColor={{color: 'gold'}}
        style={{}}
        onPress={() => {
          checkbox == 1 ? setCheckbox(2) : setCheckbox(2);
          console.log(checkbox);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={styles.radioButton}>
            {checkbox == 2 ? <View style={styles.checkboxBG}></View> : null}
          </View>
          <Text style={[styles.radioButtonText]}>check box 2</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};
const Button_Custom_Example = () => {
  return (
    <View>
      <Text style={{textAlign: 'center', paddingTop: 50, fontSize: 24}}>
        Buttons
      </Text>
      <TouchableHighlight>
        <Text style={[styles.selfButtonStyle, styles.successButton]}>
          primaryButton
        </Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text style={[styles.selfButtonStyle, styles.errorButton]}>
          primaryButton
        </Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text style={[styles.selfButtonStyle, styles.warningButton]}>
          primaryButton
        </Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text style={[styles.selfButtonStyle, styles.primaryButton]}>
          primaryButton
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const LifeCycle_unmount_useEffect_example = () => {
  const [show, updateShow] = useState(true);
  return (
    <View style={{alignContent: 'center', alignItems: 'center'}}>
      <Button
        title="Update number"
        onPress={() => {
          show ? updateShow(false) : updateShow(true);
        }}
      />
      {show ? <ShowHideComponent /> : null}
    </View>
  );
};

const ShowHideComponent = () => {
  let timmer = setInterval(() => {
    console.log('timmer called');
  }, 2000);
  useEffect(() => {
    console.log('SHOW :::>>> use effect called');
  });
  useEffect(() => {
    return () => {
      console.log('HIDE :::>>> use effect called');
      clearInterval(timmer);
    };
  });
  return (
    <View>
      <Text style={{color: 'red', fontSize: 30}}>
        This is ShowHideComponent
      </Text>
    </View>
  );
};

const LifeCycle_didMount_useEffect_example = () => {
  const [number, setNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(-20);
  useEffect(() => {
    console.log('First number: ', number);
  }, [number]);

  useEffect(() => {
    console.log('Second number: ', secondNumber);
  }, [secondNumber]);
  return (
    <View style={{alignContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'red', fontSize: 30}}>Number:: {number} </Text>
      <Button
        title="Update number"
        onPress={() => {
          setNumber(number + 1);
        }}
      />
      <Text style={{color: 'red', fontSize: 30}}>
        Second Number {secondNumber}
      </Text>
      <Button
        title="Update Second number"
        onPress={() => {
          setSecondNumber(secondNumber + 1);
          console;
        }}
      />
    </View>
  );
};

const Sectionlist_example = () => {
  const user = [
    {id: 1, name: 'Asim', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 2, name: 'Kabir', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 3, name: 'Ahmed', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 4, name: 'AWais', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 5, name: 'Ubaid', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 6, name: 'Yousaf', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 7, name: 'Kaleem', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 8, name: 'Gufran', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 9, name: 'Faizan', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    {id: 10, name: 'Joan', data: ['PHP', 'JAVA', 'C#', 'HTML']},
    // {id: 10, name: 'Joan'},
  ];
  return (
    <View style={{alignContent: 'center', alignItems: 'center'}}>
      <SectionList
        sections={user}
        renderItem={({item}) => (
          <Text style={{color: 'red', fontSize: 16}}>{item}</Text>
        )}
        renderSectionHeader={({section: {name}}) => (
          <Text style={{color: 'green', fontSize: 24}}>{name}</Text>
        )}
      />
    </View>
  );
};

const LoopWithFlatlist_example = () => {
  const user = [
    {id: 1, name: 'Asim'},
    {id: 2, name: 'Kabir'},
    {id: 3, name: 'Ahmed'},
    {id: 4, name: 'AWais'},
    {id: 5, name: 'Ubaid'},
    {id: 6, name: 'Yousaf'},
    {id: 7, name: 'Kaleem'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    // {id: 10, name: 'Joan'},
  ];
  return (
    <View style={{alignContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={user}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TestComponent item={item} />}
      />
    </View>
  );
};

const TestComponent = props => {
  const item = props.item;
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 2,
        flexDirection: 'row',
        width: 300,
        marginTop: 10,
      }}>
      <Text
        style={{
          fontSize: 30,
          color: 'red',
        }}>
        {item.id}:
      </Text>
      <Text
        style={{
          fontSize: 30,
          color: 'red',
          marginLeft: 10,
        }}>
        {item.name}
      </Text>
    </View>
  );
};

const Grid_example = () => {
  const user = [
    {id: 1, name: 'Asim'},
    {id: 2, name: 'Kabir'},
    {id: 3, name: 'Ahmed'},
    {id: 4, name: 'AWais'},
    {id: 5, name: 'Ubaid'},
    {id: 6, name: 'Yousaf'},
    {id: 7, name: 'Kaleem'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
  ];
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {/* <Text>
                Map Array Example
            </Text> */}
      {/* <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text>
            <Text style={styles.gridTextboxesstyle}>asim</Text> */}

      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {user.map(item => (
            <Text style={styles.gridTextboxesstyle}>{item.name}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const Map_Array_example = () => {
  const user = [
    {id: 1, name: 'Asim'},
    {id: 2, name: 'Kabir'},
    {id: 3, name: 'Ahmed'},
    {id: 4, name: 'AWais'},
    {id: 5, name: 'Ubaid'},
    {id: 6, name: 'Yousaf'},
    {id: 7, name: 'Kaleem'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
  ];
  return (
    <View style={styles.center}>
      <Text style={{textAlign: 'center', fontSize: 30}}>
        {' '}
        Map Array Example
      </Text>
      <ScrollView>
        {user.map(data => (
          <Text style={styles.textboxstyle}> {data.name}</Text>
        ))}
      </ScrollView>
    </View>
  );
};
const FlatList_example = () => {
  const user = [
    {id: 1, name: 'Asim'},
    {id: 2, name: 'Kabir'},
    {id: 3, name: 'Ahmed'},
    {id: 4, name: 'AWais'},
    {id: 5, name: 'Ubaid'},
    {id: 6, name: 'Yousaf'},
    {id: 7, name: 'Kaleem'},
    {id: 8, name: 'Gufran'},
    {id: 9, name: 'Faizan'},
    {id: 10, name: 'Joan'},
  ];
  return (
    <View style={styles.center}>
      <Text>This is the All_Example_Code_Practice screen</Text>

      <ScrollView>
        <FlatList
          data={user}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Text style={styles.textboxstyle}>{item.name}</Text>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default All_Example_Code_Practice;

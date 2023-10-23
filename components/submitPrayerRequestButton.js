import React, {useState} from 'react';
import {TextInput, StyleSheet, Text, View, Button, Alert} from 'react-native';
import PrayerList from './prayerList';

const submitPrayerRequestButton = (props) => {
    console.log('newText in submitPrayerRequestButton', props);
    // const DATA = [
    //   {newText: 'Devin'},
    //   {newText: 'Dan'},
    //   {newText: 'Dominic'},
    //   {newText: 'Jackson'},
    //   {newText: 'James'},
    //   {newText: 'Joel'},
    //   {newText: 'John'},
    //   {newText: 'Jillian'},
    //   {newText: 'Jimmy'},
    //   {newText: 'Julie'},
    // ];
    // let state = Data;
    
    // const [timesPressed, setTimesPressed] = useState(0);
    // const [addDATA, setDATA] = useState(state);
    // const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');

  let textLog = '';
//   if (timesPressed > 1) {
//     textLog = timesPressed + 'x onPress';
//   } else if (timesPressed > 0) {
//     textLog = 'onPress';
//   }

//   let DATA = [
//     'Devin',
//     'Dan',
//     'Dominic',
//     'Jackson',
//     'James',
//     'Joel',
//     'John',
//     'Jillian',
//     'Jimmy',
//     'Julie',
//   ];

    const addName = (addText) => {
        console.log('Pushed Button to add', text);
        // this.setState(state => [...state, text]);
        
        props.state.push({"newText": text});
        props.modalVisible = false;
        console.log('Pushed Button to add PROPS', props.state);
        console.log('Pushed Button to add PROPS', props.modalVisible);
        Alert.alert('Prayer Request Submitted!');
        // this.modalVisible = false;
        // setModalVisible(false);
    }

    const addRequest = (request) => {
      console.log('addRequest text', request);
      setState([...prevState, {
        label: 'newText',
        value: request
      }]);
      console.log('addRequest state DATA', state);
      // Alert.alert('Prayer Request Submitted!');
      // this.modalVisible = false;
      // setModalVisible(modalVisible);
    }

  return (
    
    <View style={styles.container}>
        <TextInput
            style={{
                height: 100,
                borderColor: 'gray',
                borderWidth: 1,
            }}
            onChangeText={newText => setText(newText)}
            placeholder="Request Here"
        />
      <Button
        title="Submit Prayer Request"
        onPress={() => addName(this.text)}
      />

      {/* <PrayerList newdata={addDATA}></PrayerList> */}
    
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

export default submitPrayerRequestButton;
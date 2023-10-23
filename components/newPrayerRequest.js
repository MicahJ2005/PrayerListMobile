import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, Text, Modal, Image, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList} from 'react-native';
// import SubmitPrayer from './submitPrayerRequestButton';
import PrayerList from './prayerList';

import axios from "axios";

let initialData = [];



const newPrayerRequest = () => {
  // componentDidMount(){
  //   axios.get('http://localhost:8080/empdetails')
  //   .then(res => {
  //     const persons = res.data;
  //     // this.setState(prevState => { persons: [...prevState.persons, persons] });
  //   })
  // }

  
    

  const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    
    
    

      
  // let state = DATA;

  // const [DATA, setDATA] = useState('');
  const [count, setCount] = useState(-1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.0.13:3210/data')
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const addName = (addText) => {
    // console.log('Pushed Button to add', text);
    // setData([...data, {'id':'5', 'nama' :text}]);
    // console.log('Pushed Button to add DATA', data);
    // Alert.alert('Prayer Request Submitted!');
    // setModalVisible(false);
    fetch("http://10.0.0.13:3210/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userId: 55,
        id: '101',
        nama: text,
        // body: "Post body",
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.stringify(responseData));
        Alert.alert('Prayer Request Submitted!');
        setModalVisible(false);
        // useEffect();
      })
      // .done();
  }

  const deleteFunction = (item) => {
    console.log('deleteFunction item', item);
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>New Prayer Request</Text>
      </Pressable>
      <Text style={{fontSize: 30}}>Prayer List:</Text>
      
      <FlatList
        data={data}
        renderItem={({item}) => <Text style={styles.item} key={item.id}>{item.nama} 
          <Pressable style={[styles.button, styles.buttonOpen]} 
                    onPress={() => deleteFunction(item)}>
            <Text>DELETE</Text>
          </Pressable>
        </Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default newPrayerRequest;
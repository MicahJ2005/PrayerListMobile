import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, Text, Modal, Image, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList} from 'react-native';
// import SubmitPrayer from './submitPrayerRequestButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PrayerList from './prayerList';

import axios from "axios";

let initialData = [];



const newPrayerRequest = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [count, setCount] = useState(-1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [details, setDetails] = useState('');

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

  const editDetails = () => {
    console.log('editDetails item', details);
  }

  const showDetails = (item) => {
    console.log('showDetails item', item);
    setDetails(item);
    setDetailsModalVisible(true)
  }

  const closeDetails = () => {
    console.log('closeDetails');
    setDetails('');
    setDetailsModalVisible(false)
  }

  const answeredPrayer = () => {
    console.log('answeredPrayer', details);
    setDetails('');
    setDetailsModalVisible(false)
  }

  return (
    <View style={styles.centeredViewPrayerList}>
      {/* start new prayer request Modal */}
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
            {/* <Text></Text> */}
          <Button
            title="close"
            onPress={() => addName(this.text)}
          />
          </View>
        </View>
      </Modal>
      {/* end new prayer request Modal */}

      {/* start prayer request details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setDetailsModalVisible(!detailsModalVisible);
        }}>
        <View style={styles.centeredViewDetails}>
          
          <View style={styles.modalViewDetails}>
          <Pressable style={styles.circleButtonDetailEditModal} onPress={() => editDetails(details)}>
            <MaterialIcons name="edit" size={25} color="black" />
          </Pressable>
          <Pressable style={styles.circleButtonDetailCloseModal} onPress={() => closeDetails()}>
            <MaterialIcons name="close" size={25} color="white" />
          </Pressable>
          <Pressable style={styles.circleButtonDetailDeleteModal} onPress={() => deleteFunction(details)}>
            <MaterialIcons name="delete" size={25} color="white" />
          </Pressable>
            {/* <TextInput
                style={{
                    height: 100,
                    borderColor: 'gray',
                    borderWidth: 1,
                }}
                onChangeText={newText => setText(newText)}
                placeholder="Request Here"
            /> */}
            <Text>
              {details.nama}
            </Text>
            <Text>
              {details.details}
            </Text>
            <View style={styles.detailButtonGroup}>
              
              <Pressable
                style={[styles.answeredPrayer]}
                onPress={() => answeredPrayer()}>
                <Text style={styles.textStylePrayerRequest}>Answered</Text>
              </Pressable>
            </View>
          
          </View>
        </View>
      </Modal>
      {/* end prayer request details Modal */}
      
      <Text style={styles.helpText}>click each prayer request to view details</Text>
      
      
      <FlatList
        data={data}
        renderItem={({item}) => 
          <Pressable style={[styles.buttonShowDetail]} 
                                  onPress={() => showDetails(item)}>
            <Text style={styles.item} key={item.id}>{item.nama} 
            </Text>
            {/* <Text>X</Text> */}
          </Pressable>
        }
      />
      <Pressable style={styles.circleButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={38} color="#BCA37F" />
      </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  centeredViewPrayerList: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    marginTop: 22,
    backgroundColor: '#BCA37F',
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
  modalViewDetails: {
    margin: 20,
    height:'94%',
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
    backgroundColor: '#113946',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  helpText:{
    textAlign: 'center',
    color: '#C56E33',
    fontStyle: 'italic',
  },
  buttonNewPrayerRequest:{
    backgroundColor: '#113946',
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    margin:10,
  },
  textStylePrayerRequest: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    // padding: 10,
    fontSize: 50,
    height: 80,
    textAlign: 'center',
    color: '#113946',
  },
  buttonDelete: {
    borderRadius: 60,
    padding: 10,
    elevation: 2,
    backgroundColor: '#EAD7BB',
  },
  myPrayerClosetText:{
    fontSize:30,

  },
  detailButtonGroup:{
    display: 'inline',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  closeButton: {
    backgroundColor: '#EAD7BB',
  },
  editButton: {
    backgroundColor: '#EAD7BB',
  },
  deleteButton: {
    backgroundColor: '#EAD7BB',
  },
  answeredPrayer:{
    backgroundColor: '#EAD7BB',
  },
  circleButtonContainer: {
    width: 4,
    height: 4,
    marginHorizontal: 5,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    // flex: 4,
    width:60,
    height: 60,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
    position: 'absolute',
    right:10,
    bottom: 10,
    backgroundColor:'#113946',
    color: 'white',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  circleButtonDetailCloseModal: {
    // flex: 4,
    width:30,
    height: 30,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
    position: 'absolute',
    right:2,
    top: 2,
    backgroundColor:'grey',
    color: 'white',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  circleButtonDetailEditModal: {
    // flex: 4,
    width:40,
    height: 40,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#EAD7BB',
    position: 'absolute',
    right:10,
    bottom: 10,
    // backgroundColor:'white',
    // color: 'white',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  circleButtonDetailDeleteModal: {
    // flex: 4,
    width:40,
    height: 40,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
    position: 'absolute',
    left:10,
    bottom: 10,
    backgroundColor:'red',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default newPrayerRequest;
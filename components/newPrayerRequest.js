import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, Text, Modal, SafeAreaView, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList, KeyboardAvoidingView } from 'react-native';
// import SubmitPrayer from './submitPrayerRequestButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import PrayerList from './prayerList';
// import axios from "axios";
import {BASE_URL_DEV} from '@env';

let initialData = [];

const newPrayerRequest = (runningUser) => {
  console.log('runningUser in newPrayerRequest:', runningUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [count, setCount] = useState(-1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [details, setDetails] = useState('');
  const [showEditButton, setShowEditButton] = useState(false);
  const [id, setId] = useState('');
  const [timesPrayed, setTimesPrayed] = useState('');
  const [answeredPrayerInputModalOpen, setAnsweredPrayerInputModalOpen] = useState(false);
  const [answeredPrayerText, setAnsweredPrayerText] = useState('');
  const [deleteRequestModalVisible, setDeleteRequestModalVisible] = useState(false);
  
  

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch(`${BASE_URL_DEV}/data?userId=${runningUser.runningUser[0].id}`)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  const addNewPrayerRequest = () => {
    console.log('in addNewPrayerRequest');
    setDetails('');
    setText('');
    setShowEditButton(false);
    setDetailsModalVisible(false);
    setModalVisible(true);
  }


  const addName = () => {
    // console.log(runningUser.runningUser[0].id);
    fetch(`${BASE_URL_DEV}/data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: text,
        details: details,
        submittedbyuserid: runningUser.runningUser[0].id,
        status: 'Praying',
      }),
    })
      .then((response) =>{
        console.log('response', response);
        loadData();
        Alert.alert('Prayer Request Submitted!');
        setModalVisible(false);
      })
  }

  const deleteFunction = (item) => {
    setDeleteRequestModalVisible(true);
    // console.log('deleteFunction item', item);
    // fetch(`${BASE_URL_DEV}/data/removePrayerRequest`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: item.id,
    //     nama: text,
    //     details: details,
    //   }),
    // })
    //   .then((response) =>{
    //     console.log('response', response);
    //   })
  }
  const closeDeleteModal = () => {
    setDeleteRequestModalVisible(false);
  }

  const removePrayerRequest = () => {
    console.log('deleteFunction item', details.id);
    fetch(`${BASE_URL_DEV}/data/removePrayerRequest`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: details.id,
        nama: text,
        details: details,
      }),
    })
      .then((response) =>{
        console.log('response', response);
        setDeleteRequestModalVisible(false);
        setDetailsModalVisible(false)
        loadData();
      })
  }

  const openEditDetail = (details) => {
    console.log('openEditDetail: ', details);
    setId(details.id);
    setDetails(details.details);
    setText(details.nama);
    setTimesPrayed(details.timesprayed);
    setShowEditButton(true);
    setDetailsModalVisible(false);
    setModalVisible(true);
  }

  const editDetails = (id) => {
    console.log('editDetails Id', id);
    fetch(`${BASE_URL_DEV}/data`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        nama: text,
        details: details,
      }),
    })
      .then((response) =>{
        console.log('response', response);
        loadData();
        Alert.alert('Prayer Request Updated!');
        setModalVisible(false);
      })
  }

  incermentTimesPrayed = () => {
    console.log('incermentTimesPrayed id', details.id);
    console.log('timesPrayed ', timesPrayed);
    console.log('timesPrayed HERE',);
    let tempTimes = parseInt(timesPrayed);
    console.log('tempTimes ', tempTimes);
    let newtimesPrayed = tempTimes+1;
    console.log('newtimesPrayed ', newtimesPrayed);
    fetch(`${BASE_URL_DEV}/data/timesprayed`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: details.id,
        timesprayed: newtimesPrayed,
      }),
    })
      .then((response) =>{
        console.log('response', response);
        setDetails('');
        loadData();
        Alert.alert('Thank you for Praying!');
        setModalVisible(false);
        setDetailsModalVisible(false)
      })
    
  }

  const showDetails = (item) => {
    console.log('showDetails item', item);
    setDetails(item);
    setTimesPrayed(item.timesprayed);
    setDetailsModalVisible(true)
  }

  const closeDetails = () => {
    console.log('closeDetails');
    setDetails('');
    setDetailsModalVisible(false)
  }

  const answeredPrayer = () => {
    console.log('answeredPrayer', details);
    setDetails(details);
    // setDetailsModalVisible(false);
    setAnsweredPrayerInputModalOpen(true);
  }

  const closeNewRequest = () => {
    setModalVisible(false);
  }

  const closeAnsweredPrayer = () => {
    setAnsweredPrayerInputModalOpen(false)
  }

  const updateAnsweredPrayer = () => {
    console.log('updateAnsweredPrayer details', details);
    console.log('updateAnsweredPrayer answeredPrayerText', answeredPrayerText);
    // setDetails(details);
    // setDetailsModalVisible(false);
    fetch(`${BASE_URL_DEV}/data/answeredprayer`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: details.id,
        status: 'Answered',
        answerednote: answeredPrayerText,
      }),
    })
      .then((response) =>{
        console.log('response', response);
        setModalVisible(false);
        setDetailsModalVisible(false);
        setAnsweredPrayerInputModalOpen(false);
        setDetails('');
        loadData();
        Alert.alert('Praise the Lord!');
        
      })
    
  }

  return (
    <View style={styles.centeredViewPrayerList}>
      {/* start new prayer request Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable style={styles.circleButtonDetailCloseModal2} onPress={() => closeNewRequest()}>
            <MaterialIcons name="close" size={25} color="white" />
          </Pressable>
            <Text style={styles.nameInputText}>Who/What am I praying for?</Text>
            <TextInput
                style={{
                    borderColor: '#113946',
                    // borderWidth: 4,
                    // borderRadius: 30,
                    borderBottomWidth: 4,
                    width:'95%',
                    height: '15%',
                    marginBottom: 40,
                }}
                textAlign='center'
                onChangeText={newText => setText(newText)}
                placeholder="Subject"
                value={text}
            />
            <Text style={styles.requestInputText}>What is the request?</Text>
            <TextInput
                style={{
                    // height: 100,
                    borderColor: '#113946',
                    // borderWidth: 4,
                    // borderRadius: 30,
                    borderBottomWidth: 4,
                    width:'95%',
                    height: '64%',
                    marginBottom: 40,
                    
                }}
                textAlign='center'
                onChangeText={newDetailText => setDetails(newDetailText)}
                placeholder="Prayer Request"
                value={details}
            />
            {!showEditButton ? 
              <Pressable style={styles.circleSubmitNewRequest} onPress={() => addName()} visible={!showEditButton}>
                <MaterialIcons name="send" size={30} color="#EAD7BB" />
              </Pressable>
              :
              <Pressable style={styles.circleSubmitNewRequest} onPress={() => editDetails(id)} visible={showEditButton}>
                <MaterialIcons name="update" size={30} color="#EAD7BB" />
              </Pressable>
            }
          
          
          </View>
        </View>
      </Modal>
      {/* end new prayer request Modal */}

      {/* start delete request Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteRequestModalVisible}
        onRequestClose={() => {
          setDeleteRequestModalVisible(!deleteRequestModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable style={styles.circleButtonDetailCloseModal2} onPress={() => closeDeleteModal()}>
            <MaterialIcons name="close" size={25} color="white" />
          </Pressable>
            <Text style={styles.deleteQuestionText}>Are you sure you want to remove this request?</Text>
            
              <Pressable style={styles.circleDeleteRequest} onPress={() => removePrayerRequest()} >
                <MaterialIcons name="delete-forever" size={30} color="#EAD7BB" />
              </Pressable>
          </View>
        </View>
      </Modal>
      {/* end delete request Modal */}

       {/* start Answered Prayer Input Modal */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={answeredPrayerInputModalOpen}
        onRequestClose={() => {
          setAnsweredPrayerInputModalOpen(!answeredPrayerInputModalOpen);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalAnsweredPrayerView}>
          <Pressable style={styles.circleButtonAnsweredPrayerCloseModal} onPress={() => closeAnsweredPrayer()}>
            <MaterialIcons name="close" size={25} color="white" />
          </Pressable>
            <Text style={styles.answeredPrayerText}>Prayer Request</Text>
            <View style={styles.answeredPrayerBox}>
              <Text style={styles.answeredPrayerDetailText}>Request: </Text>
              <Text style={styles.answeredPrayerNameText}> {details.nama}</Text>
              <Text style={styles.answeredPrayerDetailText}>Details: </Text>
              <Text style={styles.answeredPrayerDetailText2}>{details.details}</Text>
            </View>
            
            {/* <TextInput
                style={{
                    borderColor: '#113946',
                    borderWidth: 4,
                    borderRadius: 30,
                    width:'95%',
                    height: '15%',
                    marginBottom: 40,
                }}
                onChangeText={newText => setText(newText)}
                placeholder="    Subject"
                value={text}
            /> */}
            <Text style={styles.requestInputText}>How has God answered your prayers?</Text>
            <TextInput
                style={{
                    // height: 100,
                    borderColor: '#113946',
                    // borderWidth: 4,
                    // borderRadius: 30,
                    borderBottomWidth: 4,
                    width:'95%',
                    height: '30%',
                    marginBottom: 40,
                    
                }}
                textAlign='center'
                onChangeText={newAnswerText => setAnsweredPrayerText(newAnswerText)}
                placeholder="Answer..."
                // value={details}
            />
            
              <Pressable style={styles.circleSubmitNewRequest} onPress={() => updateAnsweredPrayer()} >
                <MaterialIcons name="send" size={30} color="#EAD7BB" />
              </Pressable>
              
          
          
          </View>
        </View>
      </Modal>
      {/* end Answered Prayer Input Modal */}

      {/* start prayer request details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible}
        onRequestClose={() => {
          setDetailsModalVisible(!detailsModalVisible);
        }}>
        <View style={styles.centeredViewRequestDetails}>
          
          <View style={styles.modalViewDetails}>
          <Pressable style={styles.circleButtonDetailEditModal} onPress={() => openEditDetail(details)}>
            <MaterialIcons name="edit" size={25} color="black" />
          </Pressable>
          <Pressable style={styles.circleButtonDetailCloseModal} onPress={() => closeDetails()}>
            <MaterialIcons name="close" size={25} color="white" />
          </Pressable>
          <Pressable style={styles.circleButtonDetailDeleteModal} onPress={() => deleteFunction(details)}>
            <MaterialIcons name="delete" size={25} color="white" />
          </Pressable>
            <Text style={[styles.requestNameText]}>
              {details.nama}
            </Text>
            <Text style={[styles.prayingForText]}>Praying for...</Text>
            <SafeAreaView style={styles.safeAreaContainer}>
              <ScrollView style={styles.requestDetailsScrollView}>
                <Text style={[styles.requestDetailsText]}>
                  {details.details}
                </Text>
              </ScrollView>
            </SafeAreaView>
            {/* <View style={styles.detailButtonGroup}> */}
              
              <Pressable
                style={[styles.answeredPrayer]}
                onPress={() => answeredPrayer()}>
                <MaterialCommunityIcons name="human-handsup" size={30} color="#BCA37F" />
                <Text style={styles.textStylePrayerRequest}>Answered</Text>
              </Pressable>

            <Pressable
                style={[styles.prayedCircleButton]}
                onPress={() => incermentTimesPrayed()}>
                
                <FontAwesome5 name="pray" size={34} color="#BCA37F" />
                <Text style={styles.textStylePrayed}>Prayed</Text>
              </Pressable>
          </View>
        </View>
      </Modal>
      {/* end prayer request details Modal */}
      
      <Text style={styles.helpText}>click each prayer request to view details</Text>
      <SafeAreaView style={styles.flatListStyle}>
        <FlatList
          data={data}
          renderItem={({item}) => 
            <Pressable style={[styles.buttonShowDetail]} 
                                    onPress={() => showDetails(item)}>
              {/* <View style={[styles.nameView]}> */}
                  <View style={[styles.timesPrayedArea]}>
                      <Text style={[styles.timesPrayedBubble]}>{item.timesprayed}
                     
                      </Text>
                      <View>
                        <Text style={[styles.timesPrayedBubbleText]}>Prayed</Text>
                      </View>
                      
                  </View>
                  
                  
                  <Text style={styles.item} key={item.id}>{item.nama}
                  
                  </Text>
                  
                  
              {/* </View> */}
              
            </Pressable>
          }
        />
      </SafeAreaView>
      
      {/* <Pressable style={styles.circleButton} onPress={() => addNewPrayerRequest()}>
        <MaterialIcons name="add" size={38} color="#BCA37F" />
      </Pressable> */}
      <Pressable style={styles.bottomButton} onPress={() => addNewPrayerRequest()}>
        <Text style={styles.bottomButtonText}>New Prayer Request</Text>
      </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  bottomButtonText:{
    color:"#BCA37F",
    fontSize:20
  },
  bottomButton:{
    width:'100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor:'#113946',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  flatListStyle:{
    height:'85%'
  },
  answeredPrayerBox:{
    marginTop: 10,
    width:'100%',
    borderColor: '#113946',
    borderWidth: 4,
    marginBottom: 20
  },
  answeredPrayerDetailText:{
    fontSize:15,
    marginTop: 20,
    marginLeft:5,
    color: '#C56E33',
    // marginBottom: 20,
    textAlign: 'left'
  },
  answeredPrayerDetailText2:{
    fontSize:20,
    // color: '#C56E33',
    marginLeft: 5,
    marginBottom: 20,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  answeredPrayerText:{
    fontSize:30,
    color: '#C56E33',
    marginTop: -20
  },
  answeredPrayerNameText:{
    fontSize:20,
    // marginTop: 20,
    marginLeft: 5,
    textAlign: 'left'
  },
  answeredPrayerDetailText:{
    fontSize:15,
    marginTop: 20,
    marginLeft:5,
    color: '#C56E33',
    // marginBottom: 20,
    textAlign: 'left'
  },
  answeredPrayerDetailText2:{
    fontSize:20,
    // color: '#C56E33',
    marginLeft: 5,
    marginBottom: 20,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  timesPrayedArea:{
    // flexDirection:'column'
  },
  timesPrayedBubbleText:{
    fontSize: 12,
    color: '#C56E33',
    marginTop: 65,
    // marginLeft:-15,
    // margin:10,
    position: 'absolute',
    right:45,
    // top:10,
    // width:30,
    // height: 30,
    // marginRight:10,
    // marginTop:25,
    // marginBottom: -80,
    zIndex:1,
    // position: 'relative',
    // left:'85%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 60,
    // textAlign:'center'
  },
  timesPrayedBubble: {
    backgroundColor: 'grey',
    // margin:3,
    fontSize: 20,
    width:80,
    height: 30,
    marginRight:10,
    // marginTop:5,
    marginBottom: -60,
    zIndex:1,
    // position: 'relative',
    left:'75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    textAlign:'center'
  },
  // nameView:{
  //   display:'flex'
  // },
  
  safeAreaContainer:{
    height: 360,
  },
  prayingForText:{
    marginTop: 20,
    color: '#113946',
    fontSize:20,
  },
  requestNameText:{
    marginTop: 20,
    fontSize: 40,
    color: '#C56E33',
  },
  requestDetailsText:{
    fontSize: 30,
    color: '#C56E33',
  },
  textStylePrayed: {
    color: '#BCA37F',
  },
  prayedCircleButton:{
    width:120,
    height: 120,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 10,
    backgroundColor:'#113946',
    color: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  centeredViewPrayerList: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    marginTop: 22,
    backgroundColor: '#BCA37F',
  },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: '#FFF2D8',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  modalView: {
    margin: 20,
    backgroundColor: '#FFF2D8',
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
  modalAnsweredPrayerView: {
    height: '93%',
    margin: 20,
    backgroundColor: '#FFF2D8',
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
    margin: 0,
    height:'100%',
    backgroundColor: '#BCA37F',
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
    color: '#BCA37F',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 30,
    marginLeft: 30,
    fontSize: 30,
    height: 80,
    zIndex:-1,
    textAlign: 'center',
    color:"#BCA37F",
    backgroundColor: '#113946',
    elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
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
      width:100,
      height: 100,
      margin:10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: '#fff',
      position: 'absolute',
      right:2,
      bottom: 2,
      backgroundColor:'#113946',
      color: 'white',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
  },
  circleDeleteRequest:{
    width:50,
    height: 50,
    marginTop:20,
    marginLeft: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#113946',
    // position: 'absolute',
    // right:10,
    // top: 40,
    // bottom: 0,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    width:60,
    height: 60,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    // borderColor:'black',
    // borderWidth:1,
    backgroundColor: '#fff',
    position: 'absolute',
    right:10,
    bottom: 10,
    backgroundColor:'#113946',
    // color: 'white',
    elevation: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 60,
      height: 60,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  circleButtonDetailCloseModal: {
    width:40,
    height: 40,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
    position: 'absolute',
    left:10,
    top: 10,
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
  circleButtonDetailCloseModal2: {
    width:40,
    height: 40,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
    position: 'absolute',
    left:-20,
    top: -20,
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
  circleButtonAnsweredPrayerCloseModal: {
    width:40,
    height: 40,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
    position: 'absolute',
    left:-15,
    top: -15,
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
    width:40,
    height: 40,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#EAD7BB',
    position: 'absolute',
    right:10,
    top: 10,
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
  nameInputText:{
    textAlign: 'left',
    color: '#C56E33'
  },
  deleteQuestionText:{
    fontSize:25,
    textAlign: 'left',
    color: '#C56E33'
  },
  requestInputText:{
    textAlign: 'left',
    color: '#C56E33'
  },
  circleSubmitNewRequest: {
    width:50,
    height: 50,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#113946',
    position: 'absolute',
    right:10,
    bottom: 10,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  
});

export default newPrayerRequest;
import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, Text, Modal, SafeAreaView, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList, KeyboardAvoidingView } from 'react-native';
// import SubmitPrayer from './submitPrayerRequestButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import PrayerList from './prayerList';
import axios from "axios";
import {BASE_URL_DEV} from '@env';

let initialData = [];

const prayerGroups = (runningUser) => {
  console.log('runningUser in prayerGroups:', runningUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteGroupModalVisible, setDeleteGroupModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [count, setCount] = useState(-1);
  const [data, setData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [details, setDetails] = useState('');
  const [showEditButton, setShowEditButton] = useState(false);
  const [id, setId] = useState('');
  const [timesPrayed, setTimesPrayed] = useState('');
  const [answeredPrayerInputModalOpen, setAnsweredPrayerInputModalOpen] = useState(false);
  const [answeredPrayerText, setAnsweredPrayerText] = useState('');
  const [page, setPage] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupCreatedBy, setGroupCreatedBy] = useState('');
  const [newPrayerGroupModalVisible, setNewPrayerGroupModalVisible] = useState(false);
  

  useEffect(() => {
    loadData();
    setPage('groupList');
  }, []);

  const loadData = () => {
    console.log('IN loadData prayerGroups');
    console.log('IN loadData runningUser.runningUser[0].id', runningUser.runningUser[0].id);
    fetch(`${BASE_URL_DEV}/data/prayergroups?userId=${runningUser.runningUser[0].id}`)
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

  const addNewPrayerGroup = () => {
    console.log('in addNewPrayerGroup');
    console.log('in addNewPrayerGroup as user: ', runningUser.runningUser[0].id);
    setNewPrayerGroupModalVisible(true);
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
    console.log('deleteFunction item', item);
    fetch(`${BASE_URL_DEV}/data`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        nama: text,
        details: details,
      }),
    })
      .then((response) =>{
        console.log('response', response);
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
    console.log('details timesprayed', details.timesprayed);
    console.log('incermentTimesPrayed id', details.id);
    console.log('timesPrayed ', timesPrayed);
    let newtimesPrayed = timesPrayed + 1;
    setTimesPrayed(newtimesPrayed);
    console.log('newtimesPrayed ', newtimesPrayed);
    fetch(`${BASE_URL_DEV}/data/timesprayedgroup`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: details.id,
        timesprayed: timesPrayed +1,
      }),
    })
      .then((response) =>{
        console.log('response', response);
        details.timesprayed = newtimesPrayed;
        setDetails(details);
        loadData();
        Alert.alert('Thank you for Praying!');
        setModalVisible(false);
        setDetailsModalVisible(false)
      })
    
  }

  const showGroupPrayerList = async (group) => {
    console.log('showGroupPrayerList groupId', group);
    setGroupId(group.groupid);
    setGroupName(group.groupname);
    setGroupCreatedBy(group.createdbyid)
    const response = await fetch(`${BASE_URL_DEV}/data/groupprayerrequests?groupid=${group.groupid}`)
      .then(response => response.json())
      .then(json => {
        console.log('showGroupPrayerList response', json)
        // setRunningUser(json);
        setRequestData(json);
        setPage('groupRequests');
      })
      .catch(error => {
        console.error(error);
      });
    
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

  const deleteGroup = (group) => {
    console.log('In GROUP DELETE', group);
    setDeleteGroupModalVisible(true);
  }

  const closeDeleteModal = () => {
    setDeleteGroupModalVisible(false);
  }

  const closeNewGroupRequest = () => {
    setNewPrayerGroupModalVisible(false);
  }

  const addGroup = () => {
    console.log('In addGroup text', text);
    console.log('In addGroup user', runningUser.runningUser[0].id);
    fetch(`${BASE_URL_DEV}/data/newGroup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupname: text,
          submittedbyuserid: runningUser.runningUser[0].id,
          status: 'active',
        }),
      })
        .then((response) =>{
          console.log('response', response);
          loadData();
          setNewPrayerGroupModalVisible(false);
          setText('');
          Alert.alert('Prayer Request Submitted!');
          setModalVisible(false);
        })
  }

  const deactivateGroup = () => {
    console.log('In GROUP DELETE', details);
    fetch(`${BASE_URL_DEV}/data/deativateprayergroup`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupid: groupId,
        //   status: 'Answered',
        //   answerednote: answeredPrayerText,
        }),
      })
        .then((response) =>{
          console.log('response', response);
          setModalVisible(false);
          setDetailsModalVisible(false);
          setAnsweredPrayerInputModalOpen(false);
          setDetails('');
          loadData();
          setPage('groupList');
          Alert.alert('Prayer Group is removed!');
          
        })
  }

  const returnToGroups = () => {
    setPage('groupList');
  }

  if(page == 'groupList'){
    return (
        <View style={styles.centeredViewPrayerList}>
           {/* start new prayer group Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={newPrayerGroupModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setNewPrayerGroupModalVisible(!newPrayerGroupModalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Pressable style={styles.circleButtonDetailCloseModal2} onPress={() => closeNewGroupRequest()}>
                <MaterialIcons name="close" size={25} color="white" />
              </Pressable>
                <Text style={styles.nameInputText}>Group Name?</Text>
                <TextInput
                    style={{
                        borderColor: '#113946',
                        borderWidth: 4,
                        borderRadius: 30,
                        width:'95%',
                        height: '30%',
                        marginBottom: 40,
                    }}
                    onChangeText={newText => setText(newText)}
                    placeholder="    Group Name"
                    value={text}
                />
                {/* <Text style={styles.requestInputText}>What is the request?</Text>
                <TextInput
                    style={{
                        // height: 100,
                        borderColor: '#113946',
                        borderWidth: 4,
                        borderRadius: 30,
                        width:'95%',
                        height: '64%',
                        marginBottom: 40,
                        
                    }}
                    onChangeText={newDetailText => setDetails(newDetailText)}
                    placeholder="    Prayer Request"
                    value={details}
                /> */}
                {/* {!showEditButton ?  */}
                  <Pressable style={styles.circleSubmitNewRequest} onPress={() => addGroup()} visible={!showEditButton}>
                    <MaterialIcons name="send" size={30} color="#EAD7BB" />
                  </Pressable>
                {/* //   :
                //   <Pressable style={styles.circleSubmitNewRequest} onPress={() => editDetails(id)} visible={showEditButton}>
                //     <MaterialIcons name="update" size={30} color="#EAD7BB" />
                //   </Pressable>
                // } */}
              
              
              </View>
            </View>
          </Modal>
          {/* end new prayer group Modal */}
          
          <Text style={styles.helpText}>select group to view group prayer request details</Text>
          <SafeAreaView style={styles.flatListStyle}>
            <FlatList
              data={data}
              renderItem={({item}) => 
                <Pressable style={[styles.buttonShowDetail]} onPress={() => showGroupPrayerList(item)}>
                    <Text style={styles.item} key={item.groupid}>{item.groupname}</Text>
                </Pressable>
              }
            />
          </SafeAreaView>
          <Pressable style={styles.bottomButton} onPress={() => addNewPrayerGroup()}>
            <Text style={styles.bottomButtonText}>New Prayer Group</Text>
          </Pressable>
        </View>
      );
  }
  else if(page == 'groupRequests'){
    return (
        <View style={styles.centeredViewPrayerList}>
              {/* start Delete Group Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={deleteGroupModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setDeleteGroupModalVisible(!deleteGroupModalVisible);
            }}>
            {/* <View style={styles.centeredViewRequestDetails}> */}
              
              <View style={styles.modalViewDetails}>
              {/* <Pressable style={styles.circleButtonDetailEditModal} onPress={() => openEditDetail(details)}>
                <MaterialIcons name="edit" size={25} color="black" />
              </Pressable>
              <Pressable style={styles.circleButtonDetailCloseModal} onPress={() => closeDetails()}>
                <MaterialIcons name="close" size={25} color="white" />
              </Pressable>
              <Pressable style={styles.circleButtonDetailDeleteModal} onPress={() => deleteFunction(details)}>
                <MaterialIcons name="delete" size={25} color="white" />
              </Pressable> */}
                <Text style={[styles.requestNameText]}>
                  Do you want to remove this Prayer Group and all the Prayer Requests tied to it?
                </Text>
                <Text style={[styles.requestNameText]}>
                  Note: All users will no longer have visibility to this group
                </Text>
                {/* <Text style={[styles.prayingForText]}>Praying for...</Text>
                <SafeAreaView style={styles.safeAreaContainer}>
                  <ScrollView style={styles.requestDetailsScrollView}>
                    <Text style={[styles.requestDetailsText]}>
                      {details.details}
                    </Text>
                  </ScrollView>
                </SafeAreaView>
                <View style={styles.detailButtonGroup}> */}
                   <Pressable
                    style={[styles.closeDeleteModal]}
                    onPress={() => closeDeleteModal()}>
                    {/* <MaterialCommunityIcons name="human-handsup" size={30} color="#BCA37F" /> */}
                    <Text style={styles.textStylePrayerRequest}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.deactivateGroupButton]}
                    onPress={() => deactivateGroup()}>
                    {/* <MaterialCommunityIcons name="human-handsup" size={30} color="#BCA37F" /> */}
                    <Text style={styles.textStylePrayerRequest}>OK</Text>
                  </Pressable>
    
                {/* <Pressable
                    style={[styles.prayedCircleButton]}
                    onPress={() => incermentTimesPrayed()}>
                    
                    <FontAwesome5 name="pray" size={34} color="#BCA37F" />
                    <Text style={styles.textStylePrayed}>Prayed</Text>
                  </Pressable> */}
              {/* </View> */}
            </View>
          </Modal> 
          {/* end Delete Group Modal */}

       

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
              <Pressable style={styles.circleButtonDetailCloseModal2} onPress={() => closeNewRequest()}>
                <MaterialIcons name="close" size={25} color="white" />
              </Pressable>
                <Text style={styles.nameInputText}>Who/What am I praying for?</Text>
                <TextInput
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
                />
                <Text style={styles.requestInputText}>What is the request?</Text>
                <TextInput
                    style={{
                        // height: 100,
                        borderColor: '#113946',
                        borderWidth: 4,
                        borderRadius: 30,
                        width:'95%',
                        height: '64%',
                        marginBottom: 40,
                        
                    }}
                    onChangeText={newDetailText => setDetails(newDetailText)}
                    placeholder="    Prayer Request"
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
    
           {/* start Answered Prayer Input Modal */}
           <Modal
            animationType="slide"
            transparent={true}
            visible={answeredPrayerInputModalOpen}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
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
                        borderWidth: 4,
                        borderRadius: 30,
                        width:'95%',
                        height: '30%',
                        marginBottom: 40,
                        
                    }}
                    onChangeText={newAnswerText => setAnsweredPrayerText(newAnswerText)}
                    placeholder="    Answer..."
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
              Alert.alert('Modal has been closed.');
              setDetailsModalVisible(!detailsModalVisible);
            }}>
            <View style={styles.centeredViewRequestDetails}>
              
              <View style={styles.modalViewDetails}>
              
            {runningUser.runningUser[0].id == details.submittedbyuserid ? 
                 <Pressable style={styles.circleButtonDetailEditModal} onPress={() => openEditDetail(details)}>
                    <MaterialIcons name="edit" size={25} color="black" />
               </Pressable>
               :
               ''
            }
              <Pressable style={styles.circleButtonDetailCloseModal} onPress={() => closeDetails()}>
                <MaterialIcons name="close" size={25} color="white" />
              </Pressable>
              {/* <Text>running user: {runningUser.runningUser[0].id}</Text>
              <Text>submitted by user: {details.submittedbyuserid}</Text> */}
            {runningUser.runningUser[0].id == details.submittedbyuserid ? 
                 <Pressable style={styles.circleButtonDetailDeleteModal} onPress={() => deleteFunction(details)}>
                 <MaterialIcons name="delete" size={25} color="white" />
               </Pressable> 
               :
               ''
            }
             
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
                {runningUser.runningUser[0].id == details.submittedbyuserid ? 
                    <Pressable
                        style={[styles.answeredPrayer]}
                        onPress={() => answeredPrayer()}>
                        <MaterialCommunityIcons name="human-handsup" size={30} color="#BCA37F" />
                        <Text style={styles.textStylePrayerRequest}>Answered</Text>
                    </Pressable>
                    :
                    ''
                }
                  
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
          
          <Pressable onPress={() => returnToGroups()}>
            {/* <View style={styles.groupNameAndBack}> */}
                <Text style={styles.backburger}>
                    <Ionicons name="md-return-up-back" size={50} color="#BCA37F" />
                    {/* <MaterialCommunityIcons name="backburger" size={40} color="#BCA37F"/> */}
                </Text>
                <Text style={styles.groupText}>
                    
                    <Text>
                        Group: {groupName} 
                    </Text>
                    
                </Text>
            {/* </View> */}
            
          </Pressable>
          {runningUser.runningUser[0].id == groupCreatedBy ? 
                <Pressable style={styles.circleButtonGroupDeleteModal} onPress={() => deleteGroup(details)}>
                    <MaterialIcons name="delete" size={25} color="#113946" />
                </Pressable> 
               :
               ''
            }
            
          <Text style={styles.helpText}>click each prayer request to view details</Text>
          <SafeAreaView style={styles.flatListStyle}>
            <FlatList
              data={requestData}
              renderItem={({item}) => 
                <Pressable style={[styles.buttonShowDetail]} 
                                        onPress={() => showDetails(item)}>
                  <View style={[styles.nameView]}> 
                    <View>
                        <Text style={[styles.timesPrayedBubble]}>{item.timesprayed}
                        <View>
                        <Text style={[styles.timesPrayedBubbleText]}>Prayed</Text>
                        </View>
                        </Text>
                    </View>
                      
                      
                      <Text style={styles.item} key={item.groupid}>{item.nama}
                        
                      </Text>
                  </View>
                </Pressable>
              }
            />
          </SafeAreaView>
          <Pressable style={styles.bottomButton} onPress={() => addNewPrayerRequest()}>
            <Text style={styles.bottomButtonText}>New Prayer Request</Text>
          </Pressable>
        </View>
        
      );
  }
  
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

  timesPrayedBubbleText:{
    fontSize: 12,
    color: '#C56E33',
    marginTop: 5,
    marginLeft:-15,
    // padding:10,
    // position: 'absolute',
    // right:5,
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
    textAlign:'left'
  },
  timesPrayedBubble: {
    backgroundColor: 'grey',
    // margin:3,
    fontSize: 20,
    width:30,
    height: 30,
    marginRight:10,
    // marginTop:5,
    marginBottom: -60,
    zIndex:1,
    // position: 'relative',
    left:'85%',
    // justifyContent: 'center',
    // alignItems: 'center',
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
  closeDeleteModal:{
    width:120,
    height: 120,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 10,
    left:10,
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
  deactivateGroupButton:{
    width:120,
    height: 120,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 10,
    right:10,
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
  groupNameAndBack:{
    // flexDirection:'row',
  },
  backburger:{
    position:'absolute',
    left:20,
    top:5,
  },
  groupText:{
    // textAlign: 'left',
    color: '#C56E33',
    fontStyle: 'italic',
    fontSize:20,
    padding: 15,
    borderRadius: 50,
    // marginBottom: 10,
    // marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    // fontSize: 30,
    height: 60,
    zIndex:-1,
    textAlign: 'center',
    // color:"#BCA37F",
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
  circleButtonGroupDeleteModal: {
    width:60,
    height: 60,
    marginTop:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#EAD7BB',
    position: 'absolute',
    right:10,
    // bottom: 10,
    // backgroundColor:'red',
    // elevation: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
  },
  nameInputText:{
    textAlign: 'left',
    color: '#C56E33',
    height:50
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

export default prayerGroups;
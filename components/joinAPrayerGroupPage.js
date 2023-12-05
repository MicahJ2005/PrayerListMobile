import React, {useState, useEffect} from 'react';
import {View, Text, Modal, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {BASE_URL_DEV} from '@env';

const JoinPrayerGroup = (user) => {
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const [viewGroupTab, setViewGroupTab] = useState('Public');

    const searchGroups = () => {
        setData([]);
        console.log('in searchGroup with text ', text);
        console.log('in searchGroup with user ', user);
        fetch(`${BASE_URL_DEV}/data/searchPrayerGroups?grouporid=${text}`)
        .then((resp) => resp.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

    const searchPrivateGroups = () => {
      setData([]);
      console.log('in searchPrivateGroups with text ', text);
      console.log('in searchPrivateGroups with user ', user);
      fetch(`${BASE_URL_DEV}/data/searchPrivatePrayerGroups?grouporid=${text}`)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

    const showJoinModal = (group) => {
        console.log('showJoinModal ', group);
        setSelectedGroup(group)
        setJoinModalVisible(true);
    }

    const closeJoinModal = () => {
        console.log('closeJoinModal ', selectedGroup);
        setJoinModalVisible(false);
    }

    const joinGroup = (group) => {
        console.log('joinGroup ', selectedGroup);
        console.log('joinGroup USER', user);
        fetch(`${BASE_URL_DEV}/data/joinPrayerGroup`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              groupid: selectedGroup.id,
              userid: user.runningUser[0].id
            }),
          })
            .then((response) =>{
              console.log('response', response);
              setData([]);
              Alert.alert('Joined New Prayer Group!');
              
              setJoinModalVisible(false);
            })
    }

    const setPublicGroup = () => {
      console.log('PUBLIC click')
      setData([]);
      setViewGroupTab('Public');
    }
  
    const setPrivateGroup = () => {
      console.log('PRIVATE click')
      setData([]);
      setViewGroupTab('Private');
    }

    return(

        <View>
          {viewGroupTab !== "Public" ?
            <View style={styles.publicOrPrivateButtons}>
              <Pressable style={styles.publicButtonNotSelected} onPress={() => setPublicGroup()}>
                <Text style={{color: 'grey',fontSize:20}}>Public Groups</Text>
              </Pressable>
              <Pressable style={styles.privateButtonSelected} onPress={() => setPrivateGroup()}>
                <Text style={{color: '#C56E33', fontSize:20, fontWeight:'bold', marginRight:20}}>Private Groups</Text>
                <MaterialIcons name="check-circle-outline" size={25} color="green" />
              </Pressable>
            </View>
            :
            <View style={styles.publicOrPrivateButtons}>
              <Pressable style={styles.publicButtonSelected} onPress={() => setPublicGroup()}>
                <Text style={{color: '#C56E33',fontSize:20, fontWeight:'bold', marginRight:20}}>Public Groups</Text>
                <MaterialIcons name="check-circle-outline" size={25} color="green" />
              </Pressable>
              <Pressable style={styles.privateButtonNotSelected} onPress={() => setPrivateGroup()}>
                <Text style={{color: 'grey',fontSize:20}}>Private Groups</Text>
              </Pressable>
            </View>
          }
          {viewGroupTab === "Public" ? 
            <View>
              <Text style={styles.nameInputText3}>Search for a Public Prayer Group by Name</Text>
              <TextInput
                  style={{
                      borderColor: '#113946',
                      // borderWidth: 4,
                      // borderRadius: 30,
                      borderBottomWidth: 4,
                      width:'80%',
                      height: '23%',
                      // marginBottom: 40,
                      marginLeft:10
                  }}
                  textAlign='center'
                  onChangeText={newText => setText(newText)}
                  placeholder="Group Name"
                  value={text}
              />
              <Pressable style={styles.circleSubmitNewRequest} onPress={() => searchGroups()}>
                  <MaterialIcons name="search" size={30} color="#EAD7BB" />
              </Pressable>
            </View>
             : 
             <View>
              <Text style={styles.nameInputText3}>Search for a Private Prayer Group by Group Id</Text>
              <TextInput
                  style={{
                      borderColor: '#113946',
                      // borderWidth: 4,
                      // borderRadius: 30,
                      borderBottomWidth: 4,
                      width:'80%',
                      height: '23%',
                      // marginBottom: 40,
                      marginLeft:10
                  }}
                  textAlign='center'
                  onChangeText={newText => setText(newText)}
                  placeholder="Group Id"
                  value={text}
              />
              <Pressable style={styles.circleSubmitNewRequest} onPress={() => searchPrivateGroups()}>
                  <MaterialIcons name="search" size={30} color="#EAD7BB" />
              </Pressable>
           </View>}  

            <SafeAreaView style={styles.flatListStyle}>
                <FlatList
                    data={data}
                    renderItem={({item}) => 
                    <Pressable style={[styles.buttonShowDetail]} onPress={() => showJoinModal(item)}>
                        <Text style={styles.item} key={item.id}>{item.groupname}</Text>
                    </Pressable>
                }
                />
            </SafeAreaView>

             {/* start new prayer group Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={joinModalVisible}
            onRequestClose={() => {
              setJoinModalVisible(!joinModalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Pressable style={styles.circleButtonDetailCloseModal2} onPress={() => closeJoinModal()}>
                <MaterialIcons name="close" size={25} color="white" />
              </Pressable>
                <Text style={styles.nameInputText}>Join Prayer Group?</Text>
                <Text style={styles.nameInputText2}>{selectedGroup.groupname}</Text>
                  <Pressable style={styles.circleAddToGroup} onPress={() => joinGroup()} >
                    <MaterialIcons name="group-add" size={30} color="#EAD7BB" />
                  </Pressable>
              </View>
            </View>
          </Modal>
          {/* end new prayer group Modal */}
        </View>
        
    )
}

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
      height:'55%',
      marginTop:-65
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
      fontSize: 25,
      margin:10,

    },
    nameInputText2:{
        color: '#113946',
        fontSize: 30,
        margin:20,
        fontStyle:'italic',
    },
    nameInputText3:{
      color: '#C56E33',
      fontSize: 15,
      margin:20,
      // fontStyle:'italic',
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
      right:5,
      top: 50,
      elevation: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    circleAddToGroup: {
        width:70,
        height: 70,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#113946',
        // position: 'absolute',
        right:-140,
        bottom: -30,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      publicOrPrivateButtons:{
        display: 'inline',
        flexDirection: 'row',
        width:'100%',
        // marginLeft:-100,
        
        // position: 'absolute',
        // left:30,
        // alignItems: 'left',
      },
      publicButtonSelected:{
        display: 'inline',
        flexDirection: 'row',
        backgroundColor: '#113946',
        marginTop: 20,
        marginRight:0,
        padding: 15,
        borderColor:'#113946',
        borderWidth: 1,
        width:'50%',
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // alignItems: 'left',
      },
      publicButtonNotSelected:{
        display: 'inline',
        flexDirection: 'row',
        backgroundColor: '#EAD7BB',
        marginTop: 20,
        marginRight:0,
        padding: 15,
        borderColor:'#113946',
        borderWidth: 1,
        width:'50%',
        fontSize:20,
        color:'grey'
        // alignItems: 'left',
      },
      privateButtonSelected:{
        display: 'inline',
        flexDirection: 'row',
        backgroundColor: '#113946',
        marginTop: 20,
        marginLeft:0,
        padding: 15,
        borderColor:'#113946',
        borderWidth: 1,
        color: '#C56E33',
        width:'50%',
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // alignItems: 'left',
      },
      privateButtonNotSelected:{
        display: 'inline',
        flexDirection: 'row',
        backgroundColor: '#EAD7BB',
        marginTop: 20,
        marginLeft:0,
        padding: 15,
        borderColor:'#113946',
        borderWidth: 1,
        width:'50%',
        fontSize:20,
        color:'grey'
        // alignItems: 'left',
      }
})



export default JoinPrayerGroup;
import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, Text, Modal, SafeAreaView, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList} from 'react-native';
// import SubmitPrayer from './submitPrayerRequestButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import PrayerList from './prayerList';
// import axios from "axios";
import {BASE_URL_DEV} from '@env';

const GroupPrayerHistoryPage = (runningUser) => {
    console.log('runningUser in newPrayerRequest:', runningUser);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [details, setDetails] = useState('');
    const [detailsDate, setDetailsDate] = useState('');

    useEffect(() => {
        loadData();
      }, []);
    
    const loadData = () => {
    fetch(`${BASE_URL_DEV}/data/groupPrayerhistory?userId=${runningUser.runningUser[0].id}`)
        .then((resp) => resp.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
        console.log('PrayerHistoryPage data', data);
        
    }

    const showDetails = (item) => {
        console.log('showDetails item', item);
        setDetails(item);
        console.log('item updatedat.', item.updatedat.split('T'));
        // setTimesPrayed(item.timesprayed);
        setDetailsDate(item.updatedat.split('T')[0])
        setDetailsModalVisible(true)
      }

      const closeDetails = () => {
        console.log('closeDetails');
        // setDetails('');
        setDetailsModalVisible(false)
      }


    return(
        <View>
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
          {/* <Pressable style={styles.circleButtonDetailEditModal} onPress={() => openEditDetail(details)}>
            <MaterialIcons name="edit" size={25} color="black" />
          </Pressable> */}
          <Pressable style={styles.circleButtonDetailCloseModal} onPress={() => closeDetails()}>
            <MaterialIcons name="close" size={25} color="white" />
          </Pressable>
          {/* <Pressable style={styles.circleButtonDetailDeleteModal} onPress={() => deleteFunction(details)}>
            <MaterialIcons name="delete" size={25} color="white" />
          </Pressable> */}
            <Text style={[styles.requestNameText]}>
              {details.nama}
            </Text>
            <Text style={[styles.requestGroupText]}>
              Prayer Group: {details.groupname}
            </Text>
            <Text style={[styles.prayingForText]}>Prayed for...</Text>
            <SafeAreaView style={styles.safeAreaContainer}>
              <ScrollView style={styles.requestDetailsScrollView}>
                <Text style={[styles.requestDetailsText]}>
                  {details.details}
                </Text>
              </ScrollView>
            </SafeAreaView>

            {/* <Text style={[styles.prayingForText2]}></Text> */}
            {/* <SafeAreaView style={styles.safeAreaContainer2}> */}
              {/* <ScrollView style={styles.requestDetailsScrollView2}> */}
              <View style={[styles.prayerSummaryView]}>
                <Text style={[styles.requestDetailsText2]}>
                  You prayed for {details.nama} {details.timesprayed} time(s) and God answered this prayer on {detailsDate}
                </Text>
              </View>
                
              {/* </ScrollView>
            </SafeAreaView> */}
            {/* <View style={styles.detailButtonGroup}> */}
              
              {/* <Pressable
                style={[styles.answeredPrayer]}
                onPress={() => answeredPrayer()}>
                <MaterialCommunityIcons name="human-handsup" size={30} color="#BCA37F" />
                <Text style={styles.textStylePrayerRequest}>Answered</Text>
              </Pressable> */}

            {/* <Pressable
                style={[styles.prayedCircleButton]}
                onPress={() => incermentTimesPrayed()}>
                
                <FontAwesome5 name="pray" size={34} color="#BCA37F" />
                <Text style={styles.textStylePrayed}>Prayed</Text>
              </Pressable> */}
          </View>
        </View>
      </Modal>
      {/* end prayer request details Modal */}
      
      <Text style={styles.helpText}>click each prayer request to view details</Text>
      
      <FlatList
        style={styles.flatlistStyle}
        data={data}
        renderItem={({item}) => 
          <Pressable style={[styles.buttonShowDetail]} 
                                  onPress={() => showDetails(item)}>
            {/* <View style={[styles.nameView]}> */}
                <View>
                    <Text style={[styles.timesPrayedBubble]}>{item.timesprayed}
                    <View>
                      <Text style={[styles.timesPrayedBubbleText]}>Answered</Text>
                    </View>
                    </Text>
                    
                </View>
                
                
                <Text style={styles.item} key={item.id}>{item.nama}
    
                </Text>
                <Text style={styles.groupItem}>Group: {item.groupname}</Text>
                
                
            {/* </View> */}
            
          </Pressable>
        }
      />
        </View>
        
    );
};

const styles = StyleSheet.create({
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
      height: 150,
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
    requestGroupText:{
        marginTop: 20,
        fontSize: 20,
        color: '#C56E33',
    },
    requestDetailsText:{
      fontSize: 30,
      color: '#C56E33',
    },
    requestDetailsText2:{
        borderColor: '#113946',
        // borderWidth: 4,
        fontSize: 20,
        color: '#C56E33',
        fontStyle:'italic'
      },
    textStylePrayed: {
      color: '#BCA37F',
    },
    prayerSummaryView:{
        borderColor: '#113946',
        borderWidth: 4,
        color: '#C56E33',
        padding:20,
        width:'100%',
        position: 'absolute',
        bottom:30
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
      color: '#FFF2D8',
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
    groupItem:{
    //     padding: 15,
    //   borderRadius: 50,
        fontStyle:'italic',
      marginBottom: 10,
      marginTop: -35,
    //   marginRight: 30,
    //   marginLeft: 30,
    //   fontSize: 30,
    //   height: 80,
    //   zIndex:-1,
      textAlign: 'center',
      color: '#C56E33',
    //   backgroundColor: '#113946',
    //   elevation: 4,
    //     shadowColor: '#000',
    //     shadowOffset: {
    //       width: 10,
    //       height: 2,
    //     },
    //     shadowOpacity: 1,
    //     shadowRadius: 10,
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
    flatlistStyle:{
        height: '73%'
    }
});

export default GroupPrayerHistoryPage;
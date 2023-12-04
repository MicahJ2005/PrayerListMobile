import React, {useState, useEffect} from 'react';
import {View, Text, Modal, SafeAreaView, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList, ActivityIndicator} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {BASE_URL_DEV} from '@env';

const DevotionHistoryPage = (runningUser) => {
    console.log('runningUser in newPrayerRequest:', runningUser);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [details, setDetails] = useState('');
    const [detailsDate, setDetailsDate] = useState('');
    const [devotionBody, setDevotionBody] = useState('');
    const [devotionTitle, setDevotionTitle] = useState('');
    const [devotionScripture, setDevotionScripture] = useState('');
    const [page, setPage] = useState('showList');
    const [viewGroupTab, setViewGroupTab] = useState('Personal');

    useEffect(() => {
        loadPersonalDevoData();
      }, []);
    
    const loadPersonalDevoData = () => {
    fetch(`${BASE_URL_DEV}/data/devotionhistory?userId=${runningUser.runningUser[0].id}`)
        .then((resp) => resp.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
        console.log('devotionhistory data', data);
        
    }

    const loadFamilyDevoData = () => {
        fetch(`${BASE_URL_DEV}/data/familydevotionhistory?userId=${runningUser.runningUser[0].id}`)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
            console.log('devotionhistory data', data);
        }

    const setPublicGroup = () => {
        console.log('PUBLIC click');
        loadPersonalDevoData();
        setViewGroupTab('Personal');
      }
    
      const setPrivateGroup = () => {
        console.log('PRIVATE click');
        loadFamilyDevoData();
        setViewGroupTab('Family');
      }

    const showDetails = async (item) => {
        if(viewGroupTab == 'Personal'){
            const response = await fetch(`${BASE_URL_DEV}/data/getdevobyuseranddate?userid=${runningUser.runningUser[0].id}&devoid=${item.id}`)
            const jsonDevotion = await response.json();  
            console.log('jsonDevotion', jsonDevotion);
            console.log('jsonDevotion size', jsonDevotion.length);
            if(jsonDevotion.length > 0){
                setDevotionTitle(jsonDevotion[0].title);
                setDevotionScripture(jsonDevotion[0].scripture);
                setDevotionBody(jsonDevotion[0].body);
                setDetailsModalVisible(true);
                setPage('viewDevo')
                setLoading(false);
            }
            else{
                console.log('error getting devo')
            }
            console.log('showDetails item', item);
            setDetails(item);
            console.log('item updatedat.', item.devodate.split('T'));
            setDetailsDate(item.devodate.split('T')[0])
            setDetailsModalVisible(true)
        }
        else if(viewGroupTab == 'Family'){
            response = await fetch(`${BASE_URL_DEV}/data/getfamilydevobyuseranddate?userid=${runningUser.runningUser[0].id}&devoid=${item.id}`)
            const jsonDevotion = await response.json();  
            console.log('jsonDevotion', jsonDevotion);
            console.log('jsonDevotion size', jsonDevotion.length);
            if(jsonDevotion.length > 0){
                setDevotionTitle(jsonDevotion[0].title);
                setDevotionScripture(jsonDevotion[0].scripture);
                setDevotionBody(jsonDevotion[0].body);
                setDetailsModalVisible(true);
                setPage('viewDevo')
                setLoading(false);
            }
            else{
                console.log('error getting devo')
            }
            console.log('showDetails item', item);
            setDetails(item);
            console.log('item updatedat.', item.devodate.split('T'));
            setDetailsDate(item.devodate.split('T')[0])
            setDetailsModalVisible(true)
        }
        
      }
      

      const closeDetails = () => {
        console.log('closeDetails');
        setPage('showList');
        setViewGroupTab('Personal');
        loadPersonalDevoData();
        setDetailsModalVisible(false)
      }


    if(loading){
        return(
        
            <View style={[styles.devotionBodyLoadingView]}>
                <ActivityIndicator size="large" color="#C56E33" />
                
                <Text >
                    {'\n'}
                    {'\n'}
                    Writing your family devotion... 
                    {'\n'}
                    This may take a minute or two...
                </Text>
            </View>
            
        );
    }
    else{
        return(
            <View>
                {page == 'viewDevo' ?
                    ''
                    :
                    <View>
                    {viewGroupTab !== 'Personal' ?
                        <View style={styles.publicOrPrivateButtons}>
                            <Pressable style={styles.publicButtonNotSelected} onPress={() => setPublicGroup()}>
                                <Text style={{color: 'grey',fontSize:20}}>Personal</Text>
                            </Pressable>
                            <Pressable style={styles.privateButtonSelected} onPress={() => setPrivateGroup()}>
                                <Text style={{color: '#C56E33', fontSize:20, fontWeight:'bold', marginRight:20}}>Family</Text>
                                <MaterialIcons name="check-circle-outline" size={25} color="green" />
                            </Pressable>
                        </View>
                            :
                        <View style={styles.publicOrPrivateButtons}>
                            <Pressable style={styles.publicButtonSelected} onPress={() => setPublicGroup()}>
                                <Text style={{color: '#C56E33',fontSize:20, fontWeight:'bold', marginRight:20}}>Personal</Text>
                                <MaterialIcons name="check-circle-outline" size={25} color="green" />
                            </Pressable>
                            <Pressable style={styles.privateButtonNotSelected} onPress={() => setPrivateGroup()}>
                                <Text style={{color: 'grey',fontSize:20}}>Family</Text>
                            </Pressable>
                        </View>
                    }
                    </View>
                }
                {page == 'viewDevo' ?
           
                    <View>
                        <ScrollView style={[styles.devotionBodyView]}>
                            <Text style={[styles.devotionTitleText]}>
                                {devotionTitle}
                                {'\n'}
                            </Text>
                            <Text style={[styles.devotionScriptureText]}>
                                {devotionScripture}
                                {'\n'}
                            </Text>
                            
                            <Text style={[styles.devotionBodyText]}>
                                {devotionBody}
                            </Text>
                            <Text></Text>
                            
                            <Text>
                            {'\n'}
                            {'\n'}
                            </Text>
                            
                        </ScrollView>
                        <View>
                            <Pressable style={[styles.returnIcon]} onPress={() => closeDetails()}>
                                <Ionicons name="md-return-up-back" size={40} color="#C56E33" />
                            </Pressable>
                        </View>
                    </View>
              :
                    <View >
                        <Text style={styles.helpText}>click the date to view past devotions</Text>
                        
                        <FlatList
                            style={styles.flatListStyle}
                            data={data}
                            renderItem={({item}) => 
                            <Pressable style={[styles.buttonShowDetail]} 
                                                onPress={() => showDetails(item)}>
                                
                                
                                <Text style={styles.item} key={item.id}>{item.devodate.split('T')[0]}</Text>
                            
                            </Pressable>
                        }
                    />
                    </View>
                }
            </View>
        )
    }
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
      devotionBodyView: {
        // flex: 1,
      //   justifyContent: 'left',
      //   alignItems: 'left',
        // marginTop: 22,
        height:'88%',
        // marginLeft:10,
        backgroundColor: '#BCA37F',
      },
      returnIcon:{
        width:50,
        height: 50,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#113946',
        position: 'absolute',
        left:10,
        bottom: 10,
        // elevation: 15,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 2,
        //   height: 4,
        // },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // marginTop:-20,
        color: '#C56E33'
      },
      flatListStyle:{
        height: '75%',
      },
      publicOrPrivateButtons:{
        display: 'inline',
        flexDirection: 'row',
        width:'100%',
        marginTop: -35,
        marginBottom:10,
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
      },
      devotionBodyLoadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: '#BCA37F',
      },
      devotionTitleText: {
        fontSize:25,
        textAlign: 'center'
    },
    devotionScriptureText: {
        fontSize:20,
        textAlign: 'center',
        color: '#C56E33',
        fontStyle: 'italic',
        marginLeft: 15,
        marginRight: 15
    },
    devotionBodyText:{
        fontSize:20,
        // textAlign: 'center',
        marginLeft: 15,
        marginRight: 5
        // color: '#C56E33',
        // fontStyle: 'italic',
        // marginLeft: 15,
        // marginRight: 15
    }
});

export default DevotionHistoryPage;
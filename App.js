// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, Text, Image, ScrollView, Modal, Pressable, StyleSheet, SafeAreaView, SectionList, StatusBar} from 'react-native';
// import PrayerList from './components/prayerList';
// import HeaderComp from './components/headerComp';
import NewPrayerRequest from './components/newPrayerRequest';
import PersonalDevotionPage from './components/personalDevotionPage';
import PrayerHistoryPage from './components/prayerHistoryPage';
import AboutPage from './components/aboutPage';
// import { useCallback } from 'react';
import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import logo from './assets/logo-no-background.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list'

const data = [
  {key:'Depression', value:'Depression'},
  {key:'Fear', value:'Fear'},
  {key:'Strength', value:'Strength'},
  {key:'Job Loss', value:'Job Loss'},
  {key:'Loss', value:'Loss'},
  {key:'Sickness', value:'Sickness'},
  {key:'Parenting', value:'Parenting'},
  {key:'Spiritual Growth', value:'Spiritual Growth'},
]


export default function App() {
  const [page, setPage] = useState('home');
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [devoSelectorVisible, setDevoSelectorVisible] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [submitDevoButtonDisabled, setSubmitDevoButtonDisabled] = useState(true);
  
  useEffect(() => {
    console.log('page: ', page);
  })

  const openDevoTypeSelector = () => {
    console.log('IN openDevoTypeSelector ');
    setPage('home');
    setDevoSelectorVisible(true);
  }

  const navigateToDevotions = () => {
    console.log('navigateToDevotions Click');
    setSelected('');
    setSubmitDevoButtonDisabled(true);
    setPage('devotion');
  }

  const navigateToPrayerList = () => {
    console.log('navigateToPrayerList click', );
    setPage('prayerList');
  }

  const navigateHome = () => {
    console.log('navigateHome click', );
    setMenuModalVisible(false);
    setSubmitDevoButtonDisabled(true);
    setSelected('');
    setDevoSelectorVisible(false);
    setPage('home');
  }

  const openMenu = () => {
    console.log('openMenu click', );
    setPage('navigation');
    setMenuModalVisible(true);
  }

  const navigateHistory = () => {
    console.log('navigateHistory click', );
    setPage('navigateHistory');
  }

  const navigateAbout = () => {
    console.log('navigateAbout click', );
    setPage('about');
  }

  const setDevoType = () => {
    console.log('setDevoType click', selected);
    setSubmitDevoButtonDisabled(false);
  }

  const getDevo = () => {
    // this will initiate the callout to get a new devo based on the "selected" devot type
    console.log('getDevo click', selected);
    // setSubmitDevoButtonDisabled(true);
    setPage('devotion');
  }

  const devoSelectorModalclose = () => {
    console.log('devoSelectorModalclose click');
    setSubmitDevoButtonDisabled(true);
    setSelected('');
    // setDevoType('');
    setDevoSelectorVisible(false);
  }

  
  
  if(page === 'home'){
    return (
      
      <ScrollView style={styles.scrollView}>
        <View style={[styles.homeHeaderIcons]}>
          {/* <Pressable onPress={() => navigateHome()} >
              <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
          </Pressable> */}
          <Pressable onPress={() => openMenu()} >
              {/* <MaterialIcons style={[styles.homeMenuIcon]} name="home" size={30} color="black" /> */}
              <MaterialIcons style={[styles.homeMenuIcon]} name="menu" size={0} color="black" />
          </Pressable>
        </View>
        <Pressable onPress={() => navigateHome()}>
          <Image
            style={styles.tinyLogo}
            source={logo}
          />
        </Pressable>
        
        {/* if(page === 'home'){
          <Text>home</Text>
        } */}
        
        <View style={styles.homeContentView}>
          <Text >
            <Text style={styles.homeText}>
              And this is eternal life, that they know You, the only true God, and Jesus Christ whom you have sent. John 17:3
            </Text>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            <Text style={styles.homeText2}>
                Devos4Me is designed with you in mind. God desires you to know Him personally. May each day's devotional be a time where God meets you where you are, as you walk this life together
            </Text>
          
          </Text>
          
        </View>
        
        {/* <Text style={styles.homeText}>
          <Text >
            And this is eternal life, that they know You, the only true God, and Jesus Christ whom you have sent. John 17:3
          </Text>
          {'\n'}
          {'\n'}
          <Text style={styles.homeText2}>
              Devos4Me is designed with you in mind. God desires to "know you" personally. May each day's devotional be a time where God meets you where you are, as you walk this life together
          </Text>
        
        </Text> */}
        <View style={styles.homeButtonContainer}>
          <Pressable style={styles.myDailyDevotionPressable} onPress={() => openDevoTypeSelector()}>
            <Text style={styles.myDailyDevotionPressableText}>My Daily Devotion</Text>
          </Pressable>
          <Pressable style={styles.myPrayerListPressable} onPress={() => navigateToPrayerList()}>
            <Text style={styles.myPrayerListPressableText}>My Prayer List</Text>
          </Pressable>
        </View>
        
        {/* <View style={styles.prayerTypeModalView}> */}
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={devoSelectorVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setDevoSelectorVisible(!devoSelectorVisible);
                }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>How can you be encouraged today?</Text>
                  <SafeAreaView style={styles.container}>
                    <SelectList 
                        setSelected={(val) => setSelected(val)} 
                        onSelect={() => setDevoType()}
                        boxStyles={{width:250}}
                        data={data} 
                        save="value"
                    />
                  </SafeAreaView>
                  <Pressable
                    style={[styles.circleButtonDetailCloseModal]}
                    onPress={() => devoSelectorModalclose()}>
                    <MaterialIcons name="close" size={25} color="white" />
                  </Pressable>

                    {submitDevoButtonDisabled ?
                      ''
                      : 
                      <Pressable
                        style={[styles.circleSubmitNewRequest]}
                        onPress={() => getDevo()}
                        disabled={submitDevoButtonDisabled}
                      >
                      <MaterialIcons name="send" size={30} color="#EAD7BB" />
                    </Pressable>}
                  
                </View>
              </View>
            </Modal>
          </View>
          {/* </View> */}
        {/* <HeaderComp></HeaderComp> */}
        
        {/* <NewPrayerRequest></NewPrayerRequest> */}
      
      </ScrollView>
  
    );
  
  }
  else if(page === 'devotion'){
    return (
      <View style={styles.scrollView}>
        <View style={[styles.homeHeaderIcons]}>
          <Pressable onPress={() => navigateHome()} >
              <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
              {/* <MaterialIcons style={[styles.homeMenu]} name="menu" size={0} color="black" /> */}
          </Pressable>
          <Pressable onPress={() => openMenu()} >
              {/* <MaterialIcons style={[styles.homeMenuIcon]} name="home" size={30} color="black" /> */}
              <MaterialIcons style={[styles.homeMenuIcon]} name="menu" size={0} color="black" />
          </Pressable>
        </View>
        <View style={styles.prayerListHeader}>
          <Pressable onPress={() => navigateHome()}>
            <Image
              style={styles.tinyLogoDevotions}
              source={logo}
            />
          </Pressable>
          <Text style={[styles.myPrayerClosetText]}>My Daily Bread</Text>
          {/* <Pressable onPress={() => openMenu()}>
              <MaterialIcons style={[styles.myDailyBreadMenu]} name="menu" size={0} color="black" />
          </Pressable> */}
        </View>
        
        {/* <Text>Devotion Page</Text> */}
        <PersonalDevotionPage selected={selected}></PersonalDevotionPage>
      </View>
    );
  }
  else if(page === 'prayerList'){
    return (
      <View style={styles.scrollView}>
        <View style={[styles.homeHeaderIcons]}>
          <Pressable onPress={() => navigateHome()} >
              <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
              {/* <MaterialIcons style={[styles.homeMenu]} name="menu" size={0} color="black" /> */}
          </Pressable>
          <Pressable onPress={() => openMenu()} >
              {/* <MaterialIcons style={[styles.homeMenuIcon]} name="home" size={30} color="black" /> */}
              <MaterialIcons style={[styles.homeMenuIcon]} name="menu" size={0} color="black" />
          </Pressable>
        </View>
        <View style={styles.prayerListHeader}>
          <Pressable onPress={() => navigateHome()}>
            <Image
              style={styles.tinyLogoPrayerList}
              source={logo}
            />
          </Pressable>
          <Text style={[styles.myPrayerClosetText]}>My Prayer Closet
            
          </Text>
          {/* <Pressable onPress={() => openMenu()}>
              <MaterialIcons style={[styles.myPrayerClosetMenu]} name="menu" size={0} color="black" />
          </Pressable> */}
          
        </View>
        
        <NewPrayerRequest></NewPrayerRequest> 
      </View>
    )
  }
  else if(page === 'navigation'){
    return (
      // <Modal
      //   animationType="slide"
      //   transparent={true}
      //   visible={menuModalVisible}
      //   onRequestClose={() => {
      //     Alert.alert('Modal has been closed.');
      //     setMenuModalVisible(!menuModalVisible);
      //   }}>
          // <View style={styles.scrollViewNavigation}>
          <View style={styles.scrollView}>
            <View style={[styles.homeHeaderIcons]}>
              <Pressable onPress={() => navigateHome()} >
                  <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
                  {/* <MaterialIcons style={[styles.homeMenu]} name="menu" size={0} color="black" /> */}
              </Pressable>
              {/* <Pressable onPress={() => openMenu()} >
                  <MaterialIcons style={[styles.homeMenuIcon]} name="menu" size={0} color="black" />
              </Pressable> */}
            </View>
            <View style={styles.prayerListHeader}>
              <Pressable onPress={() => navigateHome()}>
                <Image
                  style={styles.tinyLogoPrayerList}
                  source={logo}
                />
              </Pressable>
              <Text style={[styles.myNavigationMenuText]}>Navigation Menu
                
              </Text>
              {/* <Pressable onPress={() => navigateHome()}>
                  <MaterialIcons style={[styles.myPrayerClosetMenu]} name="home" size={0} color="black" />
              </Pressable> */}
            
            </View>
          
          
          <Pressable style={styles.myDailyDevotionPressableNavigation} onPress={() => navigateHome()}>
            <Text style={styles.myDailyDevotionPressableTextNavigation}>Home</Text>
          </Pressable>
          <Pressable style={styles.myDailyDevotionPressableNavigation} onPress={() => openDevoTypeSelector()}>
            <Text style={styles.myDailyDevotionPressableTextNavigation}>My Daily Devotion</Text>
          </Pressable>
          <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateToPrayerList()}>
            <Text style={styles.myPrayerListPressableTextNavigation}>My Prayer List</Text>
          </Pressable>
          <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateHistory()}>
            <Text style={styles.myPrayerListPressableTextNavigation}>My Prayer History</Text>
          </Pressable>
          <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateAbout()}>
            <Text style={styles.myPrayerListPressableTextNavigation}>About</Text>
          </Pressable>
          
          {/* <Pressable onPress={() => navigateHistory()}>
              <MaterialIcons style={[styles.myHistoryMenuNavigation]} name="home" size={40} color="black" />
          </Pressable> */}
        </View>
        
      
    )
  }
  else if(page === 'navigateHistory'){

    return(
      <View style={styles.scrollView}>
        <View style={[styles.homeHeaderIcons]}>
          <Pressable onPress={() => navigateHome()} >
              <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
              {/* <MaterialIcons style={[styles.homeMenu]} name="menu" size={0} color="black" /> */}
          </Pressable>
          <Pressable onPress={() => openMenu()} >
              {/* <MaterialIcons style={[styles.homeMenuIcon]} name="home" size={30} color="black" /> */}
              <MaterialIcons style={[styles.homeMenuIcon]} name="menu" size={0} color="black" />
          </Pressable>
        </View>
        <View style={styles.prayerListHeader}>
          <Pressable onPress={() => navigateHome()}>
            <Image
              style={styles.tinyLogoPrayerList}
              source={logo}
            />
          </Pressable>
          <Text style={[styles.myNavigationMenuText]}>Prayer History
            
          </Text>
          {/* <Pressable onPress={() => navigateHome()}>
              <MaterialIcons style={[styles.myPrayerClosetMenu]} name="home" size={0} color="black" />
          </Pressable> */}
        
        </View>
        <PrayerHistoryPage></PrayerHistoryPage>
      </View>
    )
  }

  else if(page === 'about'){

    return(
      <View style={styles.scrollView}>
        <View style={[styles.homeHeaderIcons]}>
          <Pressable onPress={() => navigateHome()} >
              <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
              {/* <MaterialIcons style={[styles.homeMenu]} name="menu" size={0} color="black" /> */}
          </Pressable>
          <Pressable onPress={() => openMenu()} >
              {/* <MaterialIcons style={[styles.homeMenuIcon]} name="home" size={30} color="black" /> */}
              <MaterialIcons style={[styles.homeMenuIcon]} name="menu" size={0} color="black" />
          </Pressable>
        </View>
        
        <View style={styles.prayerListHeader}>
          <Pressable onPress={() => navigateHome()}>
            <Image
              style={styles.tinyLogoPrayerList}
              source={logo}
            />
          </Pressable>
          <Text style={[styles.myNavigationMenuText]}>About
            
          </Text>
          {/* <Pressable onPress={() => navigateHome()}>
              <MaterialIcons style={[styles.myPrayerClosetMenu]} name="home" size={0} color="black" />
          </Pressable> */}
        
        </View>
        <AboutPage></AboutPage>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
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
  circleButtonDetailCloseModal: {
    width:40,
    height: 40,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
    position: 'absolute',
    right:-20,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: '90%',
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
    marginTop: 15,
    textAlign: 'center',
    fontSize: 20,
    color:'#113946'
  },

  myDailyDevotionPressableNavigation:{
    width: '100%',
    // borderRadius: 10,
    backgroundColor: '#113946',
    padding: 20,
    elevation: 2,
    // width:'45%',
    // marginEnd: '10%',
    marginBottom:10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  myDailyDevotionPressableTextNavigation:{
    color: '#EAD7BB',
    backgroundColor: '#113946',
    textAlign: 'center',
    fontSize: 30,
  },
  myPrayerListPressableNavigation:{
    width: '100%',
    // borderRadius: 10,
    backgroundColor: '#113946',
    padding: 20,
    elevation: 2,
    marginBottom:10,
    // width:'45%',
    // marginEnd: '10%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    
  },
  myPrayerListPressableTextNavigation:{
    color: '#EAD7BB',
    backgroundColor: '#113946',
    textAlign: 'center',
    fontSize: 30,
  },
  scrollView: {
    flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#BCA37F',
  },
  scrollViewNavigation:{
    margin: 0,
    height:'100%',
    width: '100%',
    // marginLeft: '50%',
    backgroundColor: '#BCA37F',
    // borderRadius: 20,
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
  container: {
    paddingTop: 50,
    paddingLeft: 50,
  },
  tinyLogo: {
    width: 400,
    height: 170,
    marginTop: 15,
    marginLeft: 5,
    // position: 'absolute'
  },
  tinyLogoDevotions: {
    width: 120,
    height: 50,
    marginTop: 15,
    marginLeft: 5,
    // position: 'absolute'
  },
  tinyLogoPrayerList: {
    width: 120,
    height: 50,
    marginTop: 15,
    marginLeft: 5,
    // position: 'absolute'
  },
  logo: {
    width: 66,
    height: 58,
  },
  homeText: {
    fontSize:17,
    fontStyle:'italic',
    color: '#C56E33',
    margin: 20,
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
    elevation: 10,
  },
  homeText2: {
    fontSize:17,
    fontStyle:'italic',
    color: '#113946',
    margin: 20,
    backgroundColor: '#BCA37F',
    borderRadius: 20,
    padding: 35,
    marginTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  myDailyDevotionPressable: {
    borderRadius: 10,
    backgroundColor: '#113946',
    padding: 20,
    elevation: 2,
    width:'45%',
    marginEnd: '10%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 10,
    // elevation: 5,
  },
  myPrayerListPressable: {
    borderRadius: 10,
    backgroundColor: '#113946',
    width:'45%',
    padding: 20,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  myDailyDevotionPressableText: {
    color: '#EAD7BB',
    backgroundColor: '#113946',
    textAlign: 'center',
    fontSize: 15,
    
  },
  myPrayerListPressableText: {
    color: '#EAD7BB',
    backgroundColor: '#113946',
    textAlign: 'center',
    fontSize: 15,
  },
  homeButtonContainer: {
    flex: 1,
    paddingTop: 1,
    display: 'inline',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  homeContentView: {
    fontSize:25,
    fontStyle:'italic',
    color: '#113946',
    margin: 5,
    marginTop: 25,
    borderStyle: 'solid',
    borderColor: '#113946',
    borderWidth:4,
    backgroundColor: '#BCA37F',
    borderRadius: 0,
    padding: 35,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 10,
  },
  myPrayerClosetText:{
    fontSize:30,
    textAlign:'right',
    marginLeft:10,
    marginRight:10,
    color: '#C56E33',
    paddingTop: 20,
  },
  myNavigationMenuText:{
    fontSize:30,
    textAlign:'right',
    marginLeft:10,
    marginRight:10,
    color: '#C56E33',
    paddingTop: 20,
    marginBottom: 40
  },
  myPrayerClosetMenu:{
    fontSize:35,
    // textAlign:'right',
    // marginLeft:20,
    color: '#113946',
    position: 'absolute',
    top:25,
    right: -30
  },
  myDailyBreadMenu:{
    fontSize:35,
    // textAlign:'right',
    // marginLeft:20,
    color: '#113946',
    position: 'absolute',
    top:25,
    right: -50,
  },
  prayerListHeader:{
    // flex: 1,
    // paddingTop: 15,
    display: 'inline',
    flexDirection: 'row',
    // alignItems: 'center',
    // margin: 20,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 10,
  },
  item: {
    backgroundColor: '#EAD7BB',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  homeHeaderIcons:{
    // display: 'inline',
    backgroundColor: '#113946',
    // flexDirection:'row',
    height: 50,
    padding:5,
    width:'100%'
  },
  homeIcon: {
    fontSize: 40,
    backgroundColor: '#113946',
    color: '#BCA37F',
    textAlign:'right',
    position: 'absolute',
    left: 1,
    top:1
    // marginLeft:'50%',
  },
  homeMenuIcon:{
    fontSize: 40,
    backgroundColor: '#113946',
    color: '#BCA37F',
    position: 'absolute',
    right: 1,
    top:1
    // float:'right'
    // textAlign:'right',
    // position: 'absolute',
    // right: 5,
    // top:5
    // marginRight:'75%',
    // padding:10
    // marginBottom:-10
  }
});



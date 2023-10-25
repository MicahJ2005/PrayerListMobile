// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, Text, Image, ScrollView, TextInput, Pressable, StyleSheet} from 'react-native';
import PrayerList from './components/prayerList';
import HeaderComp from './components/headerComp';
import NewPrayerRequest from './components/newPrayerRequest';
import PersonalDevotionPage from './components/personalDevotionPage';
import { useCallback } from 'react';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './assets/logo-no-background.png';
import { useFonts } from 'expo-font';
// import anticSlabRegular from './assets/fonts/anticSlabRegular.ttf';


export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    console.log('page: ', page);
  })

  const navigateToDevotions = () => {
    console.log('navigateToDevotions Click');
    setPage('devotion');
  }

  const navigateToPrayerList = () => {
    console.log('navigateToPrayerList click', );
    setPage('prayerList');
  }

  const navigateHome = () => {
    console.log('navigateHome click', );
    setPage('home');
  }

  
  if(page === 'home'){
    return (
      <ScrollView style={styles.scrollView}>
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
                Devos4Me is designed with you in mind. God desires to "know you" personally. May each day's devotional be a time where God meets you where you are, as you walk this life together
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
          <Pressable style={styles.myDailyDevotionPressable} onPress={() => navigateToDevotions()}>
            <Text style={styles.myDailyDevotionPressableText}>My Daily Devotion</Text>
          </Pressable>
          <Pressable style={styles.myPrayerListPressable} onPress={() => navigateToPrayerList()}>
            <Text style={styles.myPrayerListPressableText}>My Prayer List</Text>
          </Pressable>
        </View>
        
        
        {/* <HeaderComp></HeaderComp> */}
        
        {/* <NewPrayerRequest></NewPrayerRequest> */}
      
      </ScrollView>
  
    );
  
  }
  else if(page === 'devotion'){
    return (
      <View style={styles.scrollView}>
        <View style={styles.prayerListHeader}>
          <Pressable onPress={() => navigateHome()}>
            <Image
              style={styles.tinyLogoDevotions}
              source={logo}
            />
          </Pressable>
          <Text style={[styles.myPrayerClosetText]}>My Daily Bread</Text>
        </View>
        {/* <Text>Devotion Page</Text> */}
        <PersonalDevotionPage></PersonalDevotionPage>
      </View>
    );
  }
  else if(page === 'prayerList'){
    return (
      <View style={styles.scrollView}>
        <View style={styles.prayerListHeader}>
          <Pressable onPress={() => navigateHome()}>
            <Image
              style={styles.tinyLogoPrayerList}
              source={logo}
            />
          </Pressable>
          <Text style={[styles.myPrayerClosetText]}>My Prayer Closet</Text>
        </View>
        
        <NewPrayerRequest></NewPrayerRequest> 
      </View>
    )
  }
  
  
  
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#BCA37F',
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
    paddingTop: 15,
    display: 'inline',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
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
    marginLeft:20,
    color: '#C56E33',
    paddingTop: 20,
  },
  prayerListHeader:{
    // flex: 1,
    // paddingTop: 15,
    display: 'inline',
    flexDirection: 'row',
    // alignItems: 'center',
    // margin: 20,
  }
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  // item: {
  //   // padding: 10,
  //   fontSize: 50,
  //   height: 80,
  //   textAlign: 'left',
  // },
  // buttonDelete: {
  //   borderRadius: 60,
  //   padding: 10,
  //   elevation: 2,
  //   backgroundColor: '#EAD7BB',
  // },
});



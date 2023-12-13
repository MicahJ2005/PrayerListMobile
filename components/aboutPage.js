import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const AboutPage = (devoTypeselected) => {
    console.log(devoTypeselected)
    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.homeContentView}>
            {/* <Text>Welcome {runningUser[0].firstname} </Text> */}
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
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              <Text style={styles.homeText2}>
                  Devos4Me offers Daily Personal and Family Devotional options based on a topic you select. 
              </Text>
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              <Text style={styles.homeText2}>
                  Additionally, Devos4Me offers a robust prayer request platform where you can manage your own Prayer List, Start a public or private Prayer Group, and join another public or private Prayer Group.
              </Text>
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              <Text style={styles.homeText2}>
                  Our prayer is that this tool helps you grow in your walk with Christ as you enjoy daily devotions and praying for others.  
              </Text>
            </Text>
            {/* <Pressable style={styles.getAIDevoButton} onPress={() => getAIDevo()}>
              <Text>get devo</Text>
              
            </Pressable> */}
          
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  getAIDevoButton:{
    width:50,
    height: 50,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#113946',
    // position: 'absolute',
    // right:10,
    // bottom: 10,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredViewFamilyDevo:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: '80%',
  },
  centeredViewFamilyDevo2:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // height: '80%',
  },
  modalView: {
    width: '80%',
    height: '40%',
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
  modalViewFamilyDevo:{
    width: '80%',
    height: '60%',
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
    width: '90%',
    borderRadius: 42,
    backgroundColor: '#113946',
    padding: 20,
    elevation: 2,
    // width:'45%',
    marginLeft: '5%',
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
    fontSize: 25,
  },
  myPrayerListPressableNavigation:{
    width: '90%',
    borderRadius: 42,
    backgroundColor: '#113946',
    padding: 20,
    elevation: 2,
    marginBottom:10,
    // width:'45%',
    marginLeft: '5%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    
  },
  myPrayerListPressableTextNavigation:{
    color: '#EAD7BB',
    backgroundColor: '#113946',
    textAlign: 'center',
    fontSize: 25,
  },
  scrollView: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1,
    // marginTop: 30,
    backgroundColor: '#BCA37F',
  },
  scrollViewLogin: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    // marginTop: 30,
    backgroundColor: '#BCA37F',
  },
  scrollViewPrayerList:{
    // height: '96%',
    flex: 2,
    // marginTop: 30,
    backgroundColor: '#BCA37F',
  },
  scrollViewNavigation:{
    marginTop: 5,
    backgroundColor: '#BCA37F',
    height:'77%'
  },
  container: {
    // flex:1,
    // zIndex:1
    // height:'100%'
    // paddingTop: 50,
    // paddingLeft: 50,
  },
  tinyLogo: {
    width: 400,
    height: 170,
    marginTop: 15,
    marginLeft: 5,
    // position: 'absolute'
  },
  tinyLogoRegister: {
    width: 400,
    height: 170,
    marginTop: 55,
    marginLeft: 5,
    // position: 'absolute'
  },
  tinyLogo2: {
    width: 100,
    height: 40,
    marginTop: 2,
    marginLeft: '35%',
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
    // height: '130%'
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 10,
  },
  homeContentView2: {
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
    height: '50%'
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
  myNavigationMenuText2:{
    fontSize:22,
    textAlign:'right',
    marginLeft:15,
    // marginRight:10,
    color: '#C56E33',
    paddingTop: 25,
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
  // container: {
  //   flex: 1,
  //   paddingTop: StatusBar.currentHeight,
  //   marginHorizontal: 10,
  // },
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
  registerHeaderIcons:{
    // display: 'inline',
    backgroundColor: '#113946',
    // flexDirection:'row',
    height: 50,
    // padding:5,
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
  },
  devotionBodyLoadingView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#BCA37F',
  },
  loginPageLoginButtons:{
    display: 'inline',
    flexDirection: 'row',
    marginBottom:50,
  },
  registerPressable: {
    backgroundColor: '#113946',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    right:5,
    padding:10,
    bottom:-50,
    borderRadius:30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  registerPressableText: {
    color: '#BCA37F',
  },
  registerPressableText2: {
    color: '#C56E33',
    fontSize:25,
  },
  forgotPasswordPressable: {
    backgroundColor: '#113946',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    borderRadius:30,
    left:5,
    padding:10,
    bottom:-50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  forgotPasswordPressableText: {
    color: '#BCA37F'
  },
  forgotPasswordScreen:{
    // marginTop:30,
    backgroundColor:'#BCA37F',
    height:'100%',
    // marginBottom: 30,
  },
  forgotPasswordScreenScroll:{
    // marginTop:30,
    backgroundColor:'#BCA37F',
    height:'100%',
  },
  forgotPasswordScreenBody:{
    height:'100%',
  },
  forgotPasswordEmailText:{
    marginTop: 20,
    marginBottom: 20,
    textAlign:"center",
    color: '#C56E33',
    fontSize:15
  },
  setNewPasswordPressable:{
    marginLeft:'25%',
    height: '10%',
    width: '50%',
    marginTop:'5%',
    backgroundColor:'#113946',
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:60,
  },
  validateEmailPressable:{
    marginLeft:'25%',
    height: '15%',
    width: '50%',
    marginTop:'5%',
    backgroundColor:'#113946',
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:100,
  },
  validateEmailPressableText:{
    color: '#C56E33'
  },
  // registerPressable:{
  //   height: '10%',
  //   width: '10%',
  //   marginLeft: '10%',
  //   marginTop:'5%',
  //   marginBottom:60,
  //   backgroundColor:'#113946',
  //   borderRadius: 42,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  registerPressable2:{
    height: '10%',
    width: '80%',
    marginLeft: '10%',
    // marginTop:'5%',
    marginBottom:60,
    backgroundColor:'#113946',
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  registerScreenBody:{
    marginTop:'45%',
    marginBottom:10,
    height:'65%',
    // flex: 2
  },
  containerBody:{
    height:'100%',
    // flex: 3,
  },
  registerPageHeader:{
    // marginTop:30,
  }
});

// registerRootComponent(App);


export default AboutPage;
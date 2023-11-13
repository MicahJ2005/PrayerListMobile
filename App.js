import {View, Text, Image, ScrollView, Modal, Pressable, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import NewPrayerRequest from './components/newPrayerRequest';
import PersonalDevotionPage from './components/personalDevotionPage';
import PrayerHistoryPage from './components/prayerHistoryPage';
import AboutPage from './components/aboutPage';
import ResourcesPage from './components/resourcesPage';
import PrayerGroup from './components/prayerGroups';
import React, {useState, useEffect} from 'react';
import logo from './assets/logo-no-background.png';
import blackAndWhiteLogo from './assets/devos4me-high-resolution-logo-white-transparent.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import {BASE_URL_DEV} from '@env';
import axios from 'axios';
import {TextInput} from 'react-native';
// import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: 'JjMjNjAjCj2023!!!!' });
// const instance = axios.create({
//   baseURL: 'https://api.openai.com/v1/engines/chat/completions',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': ``
//   }
// });

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
  const [page, setPage] = useState('login');
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [devoSelectorVisible, setDevoSelectorVisible] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [submitDevoButtonDisabled, setSubmitDevoButtonDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [runningUser, setRunningUser] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    console.log('page: ', page);
    // console.log('APIKEY: ', API_KEY);
  })

  const openDevoTypeSelector = async () => {
    console.log('IN openDevoTypeSelector ');
    console.log('runningUser ', runningUser);
    setLoading(true);
    const response = await fetch(`${BASE_URL_DEV}/data/checktodaysdevo?userid=${runningUser[0].id}`)
    const jsonDevotion = await response.json();  
    console.log('jsonDevotion', jsonDevotion);
    console.log('jsonDevotion size', jsonDevotion.length);
    if(jsonDevotion.length > 0){
      setPage('devotion');
      setLoading(false);
      setDevoSelectorVisible(false);
    }
    else{
      setLoading(false);
      setPage('home');
      setDevoSelectorVisible(true);
    }
  }

  const openFamilyDevoTypeSelector = async () => {
    console.log('IN openFamilyDevoTypeSelector ');
    console.log('runningUser ', runningUser);
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

  const navigateToPrayerGroups = () => {
    console.log('navigateToPrayerGroups click', );
    setPage('prayerGroup');
  }

  const navigateHome = () => {
    console.log('navigateHome click', );
    setMenuModalVisible(false);
    setSubmitDevoButtonDisabled(true);
    setSelected('');
    setDevoSelectorVisible(false);
    setPage('home');
  }

  const openMenu = async () => {
    console.log('openMenu click', );
    //check if there is already a daily devo
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

  const navigateResources = () =>{
    console.log('navigateResources click');
    setPage('resources');
  }

  const signIn = async () =>{
    console.log('username ', username);
    console.log('password ', password);
    // fetch('http://10.0.0.13:3210/data/signIn')
    //     .then((resp) => resp.json())
    //     .then((json) => setUser(json))
    //     .catch((error) => console.error(error))
    //     .finally(() => setLoading(false));

    ////FOR TESTING
    setUsername('micahj2005@hotmail.com');
    setPassword('1234');
      
    let username = 'micahj2005@hotmail.com';
    let password = '1234';

    const response = await fetch(`${BASE_URL_DEV}/data/signIn?username=${username}&password=${password}`)
      .then(response => response.json())
      .then(json => {
        console.log('user response', json)
        setRunningUser(json);
        setPage('home');
      })
      .catch(error => {
        console.error(error);
      });
        
      // }
    }


  // const getAIDevo = async (message) => {
  //   try {
  //     const response = await instance.post('', {
  //       prompt: 'Write a short Bible based devotional about spiritual growth and format it as a JSON object with HTML markdown',
  //       max_tokens: 60
  //     });
  //     console.log('AI Response', response);
  //     // return response.data.choices[0].text;
  //   } catch (error) {
  //     console.error(error);
  //     return '';
  //   }
  // }
 
  // const getAIDevo = async () => {
  //   console.log('getAIDevo click');
    // fetch('http://10.0.0.13:3210/data/aiDevo')
    //       .then((resp) => resp.json())
    //       .then((json) => setData(json))
    //       .catch((error) => console.error(error))
    //       .finally(() => setLoading(false));
    // try {
    //   const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //     method: "POST",
    //     headers: {
    //       'Accept': 'application/json',
    //       "Content-type": "application/json",
    //       "Authorization": ""
    //     },
    //     body: JSON.stringify({
    //       model: "gpt-3.5-turbo",
    //       messages: [{"role": "user", "content": "Write a short Bible based devotional about spiritual growth and format it as a JSON object with the elements of a Title, Scripture, Devotional, Prayer and with HTML markdown embedded"}],
    //       max_tokens: 100,
    //       temperature: 0.7,
    //     }),
    //   // '{'+
    //   //   '"model": "gpt-3.5-turbo",'+
    //   //   '"messages": [{"role": "user", "content": "Write a short Bible based devotional about spiritual growth and format it as a JSON object with the elements of a Title, Scripture, Devotional, Prayer and with HTML markdown embedded"}],'+
    //   //   '"temperature": 0.7 '+
    //   // '}',
      
    //   })
    //   // .then(res => console.log(res.json().choices[0].text))
    //   const json = await response.json();  
    //   console.log("this is the result", json.choices[0].message.content)
    // } catch (error) {
    //   console.error("this is the result", error);
    // }
    // .then((json) => console.log('AI JSON choices',json.choices));
    

    // regular JSON returned
    // {"choices": [{"finish_reason": "stop", "index": 0, "message": [Object]}], "created": 1698958749, "id": "chatcmpl-8GZ4PcWFvSiZxo3cGj8RJ0eMMdHdC", "model": "gpt-3.5-turbo-0613", "object": "chat.completion", "usage": {"completion_tokens": 544, "prompt_tokens": 27, "total_tokens": 571}}

    // json.choices response 
    // rsponseChoice = '{"choices": [{"finish_reason": "stop", "index": 0, "message": {"content": "{'+
    //     '\"Title\": \"Growing in the Spirit\",'+
    //     '\"Scripture\": \"But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be the glory both now and to the day of eternity. Amen.\" (2 Peter 3:18),'+
    //     '\"Devotional\": \"As followers of Christ, our journey does not end with salvation. Rather, it is just the beginning of a beautiful process of spiritual growth. Just as a seed planted in the ground requires nurturing, watering, and sunlight to grow, our faith also needs intentional care and attention in order to flourish. God desires for us to continually grow in our understanding of His grace and the knowledge of His Son, Jesus Christ. \\n\\nSpiritual growth involves a commitment to daily seek God and His Word, to develop a deeper relationship with Him through prayer, and to allow the Holy Spirit to transform us from the inside out. It requires surrendering our desires and aligning ourselves with God\'s will. It means consistently choosing to love and serve others, developing the fruit of the Spirit in our lives.\\n\\nJust as physical growth takes time, spiritual growth is a lifelong process. It is not about striving for perfection but about allowing God to mold and shape us into His image. Let us be encouraged knowing that God is faithful to complete the work He began in us (Philippians 1:6). He is the one who provides the necessary nourishment for our souls, helping us to grow in faith, love, and wisdom.\\n\\nToday, let us commit to intentionally invest in our spiritual growth. Let us hunger for more of God and His presence. May we continually seek His guidance, trusting that as we grow spiritually, we will bear much fruit for His glory.\",'+
    //     '\"Prayer\": \"Heavenly Father, thank you for the gift of salvation and for the opportunity to grow in faith. Help us to prioritize our spiritual growth and to daily seek you with all our hearts. Guide us in your ways, and help us to surrender our lives to your will. We invite your Holy Spirit to transform us and to mold us into the image of your Son, Jesus Christ. May our lives bear much fruit for your glory. In Jesus\' name, Amen.\"'+
    //   '}", "role": "assistant"}}], "created": 1698958749, "id": "chatcmpl-8GZ4PcWFvSiZxo3cGj8RJ0eMMdHdC", "model": "gpt-3.5-turbo-0613", "object": "chat.completion", "usage": {"completion_tokens": 544, "prompt_tokens": 27, "total_tokens": 571}}'

    //   let rsponseChoiceTrim = JSON.stringify(rsponseChoice);
    //   console.log(rsponseChoiceTrim);
    // }
    // async function main() {
    //   const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: "You are a helpful assistant." }],
    //     model: "gpt-3.5-turbo",
    //   });
    
    //   console.log('AI Completion choices', completion.choices[0]);
    // }
    
    // main();
  
  // }
  if(loading){
    return(
    
        <View style={[styles.devotionBodyLoadingView]}>
            <ActivityIndicator size="large" color="#C56E33" />
            
            <Text >
                {'\n'}
                {'\n'}
                Checking your personal devotion...
            </Text>
        </View>
        
    );
}
else{
  
  if(page === 'login'){
      return (
        
        <ScrollView style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            
          </View>
          <Pressable >
            <Image
              style={styles.tinyLogo}
              source={logo}
            />
          </Pressable>
          
          <View style={styles.homeContentView}>
          <Text style={styles.nameInputText}>User Email</Text>
              <TextInput
                  style={{
                      borderColor: '#113946',
                      borderWidth: 4,
                      borderRadius: 30,
                      width:'95%',
                      height: '15%',
                      marginBottom: 40,
                  }}
                  onChangeText={newUsernameText => setUsername(newUsernameText)}
                  placeholder="    Email"
              />
              <Text style={styles.requestInputText}>Password</Text>
              <TextInput
                  style={{
                      // height: 100,
                      borderColor: '#113946',
                      borderWidth: 4,
                      borderRadius: 30,
                      width:'95%',
                      height: '15%',
                      marginBottom: 40,
                      
                  }}
                  onChangeText={newPasswordText => setPassword(newPasswordText)}
                  placeholder="    Password"
              />
              <Pressable style={styles.myPrayerListPressable} onPress={() => signIn()}>
              <Text style={styles.myPrayerListPressableText}>Login</Text>
            </Pressable>
            {/* <Pressable style={styles.myDailyDevotionPressable} onPress={() => openDevoTypeSelector()}>
              <Text style={styles.myDailyDevotionPressableText}>New User</Text>
            </Pressable>
            <Pressable style={styles.myDailyDevotionPressable} onPress={() => openDevoTypeSelector()}>
              <Text style={styles.myDailyDevotionPressableText}>Forgot Password</Text>
            </Pressable> */}
          </View>
            
            
        
        </ScrollView>
    
      );
    
    }
    else if(page === 'home'){
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
              <Text>logged in as {runningUser[0].firstname} with id {runningUser[0].id} </Text>
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
            {/* <Pressable style={styles.getAIDevoButton} onPress={() => getAIDevo()}>
              <Text>get devo</Text>
              
            </Pressable> */}
          
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
                    // Alert.alert('Modal has been closed.');
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
          <PersonalDevotionPage selected={selected} runningUser={runningUser}></PersonalDevotionPage>
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
          
          <NewPrayerRequest runningUser={runningUser}></NewPrayerRequest> 
        </View>
      )
    }
    else if(page === 'prayerGroup'){
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
            <Text style={[styles.myPrayerClosetText]}>My Prayer Groups
              
            </Text>
            {/* <Pressable onPress={() => openMenu()}>
                <MaterialIcons style={[styles.myPrayerClosetMenu]} name="menu" size={0} color="black" />
            </Pressable> */}
            
          </View>
          
          <PrayerGroup runningUser={runningUser}></PrayerGroup> 
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
            
            <ScrollView>
              <Pressable style={styles.myDailyDevotionPressableNavigation} onPress={() => navigateHome()}>
                <Text style={styles.myDailyDevotionPressableTextNavigation}>Home</Text>
              </Pressable>
              <Pressable style={styles.myDailyDevotionPressableNavigation} onPress={() => openDevoTypeSelector()}>
                <Text style={styles.myDailyDevotionPressableTextNavigation}>My Daily Devotion</Text>
              </Pressable>
              <Pressable style={styles.myDailyDevotionPressableNavigation} onPress={() => openFamilyDevoTypeSelector()}>
                <Text style={styles.myDailyDevotionPressableTextNavigation}>Family Devotion</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateToPrayerList()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>My Prayer List</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateToPrayerGroups()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>Prayer Groups</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateHistory()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>My Prayer History</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateResources()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>Resources</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateAbout()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>About</Text>
              </Pressable>
            </ScrollView>
            
            
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
          <PrayerHistoryPage runningUser={runningUser}></PrayerHistoryPage>
        </View>
      )
    }
    else if(page === 'resources'){
      return(
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
                {/* <MaterialIcons style={[styles.homeMenu]} name="menu" size={0} color="black" /> */}
            </Pressable>
            {/* <Image
              style={styles.tinyLogo2}
              source={blackAndWhiteLogo}
            /> */}
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
            <Text style={[styles.myNavigationMenuText]}>Resources
              
            </Text>
            {/* <Pressable onPress={() => navigateHome()}>
                <MaterialIcons style={[styles.myPrayerClosetMenu]} name="home" size={0} color="black" />
            </Pressable> */}
          
          </View>
          <ResourcesPage></ResourcesPage>
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
  },
  devotionBodyLoadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#BCA37F',
  }
});



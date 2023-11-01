import {View, Text, Image, ScrollView, Modal, Pressable, StyleSheet, SafeAreaView, SectionList, StatusBar} from 'react-native';
import NewPrayerRequest from './components/newPrayerRequest';
import PersonalDevotionPage from './components/personalDevotionPage';
import PrayerHistoryPage from './components/prayerHistoryPage';
import AboutPage from './components/aboutPage';
import ResourcesPage from './components/resourcesPage';
import React, {useState, useEffect} from 'react';
import logo from './assets/logo-no-background.png';
import blackAndWhiteLogo from './assets/devos4me-high-resolution-logo-white-transparent.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
// import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: 'JjMjNjAjCj2023!!!!' });
const instance = axios.create({
  baseURL: 'https://api.openai.com/v1/engines/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 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`
  }
});

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

  const navigateResources = () =>{
    console.log('navigateResources click');
    setPage('resources');
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
  const getAIDevo = () => {
    console.log('getAIDevo click');
    // fetch('http://10.0.0.13:3210/data/aiDevo')
    //       .then((resp) => resp.json())
    //       .then((json) => setData(json))
    //       .catch((error) => console.error(error))
    //       .finally(() => setLoading(false));
    // axios.create({
    //   baseURL: 'https://api.openai.com/v1/chat/completions',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${OPENAI_KEY}`
    //   }
    // fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   body: '{'+
    //     '"model": "gpt-3.5-turbo",'+
    //     '"messages": [{"role": "user", "content": "Write a short Bible based devotional about spiritual growth and format it as a JSON object with HTML markdown"}],'+
    //     '"temperature": 0.7 '+
    //   '}',
    //   headers: {
    //     "Content-type": "application/json",
    //     "Authorization": "Bearer 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"
    //   }
    // })
    // .then((response) => response.json())
    // .then((json) => console.log(json.choices));
    // }

    // json.choices response 
    // [{"finish_reason": "stop", "index": 0, "message": {"content": "{
    //   \"title\": \"Growing in the Spirit\",
    //   \"verse\": \"But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be the glory both now and to the day of eternity. Amen.\" (2 Peter 3:18 ESV),     
    //   \"content\": \"## Growing in the Spirit\\n\\nAs followers of Christ, our journey does not end with salvation. In fact, it is only the beginning. The Bible encourages us to continually grow in our spiritual lives, to deepen our relationship with God and to mature in our faith.\\n\\n### The Importance of Spiritual Growth\\n\\nJust as physical growth is essential for a healthy life, spiritual growth is crucial for a vibrant and fulfilling Christian walk. The apostle Peter reminds us in his letter that we should 'grow in the grace and knowledge of our Lord and Savior Jesus Christ' (2 Peter 3:18 ESV).\\n\\n### Nourishing our Souls\\n\\nTo grow spiritually, we must nourish our souls with the Word of God. Just as our physical bodies need regular sustenance to thrive, our spirits need daily feeding from the Scriptures. The Bible is not merely a book of rules or stories, but it is the living Word of God that has the power to transform our lives.\\n\\n### Cultivating a Prayerful Life\\n\\nPrayer is another vital component of spiritual growth. Through prayer, we communicate with our Heavenly Father, seeking His guidance, pouring out our hearts, and developing a deeper intimacy with Him. Prayer is not only about presenting our requests but also about listening to God's voice and aligning our hearts with His will.\\n\\n### Community and Accountability\\n\\nIn our journey of spiritual growth, we are not meant to go alone. God designed us for community, to support and encourage one another. Engaging in fellowship with other believers provides opportunities for learning, accountability, and mutual edification. Together, we can spur one another on to love and good deeds.\\n\\n### Embracing the Process\\n\\nSpiritual growth is a lifelong process. Just as a seed planted in the ground takes time to grow into a fruitful tree, our spiritual growth requires patience and perseverance. There will be seasons of pruning, challenges, and even failures along the way. However, we can trust that God is always at work in us, shaping us into His image.\\n\\n### Conclusion\\n\\nLet us commit ourselves to grow in the grace and knowledge of our Lord Jesus Christ. May we immerse ourselves in His Word, cultivate a prayerful life, engage in community, and embrace the process of spiritual growth. As we do so, we will experience a deeper intimacy with God, bear fruit in our lives, and bring glory to His name. Amen.\"
    // }", "role": "assistant"}}]
    
    // async function main() {
    //   const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: "You are a helpful assistant." }],
    //     model: "gpt-3.5-turbo",
    //   });
    
    //   console.log('AI Completion choices', completion.choices[0]);
    // }
    
    // main();
  // }

  
  
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
          <Pressable style={styles.getAIDevoButton} onPress={() => getAIDevo()}>
            <Text>get devo</Text>
          </Pressable>
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
          
          <ScrollView>
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
        <PrayerHistoryPage></PrayerHistoryPage>
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
  }
});



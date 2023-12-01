import {View, Alert, Text, Image, ScrollView, Modal, Pressable, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, TouchableHighlight, Button} from 'react-native';
import NewPrayerRequest from './components/newPrayerRequest';
import PersonalDevotionPage from './components/personalDevotionPage';
import FamilyDevotionPage from './components/familyDevotionPage';
import PrayerHistoryPage from './components/prayerHistoryPage';
import GroupPrayerHistoryPage from './components/groupPrayerHistoryPage';
import AboutPage from './components/aboutPage';
import ResourcesPage from './components/resourcesPage';
import PrayerGroup from './components/prayerGroups';
import JoinAPrayerGroup from './components/joinAPrayerGroupPage';
import React, {useState, useEffect} from 'react';
import logo from './assets/logo-no-background.png';
import blackAndWhiteLogo from './assets/devos4me-high-resolution-logo-white-transparent.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import {BASE_URL_DEV} from '@env';
import axios from 'axios';
import {TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [familyDevoSelectorVisible, setFamilyDevoSelectorVisible] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [submitDevoButtonDisabled, setSubmitDevoButtonDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [runningUser, setRunningUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [devotionTopicText, setDevotionTopicText] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressValidated, setEmailAddressValidated] = useState(false);
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [date, setDate] = useState('09-10-2021');

  ///FOR NEW ACCOUNTS
  const [registerEmailAddress, setRegisterEmailAddress] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerBirthdate, setRegisterBirthdate] = useState('09-10-2021');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerSecurityQuestion, setRegisterSecurityQuestion] = useState('');
  const [registerSecurityAnswer, setRegisterSecurityAnswer] = useState('');
  const [openCalendarBoolean, setOpenCalendarBoolean] = useState(false);
  

  // const [facialRecognitionAvailable, setFacialRecognitionAvailable] = React.useState(false);
  // const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
  // const [irisAvailable, setIrisAvailable] = React.useState(false);
  // // const [loading, setLoading] = React.useState(false);
  // const [result, setResult] = React.useState('');
  // const [biometrics, setBiometrics] = useState(false);
  // const [renderContent, setRenderContent] = useState();
  
  // const optionalConfigObject = {
  //   title: 'Authentication Required', // Android
  //   imageColor: '#e00606', // Android
  //   imageErrorColor: '#ff0000', // Android
  //   sensorDescription: 'Touch sensor', // Android
  //   sensorErrorDescription: 'Failed', // Android
  //   cancelText: 'Cancel', // Android
  //   fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  //   unifiedErrors: false, // use unified error messages (default false)
  //   passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  // };
  
  useEffect(() => {
    console.log('page: ', page);
    // (async () => {
    //   const compatible = await LocalAuthentication.hasHardwareAsync();
    //   console.log('compatible: ', compatible);
    //   //// BIOMETRICS AT https://instamobile.io/react-native-tutorials/react-native-biometrics-face-id-expo/
    //   setBiometrics(compatible);
    // })();
    // let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
    // let payload = epochTimeSeconds + 'some message'
    // rnBiometrics.createSignature({
    //   promptMessage: 'Sign in',
    //   payload: '123'
    // })
    // .then((resultObject) => {
    //   const { success, signature } = resultObject
    
    //   if (success) {
    //     console.log(success)
    //     // verifySignatureWithServer(signature, payload)
    //   }
    // })
  }, [])

  // const renderSecureContent = () => setRenderContent(true);

  // // const pressHandler = () => {
  //   const checkSupportedAuthentication = async () => {
  //     const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  //     if (types && types.length) {
  //       setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
  //       setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
  //       setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
  //     }
  //   };
  
  //   const authenticate = async () => {
  //     if (loading) {
  //       return;
  //     }
  
  //     setLoading(true);
  
  //     try {
  //       const results = await LocalAuthentication.authenticateAsync();
  //       console.log('results!!', results );
  //       if (results.success) {
  //         console.log('SUCCESS!!' );
  //         setResult('SUCCESS');
  //       } else if (results.error === 'unknown') {
  //         console.log('DISABLED!!' );
  //         setResult('DISABLED');
  //       } else if (
  //         results.error === 'user_cancel' ||
  //         results.error === 'system_cancel' ||
  //         results.error === 'app_cancel'
  //       ) {
  //         console.log('CANCELLED!!' );
  //         setResult('CANCELLED');
  //       }
  //     } catch (error) {
  //       console.log('ERROR!!' );
  //       setResult('ERROR');
  //     }
  
  //     setLoading(false);
  //   };
  
  //   // React.useEffect(() => {
  //   //   checkSupportedAuthentication();
  //   // }, []);
  
  //   let resultMessage;
  //   switch (result) {
  //     case 'CANCELLED':
  //       resultMessage = 'Authentication process has been cancelled';
  //       break;
  //     case 'DISABLED':
  //       resultMessage = 'Biometric authentication has been disabled';
  //       break;
  //     case 'ERROR':
  //       resultMessage = 'There was an error in authentication';
  //       break;
  //     case 'SUCCESS':
  //       resultMessage = 'Successfully authenticated';
  //       break;
  //     default:
  //       resultMessage = '';
  //       break;
  //   }
  
  //   let description;
  //   if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
  //     description = 'Authenticate with Face ID, touch ID or iris ID';
  //   } else if (facialRecognitionAvailable && fingerprintAvailable) {
  //     description = 'Authenticate with Face ID or touch ID';
  //   } else if (facialRecognitionAvailable && irisAvailable) {
  //     description = 'Authenticate with Face ID or iris ID';
  //   } else if (fingerprintAvailable && irisAvailable) {
  //     description = 'Authenticate with touch ID or iris ID';
  //   } else if (facialRecognitionAvailable) {
  //     description = 'Authenticate with Face ID';
  //   } else if (fingerprintAvailable) {
  //     description = 'Authenticate with touch ID ';
  //   } else if (irisAvailable) {
  //     description = 'Authenticate with iris ID';
  //   } else {
  //     description = 'No biometric authentication methods available';
  //   }
    // TouchID.authenticate('to demo this react-native component', optionalConfigObject)
    //   .then(success => {
    //     Alert.alert('Authenticated Successfully');
    //   })
    //   .catch(error => {
    //     Alert.alert('Authentication Failed');
    //   });
    // TouchID.isSupported().then((biometryType) => {
    //   console.log('biometryType', biometryType);
    //   if (biometryType === "FaceID") {
    //     TouchID.authenticate("")
    //       .then((success) => {
    //         navigation.replace("ProtectedScreen");
    //       })
    //       .catch((error) => {
    //         Alert.alert("Authentication Failed", error.message);
    //       });
    //   } else {
    //     TouchID.authenticate("")
    //       .then((success) => {
    //         navigation.replace("ProtectedScreen");
    //       })
    //       .catch((error) => {
    //         Alert.alert("Authentication Failed", error.message);
    //       });
    //   }
    // });
  // }

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
    console.log('IN openDevoTypeSelector ');
    console.log('runningUser ', runningUser);
    setLoading(true);
    const response = await fetch(`${BASE_URL_DEV}/data/checktodaysfamilydevo?userid=${runningUser[0].id}`)
    const jsonDevotion = await response.json();  
    console.log('jsonDevotion', jsonDevotion);
    console.log('jsonDevotion size', jsonDevotion.length);
    if(jsonDevotion.length > 0){
      setPage('familyDevotions');
      setLoading(false);
      setFamilyDevoSelectorVisible(false);
    }
    else{
      setLoading(false);
      setPage('home');
      setFamilyDevoSelectorVisible(true);
    }
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

  const navigateToJoinPrayerGroups = () => {
    console.log('navigateToPrayerGroups click', );
    setPage('joinPrayerGroup');
  }
  

  const navigateHome = () => {
    console.log('navigateHome click', );
    setMenuModalVisible(false);
    setSubmitDevoButtonDisabled(true);
    setSelected('');
    setDevoSelectorVisible(false);
    setFamilyDevoSelectorVisible(false);
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

  const navigateGroupHistory = () => {
    console.log('navigateGroupHistory click', );
    setPage('navigateGroupHistory');
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
    console.log('getDevo click devotionTopicText', devotionTopicText);
    // devotionTopicText
    // setSubmitDevoButtonDisabled(true);
    setPage('devotion');
  }

  const getFamilyDevo = () => {
    // this will initiate the callout to get a new devo based on the "selected" devot type
    console.log('getFamilyDevo click', selected);
    console.log('getFamilyDevo click devotionTopicText', devotionTopicText);
    // devotionTopicText
    // setSubmitDevoButtonDisabled(true);
    setPage('familyDevotions');
  }

  const devoSelectorModalclose = () => {
    console.log('devoSelectorModalclose click');
    setSubmitDevoButtonDisabled(true);
    setSelected('');
    // setDevoType('');
    setDevoSelectorVisible(false);
  }

  const familyDevoSelectorModalclose = () => {
    console.log('devoSelectorModalclose click');
    setSubmitDevoButtonDisabled(true);
    setSelected('');
    // setDevoType('');
    setFamilyDevoSelectorVisible(false);
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
    setUsername(username);
    setPassword(password);
      
    // let username = 'micahj2005@hotmail.com';
    // let password = '1234';

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
    }

    const logout = () => {
      setUsername('');
      setPassword('');
      setPage('login');
      setEmailAddressValidated(false);
      setEmailAddress('')
      setOpenCalendarBoolean(false);
      setRegisterBirthdate('');
    }

    const forgotPassword = () => {
      console.log('In forgotPassword');
      setPage('forgotPassword');
    }

    const register = () => {
      console.log('In register');
      setPage('register');
    }

    const validateEmail = async () => {
      console.log('IN Validate Email Click')
      console.log('IN Validate Email address', emailAddress);
      const response = await fetch(`${BASE_URL_DEV}/data/validateemail?username=${emailAddress}`)
      .then(response => response.json())
      .then(json => {
        console.log('user response', json[0].count);
        if(json[0].count > 0){
          setEmailAddressValidated(true);
        }
        else{
          setEmailAddressValidated(false);
          Alert.alert('Your email is not tied to a registered user. Please register as a new user!');
        }
      })
      .catch(error => {
        console.error(error);
      });
    }

  const setNewPassword = async () => {
    console.log('In setNewPassword');
    console.log('In password1', newPassword1);
    console.log('In password2', newPassword2);

    if(newPassword1 == newPassword2){
      console.log('Matching Passwords!');
      // const response = await fetch(`${BASE_URL_DEV}/data/setnewpassword?username=${emailAddress}&password=${newPassword1}`)
      // .then(response => response.json())
      // .then(json => {
      //   console.log('user response', json);
      //   // if(json[0].count > 0){
      //   //   setEmailAddressValidated(true);
      //   // }
      //   // else{
      //   //   setEmailAddressValidated(false);
      //   //   Alert.alert('Your email is not tied to a registered user. Please register as a new user!');
      //   // }
      // })
      // .catch(error => {
      //   console.error(error);
      // });
      await fetch(`${BASE_URL_DEV}/data/setnewpassword`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: emailAddress,
          password: newPassword1
        }),
      })
      .then((response) =>{
        console.log('response', response.json());
    //   loadData();
          Alert.alert('Password Successfully Changed!');
          logout();
    })
    }else{
      console.log(' Passwords Don\'t match!');
      Alert.alert('Passwords Don\'t Match!');
    }
  }

  const createNewAccount = async () => {
    console.log('register email', registerEmailAddress);
    console.log('register Fname', registerFirstName);
    console.log('register Lname', registerLastName);
    console.log('register BDay', registerBirthdate);
    console.log('register Phone', registerPhone);
    console.log('register PW', registerPassword);
    console.log('register Security Q', registerSecurityQuestion);
    console.log('register Security A', registerSecurityAnswer);
    const response = await fetch(`${BASE_URL_DEV}/data/validateemail?username=${registerEmailAddress}`)
      .then(response => response.json())
      .then(json => {
        console.log('user response', json[0].count);
        if(json[0].count > 0){
          // setEmailAddressValidated(true);
          Alert.alert('This email address is already registered!');
        }
        else{
          fetch(`${BASE_URL_DEV}/data/createnewaccount`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              registerEmailAddress: registerEmailAddress,
              registerFirstName: registerFirstName,
              registerLastName: registerLastName,
              registerBirthdate: registerBirthdate,
              registerPhone: registerPhone,
              registerPassword: registerPassword,
              registerSecurityQuestion: registerSecurityQuestion,
              registerSecurityAnswer: registerSecurityAnswer
            }),
          })
          .then((response) =>{
            console.log('response', response.json());
        //   loadData();
              Alert.alert('Your New Account is Ready!');
              logout();
        })
          
        }
      })
      .catch(error => {
        console.error(error);
      });

    
  // }else{
  //   console.log(' Passwords Don\'t match!');
  //   Alert.alert('Passwords Don\'t Match!');
  // }
  }

  const openCalendar = () => {
    console.log('openCalendar click');
    setOpenCalendarBoolean(true);
  }

  const setBirthdate = (event, date) => {
    console.log('setBirthdate event', event);
    console.log('setBirthdate Date', date);
    let newDate = new Date(date);
    console.log('Day', newDate.getDate());
    console.log('Month', newDate.getMonth());
    console.log('Year', newDate.getFullYear());
    let reformattedDate = newDate.getFullYear() +'-'+ newDate.getMonth() +'-'+ newDate.getDate();
    console.log('reformattedDate', reformattedDate);
    if(event.type == 'set'){
      setOpenCalendarBoolean(false);
      setRegisterBirthdate(reformattedDate);
    }
    else{
      console.log('type: ', event.type);
    }
    
  }
    // }
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
        
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            
          </View>
          <Pressable >
            <Image
              style={styles.tinyLogo}
              source={logo}
            />
          </Pressable>
          
          <View style={styles.homeContentView2}>
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
                  textAlign='center'
                  onChangeText={newUsernameText => setUsername(newUsernameText)}
                  placeholder="someone@blessings.com"
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
                  textAlign='center'
                  onChangeText={newPasswordText => setPassword(newPasswordText)}
                  placeholder="******"
              />
            {/* <View style={styles.container}>
              <Text>
                {biometrics
                  ? 'Your device is compatible with Biometrics'
                  : 'Face or Fingerprint scanner is available on this device'}
              </Text>
              {renderContent && <SecureFile />}
              <Button title='Display Content' onPress={renderSecureContent} />
            </View> */}
              <Pressable style={styles.myPrayerListPressable} onPress={() => signIn()}>
              <Text style={styles.myPrayerListPressableText}>Login</Text>
            </Pressable>
          </View>
          <View style={styles.loginPageLoginButtons}>
            <Pressable style={styles.forgotPasswordPressable} onPress={() => forgotPassword()}>
              <Text style={styles.forgotPasswordPressableText}>Forgot Password?</Text>
            </Pressable>
            <Pressable style={styles.registerPressable} onPress={() => register()}>
              <Text style={styles.registerPressableText}>New Account</Text>
            </Pressable>
          </View> 
        </View>
    
      );
    
    }
    else if(page === 'register'){
      return (
        <View style={[styles.registerPageHeader]}>
          <View style={[styles.registerHeaderIcons]}>
          <Pressable onPress={() => logout()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => logout()}>
              <Image
                style={styles.tinyLogoRegister}
                source={logo}
              />
            </Pressable>
          </View>
          <ScrollView style={[styles.registerScreenBody]}>
              
              <Text style={[styles.forgotPasswordEmailText]}>Please complete all information for your new account</Text>
              <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 10,
                          }}
                          textAlign='center'
                          onChangeText={newEmailText => setRegisterEmailAddress(newEmailText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="Email Address"
                      />
              <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 10,
                          }}
                          textAlign='center'
                          onChangeText={newFirstNameText => setRegisterFirstName(newFirstNameText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="First Name"
                      />

                      <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 10,
                          }}
                          textAlign='center'
                          onChangeText={newLastNameText => setRegisterLastName(newLastNameText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="Last Name"
                      />
                      
                      <Pressable style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 10,
                          }} onPress={() => openCalendar()}>
                        <Text style={{
                              textAlign:'center',
                              padding:10,
                              color:'grey'
                          }}>
                    
                          {registerBirthdate.toString() !== '' ?
                            
                            <Text>{registerBirthdate}</Text>
                            // ''
                            :
                            'Birthdate'
                          }
                            
                          </Text>
                      </Pressable>
                      
                      {/* <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 10,
                          }}
                          textAlign='center'
                          mode='date'
                          // onBlur
                          // onChangeText={newBirthdateText => setRegisterBirthdate(newBirthdateText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="Birthdate"
                      /> */}
                      {openCalendarBoolean ? 
                        <DateTimePicker
                          style={{
                            borderColor: '#113946',
                            borderWidth: 4,
                            borderRadius: 30,
                            width:'80%',
                            height: 50,
                            marginLeft:'10%',
                            marginBottom: 10,
                        }}
                          value={new Date('01-01-2000')}
                          mode='date'
                          placeholder="select date"
                        // format="DD/MM/YYYY"
                        // minDate="01-01-1900"
                        // maxDate="01-01-2000"
                        // confirmBtnText="Confirm"
                        // cancelBtnText="Cancel"
                        // customStyles={{
                        //   dateIcon: {
                        //     position: 'absolute',
                        //     right: -5,
                        //     top: 4,
                        //     marginLeft: 0,
                        //   },
                        //   dateInput: {
                        //     borderColor : "gray",
                        //     alignItems: "flex-start",
                        //     borderWidth: 0,
                        //     // borderBottomWidth: 1,
                        //   },
                        //   placeholderText: {
                        //     fontSize: 17,
                        //     color: "gray"
                        //   },
                        //   dateText: {
                        //     fontSize: 17,
                        //   }
                        // }}
                        onChange={(event, date) => {
                          setBirthdate(event, date);
                        }}
                      />
                      :
                      ''
                    }
                      {/* <DateTimePicker
                        style={{
                          borderColor: '#113946',
                          borderWidth: 4,
                          borderRadius: 30,
                          width:'80%',
                          height: 50,
                          marginLeft:'10%',
                          marginBottom: 10,
                      }}
                        value={new Date()}
                        mode="date"
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="01-01-1900"
                        maxDate="01-01-2000"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            right: -5,
                            top: 4,
                            marginLeft: 0,
                          },
                          dateInput: {
                            borderColor : "gray",
                            alignItems: "flex-start",
                            borderWidth: 0,
                            // borderBottomWidth: 1,
                          },
                          placeholderText: {
                            fontSize: 17,
                            color: "gray"
                          },
                          dateText: {
                            fontSize: 17,
                          }
                        }}
                        onDateChange={(date) => {
                          setRegisterBirthdate(date);
                        }}
                      /> */}
                      <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 10,
                          }}
                          textAlign='center'
                          keyboardType="number-pad"
                          onChangeText={newPhoneText => setRegisterPhone(newPhoneText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="Phone #"
                      />
                      <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 10,
                          }}
                          textAlign='center'
                          onChangeText={newPasswordText => setRegisterPassword(newPasswordText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="Password"
                      />
                      <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 10,
                          }}
                          textAlign='center'
                          onChangeText={newSecurityQuestionText => setRegisterSecurityQuestion(newSecurityQuestionText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="Security Question"
                      />
                      <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: 50,
                              marginLeft:'10%',
                              marginBottom: 30,
                          }}
                          textAlign='center'
                          onChangeText={newSecurityAnswerText => setRegisterSecurityAnswer(newSecurityAnswerText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="Security Answer"
                      />
              <Pressable style={[styles.registerPressable2]} onPress={() => createNewAccount()}>
                <Text style={[styles.registerPressableText2]}>Create Account</Text>
              </Pressable>
            </ScrollView>
      </View>
    
      );
    
    }
    else if(page === 'forgotPassword'){
      
      return (
        <View style={[styles.forgotPasswordScreen]}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => logout()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            </View>
            <Pressable onPress={() => logout()}>
              <Image
                style={styles.tinyLogo}
                source={logo}
              />
            </Pressable>
          <View>
          {!emailAddressValidated ? 
            <View style={[styles.forgotPasswordScreenBody]}>
              
              <Text style={[styles.forgotPasswordEmailText]}>Please enter the email address for your account</Text>
              <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: '7%',
                              marginLeft:'10%'
                              // marginBottom: 40,
                          }}
                          textAlign='center'
                          onChangeText={newUsernameText => setEmailAddress(newUsernameText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="someone@blessings.com"
                      />

              <Pressable style={[styles.validateEmailPressable]} onPress={() => validateEmail()}>
                <Text style={[styles.validateEmailPressableText]}>Validate Email</Text>
              </Pressable>
            </View>
            :
            <View style={[styles.forgotPasswordScreenBody]}>
              
              <Text style={[styles.forgotPasswordEmailText]}>Email {emailAddress} Validated!</Text>
              <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              width:'80%',
                              height: '7%',
                              marginLeft:'10%'
                              // marginBottom: 40,
                          }}
                          textAlign='center'
                          onChangeText={newUsernameText => setNewPassword1(newUsernameText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="New Password"
                      />
              <TextInput
                          style={{
                              borderColor: '#113946',
                              borderWidth: 4,
                              borderRadius: 30,
                              marginTop:10,
                              width:'80%',
                              height: '7%',
                              marginLeft:'10%'
                              // marginBottom: 40,
                          }}
                          textAlign='center'
                          onChangeText={newUsernameText => setNewPassword2(newUsernameText)}
                          // onEndEditing={() => setDevoType()}
                          placeholder="Confirm New Password"
                      />
              <Pressable style={[styles.validateEmailPressable]} onPress={() => setNewPassword()}>
                <Text style={[styles.validateEmailPressableText]}>Set New Password</Text>
              </Pressable>
            </View>
            }
        </View>
      </View>
    
      );
    
    }
    else if(page === 'home'){
      return (
        
        <ScrollView style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => openMenu()} >
                <MaterialIcons style={[styles.homeMenuIcon]} name="menu" size={0} color="black" />
            </Pressable>
          </View>
          <Pressable onPress={() => navigateHome()}>
            <Image
              style={styles.tinyLogo}
              source={logo}
            />
          </Pressable>
          
          <View style={styles.homeContentView}>
            <Text style={{fontSize:30, marginBottom:30, fontStyle:'italic', color:'#113946'}}>Welcome {runningUser[0].firstname} </Text>
            <Text >
              <Text style={styles.homeText}>
                And this is eternal life, that they know You, the only true God, and Jesus Christ whom you have sent. John 17:3
              </Text>
              {'\n'}
              {'\n'}
              {'\n'}
              <Text style={styles.homeText2}>
                {runningUser[0].firstname}, may God richly bless you as you grow in your walk with Him
              </Text>
              {'\n'}
            </Text>
          </View>
          <View style={styles.homeButtonContainer}>
            <Pressable style={styles.myDailyDevotionPressable} onPress={() => openDevoTypeSelector()}>
              <Text style={styles.myDailyDevotionPressableText}>My Daily Devotion</Text>
            </Pressable>
            <Pressable style={styles.myPrayerListPressable} onPress={() => navigateToPrayerList()}>
              <Text style={styles.myPrayerListPressableText}>My Prayer List</Text>
            </Pressable>
          </View>
          
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={devoSelectorVisible}
                  onRequestClose={() => {
                    setDevoSelectorVisible(!devoSelectorVisible);
                  }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>How can you be encouraged today?</Text>
                    <SafeAreaView style={styles.container}>
                      <TextInput
                        style={{
                            borderColor: '#113946',
                            borderWidth: 4,
                            borderRadius: 30,
                            width:250,
                            height: '55%',
                            // marginBottom: 40,
                        }}
                        textAlign='center'
                        onChangeText={newUsernameText => setDevotionTopicText(newUsernameText)}
                        onEndEditing={() => setDevoType()}
                        placeholder="Devotion Topic"
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

              {/* Family Devo Modal */}
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={familyDevoSelectorVisible}
                  onRequestClose={() => {
                    setFamilyDevoSelectorVisible(!familyDevoSelectorVisible);
                  }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>How can your family be encouraged today?</Text>
                    <SafeAreaView style={styles.container}>
                      <TextInput
                        style={{
                            borderColor: '#113946',
                            borderWidth: 4,
                            borderRadius: 30,
                            width:250,
                            height: '55%',
                            // marginBottom: 40,
                        }}
                        textAlign='center'
                        onChangeText={newUsernameText => setDevotionTopicText(newUsernameText)}
                        onEndEditing={() => setDevoType()}
                        placeholder="Family Devotion Topic"
                    />
                    </SafeAreaView>
                    <Pressable
                      style={[styles.circleButtonDetailCloseModal]}
                      onPress={() => familyDevoSelectorModalclose()}>
                      <MaterialIcons name="close" size={25} color="white" />
                    </Pressable>

                      {submitDevoButtonDisabled ?
                        ''
                        : 
                        <Pressable
                          style={[styles.circleSubmitNewRequest]}
                          onPress={() => getFamilyDevo()}
                          disabled={submitDevoButtonDisabled}
                        >
                        <MaterialIcons name="send" size={30} color="#EAD7BB" />
                      </Pressable>}
                    
                  </View>
                </View>
              </Modal>
            </View>
        
        </ScrollView>
    
      );
    
    }
    else if(page === 'devotion'){
      return (
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => openMenu()} >
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
          </View>
          <PersonalDevotionPage selected={selected} runningUser={runningUser} devotionTopicText={devotionTopicText}></PersonalDevotionPage>
        </View>
      );
    }
    else if(page === 'familyDevotions'){
      return (
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => openMenu()} >
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
            <Text style={[styles.myPrayerClosetText]}>Family Devotions</Text>
          </View>
          <FamilyDevotionPage selected={selected} runningUser={runningUser} devotionTopicText={devotionTopicText}></FamilyDevotionPage>
        </View>
      );
    }
    else if(page === 'prayerList'){
      return (
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => openMenu()} >
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
            
          </View>
          
          <NewPrayerRequest runningUser={runningUser}></NewPrayerRequest> 
        </View>
      )
    }
    
    else if(page === 'joinPrayerGroup'){
      return(
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => openMenu()} >
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
            <Text style={[styles.myPrayerClosetText]}>Join A Prayer Group
              
            </Text>
            
          </View>
          
          <JoinAPrayerGroup runningUser={runningUser}></JoinAPrayerGroup> 
        </View>
      )
      
    }
    else if(page === 'prayerGroup'){
      return (
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => openMenu()} >
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
            
          </View>
          
          <PrayerGroup runningUser={runningUser}></PrayerGroup> 
        </View>
      )
    }
    else if(page === 'navigation'){
      return (
            <View style={styles.scrollView}>
              <View style={[styles.homeHeaderIcons]}>
                <Pressable onPress={() => navigateHome()} >
                    <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
                </Pressable>
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
                <Text style={styles.myPrayerListPressableTextNavigation}>My Prayer Groups</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateToJoinPrayerGroups()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>Join A Prayer Group</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateHistory()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>My Answered Prayers</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateGroupHistory()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>Group Answered Prayers</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateResources()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>Resources</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => navigateAbout()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>About</Text>
              </Pressable>
              <Pressable style={styles.myPrayerListPressableNavigation} onPress={() => logout()}>
                <Text style={styles.myPrayerListPressableTextNavigation}>Logout</Text>
              </Pressable>
            </ScrollView>
          </View>
          
        
      )
    }
    else if(page === 'navigateHistory'){

      return(
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => openMenu()} >
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
            <Text style={[styles.myNavigationMenuText]}>Answered Prayers
              
            </Text>
          
          </View>
          <PrayerHistoryPage runningUser={runningUser}></PrayerHistoryPage>
        </View>
      )
    }
    else if(page === 'navigateGroupHistory'){

      return(
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => openMenu()} >
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
            <Text style={[styles.myNavigationMenuText2]}>Group Prayers Answered
              
            </Text>
          </View>
          <GroupPrayerHistoryPage runningUser={runningUser}></GroupPrayerHistoryPage>
        </View>
      )
    }
    else if(page === 'resources'){
      return(
        <View style={styles.scrollView}>
          <View style={[styles.homeHeaderIcons]}>
            <Pressable onPress={() => navigateHome()} >
                <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
            </Pressable>
            <Pressable onPress={() => openMenu()} >
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
          </View>
          <ResourcesPage></ResourcesPage>
        </View>
      )
      
      
    }

    else if(page === 'about'){

      return(
        <ScrollView style={styles.scrollView}>
            <View style={[styles.homeHeaderIcons]}>
              <Pressable onPress={() => navigateHome()} >
                  <MaterialIcons style={[styles.homeIcon]} name="home" size={30} color="black" />
              </Pressable>
              <Pressable onPress={() => openMenu()} >
                  <MaterialIcons style={[styles.homeMenuIcon]} name="menu" size={0} color="black" />
              </Pressable>
            </View>
          <Pressable onPress={() => navigateHome()}>
            <Image
              style={styles.tinyLogo}
              source={logo}
            />
          </Pressable>
          
          <View style={styles.homeContentView}>
            <Text >
              <Text style={styles.homeText2}>
                  Devos4Me is designed with you in mind. God desires you to know Him personally. May each day's devotional be a time where God meets you where you are, as you walk this life together
              </Text>
            
            </Text>
          
          </View>
        
        </ScrollView>
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
    flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 30,
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
    height: '45%'
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
  },
  loginPageLoginButtons:{
    display: 'inline',
    flexDirection: 'row',
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
    marginTop:30,
    backgroundColor:'#BCA37F'
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
  validateEmailPressable:{
    marginLeft:'25%',
    height: '5%',
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
    marginTop:30,
  }
});



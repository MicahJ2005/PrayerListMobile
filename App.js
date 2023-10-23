// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, Text, Image, ScrollView, TextInput, Pressable, StyleSheet} from 'react-native';
import PrayerList from './components/prayerList';
import HeaderComp from './components/headerComp';
import NewPrayerRequest from './components/newPrayerRequest';
import { useCallback } from 'react';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function App() {
  const [onLoadText, setText] = useState("");
  // const onScreenLoad = () => {
  //       // setText(getText());
  //   }
    
  return (
    <ScrollView>
      <HeaderComp></HeaderComp>
      
      <NewPrayerRequest></NewPrayerRequest>
    
    </ScrollView>

  );
}



import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const AboutPage = (devoTypeselected) => {
    return(
        <View style={styles.homeContentView}>
            <Text>Welcome {runningUser[0].firstname} </Text>
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
            {/* <Pressable style={styles.getAIDevoButton} onPress={() => getAIDevo()}>
              <Text>get devo</Text>
              
            </Pressable> */}
          
          </View>
        
    )
}



export default AboutPage;
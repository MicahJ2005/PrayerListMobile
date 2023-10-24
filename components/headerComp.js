import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';


const headerComp = () => {
    return (
        <View style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center', marginTop: 100, backgroundColor: '#BCA37F'}}>
            <Text style={{fontSize: 50}}>My Prayer Closet</Text>
        </View>
    );
}

export default headerComp;
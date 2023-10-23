import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const headerComp = () => {
    return (
        <View style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center', marginTop: 100}}>
            <Text style={{fontSize: 50}}>Prayer App</Text>
            {/* <Text style={{marginTop: 50}}>Enter A Prayer Request</Text> */}
            {/* <StatusBar style="auto" /> */}
        </View>
    );
}

export default headerComp;
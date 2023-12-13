import React, {useCallback}  from 'react';
import {Alert, Button, Linking, StyleSheet, View, Text, ScrollView, Pressable} from 'react-native';

const BibleGatewayURL = 'https://www.biblegateway.com/';

const TheGospelCoalitionURL = 'https://www.thegospelcoalition.org/';

const TheBibleProjectURL = 'https://bibleproject.com/';

// const unsupportedURL = 'slack://open?team=123456';


const ResourcesPage = () => {
    return(
        <ScrollView>  
            {/* <Text>
            Resources Page
            </Text> */}
           
            <View style={styles.item} >
                <Pressable  onPress={() => Linking.openURL(BibleGatewayURL)}>
                    <Text style={styles.itemText} >Bible Gateway</Text>
                </Pressable>
            </View>
            <View style={styles.item} >
                <Pressable  onPress={() => Linking.openURL(TheGospelCoalitionURL)}>
                    <Text style={styles.itemText} >The Gospel Coalition</Text>
                </Pressable>
            </View>
            <View style={styles.item} >
                <Pressable  onPress={() => Linking.openURL(TheBibleProjectURL)}>
                    <Text style={styles.itemText} >Bible Project</Text>
                </Pressable>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 30,
        marginLeft: 30,
        fontSize: 30,
        height: 80,
        zIndex:-1,
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#113946',
        elevation: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 10,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
      },
      itemText:{
        color:'white',
        fontSize:30,
        textAlign:'center'
      }
  });

export default ResourcesPage;
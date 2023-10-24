import React from 'react';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import NewPrayerRequest from './newPrayerRequest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListBasics = (newdata) => {
  console.log('newRequest data PrayerList Component: ', newdata);

  return (
    <View style={styles.container}>
      {/* <NewPrayerRequest></NewPrayerRequest> */}
      {/* <Button
        title="Submit Prayer Request"
        onPress={() => DATA.push({key: newRequest})}
      /> */}

      <Text style={{fontSize: 30}}>Prayer List:</Text>
      <FlatList
        data={newdata.newdata}
        renderItem={({item}) => <Text style={styles.item} key={item.id}>{item.nama} 
          {/* <Pressable onPress={onPressFunction}>
            <Text>X</Text>
          </Pressable> */}
          {/* <Pressable >
            <Text>X</Text>
          </Pressable>
          <Pressable >
            <Text>+</Text>
          </Pressable>
          <Pressable >
            <Text>-</Text>
          </Pressable> */}
        </Text>
        }
      />
    </View>
  );
};

export default FlatListBasics;
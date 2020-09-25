import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";


import ListItem from '../../components/ListItem'

const Items = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused){
    fetch('http://192.168.1.113:8080/api/items')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }}, [isFocused]);


  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => { navigation.navigate("AddItems") }}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} /> Add Item
        </Text>
      </TouchableOpacity>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <ListItem item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Items;
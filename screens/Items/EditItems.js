import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";


const Items = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const onChangeName = value => setName(value);
  const onChangePrice = value => setDesc(value);
  const onChangeDescription = value => setPrice(value);
  const id = route.params.id;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetch('http://192.168.1.113:8080/api/items/' + id)
        .then((response) => response.json())
        .then((json) => json.forEach(item => {
          setName(item.name);
          setDesc(item.description);
          setPrice(item.price);
        }))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [isFocused]);

  const updateItem = (name, description, price) => {
    fetch('http://192.168.1.113:8080/api/items/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price
      })
    }).then(() => navigation.navigate("Items"))
    .catch((error) => console.error(error));
  };

  
  
  const deleteItem = () => { 
    fetch('http://192.168.1.113:8080/api/items/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => navigation.navigate("Items"))
    .catch((error) => console.error(error));
   };

  return (
    <View>

      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        onChangeText={onChangePrice}
        value={description}
      />
      <TextInput
        placeholder="Price"
        keyboardType='numeric'
        style={styles.input}
        onChangeText={onChangeDescription}
        value={price}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          updateItem(name, description, price);
        }}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} /> Save changes
            </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          deleteItem();
        }}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} /> Delete
            </Text>
      </TouchableOpacity>
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
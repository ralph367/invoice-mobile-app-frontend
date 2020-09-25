import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";


const Items = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [firstname, setFirstName] = useState('');
  const [secondname, setSecondName] = useState('');
  const onChangeFirstName = value => setFirstName(value);
  const onChangeSecondName = value => setSecondName(value);

  const [email, setEmail] = useState('');
  const onChangeEmail = value => setEmail(value);

  const id = route.params.id;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetch('http://192.168.1.113:8080/api/customers/' + id)
        .then((response) => response.json())
        .then((json) => json.forEach(customer => {
          setFirstName(customer.firstname);
          setSecondName(customer.secondname);
          setEmail(customer.address);
        }))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [isFocused]);

  const updateItem = (firstname, secondname) => {
    fetch('http://192.168.1.113:8080/api/customers/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: firstname,
        secondname: secondname
      })
    }).then(() => navigation.navigate("Customers"))
      .catch((error) => console.error(error));
  };



  const deleteItem = () => {
    fetch('http://192.168.1.113:8080/api/customers/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => navigation.navigate("Customers"))
      .catch((error) => console.error(error));
  };

  return (
    <View>

      <TextInput
        placeholder="First Name"
        style={styles.input}
        onChangeText={onChangeFirstName}
        value={firstname}
      />
      <TextInput
        placeholder="Second"
        style={styles.input}
        onChangeText={onChangeSecondName}
        value={secondname}
      />
      <TextInput
        placeholder="Email Address"
        style={styles.input}
        autoCompleteType='email'
        onChangeText={onChangeEmail}
        value={email}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          updateItem(firstname, secondname);
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
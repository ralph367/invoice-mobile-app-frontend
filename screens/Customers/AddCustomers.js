
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddCustomers = ({navigation}) => {
    const addCustomer = (firstname, secondname, email) => {
        fetch('http://192.168.1.113:8080/api/customers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstname: firstname,
            secondname: secondname, 
            email: email
          })
        }).then(() => navigation.navigate("Customers"))
        .catch((error) => console.error(error));
      };
      const [firstname, setFirstName] = useState('');
      const onChangeFirstName = value => setFirstName(value);
    
      const [secondname, setSecondName] = useState('');
      const onChangeSecondName = value => setSecondName(value);

      const [email, setEmail] = useState('');
      const onChangeEmail = value => setEmail(value);
      return (
        <View>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={firstname}
          />
          <TextInput
            placeholder="Last Name"
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
              addCustomer(firstname,secondname, email);
            }}>
            <Text style={styles.btnText}>
              <Icon name="plus" size={20} /> Add Customer
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

export default AddCustomers;
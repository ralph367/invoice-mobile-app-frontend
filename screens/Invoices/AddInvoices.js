
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const AddCustomers = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetch('http://192.168.1.113:8080/api/customers')
        .then((response) => response.json())
        .then((json) => setCustomers(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      fetch('http://192.168.1.113:8080/api/items')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [isFocused]);
  const addCustomer = (name, customerId, itemId) => {
    var x = []
    var price = 0
    itemId.forEach((id, key) => {let y={id: id}; x.push(y)} )
    data.forEach((item, key) => {
      if( itemId.includes(item.id)) 
        price += item.price
    })
    fetch('http://192.168.1.113:8080/api/invoices', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: firstname,
        CustomerId: customerId,
        itemId: x,
        price: price
      })
    }).then(() => navigation.navigate("Invoices"))
      .catch((error) => console.error(error));
  };
  const [firstname, setFirstName] = useState('');
  const onChangeFirstName = value => setFirstName(value);

  const [secondname, setSecondName] = useState('');
  const onChangeSecondName = value => setSecondName(value);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedItems, setSelectedValues] = useState([]);


  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Select Customer" value="" />
        {customers.map((customer, key) => (
          <Picker.Item label={customer.firstname} value={customer.id} key={key} />)
        )}
      </Picker>
      <SectionedMultiSelect
        items={data}
        uniqueKey="id"
        subKey="children"
        selectText="Choose items"
        onSelectedItemsChange={item => setSelectedValues(item)}
        selectedItems={selectedItems}
      />
      <TextInput
        placeholder="First Name"
        style={styles.input}
        onChangeText={onChangeFirstName}
        value={firstname}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addCustomer(firstname, selectedValue, selectedItems);
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
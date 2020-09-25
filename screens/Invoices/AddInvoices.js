
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
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedItems, setSelectedValues] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
2
  const [invoiceName, setInvoiceName] = useState('');
  const onChangeInvoiceName = value => setInvoiceName(value);

  const [note, setNote] = useState('');
  const onChangeNote = value => setNote(value);

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

  const addCustomer = (name, customerId, itemId, note) => {
    var x = []
    var price = 0
    itemId.forEach((id, key) => {let y={id: id}; x.push(y)} )
    data.forEach((item, key) => {
      if( itemId.includes(item.id)) 
        price += item.price
    })
    if( selectedCurrency == 'euro')
      price = price/1.16
    fetch('http://192.168.1.113:8080/api/invoices', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        CustomerId: customerId,
        itemId: x,
        price: price,
        description: note
      })
    }).then(() => navigation.navigate("Invoices"))
      .catch((error) => console.error(error));
  };

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
        placeholder="Invoice Name"
        style={styles.input}
        onChangeText={onChangeInvoiceName}
        value={invoiceName}
      />
      <TextInput
        placeholder="Description/Note"
        style={styles.input}
        onChangeText={onChangeNote}
        value={note}
      />
            <Picker
        selectedValue={selectedCurrency}
        onValueChange={(itemValue, itemIndex) => setSelectedCurrency(itemValue)}
      >
        <Picker.Item label="Select Curency" value="" />
        <Picker.Item label="Dollar" value="dollar" />
        <Picker.Item label="Euro" value="euro" />
        
      </Picker>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addCustomer(invoiceName, selectedValue, selectedItems, note);
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
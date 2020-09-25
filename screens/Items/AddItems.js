
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddItems = ({navigation}) => {
    const addItem = () => {
        fetch('http://192.168.1.113:8080/api/items', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: itemName,
            price: itemPrice,
            description: itemDescription
          })
        }).then(() => navigation.navigate("Items"))
        .catch((error) => console.error(error));
      };
      const [itemName, setItemName] = useState('');
      const onChangeItemName = textValue => setItemName(textValue);
      const [itemPrice, setItemPrice] = useState('');
      const onChangeItemPrice = textValue => setItemPrice(textValue)
      const [itemDescription, setItemDescription] = useState('');
      const onChangeItemDescription = textValue => setItemDescription(textValue)
    
      return (
        <View>
          <TextInput
            placeholder="Item Name"
            style={styles.input}
            onChangeText={onChangeItemName}
            value={itemName}
          />
          <TextInput
            placeholder="Item Price"
            style={styles.input}
            onChangeText={onChangeItemPrice}
            value={itemPrice}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            onChangeText={onChangeItemDescription}
            value={itemDescription}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addItem(itemName, itemPrice, itemDescription);
            }}>
            <Text style={styles.btnText}>
              <Icon name="plus" size={20} /> Add Item
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

export default AddItems;
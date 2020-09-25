
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
    const addItem = (item) => {
        fetch('http://192.168.1.113:8080/api/items', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: item
          })
        }).then(() => navigation.navigate("Items"))
        .catch((error) => console.error(error));
      };
      const [text, setText] = useState('');
      const onChange = textValue => setText(textValue);
    
      return (
        <View>
          <TextInput
            placeholder="Add Item..."
            style={styles.input}
            onChangeText={onChange}
            value={text}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addItem(text);
              setText('');
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
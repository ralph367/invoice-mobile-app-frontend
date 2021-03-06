import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Header from '../components/Header';
import BoxItem from '../components/BoxItem'
import { FlatList } from 'react-native-gesture-handler';

const Home = ({navigation}) => {
    const [items, setItems] = useState([
        {id: '1', text: "Items", description: "Add any item you would like for your store"},
        {id: '2', text: "Customers", description: "Here is a list of your Customers feel free to add remove and change any of the available data"},
        {id: '3', text: "Invoices", description: "Send to your Customers the invoice"}
      ])
    return (
        <View style={styles.bigcontainer}>
        {/* <Header title='Home'/> */}
        <StatusBar style="auto" />
        <View style={styles.container}>
          <FlatList 
            data={items} 
            renderItem={
              ({item}) => 
                <BoxItem title={item} navigateTo={navigation} />
            }
          />
        </View>
      </View>
    );
};

Header.defaultProps = {
    title: "Header"
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      bigcontainer: {
        flex: 1,
      }
});

export default Home;
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";


import ListItem from '../../components/ListItem'

const Customers = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            fetch('http://192.168.1.113:8080/api/customers')
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [isFocused]);


    return (
        <View style={{ flex: 1, padding: 24 }}>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => { navigation.navigate("AddCustomers") }}>
                <Text style={styles.btnText}>
                    <Icon name="plus" size={20} /> Add Customer
        </Text>
            </TouchableOpacity>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.listItem}
                            onPress={() => { navigation.navigate("EditCustomers", { id: item.id }) }}>
                            <View style={styles.listItemView}>
                                <Text style={styles.listItemText}>{item.firstname} {item.secondname}</Text>
                            </View>
                        </TouchableOpacity>
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
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemText: {
        fontSize: 18,
    },
    checkedItemText: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: 'green',
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 70,
    },
    editItemInput: {
        padding: 0,
        fontSize: 18,
    },
});

export default Customers;
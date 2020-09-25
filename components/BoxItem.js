import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import { back } from 'react-native/Libraries/Animated/src/Easing';

const { width, height} = Dimensions.get('window')
const BoxItem = ({title, navigateTo}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box}
            onPress={() => navigateTo.navigate(title.text)}>
            <Text style={styles.title}>{title.text}</Text>
            <Text style={styles.description}>{title.description}</Text>
            </TouchableOpacity>
        </View>
    );
};

BoxItem.defaultProps = {
    title: "Header"
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "center",
        paddingHorizontal: 10
      },
    box: {
        height: height/4,
        alignItems: "center",
        backgroundColor: "#c2bad8",
        width: width * 0.9,
        margin: 10,
        borderRadius:width *0.05,
        shadowColor: '#000',
        shadowOffset: {width:0.5 , height: 0.5},
        shadowOpacity: 0.5,
        elevation: 3
    },
    title:{
        marginTop:20,
        color: 'darkslateblue',
        fontSize: 20,
        fontWeight: "bold"
    },
    description: {
        marginVertical: width * 0.1,
        marginHorizontal: width * 0.05,
        color: 'gray',
        fontSize: 18
    },
});

export default BoxItem;
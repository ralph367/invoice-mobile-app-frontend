import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View, Text, StyleSheet, Button} from 'react-native';

const BoxItem = ({title, navigateTo}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box}
            onPress={() => navigateTo.navigate(title.text)}>
            <Text>{title.text}</Text>
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
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});

export default BoxItem;
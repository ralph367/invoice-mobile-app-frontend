import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
    return (
        <View style={style.header}>
            <Text style={style.text}>{title}</Text>
        </View>
    );
};

Header.defaultProps = {
    title: "Header"
}

const style = StyleSheet.create({
    header: {
        height: 75,
        padding: 30,
        backgroundColor: 'steelblue'
    },
    text: {
        color: 'black',
        fontSize: 23,
        textAlign: "center"
    }
});

export default Header;
import React, { FC } from 'react';
import { Text, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const{height, width} = Dimensions.get('screen');

interface Props{
    title: string;
    onPress: () => void;
}

const Button : FC<Props> = (props) => {
    return (
        <TouchableOpacity style = {Styles.container}onPress={props.onPress}>
            <Text style = {Styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding : 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10
    },

    text:{
        color : '#fff'
    }
})
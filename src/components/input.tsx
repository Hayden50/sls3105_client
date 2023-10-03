import React, { FC } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('screen');

interface Props {
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    isPhoneNumber?: boolean;
}

const Input: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <TextInput placeholder={props.placeholder} autoCapitalize='none' secureTextEntry={props.secureTextEntry || false} onChangeText={props.onChangeText} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        marginVertical: 10,
        paddingVertical: 10

    },

    input: {
        padding: 15,
        fontFamily: 'WorkSans_400Regular'

    }
})

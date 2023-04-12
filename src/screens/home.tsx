import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const App: FC = () => {
    const {signOut} = useClerk()
    return (
        <View style = {styles.container}>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={() => {
                signOut()
            }}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})
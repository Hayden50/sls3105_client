import React, { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Input } from "../components";

const App: FC = (props) => {
    const[name, setName] = useState<string | null>(null)
    const[email, setEmail] = useState<string | null>(null)
    const[Password, setPassword] = useState<string | null>(null)

    return (
        <View style = {styles.container}>
            <Text>Sign Up Screen</Text>
            <Input placeholder="Name" onChangeText={(text) => setName(text)}/>
            <Input placeholder="Email" onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
            <Button title = "Sign Up" onPress={() => alert('Pressed')}/>
            <View style = {styles.loginText}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('login')} style = {{marginHorizontal: 5}}>
                    <Text style = {{color: 'blue'}}>Login Here</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    loginText:{
        flexDirection: 'row',
        marginVertical: 20
    }
})
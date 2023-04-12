import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "../components";

const App: FC = (props) => {

    const[email, setEmail] = useState<string | null>(null)
    const[Password, setPassword] = useState<string | null>(null)

    return (
        <View style = {styles.container}>
            <Text>Login Screen</Text>
            <Input placeholder="Email" onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
            <Button title = "Log in" onPress={() => props.navigation.navigate('home')}/>
            <View style = {styles.signupText}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('signup')} style = {{marginHorizontal: 5}}>
                    <Text style = {{color: 'blue'}}>Sign Up Here</Text>
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
        alignItems: 'center'

    },
    signupText:{
        flexDirection: 'row',
        marginVertical: 20
    }
})
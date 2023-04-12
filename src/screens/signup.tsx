import React, { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Input } from "../components";
import { useSignUp } from "@clerk/clerk-expo";

const App: FC = (props) => {
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const {signUp, setSession, isLoaded} = useSignUp()
    const signupHandler = async () => {
        if (!name || !email || !password || !isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.create({
                emailAddress: email,
                password,
                username: name
            });
            
            await setSession(completeSignUp.createdSessionId);
        } catch (err) {
            // @ts-ignore
            console.log("Error:> " + (err.errors ? err.errors[0].message : err));
        }
    }

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
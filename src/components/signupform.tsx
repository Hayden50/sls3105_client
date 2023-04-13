import React, { FC, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Input } from "../components";
import { useSignUp } from "@clerk/clerk-expo";

interface Props {
    callback: React.Dispatch<React.SetStateAction<boolean>>,
    emailCallback: React.Dispatch<React.SetStateAction<string>>,
    navigation: any
}

export const SignUpForm: FC<Props> = ({ navigation, callback, emailCallback}) => {
    const[handle, setHandle] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const {signUp, setSession, isLoaded} = useSignUp()
    const [verifyingEmail, setVerifyingEmail] = useState(false)

    const signupHandler = async () => {
        if (!handle || !email || !password || !isLoaded) {
            return;
        }
        console.log(handle, email, password)
        try {
            const completeSignUp = await signUp.create({
                emailAddress: email,
                username: handle,
                password,
            });
            callback(true)
            emailCallback(email)
            await signUp.prepareEmailAddressVerification({strategy: "email_code"})

            await setSession(completeSignUp.createdSessionId);
        } catch (err) {
            // @ts-ignore
            console.log("Error:> ", JSON.stringify(err));
        }
    }

    return (
        <View style = {styles.container}>
            <Text>Sign Up</Text>
            <Input placeholder="Handle" onChangeText={setHandle}/>
            <Input placeholder="Email" onChangeText={setEmail}/>
            <Input placeholder="Password" secureTextEntry onChangeText={setPassword}/>
            <Button title = "Sign Up" onPress={signupHandler}/>
            <View style = {styles.loginText}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('login')}} style = {{marginHorizontal: 5}}>
                    <Text style = {{color: 'blue'}}>Login Here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

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
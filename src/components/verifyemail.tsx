import React, { FC, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Input } from ".";
import { useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "../../convex/_generated/react";

export const VerifyEmail: FC<{email: string}> = ({email}) => {
    const [code, setCode] = useState("")
    const {signUp, setSession} = useSignUp();
    const addUser = useMutation("addUser")
    const handleVerify = async () => {
        if (!signUp || !code) return;
        console.log("attempting to verify", code)
        await signUp.attemptEmailAddressVerification({code})
        console.log(signUp.unverifiedFields)
        await setSession(signUp.createdSessionId);
        addUser({ username: signUp.username, email: signUp.emailAddress })
    }
    return (
        <View style = {styles.container}>
            <Text>Enter code sent to {email}</Text>
            <Input placeholder="Enter Code" onChangeText={setCode}/>
            <Button title = "Verify" onPress={handleVerify}/>
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
        marginVertical: 20,
        fontFamily: 'WorkSans_400Regular'
    }
})

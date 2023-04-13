import React, { FC, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SignUpForm } from "../components/signupform";
import { VerifyEmail } from "../components/verifyemail";

const App: FC = (props) => {
    const [verifyingEmail, setVerifyingEmail] = useState(false)
    const [email, setEmail] = useState("")
    return (
        <View style = {styles.container}>
            <Text>{JSON.stringify(props)}</Text>
            {verifyingEmail ? <VerifyEmail email={email} /> : <SignUpForm callback={setVerifyingEmail} emailCallback={setEmail}/>}
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
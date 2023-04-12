import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "../components";
import { useSignIn } from "@clerk/clerk-expo";

const App: FC = (props) => {
    const { signIn, setSession, isLoaded } = useSignIn();

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const handleLogin = async () => {
        if (!isLoaded) {
            return;
          }
      
          try {
            const completeSignIn = await signIn.create({
              identifier: email,
              password,
            });
      
            await setSession(completeSignIn.createdSessionId);
          } catch (err) {
            // @ts-ignore
            console.log("Error:> " + (err.errors ? err.errors[0].message : err));
          }
    }

    return (
        <View style = {styles.container}>
            <Text>Login Screen</Text>
            <Input 
                placeholder="Email" 
                onChangeText={(text) => setEmail(text)}
            />
            <Input 
                placeholder="Password" 
                secureTextEntry onChangeText={(text) => setPassword(text)}
            />
            <Button title = "Log in" onPress={handleLogin}/>
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
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useQuery, useMutation } from '../../convex/_generated/react';
import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';

export default function Login() {
    const { signIn, setSession, isLoaded } = useSignIn();
  
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
  
    const onSignInPress = async () => {
      if (!isLoaded) {
        return;
      }
  
      try {
        const completeSignIn = await signIn.create({
          identifier: emailAddress,
          password,
        });
  
        await setSession(completeSignIn.createdSessionId);
      } catch (err) {
        // @ts-ignore
        console.log("Error:> " + (err.errors ? err.errors[0].message : err));
      }
    };
  
    // const onSignUpPress = () => navigation.replace("SignUp");
  
    return (
      <View style={styles.container}>
  
        <View>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            value={emailAddress}
            placeholder="Email..."
            placeholderTextColor="#000"
            onChangeText={(emailAddress: string) => setEmailAddress(emailAddress)}
          />
        </View>
  
        <View>
          <TextInput
            value={password}
            style={styles.textInput}
            placeholder="Password..."
            placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
  
        <TouchableOpacity onPress={onSignInPress}>
          <Text>Sign in</Text>
        </TouchableOpacity>
  
        <View>
          <Text>Have an account?</Text>
  
          <TouchableOpacity>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#000',
  }
});

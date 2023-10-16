import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import { useUser } from "@clerk/clerk-expo";


const App: FC = ({navigation}) => {

    const { user } = useUser();
    const { signOut } = useClerk();
    
    return (
        <View style={styles.container}>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Home')} style = {styles.backButton}>
                <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>{'\u21A9'}</Text>
            </TouchableOpacity>

            <Text style={styles.greeting}>Hello @{user?.username}</Text>
            
            <TouchableOpacity
                onPress={() => {
                    signOut();
                }}
                style={styles.button}
            >
                <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        padding: 10
    },
    greeting: {
        fontWeight: "bold",
        marginBottom: 100,
        fontFamily: 'WorkSans_600SemiBold',
        textAlign: 'center',
        fontSize: 30
    },
    button: {
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#300796'
    },
    backButton: {
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 100,
        padding: 15,
        backgroundColor: '#300796',
        width: 50
    }
})
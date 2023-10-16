import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import { useUser } from "@clerk/clerk-expo";


const App: FC = () => {

    const { user } = useUser();
    const addFriends = useMutation("addFriends");
    const users = (useQuery("listUsers") || []).map((user) => user.username) as string[];
    const friends = (useQuery("listFriends", {user_username: user?.username}) || []).map( friend => friend.friend_username) as string[];
    const deleteFriend = useMutation("deleteFriend");
    const [searchTerm, setSearchTerm] = useState("");
    const { signOut } = useClerk();

    const filtered_friends = friends.filter((user) => user.includes(searchTerm))
    const filtered_users = users.filter((user) => user.includes(searchTerm) && !friends.includes(user))


    
    return (
        <View style={styles.container}>
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
    localContainer: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        fontWeight: "bold",
        marginBottom: 20,
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
    }
})

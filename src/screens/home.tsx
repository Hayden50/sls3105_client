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

    const handleSearchClick = () => {
        console.log("Clicked Search Bar");
    }

    const handleAddFriend = () => {
        addFriends({ user_username: user?.username, friend_username: searchTerm })
    }

    const handleRemoveFriend = () => {
        deleteFriend({ user_username: user?.username, friend_username: searchTerm })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hello @{user?.username}</Text>
            <SearchBar 
                onSearchClick={handleSearchClick}
                onSearchChange={setSearchTerm}
            />
            <View style={styles.localContainer}>
                <View style={styles.friendsContainer}>
                    {filtered_friends.length > 0 && <View style={styles.friendsList} >
                        <Text style={styles.friendsTitle}>Friends</Text>
                        {friends && filtered_friends.slice(0, 10).map((user) => {
                            return (
                                <View style={styles.friendsRow} key={user}>
                                    <Text style = {{fontFamily: 'WorkSans_400Regular'}}>@{user}</Text>
                                </View>
                            )
                            })
                        }
                    </View> 
                    }
                    <View style={styles.usersList}>
                        <Text style={styles.friendsTitle}>All Users</Text>
                        {filtered_users.length > 0 ? filtered_users.slice(0, 3).map((user) => {
                            return (
                                <View style={styles.friendsRow} key={user}>
                                    <Text style = {{fontFamily: 'WorkSans_400Regular'}}>@{user}</Text>
                                </View>
                            )
                            }) : <Text style = {{fontFamily: 'WorkSans_400Regular'}}>No users matching search criteria</Text>
                        }
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleRemoveFriend}
                    style={styles.button}
                >
                    <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Remove friend</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleAddFriend}
                    style={styles.button}
                >
                    <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Add friend</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        signOut();
                    }}
                    style={styles.button}
                >
                    <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Log out</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        marginTop: 140,
        padding: 10
    },
    localContainer: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        fontWeight: "bold",
        marginBottom: 30,
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
    friendsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: '100%',
    },
    friendsList: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: '100%',
        marginBottom: 10
    },
    friendsRow: {
        display: "flex",
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 10,
        backgroundColor: '#fff'
    },
    friendsTitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 4,
        fontFamily: 'WorkSans_600SemiBold',
        textAlign: 'center'
    },
    usersList: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: '100%',
    }
})

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
    
    const addRequest = useMutation("addRequest");
    const deleteRequest = useMutation("deleteRequest");

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

    const handleAddRequest = () => {
        addRequest({user_username: user?.username, friend_username: searchTerm, amount: searchTerm}) //will change amount later
    }
    const handleDeleteRequest = () => {
        addRequest({user_username: user?.username, friend_username: searchTerm, request_id: searchTerm, accepted: Boolean}) //will change request_id later
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
                                    <Text>@{user}</Text>
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
                                    <Text>@{user}</Text>
                                </View>
                            )
                            }) : <Text>No users matching search criteria</Text>
                        }
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleRemoveFriend}
                    style={styles.button}
                >
                    <Text>Remove friend</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleAddFriend}
                    style={styles.button}
                >
                    <Text>Add friend</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        signOut();
                    }}
                    style={styles.button}
                >
                    <Text>Log out</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 10
    },
    localContainer: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 5
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
    },
    friendsTitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 4
    },
    usersList: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: '100%',
    }
})

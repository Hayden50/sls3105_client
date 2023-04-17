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
                        {friends && filtered_friends.slice(0, 10).map((_user) => {
                            return (
                                <View style={styles.friendsRow} key={_user}>
                                    <Text>@{_user}</Text>
                                    <TouchableOpacity style={styles.smallButton} onPress={() => {
                                        console.log("tapped delete")
                                        deleteFriend({ user_username: user?.username, friend_username: _user })
                                    }}>
                                        <Text style={{fontSize: 14, color: "red"}}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            })
                        }
                    </View> 
                    }
                    <View style={styles.usersList}>
                        <Text style={styles.friendsTitle}>All Users</Text>
                        {filtered_users.length > 0 ? filtered_users.slice(0, 3).map((_user) => {
                            return (
                                <View style={styles.friendsRow} key={_user}>
                                    <Text>@{_user}</Text>
                                    <TouchableOpacity style={styles.smallButton} onPress={() => {
                                        console.log("tapped add")
                                        addFriends({ user_username: user?.username, friend_username: _user })
                                    }}>
                                        <Text style={{fontSize: 20, color: "purple"}}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            }) : <Text>No users matching search criteria</Text>
                        }
                    </View>
                </View>
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
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        paddingLeft: 6,
        height: 50
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
    },
    smallButton: {
        padding: 12
    }
})

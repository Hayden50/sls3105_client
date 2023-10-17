import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import { useUser } from "@clerk/clerk-expo";


const App: FC = ({navigation}) => {

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
             <View style = {styles.circle}>
                <Text style = {styles.letter}>{user?.username[0]}</Text> 
            </View> 
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
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleAddFriend}
                        style={styles.button}
                    >
                        <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Add friend</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleRemoveFriend}
                        style={styles.button}
                    >
                        <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Remove friend</Text>
                    </TouchableOpacity>
                </View>

                <View style = {{marginTop: 10}}></View>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('Profile')} style = {styles.button}>
                    <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Profile Page</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        signOut();
                    }}
                    style={styles.button}
                >
                    <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Log out</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Requests')}
                    style={styles.moneyButton}>
                    <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>$</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    letter: {
        marginTop: 5, 
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 50,
        textTransform: 'capitalize'
    },
    circle: {
        display: 'flex',
        marginTop: 30,
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: '#300796'
    },
    container: {
        marginTop: 60,
        padding: 10
    },
    localContainer: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
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
        backgroundColor: '#300796',
        marginLeft: 30,
        marginRight: 30
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
    },
    moneyButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#300796'
    },
})

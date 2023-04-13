import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SearchBar } from "../components";

const Tusers = [
    {
      id: "1",
      name: "AliceBrown",
    },
    {
      id: "2",
      name: "CharliePuth",
    },
    {
      id: "3",
      name: "CharlieChaplan",
    },
    {
      id: "4",
      name: "DavidChappelle",
    },
    {
      id: "5",
      name: "EveAdams",
    }
  ];
const data = [
    {
      id: "1",
      name: "GabbyLowy",
    },
    {
      id: "2",
      name: "HaydenRieder",
    },
    {
      id: "3",
      name: "JacobGreen",
    },
    {
      id: "4",
      name: "EmilyAstillero",
    },
    {
      id: "5",
      name: "RyanTinder",
    }
  ];



const App: FC = () => {
    const {signOut} = useClerk()
    return (
        <View>
            <View style = {styles.container}>
            <SearchBar users={Tusers} onSelectUser={function (user: any): void {
                console.log(user.name);
                alert(user.name + " added to friends list")
            } } />
            </View>
            {data.map((item) => (
            <View style = {styles.friendList}>
                <Text>{item.name}</Text>
            </View>
            ))}
            <TouchableOpacity onPress={() => {
                signOut()
            }}>
                <View style = {styles.LogOut}>
                    <Text>Log out</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 70,
        alignItems: 'center',
        justifyContent: "center"

    },
    friendList: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 1,
    },
    LogOut: {
        // flex: 1,
        alignItems: 'center',
        marginBottom: 36
    }
})
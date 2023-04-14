import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import {useUser} from "@clerk/clerk-expo";


const App: FC = () => {

  const addFriends = useMutation("addFriends");
  const deleteFriend = useMutation("deleteFriend");
  const [word, setWord] = useState("");
  const {signOut} = useClerk();
  const {user} = useUser();

  // const friends = 

  const handleChange = (value: string) => {
    setWord(value);
  }
  
  const handleSearchClick = () => {
    console.log("Clicked Search Bar");
  }
  
  const handleAddFriend = () => {
    addFriends({user_username: user?.username, friend_username: word})
  }
    
  const handleRemoveFriend = () => {
    deleteFriend({user_username: user?.username, friend_username: word})
  }
  
  return (
    <View>
      <SearchBar
        onSearchClick={handleSearchClick}
        onSearchChange={handleChange}
      />
      <View style={styles.container}>
          <Text style={styles.greeting}>Hello {user?.username}!</Text>
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
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
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
    }
})

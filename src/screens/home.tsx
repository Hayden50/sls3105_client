import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import {useUser} from "@clerk/clerk-expo";


const App: FC = () => {

  const addFriends = useMutation("addFriends");
  const [word, setWord] = useState("");
  // const [friendsList, setFriendsList] = useState([]);
  const {signOut} = useClerk();
  const {user} = useUser();
  
  const handleChange = (value: string) => {
    setWord(value);
  }
  
  const handleSearchClick = () => {
    console.log("Clicked Search Bar");
  }
  
  const handleLogout = () => {
    addFriends({user_username: user?.username, friend_username: word})
  }
    
  return (
    <>
      <SearchBar
        onSearchClick={handleSearchClick}
        onSearchChange={handleChange}
      />
      <View style={styles.container}>
          <Text>{user?.id}</Text>
          <Text>{user?.username}</Text>
          <Text>{word}</Text>
          <Text>Here we will render the friends list</Text>
          <TouchableOpacity
              // onPress={() => {
              //   signOut();
              // }}
              onPress={handleLogout}
            >
            <Text>Log out</Text>
          </TouchableOpacity>
      </View>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

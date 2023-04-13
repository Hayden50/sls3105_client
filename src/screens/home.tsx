import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";


const App: FC = () => {

  const [num, setNum] = useState(0);
  const [searching, setSearching] = useState(false);
  // const [friendsList, setFriendsList] = useState("");
  const {signOut} = useClerk();
  
  const handleChange = () => {
    setNum(num + 1);
  }
  
  const handleSearchClick = () => {
    setSearching(!searching);
  }
    
  return (
    <>
      <SearchBar
        onSearchClick={handleSearchClick}
        onSearchChange={handleChange}
      />
      {searching ? (
        <View style={styles.container}>
          <Text>Here we will render the friends list</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>Home Screen: {num}</Text>
          <Text>Here we will list previous transactions / interactions</Text>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
          >
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      )}
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

import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchBar from "../components/search_bar";

const App: FC = () => {

  const [num, setNum] = useState(0);
  
  const {signOut} = useClerk()
  const handleChange = () => {
    setNum(num + 1);
  }
    
  return (
    <>
      <SearchBar onSearchChange={handleChange} /> 
      <View style = {styles.container}>
          <Text>Home Screen: {num}</Text>
          <TouchableOpacity onPress={() => {
              signOut()
          }}>
              <Text>Log out</Text>
          </TouchableOpacity>
      </View>
    </>
  )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})

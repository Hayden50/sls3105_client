import { useClerk, useSignIn } from "@clerk/clerk-expo";
import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import { useUser } from "@clerk/clerk-expo";

const App: FC = ({ navigation }) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.backButton}
      >
        <Text style={{ fontFamily: "WorkSans_400Regular", color: "#fff" }}>
          {"\u21A9"}
        </Text>
      </TouchableOpacity>
      <View style={styles.circle}>
        <Text style={styles.letter}>{user?.username[0]}</Text>
      </View>
      <Text style={styles.greeting}>Hello @{user?.username}</Text>
      <Text style={styles.balance}>$50</Text>

      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
        style={styles.button}
      >
        <Text style={{ fontFamily: "WorkSans_400Regular", color: "#fff" }}>
          Log out
        </Text>
      </TouchableOpacity>
            <TouchableOpacity 
                    onPress={() => navigation.navigate('Transactions')} style = {styles.button}>
                    <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Transaction History</Text>
            </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  letter: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: 50,
    textTransform: "capitalize",
  },
  circle: {
    display: "flex",
    marginTop: 30,
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "#300796",
  },
  container: {
    marginTop: 80,
    padding: 10,
  },
  greeting: {
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "center",
    fontSize: 30,
  },
  balance: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 200,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "center",
    fontSize: 30,
  },
  button: {
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#300796",
  },
  backButton: {
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 100,
    padding: 15,
    backgroundColor: "#300796",
    width: 50,
  },
});

import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const App: FC = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.backButton}
      >
        <Text style={{ fontFamily: "WorkSans_400Regular", color: "#fff" }}>
          {"\u21A9"}
        </Text>
      </TouchableOpacity>
        <Text style={styles.title}>Transaction History</Text>
    </View>
    
  );
};

export default App;

const styles = StyleSheet.create({
  title:{
    marginTop: 0,
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    marginTop: 40,
    padding: 10,
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
    marginBottom: 0,
    padding: 15,
    backgroundColor: "#300796",
    width: 50,
  },
});

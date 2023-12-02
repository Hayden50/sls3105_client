import { useClerk } from "@clerk/clerk-expo";
import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "../../convex/_generated/react";

const App: FC = ({ navigation }) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const requestData = (useQuery("listRequests") || [])
    .filter((req) => req.user_username == user?.username)
    .reverse();

  const userFromConvex =
    useQuery("getUser", { username: user?.username }) || null;

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
      <Text style={styles.greeting}>Hello @{user?.username}!</Text>
      <Text style={styles.balance}>${userFromConvex?.balance || 0}</Text>

      <FlatList
        style={styles.requestList}
        data={requestData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text style={styles.requestItemText}>{item.friend_username}</Text>
            <Text style={styles.requestItemAmount}>${item.amount}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Transactions")}
        style={styles.button}
      >
        <Text style={{ fontFamily: "WorkSans_400Regular", color: "#fff" }}>
          Transaction History
        </Text>
      </TouchableOpacity>
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
    marginTop: 10,
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "#300796",
  },
  container: {
    display: "flex",
    marginTop: 35,
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
    marginBottom: 10,
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
    alignSelf: "center",
  },
  backButton: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
    backgroundColor: "#300796",
    width: 50,
  },
  requestList: {
    height: 300,
  },
  requestItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  requestItemText: {
    fontSize: 14,
    fontStyle: "italic",
  },
  requestItemAmount: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
});

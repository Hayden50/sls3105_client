import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import { useUser } from "@clerk/clerk-expo";
import { Input } from "../components";

const App: FC = ({ navigation }) => {
  const { user } = useUser();

  const users = (useQuery("listUsers") || []).map(
    (user) => user.username
  ) as string[];

  const friends = (
    useQuery("listFriends", { user_username: user?.username }) || []
  ).map((friend) => friend.friend_username) as string[];

  const addRequest = useMutation("addRequest");
  const [searchTerm, setSearchTerm] = useState("");
  const [reqAmount, setReqAmount] = useState(0);

  const handleSearchClick = () => {
    console.log("Clicked Search Bar");
  };

  const filtered_friends = friends.filter((user) => user.includes(searchTerm));
  const filtered_users = users.filter(
    (user) => user.includes(searchTerm) && !friends.includes(user)
  );

  const handleAddRequest = () => {
    // TODO: implement some sort of response on failure
    addRequest({
      user_username: user?.username,
      friend_username: searchTerm,
      amount: reqAmount,
    });
  };

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
      <Text style={styles.greeting}>Request Funds</Text>
      <SearchBar
        onSearchClick={handleSearchClick}
        onSearchChange={setSearchTerm}
      />
      <View style={styles.localContainer}>
        <View style={styles.friendsContainer}>
          {filtered_friends.length > 0 && (
            <View style={styles.friendsList}>
              <Text style={styles.friendsTitle}>Friends</Text>
              {friends &&
                filtered_friends.slice(0, 10).map((user) => {
                  return (
                    <View style={styles.friendsRow} key={user}>
                      <Text style={{ fontFamily: "WorkSans_400Regular" }}>
                        @{user}
                      </Text>
                    </View>
                  );
                })}
            </View>
          )}

          <View style={styles.usersList}>
            <Text style={styles.friendsTitle}>All Users</Text>
            {filtered_users.length > 0 ? (
              filtered_users.slice(0, 3).map((user) => {
                return (
                  <View style={styles.friendsRow} key={user}>
                    <Text style={{ fontFamily: "WorkSans_400Regular" }}>
                      @{user}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={{ fontFamily: "WorkSans_400Regular" }}>
                No users matching search criteria
              </Text>
            )}
          </View>

          <View style={styles.container}>
            <Input
              placeholder="Amount"
              onChangeText={(amount) => setReqAmount(Number(amount))}
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}></View>

        <TouchableOpacity
          onPress={() => handleAddRequest()}
          style={styles.moneyButton}
        >
          <Text style={{ fontFamily: "WorkSans_400Regular", color: "#fff" }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  letter: {
    marginTop: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 50,
    textTransform: "capitalize",
  },
  circle: {
    display: "flex",
    marginTop: 30,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "#300796",
  },
  container: {
    marginTop: 60,
    padding: 10,
  },
  localContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  greeting: {
    fontWeight: "bold",
    marginBottom: 20,
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
    marginLeft: 30,
    marginRight: 30,
  },
  friendsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
  },
  friendsList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
    marginBottom: 10,
  },
  friendsRow: {
    display: "flex",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
  },
  friendsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "center",
  },
  usersList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
  },
  moneyButton: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
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

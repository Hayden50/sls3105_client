import { useClerk } from "@clerk/clerk-expo";
import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import { useUser } from "@clerk/clerk-expo";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const App: FC = ({ navigation }) => {
  const { user } = useUser();
  const addFriends = useMutation("addFriends");
  const users = (useQuery("listUsers") || []).map(
    (user) => user.username
  ) as string[];
  const friends = (
    useQuery("listFriends", { user_username: user?.username }) || []
  ).map((friend) => friend.friend_username) as string[];
  const deleteFriend = useMutation("deleteFriend");
  const [searchTerm, setSearchTerm] = useState("");
  const { signOut } = useClerk();

  const filtered_friends = friends.filter((user) => user.includes(searchTerm));
  const filtered_users = users.filter(
    (u) => u.includes(searchTerm) && !friends.includes(u) && u != user?.username
  );

  const handleSearchClick = () => {
    console.log("Clicked Search Bar");
  };

  const handleAddButton = (friendUser: string) => {
    addFriends({ user_username: user?.username, friend_username: friendUser });
  };

  const handleRemoveButton = (friendUser: string) => {
    deleteFriend({
      user_username: user?.username,
      friend_username: friendUser,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.letter}>{user?.username[0]}</Text>
      </TouchableOpacity>
      <Text style={styles.greeting}>Hello @{user?.username}</Text>
      <SearchBar onSearchChange={setSearchTerm} />
      <View style={styles.localContainer}>
        <View style={styles.friendsContainer}>
          {filtered_friends.length > 0 && (
            <View style={styles.friendsList}>
              <Text style={styles.friendsTitle}>Friends</Text>
              <View style={{ height: 200 }}>
                <FlatList
                  data={friends}
                  style={{ backgroundColor: "transparent" }}
                  renderItem={({ item }) => (
                    <View style={styles.friendsRow}>
                      <Text>@{item}</Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveButton(item)}
                      >
                        <MaterialCommunityIcons
                          name="account-remove"
                          color={"red"}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.toString()}
                />
              </View>
            </View>
          )}
          <View style={styles.usersList}>
            <Text style={styles.friendsTitle}>All Users</Text>
            {filtered_users.length > 0 ? (
              <View style={{ height: 200 }}>
                <FlatList
                  data={filtered_users}
                  renderItem={({ item }) => (
                    <View style={styles.friendsRow}>
                      <Text>@{item}</Text>
                      <TouchableOpacity onPress={() => handleAddButton(item)}>
                        <MaterialCommunityIcons
                          name="account-plus"
                          color={"green"}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.toString()}
                />
              </View>
            ) : (
              <Text style={{ fontFamily: "WorkSans_400Regular" }}>
                No users matching search criteria
              </Text>
            )}
          </View>
        </View>
        {/* <View style = {styles.buttonContainer}>
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
                </View> */}

        <View style={{ marginTop: 10 }}></View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  letter: {
    marginTop: 12,
    textAlign: "center",
    color: "#fff",
    fontSize: 50,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  circle: {
    display: "flex",
    marginTop: 30,
    alignSelf: "center",
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "#300796",
  },
  container: {
    marginTop: 60,
    padding: 10,
  },
  localContainer: {
    // flex: 1,
    // justifyContent: 'center',
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
    marginBottom: 0,
  },
  friendsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginVertical: 1,
    backgroundColor: "white",
  },
  friendsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "left",
  },
  usersList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
  },
  moneyButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#300796",
  },
});

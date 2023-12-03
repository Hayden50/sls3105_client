import React, { FC, useState, useRef, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import { useUser } from "@clerk/clerk-expo";
import { Input } from "../components";
import { headerSize } from "../lib/styles";
import Dropdown from "../components/dropdown";

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

  const handleTextChange = (num: string) => {
    setReqAmount(num);
  };

  const handleAddRequest = () => {
    // TODO: implement some sort of response on failure
    addRequest({
      user_username: user?.username,
      friend_username: searchTerm,
      amount: reqAmount,
    });
  };
  const handleSendRequest = () => {
    // TODO: implement some sort of response on failure
    addRequest({
      user_username: user?.username,
      friend_username: searchTerm,
      amount: reqAmount,
    });
  };

  const [recipient, setRecipient] = useState("");
  const [selected, setSelected] = useState(undefined);
  const data = [
    { label: 'Day(s)', value: '1' },
    { label: 'Week(s)', value: '2' },
    { label: 'Month(s)', value: '3' },
    { label: 'Year(s)', value: '4' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Requests")}
        style={styles.backButton}
      >
        <Text style={{ fontFamily: "WorkSans_400Regular", color: "#fff" }}>
          {"\u21A9"}
        </Text>
      </TouchableOpacity>
      <View style = {{marginTop: -30}}></View>
      <Text style={styles.greeting}>Recurring Payments</Text>
        <SearchBar
          onSearchClick={handleSearchClick}
          onSearchChange={setSearchTerm}
        />
        <View style={styles.friendsContainer}>
            {filtered_friends.length > 0 && (
              <View style={styles.friendsList}>
                <Text style={styles.friendsTitle}>Friends</Text>
                {friends &&
                  filtered_friends.slice(0, 4).map((user) => {
                    return (
                      <View style={recipient == user ? styles.friendsRowSelected : styles.friendsRow} key={user}>
                      <TouchableOpacity
                          onPress={() => {
                              setRecipient(user);
                          }}
                          >
                          <Text style={{ fontFamily: "WorkSans_400Regular" }}>
                              @{user}
                          </Text>
                      </TouchableOpacity>
                      </View>
                    );
                  })}
              </View>
            )}

            {filtered_friends.length == 0 && (
              <View style={styles.usersList}>
                  <Text style={styles.friendsTitle}>All Users</Text>
                  {filtered_users.length > 0 ? (
                  filtered_users.slice(0, 3).map((user) => {
                      return (
                          <View style={recipient == user ? styles.friendsRowSelected : styles.friendsRow} key={user}>
                          <TouchableOpacity
                              onPress={() => {
                                  setRecipient(user);
                              }}
                          >
                              <Text style={{ fontFamily: "WorkSans_400Regular" }}>
                              @{user}
                              </Text>
                          </TouchableOpacity>
                      </View>
                      );
                  })
                  ) : (
                  <Text style={{ fontFamily: "WorkSans_400Regular" }}>
                      No users matching search criteria
                  </Text>
                  )}
              </View>
            )}
          </View>
          <Text style={styles.amountTitle}>Amount</Text>
          <View style={styles.inputAmount}>
            <View style={{display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 40, fontWeight: 'bold'}}>$</Text>
                <TextInput
                    style={{fontFamily: "WorkSans_600SemiBold", fontSize: 40}}
                    autoCapitalize="none"
                    placeholder="0"
                    onChangeText={handleTextChange}
                    // value={reqAmount}
                    keyboardType="numeric"
                    returnKeyType="done"
                />
            </View>
          </View>
          <View style={{ marginTop: 10 }}></View>
          <Text style = {styles.amountTitle}>Payment sent every...</Text>
          <View style={{ marginTop: 10 }}></View>
          <View style={styles.inputAmount}>
          <TextInput
            style={{fontFamily: "WorkSans_600SemiBold", fontSize: 40}}
            autoCapitalize="none"
            placeholder="0"
            keyboardType="numeric"
            returnKeyType="done"
          />
          </View> 
          <View style = {{marginTop: -25}}></View>
          <View style={styles.container}>
            {!!selected}
            <Text style = {{fontFamily: "WorkSans_600SemiBold", fontSize: 40}}></Text>
            <Dropdown label="Time" data={data} onSelect={setSelected} dropdownStyles={styles.dropdown}/>
          </View>

        <View style = {styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RequestsSuccess')}
                        style={styles.button}
                    >
                        <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#fff'}}>Send</Text>
                    </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}></View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  dropdownContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  menuContainer: {
    flex: 1,
  },
  letter: {
    marginTop: 0,
    textAlign: "center",
    color: "#fff",
    fontSize: 50,
    textTransform: "capitalize",
  },
  inputAmount: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10
  },
  input: {
    height: 40,
    fontFamily: 'WorkSans_400Regular'
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
    marginTop: 10,
    padding: 10,
  },
  localContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    alignSelf: "center",
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
    marginTop: 40,
    marginBottom: 100,
    padding: 15,
    backgroundColor: "#300796",
    width: 50,
  },
  friendsRowSelected: {
    display: "flex",
    borderColor: "#300796",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "lightgrey",
  },
  amountTitle: {
    fontWeight: "bold",
    fontSize: headerSize,
    marginBottom: 4,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "center",
  },
  dropdown: {
    fontSize: 50, // Change the font size here
    fontWeight: 'bold',
    fontFamily: "WorkSans_600SemiBold",
  },
});

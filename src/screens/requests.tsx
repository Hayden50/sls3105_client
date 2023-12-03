import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery, useMutation } from "../../convex/_generated/react";
import SearchBar from "../components/search_bar";
import { useUser } from "@clerk/clerk-expo";
import SimpleMenu from "../components/popUpMenu";
import { headerSize } from "../lib/styles";

const App: FC = ({ navigation }) => {
  const { user } = useUser();

  const users = (useQuery("listUsers") || []).map(
    (user) => user.username
  ) as string[];

  const friends = (
    useQuery("listFriends", { user_username: user?.username }) || []
  ).map((friend) => friend.friend_username) as string[];

  const addRequest = useMutation("addRequest");
  const sendPayment = useMutation("sendPayment");

  const [searchTerm, setSearchTerm] = useState("");
  const [reqAmount, setReqAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSearchClick = () => {
    console.log("Clicked Search Bar");
  };

  const handleTextChange = (num: string) => {
    setReqAmount(num);
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
  const handleSendRequest = () => {
    // TODO: implement some sort of response on failure
    //make it so the username entered in the payments page is reflected in the recurring payments page
    addRequest({
      user_username: user?.username,
      friend_username: searchTerm,
      amount: reqAmount,
    });
  };

  
  const handleRequest = async () => {
    if (!recipient || !user) return;
    console.log("requesting", user.username, recipient, reqAmount, sendPayment)
    const paid = await addRequest({
        user_username: user.username,
        friend_username: recipient,
        amount: parseFloat(reqAmount),
    });

    if (paid) {
      console.log("Success");
      navigation.navigate("RequestsSuccess");
    } else {
      console.log("TODO: SHOW ERROR. PAYMENT NOT WORKING");
    }
  }
  const handleSend = async () => {
    if (!recipient || !user) return;
    console.log("sending", user.username, recipient, reqAmount, sendPayment)
    const paid = await sendPayment({
      userUsername: user.username,
      friendUsername: recipient,
      payment: reqAmount,
    });

    if (paid) {
      console.log("Success");
      navigation.navigate("RequestsSuccess");
    } else {
      console.log("TODO: SHOW ERROR. PAYMENT NOT WORKING");
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}></View>
      <Text style={styles.greeting}>Send or Request</Text>
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
        <View style={styles.inputAmount}>
            <Text style={styles.amountTitle}>Amount</Text>
            <View style={{display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 64, fontWeight: 'bold'}}>$</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="0"
                    onChangeText={handleTextChange}
                    value={reqAmount}
                    keyboardType="numeric"
                    returnKeyType="done"
                />
            </View>
            <TouchableOpacity>
                <Text style={{ color: "#300796", textAlign: 'center', fontWeight: 'bold' }}>Repeat</Text>
            </TouchableOpacity>
          </View>
        <View style={styles.buttonContainer}>
          {/* <View style={styles.menuContainer}>
            <SimpleMenu
              paymentValue={reqAmount}
              userUsername={user?.username}
              friendUsername={searchTerm}
            />
          </View> */}

          <TouchableOpacity
            onPress={handleRequest}
            style={styles.button}
          >
            <Text style={{ color: "#fff", fontWeight: 'bold', textAlign: 'center' }}>
              Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSend}
            style={styles.button}
          >
            <Text style={{ color: "#fff", fontWeight: 'bold', textAlign: 'center' }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}></View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
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
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 64,
    fontWeight: 'bold',
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
    alignItems: "center"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  greeting: {
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "left",
    fontSize: headerSize,
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
    flexGrow: 1
  },
  friendsContainer: {
    display: "flex",
    flexDirection: "column",
    overflow: 'scroll',
    gap: 2,
    width: "100%",
    height: 170
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
  friendsRowSelected: {
    display: "flex",
    borderColor: "#300796",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "lightgrey",
  },
  friendsTitle: {
    fontWeight: "bold",
    fontSize: headerSize,
    marginBottom: 4,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "left",
  },
  amountTitle: {
    fontWeight: "bold",
    fontSize: headerSize,
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

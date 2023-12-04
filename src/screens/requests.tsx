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
  const [recipError, setRecipError] = useState("");
  const [reqError, setReqError] = useState("");
  const [repeatVisible, setRepeatVisible] = useState(false);
  const [repeat, setRepeat] = useState(0); // 1 = daily, 2 = weekly, 3 = monthly, 4 = yearly
  const handleRequest = async () => {
    var recipValid = false;
    var reqValid = false;
    if (!recipient || recipient.length == 0) {
      setRecipError("Recipient's username is required.");
      return;
    } else {
      setRecipError("");
      recipValid = true;
    }
    if (!reqAmount || reqAmount.length == 0) {
      setReqError("Amount is required.");
      return;
    } else {
      setReqError("");
      reqValid = true;
    }
    if (recipValid && reqValid) {
      setRecipient("");
      setReqAmount("");
    }
    console.log("requesting", user.username, recipient, reqAmount, sendPayment);
    const paid = await addRequest({
      user_username: user.username,
      friend_username: recipient,
      amount: parseFloat(reqAmount),
    });
    if (paid) {
      setReqError("");
      navigation.navigate("Profile");
    } else setReqError("Error with payment. Please try again.");
  };
  const handleSend = async () => {
    var recipValid = false;
    var reqValid = false;
    if (!recipient || recipient.length == 0) {
      setRecipError("Recipient's username is required.");
      return;
    } else {
      setRecipError("");
      recipValid = true;
    }
    if (!reqAmount || reqAmount.length == 0) {
      setReqError("Amount is required.");
      return;
    } else {
      setReqError("");
      reqValid = true;
    }
    if (recipValid && reqValid) {
      setRecipient("");
      setReqAmount("");
    }

    console.log("sending", user.username, recipient, reqAmount, sendPayment);
    const paid = await sendPayment({
      userUsername: user.username,
      friendUsername: recipient,
      payment: reqAmount,
    });
    if (paid) {
      setReqError("");
      navigation.navigate("Profile");
    } else setReqError("Error with payment. Please try again.");
  };

  const handleTextChange = (num: string) => {
    setReqAmount(num);
  };

  const handlePendingRequests = (user: any, num:string): void => {
    navigation.navigate("Send and Request");
    setRecipient(user);
    handleTextChange(num);
  };

  const filtered_friends = friends.filter((user) => user.includes(searchTerm));
  const filtered_users = users.filter(
    (user) => user.includes(searchTerm) && !friends.includes(user)
  );

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}></View>
      <Text style={styles.greeting}>Send or Request</Text>
      <SearchBar onSearchChange={setSearchTerm} />
      <View style={styles.localContainer}>
        <View style={styles.friendsContainer}>
          {filtered_friends.length > 0 && (
            <View style={styles.friendsList}>
              <Text style={styles.friendsTitle}>Friends</Text>
              {friends &&
                filtered_friends.slice(0, 10).map((user) => {
                  return (
                    <View
                      style={
                        recipient == user
                          ? styles.friendsRowSelected
                          : styles.friendsRow
                      }
                      key={user}
                    >
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
                    <View
                      style={
                        recipient == user
                          ? styles.friendsRowSelected
                          : styles.friendsRow
                      }
                      key={user}
                    >
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
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
          >
            {reqError}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 80, fontWeight: "bold" }}>$</Text>
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
          {!repeatVisible ? (
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  ...styles.repeatButton,
                  alignSelf: "flex-start",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setRepeatVisible(true);
                }}
              >
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontFamily: "WorkSans_600SemiBold",
                  }}
                >
                  Repeat
                </Text>
                {repeat != 0 && (
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "WorkSans_600SemiBold",
                    }}
                  >
                    :{" "}
                    {repeat == 1
                      ? "Daily"
                      : repeat == 2
                      ? "Weekly"
                      : repeat == 3
                      ? "Monthly"
                      : "Yearly"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setRepeatVisible(false);
                  setRepeat(0);
                }}
                style={{ width: "18%%" }}
              >
                <Text style={styles.repeatButton}>None</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRepeatVisible(false);
                  setRepeat(1);
                }}
                style={{ width: "18%%" }}
              >
                <Text style={styles.repeatButton}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRepeatVisible(false);
                  setRepeat(2);
                }}
                style={{ width: "18%%" }}
              >
                <Text style={styles.repeatButton}>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRepeatVisible(false);
                  setRepeat(3);
                }}
                style={{ width: "22%%" }}
              >
                <Text style={styles.repeatButton}>Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRepeatVisible(false);
                  setRepeat(4);
                }}
                style={{ width: "18%" }}
              >
                <Text style={styles.repeatButton}>Yearly</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleRequest} style={styles.button}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "WorkSans_600SemiBold",
                textAlign: "center",
              }}
            >
              Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSend} style={styles.button}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "WorkSans_600SemiBold",
                textAlign: "center",
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}></View>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
          {recipError}
        </Text>
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
    width: "100%",
  },
  input: {
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 80,
    fontWeight: "bold",
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
    flexGrow: 1,
  },
  repeatButton: {
    color: "black",
    textAlign: "center",
    fontFamily: "WorkSans_600SemiBold",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    padding: 4,
  },
  friendsContainer: {
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    gap: 2,
    width: "100%",
    height: 170,
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
  backButton: {
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 100,
    padding: 15,
    backgroundColor: "#300796",
    width: 50,
  },
  rectangleButton: {
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#300796",
    marginLeft: 30,
    marginRight: 30,
    flexGrow: 1,
  },
});

import { useClerk } from "@clerk/clerk-expo";
import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "../../convex/_generated/react";
import { headerSize } from "../lib/styles";
import TransactionComponent from "../components/transaction";
import Popup from "../components/popup";
import { RequestsNavigator } from "../navigation/appstack";

const getTransactionData = (user: any) => {
  const data = (useQuery("listTransactions") || [])
    .filter(
      (trans) =>
        trans.sender_username == user?.username ||
        trans.receiver_username == user?.username
    )
    .reverse();

  const res = data.map((transaction) => ({
    ...transaction,
    sent_money: transaction.sender_username === user?.username,
  }));

  return res;
};

const App: FC = ({ navigation }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const transactions = getTransactionData(user);

  const requestData = (useQuery("listRequests") || [])
    .filter((req) => req.friend_username == user?.username)
    .reverse();

  const userFromConvex =
    useQuery("getUser", { username: user?.username }) || null;

  const deleteRequest = useMutation("deleteRequest");
  const sendPayment = useMutation("sendPayment");

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const showPopup = (item: any) => {
    setSelectedItem(item.user_username);
    setSelectedAmount(item.amount);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedItem(null);
    setPopupVisible(false);
  };

  const handleRequestSubmission = async () => {
    if (
      await sendPayment({
        userUsername: user?.username,
        friendUsername: selectedItem,
        payment: selectedAmount,
      })
    ) {
      closePopup();
      await deleteRequest({
        user_username: selectedItem,
        friend_username: user?.username,
        amount: selectedAmount,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "35%", marginTop: 35 }}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
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
        <View style={{ marginTop: -20 }}></View>
        <View style={styles.circle}>
          <Text style={styles.letter}>{user?.username[0]}</Text>
        </View>
        <Text style={styles.greeting}>Hello @{user?.username}!</Text>
        <Text style={styles.balance}>
          Balance: ${userFromConvex?.balance || 0}
        </Text>
      </View>
      <View style={{ maxHeight: "21%" }}>
        <Text style={styles.header}>Pending Requests</Text>
        <FlatList
          style={styles.requestList}
          data={requestData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showPopup(item)}>
              <View style={styles.requestItem}>
                <Text style={styles.requestItemText}>{item.user_username}</Text>
                <Text style={styles.requestItemAmount}>${item.amount}</Text>
                <Popup isVisible={isPopupVisible} onClose={closePopup}>
                  {selectedItem && (
                    <Text style={styles.confirmText}>
                      Confirm paying ${selectedAmount} to {item.user_username}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => handleRequestSubmission()}>
                    <Text style={styles.acceptText}>Yes</Text>
                  </TouchableOpacity>
                </Popup>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ flexGrow: 1, maxHeight: "39%" }}>
        <Text style={styles.header}>History</Text>
        <FlatList
          style={styles.requestList}
          data={transactions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TransactionComponent transaction={item} />}
        />
      </View>
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
    fontWeight: "bold",
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
    padding: 10,
    height: "100%",
  },
  greeting: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 0,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "center",
    fontSize: headerSize,
  },
  header: {
    fontWeight: "bold",
    marginTop: -10,
    marginBottom: 5,
    fontFamily: "WorkSans_600SemiBold",
    textAlign: "left",
    fontSize: headerSize,
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
    flexGrow: 1,
    marginBottom: 15,
  },
  requestItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 2,
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  requestItemText: {
    fontSize: 14,
  },
  requestItemAmount: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  acceptText: {
    color: "#FFF",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
    fontSize: 17,
  },
  confirmText: {
    color: "#FFF",
    marginTop: -20,
    marginBottom: 12,
    fontSize: 20,
  },
});

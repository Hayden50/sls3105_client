import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import TransactionComponent from "../components/transaction";
import { useQuery } from "../../convex/_generated/react";
import { useUser } from "@clerk/clerk-expo";

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
  const transactions = getTransactionData(user);

  console.log(transactions[0]?._creationTime);

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

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionComponent transaction={item} />}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    marginTop: 0,
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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

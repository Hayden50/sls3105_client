import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface Transaction {
  _id: string;
  amount: number;
  sender_username: string;
  receiver_username: string;
  _creationTime: Date;
  sent_money: boolean;
}

const TransactionComponent: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  return (
    <View
      style={[
        styles.transactionContainer,
        { borderColor: transaction.sent_money ? "red" : "green" },
      ]}
    >
      <View style={styles.topSection}>
        <Text style={styles.textName}>
          {transaction.sent_money
            ? "To: " + transaction.receiver_username
            : "From: " + transaction.sender_username}
        </Text>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.amount}>${transaction.amount}</Text>
        <Text style={styles.date}>
          {transaction?._creationTime instanceof Date
            ? transaction?._creationTime.toLocaleDateString()
            : new Date(transaction?._creationTime).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    backgroundColor: "#f0f0f0", // Grey background
    borderRadius: 10, // Rounded corners
    padding: 15, // Inner padding
    marginBottom: 10, // Space between each transaction container
    width: Dimensions.get("window").width - 40, // Take up the width of the screen with some margin
    alignSelf: "center", // Center the component
    borderWidth: 3,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textName: {
    fontFamily: "WorkSans_400Regular",
    color: "#333",
    fontSize: 14,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  amount: {
    fontFamily: "WorkSans_400Regular",
    color: "#333",
    fontSize: 18,
  },
  date: {
    fontSize: 16,
  },
});

export default TransactionComponent;

import { StyleSheet, Text, View, Button } from "react-native";
import React, { FC, useRef, useState } from "react";
import { useMutation } from "../../convex/_generated/react";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";

interface SimpleMenuProps {
  paymentValue: string;
  userUsername: string | undefined | null;
  friendUsername: string;
}

const SimpleMenu: FC<SimpleMenuProps> = ({
  paymentValue,
  userUsername,
  friendUsername,
}) => {
  const navigation = useNavigation();
  const sendPayment = useMutation("sendPayment");

  const handleOneTimePayment = async () => {
    const paid = await sendPayment({
      userUsername,
      friendUsername,
      payment: paymentValue,
    });

    if (paid) {
      console.log("Success");
      // navigation.navigate("RequestsSuccess");
    } else {
      console.log("TODO: SHOW ERROR. PAYMENT NOT WORKING");
    }
  };

  return (
    <MenuProvider style={styles.container}>
      <Menu>
        <MenuTrigger
          text="Send"
          customStyles={{
            triggerWrapper: {
              top: 0,
              backgroundColor: "fff",
            },
          }}
        />
        <MenuOptions>
          <Button
            title="One-Time Payment"
            onPress={() => handleOneTimePayment()}
          />
          <Button
            title="Recurring Payment"
            onPress={() => navigation.navigate("RecurPayments")}
          />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};

export default SimpleMenu;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#300796",
    marginLeft: 30,
    marginRight: 30,
  },
});

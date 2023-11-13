import { StyleSheet, Text, View, Button } from "react-native";
import React, {FC, useRef, useState} from "react";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";

function SimpleMenu() {
  const navigation = useNavigation();
  const popup = useRef();
  const[visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
 return (
  <MenuProvider style={styles.container}>
  <Menu>
    <MenuTrigger
      text="Send"
      customStyles={{
        triggerWrapper: {
          top:0,
          backgroundColor:"fff",
        },
      }}
    />
    <MenuOptions>
      <Button
        title="One-Time Payment"
        onPress={() => navigation.navigate('RequestsSuccess')}
      />
      <Button
        title="Recurring Payment"
        onPress={() => navigation.navigate('RecurPayments')}
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
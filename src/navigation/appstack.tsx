import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Requests from "../screens/requests";
import RecurPayments from "../screens/recur_payments";
import { Transactions } from "../screens";
import { RequestsSuccess } from "../screens";

const { Navigator, Screen } = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Transactions" component={Transactions} />
      <Screen name="RequestsSuccess" component={RequestsSuccess} />
    </Navigator>
  );
};
const RequestsNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Requests" component={Requests} />
      <Screen name="RecurPayments" component={RecurPayments} />
      <Screen name="RequestsSuccess" component={RequestsSuccess} />
    </Navigator>
  );
};
const ProfileNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};

export { MainStackNavigator, RequestsNavigator, ProfileNavigator };

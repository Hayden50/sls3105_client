import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import home from '../screens/home';
import profile from '../screens/profile';
import request from '../screens/requests';
import React, { FC } from "react";
import { MainStackNavigator, RequestsNavigator, ProfileNavigator } from './appstack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Send and Request" component={RequestsNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
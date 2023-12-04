import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React, { FC } from "react";
import { MainStackNavigator, RequestsNavigator, ProfileNavigator } from './appstack';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: 'black',}}>
      <Tab.Screen name="Friends" component={MainStackNavigator} options={{tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color={"black"} size={35}/>),}}/>
      <Tab.Screen name="Send and Request" component={RequestsNavigator} options={{tabBarIcon: ({color}) => (<MaterialCommunityIcons name="bank-transfer" color={"black"} size={35}/>),}}/>
      <Tab.Screen name="Profile" component={ProfileNavigator} options={{tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account" color={"black"} size={35}/>),}}/>
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
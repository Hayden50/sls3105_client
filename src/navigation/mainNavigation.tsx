import React, { FC, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {MainStackNavigator} from "./appstack";
import AuthStack from "./authstack";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SignInButton } from "@clerk/clerk-react";
import BottomTabNavigator from "./bottomtab";
const MainNav = () => {
    const [user, setUser] = useState(null);

    return (
        <NavigationContainer>
            <SignedIn >
                <BottomTabNavigator />
            </SignedIn >
            <SignedOut>
                <AuthStack />
            </SignedOut>
        </NavigationContainer>
    )
}

export default MainNav
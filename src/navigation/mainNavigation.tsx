import React, { FC, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./appstack";
import AuthStack from "./authstack";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SignInButton } from "@clerk/clerk-react"

const MainNav: FC = () => {
    const [user, setUser] = useState(null);

    return (
        <NavigationContainer>
            <SignedIn >
                <AppStack />
            </SignedIn >
            <SignedOut>
                <AuthStack />
            </SignedOut>
        </NavigationContainer>
    )
}

export default MainNav
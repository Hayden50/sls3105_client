import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import MainNav from './src/navigation/mainNavigation';
import { useFonts, WorkSans_400Regular, WorkSans_600SemiBold} from '@expo-google-fonts/work-sans';

const tokenCache = {
  getToken(key: string) { 
    return SecureStore.getItemAsync(key);
  }, 
  saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  }
};

const convex = new ConvexReactClient("https://flippant-crab-607.convex.cloud", {
    unsavedChangesWarning: false,
});


export default function App() {
    const [fontsLoaded] = useFonts({
        WorkSans_400Regular,
        WorkSans_600SemiBold,
    });
    return (
        <ConvexProvider client={convex}>
            <ClerkProvider publishableKey="pk_test_dGhvcm91Z2gtbG9jdXN0LTk2LmNsZXJrLmFjY291bnRzLmRldiQ" tokenCache={tokenCache}>
                <MainNav />
            </ClerkProvider>
        </ConvexProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'WorkSans_400Regular',
    }
});

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useQuery, useMutation } from '../../convex/_generated/react';
import { useAuth, useSession, useUser } from '@clerk/clerk-expo';

export default function Friends() {
    const { session } = useSession()
    const { userId } = useAuth()
    const { user } = useUser()
    const arr = useQuery("listFriends") || []
    const addFriends = useMutation("addFriends");
    const deleteFriend = useMutation("deleteFriend");

    const addFriendOnClick = async () => {
        await addFriends({ user_id: 0, friend_id: 11 });
    };

    const deleteFriendOnClick = async () => {
        await deleteFriend({ user_id: 0, friend_id: 11 });
    };

    return (
        <View style={styles.container}>
            <Button onPress={addFriendOnClick} title="Add a friend" />
            <Button onPress={deleteFriendOnClick} title="Remove a friend" />
            <Text>Welcome {user?.emailAddresses[0].emailAddress}</Text>
            {arr &&
                arr.map((item, index) => {
                    return <Text key={index}>{JSON.stringify(item)}</Text>;
                })}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

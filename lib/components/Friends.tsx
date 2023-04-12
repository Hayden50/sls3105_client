import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useQuery, useMutation } from '../../convex/_generated/react';

export default function Friends() {
    const arr = useQuery("listFriends") || []
    const addFriends = useMutation("addFriends");
    const deleteFriend = useMutation("deleteFriend");
  
  const addFriendOnClick = () => {
    addFriends({ user_id: 11, friend_id: 1 });
  };
  
  const deleteFriendOnClick = () => {
    deleteFriend({ user_id: 11, friend_id: 1 });
  };

  return (
    <View style={styles.container}>
      <Button onPress={addFriendOnClick} title="Add a friend" />
      <Button onPress={deleteFriendOnClick} title="Remove a friend" />
      <Text>Open up App.tsx to start working on your app! {arr.length} </Text>
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

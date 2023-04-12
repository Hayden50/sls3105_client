import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useQuery, useMutation } from '../../convex/_generated/react';

export default function Friends() {
    const arr = useQuery("listFriends") || []
    const addFriends = useMutation("addFriends");
  
  const handleClick = () => {
    addFriends({ user_id: 'user_id1', friend_id: 'friend_id' });
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleClick} title="Click me" />
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

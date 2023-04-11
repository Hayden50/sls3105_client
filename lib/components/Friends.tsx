import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '../../convex/_generated/react';

export default function Friends() {
    const arr = useQuery("listFriends") || []
  return (
        <View style={styles.container}>
            
        <Text>Open up App.tsx to start working on your app! {arr.length} </Text>
        
            {arr && arr.map((item, index) => {
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

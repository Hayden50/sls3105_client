import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { StyleSheet, Text, View } from 'react-native';
import Friends from './lib/components/Friends';
import 'react-native-get-random-values';

const convex = new ConvexReactClient("https://flippant-crab-607.convex.cloud", {
  unsavedChangesWarning: false,
});


export default function App() {
  return (
    <ConvexProvider client={convex}>
        <Friends />
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
});

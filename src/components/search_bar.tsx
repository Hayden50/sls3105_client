import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SearchBarProps {
  onSearchChange: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    onSearchChange(text);
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize='none'
        placeholder="Enter name..."
        onChangeText={handleSearchChange}
        value={searchValue}
        returnKeyType='done'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10
  },
  input: {
    height: 40,
    fontFamily: 'WorkSans_400Regular'
  },
});

export default SearchBar;

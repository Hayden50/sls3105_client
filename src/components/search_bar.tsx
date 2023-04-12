import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

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
        placeholder="Search for friends..."
        onChangeText={handleSearchChange}
        value={searchValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  input: {
    height: 40,
  },
});

export default SearchBar;

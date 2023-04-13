import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SearchBarProps {
  onSearchChange: (searchValue: string) => void;
  onSearchClick: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, onSearchClick }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    onSearchChange(text);
  };
  
  const handleSearchClick = () => {
    onSearchClick(searchValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for friends..."
        onChangeText={handleSearchChange}
        value={searchValue}
        onPressIn={handleSearchClick}
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

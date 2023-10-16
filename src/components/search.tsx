import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface User {
  id: string;
  name: string;
}

interface Props {
  users: User[];
  onSelectUser: (user: User) => void;
}

const SearchBar: React.FC<Props> = ({ users, onSelectUser }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text.length > 4) {
      const results = users.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const renderResult = ({ item }: { item: User }) => {
    return (
      <TouchableOpacity style={styles.resultItem} onPress={() => onSelectUser(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a user..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        style={styles.resultList}
        data={searchResults}
        renderItem={renderResult}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width : 300,
  },
  resultList: {
    maxHeight: 150,
  },
  resultItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchBar;

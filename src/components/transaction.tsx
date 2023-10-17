import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface Transaction{
    id: string;
    amount: number;
    sender: string;
    receiver: string;
    date: Date;
    change: 'positive' | 'negative';
}

const TransactionComponent: React.FC<{ transaction: Transaction}> = ({ transaction }) => {
    return (
        <View style = {styles.transactionContainer}>
            <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#000'}}>ID: {transaction.id}</Text>
            <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#000'}}>Amount: ${transaction.amount}</Text>
            <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#000'}}>Sender: {transaction.sender}</Text>
            <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#000'}}>Receiver: {transaction.receiver}</Text>
            <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#000'}}>Date: {transaction.date.toString()}</Text>
            <Text style = {{fontFamily: 'WorkSans_400Regular', color: '#000'}}>Change: {transaction.change}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    transactionContainer: {
            backgroundColor: '#f0f0f0', // Grey background
            borderRadius: 10, // Rounded corners
            padding: 15, // Inner padding
            marginBottom: 10, // Space between each transaction container
            width: Dimensions.get('window').width - 40, // Take up the width of the screen with some margin
            alignSelf: 'center', // Center the component
    },
});

export default TransactionComponent;
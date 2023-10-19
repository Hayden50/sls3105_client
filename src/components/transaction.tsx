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
        <View style = {[
            styles.transactionContainer,
            {borderColor: transaction.change === 'positive' ? 'green' : 'red'}
        ]}>
            <View style = {styles.topSection}>
                <Text style={styles.textName}>
                    {transaction.change === 'positive' ? 'From: ' + transaction.sender : 'To: ' + transaction.receiver}
                </Text>
            </View>
            <View style = {styles.bottomSection}>
                <Text style = {styles.amount}>
                    ${transaction.amount}
                </Text>
                <Text style = {styles.date}>
                    {transaction.date.toLocaleDateString()}

                </Text>

            </View>
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
            borderWidth: 3,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    textName: {
        fontFamily: 'WorkSans_400Regular',
        color: '#333',
        fontSize: 14,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
    },
    amount: {
        fontFamily: 'WorkSans_400Regular',
        color: '#333',
        fontSize: 18,
    },
    date: {
        fontSize: 16,
    },

});

export default TransactionComponent;
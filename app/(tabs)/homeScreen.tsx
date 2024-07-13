import { Connection } from '@solana/web3.js';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AccountDetails from '~/components/AccountDetails';
import { Screen, Text } from '~/lib';
import { useStore } from '~/store/store';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

const HomeScreen = () => {
  const { address, loadAddress } = useStore();
  const [balance, setBalance] = useState();
  /* useEffect(() => {
    loadAddress(); // Load the address from AsyncStorage when the component mounts
    //getBalance()
  }, []); */

  
  /* const getBalance = useCallback(async () => {
    const balance = await connection.getBalance(address);
    setBalance(balance / 1000000000);
    }, [address, connection]);
   */
    
    
 
  return (
    <Screen safeAreaEdges={['top']} contentContainerStyle={styles.container}>
      <View>
        <AccountDetails balance={1000} address={address} />
      </View>
      <View style={styles.transactions}>
        <Text>Transactions</Text>
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transactions: {
    marginHorizontal: 24,
  },
});

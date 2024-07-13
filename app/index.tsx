import { Stack, Link, router } from 'expo-router';

import { Container } from '~/components/Container';
import { Button, Screen, Text } from '~/lib';

import 'react-native-get-random-values';

import { StyleSheet, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { transact, Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { Connection } from '@solana/web3.js';
import bs58 from 'bs58';

import { useStore } from '~/store/store';

const appIcon = require('../assets/solana_icon.png');

export const APP_IDENTITY = {
  name: 'Oracle Swap',
  uri: 'https://oracleSwapdapp.com',
  icon: appIcon,
};

export default function Home() {
  const { setAddress, loadAddress } = useStore();

  const handlePress = async () => {
    try {
      const authResult = await transact(async (wallet: Web3MobileWallet) => {
        const authorization = await wallet.authorize({
          chain: 'solana:mainnet',
          identity: APP_IDENTITY,
          sign_in_payload: {
            domain: 'yourdomain.com',
            statement: 'Sign into Oracle Swap',
            uri: 'https://oracleSwapdapp.com',
          },
        });

        console.log('Result from wallet: ', authorization);
        return authorization;
      });

      if (authResult && authResult.sign_in_result && authResult.sign_in_result.address) {
        setAddress(authResult.sign_in_result.address);

      }
      if (authResult && authResult.sign_in_result && authResult.sign_in_result.address) {
        const base58Address = bs58.encode(Buffer.from(authResult.sign_in_result.address, 'base64'));
        setAddress(base58Address);
        router.replace('(tabs)/homeScreen'); // navigate to the new screen
      }
    } catch (error) {
      console.error('Error authorizing wallet: ', error);
      setAddress(null); // Clear address on error
    }
  };

  return (
    <Screen safeAreaEdges={['top']} contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={appIcon} resizeMode="contain" />
      </View>
      <Button label="Connect Wallet" onPress={handlePress} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  imageContainer: { 
    flex: 1, 
    alignContent: 'center', 
    justifyContent: 'center' 
  }
});

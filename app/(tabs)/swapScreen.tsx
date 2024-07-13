import { PriceServiceConnection } from '@pythnetwork/price-service-client';
import { Picker } from '@react-native-picker/picker';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { fetchPrice, fetchAllPrices, PRICE_IDS } from '~/api/api';
import CryptoDataItem from '~/components/CryptoDataItem';
import { colors, fontSize } from '~/constants/theme';
import { Button, Input, Screen, Text } from '~/lib';
import { useStore, useTransactionStore } from '~/store/store';

const cryptocurrencies = ['BSOL/USD', 'SOL/USD', 'MSOL/USD', 'JITOSOL/USD', 'STSOL/USD'];

const Swapscreen = () => {
  const [fromAsset, setFromAsset] = useState<string>('SOL/USD');
  const [toAsset, setToAsset] = useState<string>('MSOL/USD');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [swapAmount, setSwapAmount] = useState<number>(0);
  const [fromModalVisible, setFromModalVisible] = useState<boolean>(false);
  const [toModalVisible, setToModalVisible] = useState<boolean>(false);
  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(undefined);

  const {
    data: prices,
    isLoading: pricesLoading,
    error: pricesError,
  } = useQuery({
    queryKey: ['allPrices'],
    queryFn: fetchAllPrices,
  });

  const onConvert = useMutation({
    mutationFn: fetchPrice,
    onSuccess: (data) => {
      const conversionData = data[0].price.price;
      setLoading(false);
      console.log('some data: ', conversionData);

      const convertedAmount = calculateConversion(data, fromAsset, toAsset, amount);
      setConvertedAmount(convertedAmount);
    },
    onError: (error) => {
      setLoading(false);
      console.log('Error found:', error);
    },
  });

  const handleSwap = async () => {
    try {
      if (!toAsset || !fromAsset || amount <= 0) {
        return;
      }
      setLoading(true);
      console.log('Converting:', { fromAsset, toAsset, amount });
      const result = await onConvert.mutateAsync({ to: toAsset, from: fromAsset });
      console.log('RESULT: ', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateConversion = (
    data: any[],
    fromAsset: string,
    toAsset: string,
    amount: number
  ): number | undefined => {
    // Remove '0x' prefix from IDs in PRICE_IDS object
    const cleanPriceIds: Record<string, string> = {};
    Object.keys(PRICE_IDS).forEach((key) => {
      cleanPriceIds[key] = PRICE_IDS[key].replace('0x', '');
    });

    // Find the prices for fromAsset and toAsset in the fetched data
    const fromAssetPrice = data.find((item) => item.id === cleanPriceIds[fromAsset])?.price?.price;
    const toAssetPrice = data.find((item) => item.id === cleanPriceIds[toAsset])?.price?.price;

    if (!fromAssetPrice || !toAssetPrice) {
      console.error('Unable to find prices for the selected assets');
      console.log('From Asset ID:', cleanPriceIds[fromAsset]);
      console.log('To Asset ID:', cleanPriceIds[toAsset]);
      console.log(
        'Data IDs:',
        data.map((item) => item.id)
      );
      return undefined;
    }

    // Convert prices to numbers (they are in string format)
    const fromPrice = parseFloat(fromAssetPrice);
    const toPrice = parseFloat(toAssetPrice);

    // Perform the conversion
    const convertedAmount = (amount * fromPrice) / toPrice;
    return convertedAmount;
  };

  const handleFromAssetSelect = (asset: string) => {
    setFromAsset(asset);
    setFromModalVisible(false);
    console.log('From Asset: ', asset);
  };

  const handleToAssetSelect = (asset: string) => {
    setToAsset(asset);
    setToModalVisible(false);
    console.log('To Asset: ', asset);
  };

  const renderCryptoItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => (fromModalVisible ? handleFromAssetSelect(item) : handleToAssetSelect(item))}>
      <Text style={styles.modalItem}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Screen
      safeAreaEdges={['top']}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      preset="scroll">
      <View>
        <Text>Swap</Text>
      </View>
      <View style={styles.swapContainer}>
        <Text style={styles.label}>From</Text>
        <TouchableOpacity onPress={() => setFromModalVisible(true)} style={styles.selector}>
          <Text style={styles.selectorText}>{fromAsset}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>To</Text>
        <TouchableOpacity onPress={() => setToModalVisible(true)} style={styles.selector}>
          <Text style={styles.selectorText}>{toAsset}</Text>
        </TouchableOpacity>
        <Input
          placeholder="Amount"
          onChangeText={(value) => setAmount(Number(value))}
          keyboardType="numeric"
        />
        <View>
          {loading && <ActivityIndicator size="small" style={{ marginTop: 10 }} />}

          {convertedAmount !== undefined && (
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
              <Text size={fontSize.small}>Amount to receive </Text>
              <Text
                size={fontSize.medium}
                style={{ fontWeight: '600' }}>{`$${convertedAmount.toFixed(2)}`}</Text>
            </View>
          )}
        </View>

        <Button label="Swap" onPress={handleSwap} />

        <Text style={styles.label}>Current Prices:</Text>
        {pricesLoading ? (
          <ActivityIndicator size="small" />
        ) : pricesError ? (
          <Text>Error loading prices.</Text>
        ) : (
          <ScrollView>
            <FlatList
              data={prices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CryptoDataItem data={item} />}
            />
          </ScrollView>
        )}

        <Modal visible={fromModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a currency pair</Text>
            <FlatList
              data={cryptocurrencies}
              renderItem={renderCryptoItem}
              keyExtractor={(item) => item}
            />
            <Button label="Close" onPress={() => setFromModalVisible(false)} />
          </View>
        </Modal>

        <Modal visible={toModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a currency pair</Text>
            <FlatList
              data={cryptocurrencies}
              renderItem={renderCryptoItem}
              keyExtractor={(item) => item}
            />
            <Button label="Close" onPress={() => setToModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </Screen>
  );
};

export default Swapscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
  },
  swapContainer: {
    rowGap: 15,
    marginTop: moderateScale(15),
  },
  label: {
    fontSize: 18,
    marginBottom: 2,
  },
  selector: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.theme.secondary200,
    borderRadius: 4,
    padding: 8,
    paddingVertical: 15,
  },
  selectorText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.theme.secondary100,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalItem: {
    padding: 16,
    fontSize: 18,
  },
});

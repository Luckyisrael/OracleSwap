import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Price {
  price: number;
  conf: number;
  expo: number;
  publish_time: number;
}

interface EMA_Price {
  price: number;
  conf: number;
  publish_time: number;
}

interface Metadata {
  slot: number;
  proof: string;
  proof_available_time: number;
  prev_publish_time: number;
  publisher: string;
}

interface CryptoData {
  id: string;
  price: Price;
  ema_price: EMA_Price;
  metadata: Metadata;
}

interface CryptoDataItemProps {
  data: CryptoData;
}

const CryptoDataItem: React.FC<CryptoDataItemProps> = ({ data }) => {
  const {
    id,
    price: { price, conf, expo, publish_time },
    ema_price: { price: emaPrice, conf: emaConf, publish_time: emaPublishTime },
    metadata: { slot, proof, proof_available_time, prev_publish_time, publisher },
  } = data;

  // Function to format the price
  const formatPrice = (value: number, exponent: number) => {
    const formattedPrice = (value * 10 ** -exponent).toFixed(2);
    return parseFloat(formattedPrice).toString(); // Ensure to convert to string
  };

  // Function to format the timestamp
  const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleString();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{formatPrice(price, expo)} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>EMA Price:</Text>
        <Text style={styles.value}>{formatPrice(emaPrice, expo)} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>EMA Publish Time:</Text>
        <Text style={styles.value}>{formatDate(emaPublishTime)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Proof Available Time:</Text>
        <Text style={styles.value}>{formatDate(proof_available_time)}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default CryptoDataItem;

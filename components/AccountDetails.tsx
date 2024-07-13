import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors, fontSize } from '~/constants/theme';
import { Text } from '~/lib';

interface AccountDetailsProps {
  balance: number;
  address: string | any;
}
const AccountDetails = ({ balance, address }: AccountDetailsProps) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.theme.secondary100} />
      <View style={styles.balance}>
        <Text color={colors.theme.secondary200} size={fontSize.large} style={{ fontWeight: '300' }}>
          Your Balance
        </Text>
        <Text size={fontSize.small} style={{ fontWeight: '200' }}>{address}</Text>
        <Text
          color={colors.theme.secondary200}
          size={fontSize.extraLarge + 10}
          style={{ fontWeight: '700' }}>{`$${balance.toLocaleString()}.00`}</Text>
      </View>
      <View style={styles.actions}>
        {/*  <TouchableOpacity style={styles.actionContainer}>
          <Feather name="send" size={20} color="black" />
          <Text size={10}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionContainer}>
          <MaterialIcons name="downloading" size={20} color="black" />
          <Text size={10}>Receive</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={() => {
            router.push('(tabs)/swapScreen');
          }}>
          <MaterialIcons name="swap-horizontal-circle" size={20} color="black" />
          <Text size={10}>Swap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.theme.secondary100,
    height: '50%',
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
    paddingHorizontal: 24,
  },
  balance: {
    flex: 1,
    justifyContent: 'center',
  },
  actionContainer: {
    backgroundColor: colors.theme.secondary200,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    //justifyContent: 'space-evenly',
  },
});

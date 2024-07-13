import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import { HomeTrendUp, PresentionChart, Setting, Wallet1 } from 'iconsax-react-native';

import { colors } from '~/constants/theme';
import { ModerateScale } from 'react-native-size-matters';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.theme.secondary200,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.theme.secondary,
          borderTopWidth: 0,
          height: 60
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="homeScreen"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="wallet" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="swapScreen"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="swap-horizontal-circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

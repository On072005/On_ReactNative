// AppTabs_User.tsx
import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStackScreen';
import CategoryStack from './CategoryStack';
import CategoryStack_User from './CategoryStack_User';
import CartStack from './CartStack';
import MeStack from './MeStack';

const Tab = createBottomTabNavigator();

export default function AppTabs_User() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home', tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="CategoryTab" component={CategoryStack_User} options={{ title: 'Category', tabBarIcon: () => <Text>📚</Text> }} />
      <Tab.Screen name="CartTab" component={CartStack} options={{ title: 'Cart', tabBarIcon: () => <Text>🛒</Text> }} />
      <Tab.Screen name="MeTab" component={MeStack} options={{ title: 'Me', tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
}

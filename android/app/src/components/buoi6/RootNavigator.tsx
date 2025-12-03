import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginSqlite from './dbSqlite/LoginSqlite';
import AppTabs_User from './AppTabs_User';
import AppTabs_Admin from './AppTabs_Admin';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="UserTabs"   // ⭐ MỞ APP → User Home
    >
      {/* User mode (default) */}
      <Stack.Screen name="UserTabs" component={AppTabs_User} />

      {/* Auth */}
      <Stack.Screen name="LoginSqlite" component={LoginSqlite} />

      {/* Admin mode */}
      <Stack.Screen name="AdminTabs" component={AppTabs_Admin} />
    </Stack.Navigator>
  );
}

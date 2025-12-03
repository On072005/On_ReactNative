import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStackScreen';
import CategoryStack from './CategoryStack';
import CartStack from './CartStack';
import MeStack from './MeStack';
import AdminStack from './AdminStack'; // nhớ import admin

export type BottomTabParamList = {
  HomeTab: undefined;
  CategoryTab: undefined;
  CartTab: undefined;
  MeTab: undefined;
  AdminTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppTabs = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadRole = async () => {
      const savedRole = await AsyncStorage.getItem('userRole');
      setRole(savedRole);
    };

    loadRole();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="CategoryTab"
        component={CategoryStack}
        options={{
          title: 'Category',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📚</Text>
          ),
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🛒</Text>
          ),
        }}
      />

      <Tab.Screen
        name="MeTab"
        component={MeStack}
        options={{
          title: 'Me',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />

      {role === 'admin' && (
        <Tab.Screen
          name="AdminTab"
          component={AdminStack}
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>🛠️</Text>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default AppTabs;

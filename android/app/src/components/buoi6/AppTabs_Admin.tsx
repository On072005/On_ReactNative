// AppTabs_Admin.tsx
import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AdminHome from './AdminHome';
import UserManage from './UserManage';
import CategoryManage from './CategoryManage';
import SanPham3Sqlite from './Sanpham3Sqlite';

const Tab = createBottomTabNavigator();

export default function AppTabs_Admin() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      <Tab.Screen
        name="AdminDashboard"
        component={AdminHome}
        options={{
          title: 'Dashboard',
          tabBarIcon: () => <Text>📊</Text>,
        }}
      />

      <Tab.Screen
        name="AdminUserManage"
        component={UserManage}
        options={{
          title: 'User',
          tabBarIcon: () => <Text>👤</Text>,
        }}
      />

      <Tab.Screen
        name="AdminProductManage"
        component={SanPham3Sqlite}
        options={{
          title: 'Sản phẩm',
          tabBarIcon: () => <Text>🛍️</Text>,
        }}
      />

      <Tab.Screen
        name="AdminCategoryManage"
        component={CategoryManage}
        options={{
          title: 'Danh mục',
          tabBarIcon: () => <Text>📁</Text>,
        }}
      />

    </Tab.Navigator>
  );
}

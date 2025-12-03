// AdminStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHome from './AdminHome';
import UserManage from './UserManage';
import CategoryManage from './CategoryManage';
import Sanpham3Sqlite from './Sanpham3Sqlite';

export type AdminStackParamList = {
  AdminHome: undefined;
  UserManage: undefined;
  CategoryManage: undefined;
  Sanpham3Sqlite: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen 
        name="AdminHome" 
        component={AdminHome} 
        options={{ title: 'Admin Panel' }} 
      />

      <Stack.Screen 
        name="UserManage" 
        component={UserManage} 
        options={{ title: 'Quản lý User' }} 
      />

      <Stack.Screen 
        name="CategoryManage" 
        component={CategoryManage} 
        options={{ title: 'Quản lý loại' }} 
      />

      <Stack.Screen 
        name="Sanpham3Sqlite" 
        component={Sanpham3Sqlite} 
        options={{ title: 'Quản lý sản phẩm' }} 
      />

    </Stack.Navigator>
  );
}

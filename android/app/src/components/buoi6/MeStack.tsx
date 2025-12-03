import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeStackScreen from './MeStackScreen';
import LoginSqlite from './dbSqlite/LoginSqlite';
import SignupSqlite from './dbSqlite/SignupSqlite';
import AdminStack from './AdminStack';

export type MeStackParamList = {
  MeHome: undefined;
  LoginSqlite: undefined;
  SignupSqlite: undefined;
  AdminPanel: undefined;
};

const Stack = createNativeStackNavigator<MeStackParamList>();

const MeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MeHome"
        component={MeStackScreen}
        options={{ title: 'Tài khoản' }}
      />

      <Stack.Screen
        name="LoginSqlite"
        component={LoginSqlite}
        options={{ title: 'Đăng nhập' }}
      />

      <Stack.Screen
        name="SignupSqlite"
        component={SignupSqlite}
        options={{ title: 'Đăng ký' }}
      />

      <Stack.Screen
        name="AdminPanel"
        component={AdminStack}
        options={{ title: 'Quản trị viên' }}
      />
    </Stack.Navigator>
  );
};

export default MeStack;

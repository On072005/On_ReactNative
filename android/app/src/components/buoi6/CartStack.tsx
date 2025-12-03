import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartStackScreen from './CartStackScreen';

export type CartStackParamList = {
  CartHome: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartHome"
        component={CartStackScreen}
        options={{ title: 'Giỏ hàng' }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;

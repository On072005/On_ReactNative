import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryManage from './CategoryManage';
import Sanpham3Sqlite from './Sanpham3Sqlite';
import ProductsByCategoryScreen from './ProductsByCategoryScreen';
import ProductDetailScreen from './ProductDetailScreen';

export type CategoryStackParamList = {
  CategoryManage: undefined;
  Sanpham3Sqlite: { categoryId?: number };
  ProductsByCategory: { categoryId: number; categoryName?: string };
  ProductDetail: { product: any };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export default function CategoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoryManage" component={CategoryManage} />
      <Stack.Screen name="Sanpham3Sqlite" component={Sanpham3Sqlite} />
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategoryScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

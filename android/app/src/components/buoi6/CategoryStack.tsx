import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryStackScreen from './CategoryStackScreen';
import ProductsByCategoryScreen from './ProductsByCategoryScreen';
import ProductDetailScreen from './ProductDetailScreen';

export type CategoryStackParamList = {
  CategoryHome: undefined;
  ProductsByCategory: { categoryId: number; categoryName: string };
  ProductDetail: { productId: number };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

const CategoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryHome"
        component={CategoryStackScreen}
        options={{
          title: 'Categories',
        }}
      />

      <Stack.Screen
        name="ProductsByCategory"
        component={ProductsByCategoryScreen}
        options={({ route }) => ({
          title: route.params.categoryName,
        })}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          title: 'Product Detail',
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoryStack;

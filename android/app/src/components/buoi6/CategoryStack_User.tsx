import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsByCategoryScreen from './ProductsByCategoryScreen';
import ProductDetailScreen from './ProductDetailScreen';

export type CategoryStackParamList = {
  ProductsByCategory: { categoryId: number; categoryName: string };
  ProductDetail: { product: any };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export default function CategoryStack_User() {
  return (
    <Stack.Navigator
      initialRouteName="ProductsByCategory"   // ✅ BẮT BUỘC CÓ
    >
      <Stack.Screen
        name="ProductsByCategory"
        component={ProductsByCategoryScreen}
        initialParams={{                    // ✅ FIX LỖI CRASH TẠI ĐÂY
          categoryId: 0,
          categoryName: 'Tất cả sản phẩm',
        }}
        options={({ route }) => ({
          title: route.params?.categoryName || 'Danh mục',
        })}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Chi tiết sản phẩm' }}
      />
    </Stack.Navigator>
  );
}

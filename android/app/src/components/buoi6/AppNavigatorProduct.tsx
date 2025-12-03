import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryManage from './CategoryManage';
import Sanpham3Sqlite from './Sanpham3Sqlite';
import ProductDetailScreen from './ProductDetailScreen';
import ProductsByCategoryScreen from './ProductsByCategoryScreen';

export type RootStackParamList = {
  CategoryManage: undefined;
  Sanpham3Sqlite: { categoryId?: number };
  ProductDetail: { product: any };
  ProductsByCategory: { categoryId: number; categoryName?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Quản lý loại */}
        <Stack.Screen
          name="CategoryManage"
          component={CategoryManage}
          options={{ title: 'Quản lý loại sản phẩm' }}
        />

        {/* Thêm sản phẩm */}
        <Stack.Screen
          name="Sanpham3Sqlite"
          component={Sanpham3Sqlite}
          options={{ title: 'Thêm sản phẩm' }}
        />

        {/* Danh sách theo loại */}
        <Stack.Screen
          name="ProductsByCategory"
          component={ProductsByCategoryScreen}
        />

        {/* Chi tiết sản phẩm */}
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

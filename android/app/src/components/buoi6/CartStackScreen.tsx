import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from './CartStack';

type Props = NativeStackScreenProps<CartStackParamList, 'CartHome'>;

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// Fake data giỏ hàng
const initialCart: CartItem[] = [
  { id: 1, name: 'Áo thun', price: 150000, quantity: 1 },
  { id: 2, name: 'Giày sneaker', price: 850000, quantity: 1 },
];

const CartStackScreen = ({ navigation }: Props) => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it))
    );
  };

  const decrease = (id: number) => {
    setCart((prev) =>
      prev.map((it) =>
        it.id === id && it.quantity > 1
          ? { ...it, quantity: it.quantity - 1 }
          : it
      )
    );
  };

  const total = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>

            <View style={styles.row}>
              <TouchableOpacity style={styles.btn} onPress={() => decrease(item.id)}>
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qty}>{item.quantity}</Text>

              <TouchableOpacity style={styles.btn} onPress={() => increase(item.id)}>
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Tổng cộng: {total.toLocaleString()}đ</Text>
      </View>
    </View>
  );
};

export default CartStackScreen;

// ========== Styles ==========
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cartItem: {
    padding: 16,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '600' },
  price: { marginTop: 4, color: '#555' },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { fontSize: 18, fontWeight: 'bold' },
  qty: { marginHorizontal: 10, fontSize: 16 },
  totalBox: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: { fontSize: 20, fontWeight: '700' },
});

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { fetchProducts, addProduct, deleteProduct } from './database';
import type { Product } from './database';

export default function ProductManage({ route }: any) {
  const categoryId = route?.params?.categoryId ?? null;

  const [list, setList] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('hinh1.jpg');

  // ---- Load danh sách sản phẩm ----
  const load = async () => {
    const p = await fetchProducts();
    const filtered = categoryId ? p.filter(x => x.categoryId === categoryId) : p;
    setList(filtered);
  };

  useEffect(() => {
    load();
  }, []);

  // ---- Thêm sản phẩm mới ----
  const addNew = async () => {
    if (!name || !price) return;

    await addProduct({
      name,
      price: Number(price),
      img,
      categoryId: categoryId ?? 1
    });

    setName('');
    setPrice('');
    load();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
        Thêm sản phẩm
      </Text>

      <TextInput
        placeholder="Tên"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8 }}
      />

      <TextInput
        placeholder="Giá"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginTop: 6 }}
      />

      <TouchableOpacity onPress={addNew} style={{ marginTop: 10 }}>
        <Text style={{ padding: 10, backgroundColor: 'green', color: 'white' }}>
          ➕ Thêm
        </Text>
      </TouchableOpacity>

      {/* DANH SÁCH SẢN PHẨM */}
      <FlatList
        style={{ marginTop: 20 }}
        data={list}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }: { item: Product }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text>{item.name} - {item.price} đ</Text>

            <TouchableOpacity
              onPress={() => {
                deleteProduct(item.id);
                load();
              }}
              style={{ marginTop: 5 }}
            >
              <Text style={{ color: 'red' }}>🗑 Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

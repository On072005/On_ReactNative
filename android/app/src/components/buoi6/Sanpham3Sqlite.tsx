//danh sách sản phẩm hiển thị bằng FlatList
import React, { useEffect, useState } from 'react';
import {
  Alert, View, Text, TextInput, TouchableOpacity,
  Image, ScrollView, StyleSheet, FlatList
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';

import {
  initDatabase,
  fetchCategories,
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  Product, Category, searchProductsByNameOrCategory,
} from './database';

import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigatorProduct';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sanpham3Sqlite'>;

const Sanpham3Sqlite = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  //  ============================
  //  NHẬN categoryId từ CategoryManage
  //  ============================
  useEffect(() => {
    if (route.params?.categoryId) {
      console.log("➡️ Nhận categoryId:", route.params.categoryId);
      setCategoryId(route.params.categoryId);
    }
  }, [route.params]);

  // Load DB
  useEffect(() => {
    initDatabase(() => {
      loadData();
    });
  }, []);

  const loadData = async () => {
    const cats = await fetchCategories();
    const prods = await fetchProducts();
    setCategories(cats);
    setProducts(prods.reverse());
  };

  const handleAddOrUpdate = async () => {
    if (!name.trim() || !price.trim())
      return;

    const productData = {
      name,
      price: parseFloat(price),
      img: imageUri || 'hinh1.jpg',
      categoryId,
    };

    try {
      if (editingId) {
        await updateProduct({ id: editingId, ...productData });
        setEditingId(null);
      } else {
        await addProduct(productData);
      }

      setName('');
      setPrice('');
      setCategoryId(route.params?.categoryId || 1);
      setImageUri(null);

      loadData();

    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleEdit = (id: number) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;

    setName(p.name);
    setPrice(p.price.toString());
    setCategoryId(p.categoryId);
    setImageUri(p.img);
    setEditingId(p.id);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có chắc muốn xóa?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa", style: "destructive",
          onPress: async () => {
            await deleteProduct(id);
            loadData();
          }
        }
      ]
    );
  };

  const handlePickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (res) => {
      if (res.assets && res.assets[0]?.uri) {
        setImageUri(res.assets[0].uri);
      }
    });
  };

  const getImageSource = (img: string) => {
    if (img.startsWith("file://")) return { uri: img };

    switch (img) {
      case 'hinh1.jpg': return require('./hinh1.jpg');
      case 'hinh2.jpg': return require('./hinh2.jpg');
      default: return require('./hinh1.jpg');
    }
  };

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) return loadData();

    const results = await searchProductsByNameOrCategory(keyword);
    setProducts(results.reverse());
  };

const renderItem = ({ item }: { item: Product }) => (
  <View style={styles.card}>

    {/* ICON GÓC PHẢI */}
    <View style={styles.actionIcons}>
      <TouchableOpacity onPress={() => handleEdit(item.id)}>
        <Text style={styles.icon}>✏️</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.icon}>❌</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { product: item })}>
      <Image source={getImageSource(item.img)} style={styles.image} />
    </TouchableOpacity>

    <View style={styles.cardInfo}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>
    </View>

  </View>
);

return (
  <View style={{ flex: 1, backgroundColor: "#F5F6FA" }}>
    <ScrollView contentContainerStyle={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Quản lý sản phẩm</Text>

      {/* FORM CARD */}
      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Thông tin sản phẩm</Text>

        <TextInput
          style={styles.input}
          placeholder="Tên sản phẩm"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Giá sản phẩm"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <RNPickerSelect
          onValueChange={(value) => setCategoryId(value)}
          items={categories.map((c) => ({ label: c.name, value: c.id }))}
          value={categoryId}
          style={{ inputAndroid: styles.input, inputIOS: styles.input }}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
          <Text style={styles.imagePickerText}>
            {imageUri ? "Chọn lại ảnh" : "Chọn ảnh"}
          </Text>
        </TouchableOpacity>

        {imageUri && (
          <Image
            source={getImageSource(imageUri)}
            style={styles.selectedImage}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleAddOrUpdate}>
          <Text style={styles.buttonText}>
            {editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>

      <TextInput
        style={styles.input}
        placeholder="Tìm theo tên hoặc danh mục..."
        onChangeText={handleSearch}
      />

      {/* PRODUCT LIST */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 150 }}
      />
    </ScrollView>
  </View>
);

};


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#007AFF",
  },

  formCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  imagePicker: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 14,
  },

  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  selectedImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  button: {
    backgroundColor: "#34C759",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  cardInfo: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },

  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  productPrice: {
    marginTop: 4,
    fontSize: 15,
    color: "#007AFF",
  },
actionIcons: {
  position: "absolute",
  top: 8,
  right: 8,
  flexDirection: "row",
},

icon: {
  fontSize: 20,
  marginLeft: 10,
},

  iconRow: {
    flexDirection: "row",
    marginTop: 10,
  },


});


export default Sanpham3Sqlite;

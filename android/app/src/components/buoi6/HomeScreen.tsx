// HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { Product, Category, initDatabase, fetchProducts, fetchCategories } from './database';

import Swiper from 'react-native-swiper';
import CategorySelector from './CategorySelector';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const bannerImages = [
  require('./banner1.jpg'),
  require('./banner2.jpg'),
  require('./banner3.jpg'),
  require('./banner4.jpg'),
  require('./banner5.jpg'),
];

// Convert ảnh sản phẩm
const getImageSource = (img: string) => {
  if (img.startsWith('file://')) return { uri: img };

  switch (img) {
    case 'hinh1.jpg': return require('./hinh1.jpg');
    case 'hinh2.jpg': return require('./hinh2.jpg');
    case 'hinh3.jpg': return require('./hinh3.jpg');
    case 'hinh4.jpg': return require('./hinh4.jpg');
    default: return require('./hinh1.jpg');
  }
};

export default function HomeScreen({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // FILTER STATES
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    initDatabase(() => loadData());
  }, []);

  const loadData = async () => {
    const prods = await fetchProducts();
    const cats = await fetchCategories();

    setProducts(prods);
    setCategories([{ id: 0, name: 'Tất cả' }, ...cats]);
  };

  // =======================
  //       LỌC SẢN PHẨM
  // =======================
  const filteredProducts = products.filter((p) => {
    // Tìm kiếm tên
    if (searchText && !p.name.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }

    // Lọc danh mục
    if (selectedCategoryId !== 0 && p.categoryId !== selectedCategoryId) {
      return false;
    }

    // Lọc giá min
    if (minPrice && p.price < Number(minPrice)) {
      return false;
    }

    // Lọc giá max
    if (maxPrice && p.price > Number(maxPrice)) {
      return false;
    }

    return true;
  });

  // =======================
  //       UI SẢN PHẨM
  // =======================
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      style={styles.productCard}
    >
      <Image source={getImageSource(item.img)} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Mua Ngay</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Banner Slider */}
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination={true}
        dotColor="#ffffff99"
        activeDotColor="#ff3b6b"
        height={160}
        style={{ marginBottom: 12 }}
      >
        {bannerImages.map((img, idx) => (
          <Image key={idx} source={img} style={styles.banner} />
        ))}
      </Swiper>

      {/* Menu */}
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={styles.menuText}>Giới thiệu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.menuText}>Danh mục</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        placeholder="Tìm kiếm sản phẩm..."
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Category Selector */}
      <CategorySelector
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={(id) => setSelectedCategoryId(id)}
      />

      {/* Lọc theo giá */}
      <View style={styles.priceFilterRow}>
        <TextInput
          placeholder="Giá thấp nhất"
          keyboardType="numeric"
          style={styles.priceInput}
          value={minPrice}
          onChangeText={setMinPrice}
        />

        <TextInput
          placeholder="Giá cao nhất"
          keyboardType="numeric"
          style={styles.priceInput}
          value={maxPrice}
          onChangeText={setMaxPrice}
        />
      </View>

      <Text style={styles.welcomeText}>Danh sách sản phẩm</Text>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

// ======================================================
// STYLE
// ======================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },

  banner: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 4,
    marginBottom: 10,
  },

  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  searchInput: {
    backgroundColor: '#fff',
    elevation: 3,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 15,
  },

  priceFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  priceInput: {
    width: '48%',
    backgroundColor: '#fff',
    elevation: 2,
    padding: 10,
    borderRadius: 10,
  },

  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
    color: '#444',
  },

  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 4,
  },

  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },

  productName: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },

  productPrice: {
    fontSize: 15,
    color: '#E91E63',
    fontWeight: 'bold',
    marginVertical: 8,
  },

  buyButton: {
    width: '100%',
    backgroundColor: '#ff3b6b',
    paddingVertical: 10,
    borderRadius: 8,
  },

  buyButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});

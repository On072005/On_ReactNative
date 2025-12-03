import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type MeStackParamList = {
  MeHome: undefined;
  LoginSqlite: undefined;
  SignupSqlite: undefined;

  // thêm các trang điều hướng
  Cart: undefined;
  Orders: undefined;
  Address: undefined;
  Wishlist: undefined;
  Settings: undefined;
};

type Props = NativeStackScreenProps<MeStackParamList, 'MeHome'>;

const MeStackScreen = ({ navigation }: Props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    const unsub = navigation.addListener('focus', loadUser);
    return unsub;
  }, [navigation]);

  const logout = async () => {
    await AsyncStorage.multiRemove(['loggedInUser', 'userRole']);
    setUser(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>

      {user ? (
        <>
          {/* THÔNG TIN NGƯỜI DÙNG */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thông tin cá nhân</Text>
            <Text style={styles.item}>👤 Username: {user.username}</Text>
            <Text style={styles.item}>📧 Email: user@example.com</Text>
            <Text style={styles.item}>📱 Phone: 0123 456 789</Text>
          </View>

          {/* TÍNH NĂNG NHANH */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tiện ích</Text>

            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigation.navigate('Cart')}
            >
              <Text style={styles.linkText}>🛒 Giỏ hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigation.navigate('Orders')}
            >
              <Text style={styles.linkText}>📦 Đơn hàng của tôi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigation.navigate('Wishlist')}
            >
              <Text style={styles.linkText}>❤️ Danh sách yêu thích</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigation.navigate('Address')}
            >
              <Text style={styles.linkText}>📍 Sổ địa chỉ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.linkText}>⚙️ Cài đặt tài khoản</Text>
            </TouchableOpacity>
          </View>

          {/* GỢI Ý PHONG CÁCH */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Gợi ý outfit hôm nay</Text>
            <Text style={styles.item}>👕 Áo thun trắng</Text>
            <Text style={styles.item}>🧥 Khoác đen form rộng</Text>
            <Text style={styles.item}>👖 Quần jean xanh</Text>
            <Text style={styles.item}>👟 Giày sneaker basic</Text>
          </View>

          {/* LOGOUT */}
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* NẾU CHƯA ĐĂNG NHẬP */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('LoginSqlite')}
          >
            <Text style={styles.btnText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('SignupSqlite')}
          >
            <Text style={styles.btnText}>Đăng ký</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default MeStackScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FAFB' },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center'
  },

  card: {
    padding: 18,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  item: {
    fontSize: 16,
    marginBottom: 8,
  },

  linkItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },

  linkText: {
    fontSize: 17,
  },

  btn: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  btnText: { color: 'white', fontSize: 18, fontWeight: '600' },

  logoutBtn: {
    backgroundColor: '#EF4444',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 40,
  },

  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

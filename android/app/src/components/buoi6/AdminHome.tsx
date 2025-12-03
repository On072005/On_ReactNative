import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AdminHome() {
  const navigation = useNavigation<any>();

  // ---- LOGOUT ----
const logout = async () => {
  await AsyncStorage.multiRemove(['loggedInUser', 'userRole']);

  const rootNav = navigation.getParent() ?? navigation;

  rootNav.reset({
    index: 0,
    routes: [{ name: "LoginSqlite" }],
  });
};

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* CARD 1: Tổng quan */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tổng quan hệ thống</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Sản phẩm</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Đơn hàng</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Người dùng</Text>
          </View>
        </View>
      </View>

      {/* CARD 2: Biểu đồ giả lập */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Biểu đồ doanh thu (giả lập)</Text>
        
        <View style={styles.chartBox}>
          <View style={[styles.bar, { height: 40 }]} />
          <View style={[styles.bar, { height: 80 }]} />
          <View style={[styles.bar, { height: 55 }]} />
          <View style={[styles.bar, { height: 110 }]} />
          <View style={[styles.bar, { height: 65 }]} />
        </View>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
    width: '30%',
  },

  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  // Fake chart
  chartBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 150,
    paddingHorizontal: 10,
  },

  bar: {
    width: 20,
    backgroundColor: '#60A5FA',
    borderRadius: 6,
  },

  // Logout
  logoutBtn: {
    backgroundColor: '#EF4444',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 40,
  },

  logoutText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

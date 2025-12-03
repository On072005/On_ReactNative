import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList } from './AppTabs';

const Header = () => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>();

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const loggedInUser = await AsyncStorage.getItem('loggedInUser');
        setUser(loggedInUser ? JSON.parse(loggedInUser) : null);
      };
      loadUser();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    setUser(null);
    navigation.navigate('LoginSqlite');
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Welcome {user ? user.username : 'Guest'}</Text>

      {user ? (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('LoginSqlite')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4CAF50',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#FF5733',
    borderRadius: 6,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    padding: 8,
    backgroundColor: '#2196F3',
    borderRadius: 6,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header;

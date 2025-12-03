// LoginSqlite.tsx (full)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { getUserByCredentials } from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginSqlite = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    const user = await getUserByCredentials(username, password);

    if (!user) {
      Alert.alert('Error', 'Invalid username or password');
      return;
    }

    // Save user
    await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
    await AsyncStorage.setItem('userRole', user.role);

    Alert.alert('Success', `Welcome ${user.username}!`);

    if (user.role === 'admin') {
      // Admin -> chuyển hẳn sang AdminTabs (bắt đầu từ root)
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminTabs' }],
      });
      return;
    }

    // user -> về lại UserTabs root: ta reset về UserTabs để refresh (hoặc có thể navigation.goBack())
    navigation.reset({
      index: 0,
      routes: [{ name: 'UserTabs' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('SignupSqlite')}>
        <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginSqlite;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 28, textAlign: 'center', fontWeight: 'bold', marginBottom: 30 },
  input: { padding: 12, borderWidth: 1.2, marginBottom: 18, borderRadius: 8, borderColor: '#ccc', fontSize: 16 },
  loginButton: { backgroundColor: '#2196F3', padding: 14, borderRadius: 10, alignItems: 'center' },
  loginText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerButton: { marginTop: 20, alignItems: 'center' },
  registerText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
});

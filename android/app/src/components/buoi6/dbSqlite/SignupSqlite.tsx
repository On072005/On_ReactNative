import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addUser } from '../database';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SignupSqlite = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState<'admin' | 'user'>('user'); // mặc định user

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const success = await addUser(username, password, role);

    if (success) {
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('LoginSqlite');
    } else {
      Alert.alert('Error', 'Signup failed. Username may already exist.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>

      {/* ⭐ Thêm nút điều hướng sang Login */}
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('LoginSqlite')}
      >
        <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupSqlite;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginBottom: 25 },
  input: { padding: 10, borderWidth: 1, marginBottom: 15, borderRadius: 5 },
  signupButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  signupText: { color: '#fff', fontSize: 18 },

  // ⭐ Style cho nút điều hướng Login
  loginLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

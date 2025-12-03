import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {HomeStackParamList} from './types';

type DetailsScreenProps = NativeStackScreenProps<HomeStackParamList, 'Details'>;

const DetailsScreen = ({ route }: DetailsScreenProps) => {
  const { product } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi Tiết Sản Phẩm</Text>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.text}>ID: {product.id}</Text>
      <Text style={styles.text}>Tên: {product.name}</Text>
      <Text style={styles.text}>Giá: {product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
      },
      text: {
        fontSize: 16,
        marginVertical: 5
      },
      productImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 20
      },
});

export default DetailsScreen;
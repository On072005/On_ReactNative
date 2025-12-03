// ================== CATEGORY MANAGER (ONE FILE VERSION) ======================

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import {
  fetchCategories,
  updateCategory,
  deleteCategory,
  insertCategory,
} from "./database";

import type { Category } from "./database";

export default function CategoryManager({ navigation }: any) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editName, setEditName] = useState("");
  const [newName, setNewName] = useState("");

  // ========== LOAD CATEGORY ==========
  const load = async () => {
    const list = await fetchCategories();
    setCategories(list);
  };

  useEffect(() => {
    load();
  }, []);

  // ========== START EDIT ==========
  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  // ========== SAVE EDIT ==========
  const saveEdit = async (id: number) => {
    if (!editName.trim()) {
      Alert.alert("Lỗi", "Tên danh mục không được trống");
      return;
    }
    await updateCategory(id, editName.trim());
    setEditingId(null);
    setEditName("");
    load();
  };

  // ========== DELETE ==========
  const onDelete = (id: number) => {
    Alert.alert("Xóa danh mục?", "Bạn chắc chắn muốn xóa?", [
      { text: "Hủy" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await deleteCategory(id);
          load();
        },
      },
    ]);
  };

  // ========== ADD NEW ==========
  const addCategory = async () => {
    if (!newName.trim()) {
      Alert.alert("Lỗi", "Tên danh mục không được trống");
      return;
    }

    await insertCategory(newName.trim());
    setNewName("");
    load();
  };

  // ========== RENDER ITEM ==========
  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.card}>
      {editingId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            value={editName}
            onChangeText={setEditName}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => saveEdit(item.id)}
              style={[styles.btn, styles.saveBtn]}
            >
              <Text style={styles.btnText}>Lưu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setEditingId(null)}
              style={[styles.btn, styles.cancelBtn]}
            >
              <Text style={styles.btnText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => startEdit(item)}
              style={[styles.btn, styles.editBtn]}
            >
              <Text style={styles.btnText}>Sửa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              style={[styles.btn, styles.deleteBtn]}
            >
              <Text style={styles.btnText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ----------- THÊM SẢN PHẨM CHO LOẠI ---------------- */}
      <TouchableOpacity
        style={styles.addProductBtn}
        onPress={() =>
          navigation.navigate("Sanpham3Sqlite", {
            categoryId: item.id, // auto select category
          })
        }
      >
        <Text style={{ fontSize: 14 }}>➕ Thêm sản phẩm cho loại này</Text>
      </TouchableOpacity>
    </View>
  );

  // ================== UI =====================

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Quản lý loại sản phẩm</Text>

      {/* ADD NEW CATEGORY */}
      <View style={styles.addCard}>
        <Text style={styles.section}>Thêm loại mới</Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập tên loại..."
          value={newName}
          onChangeText={setNewName}
        />

        <TouchableOpacity onPress={addCategory} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* CATEGORY LIST */}
      <FlatList
        data={categories}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

// ====================== STYLE =========================

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },

  addCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
  },

  btn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  editBtn: { backgroundColor: "#4D96FF" },
  deleteBtn: { backgroundColor: "#FF6F6F" },
  saveBtn: { backgroundColor: "#6ECB63" },
  cancelBtn: { backgroundColor: "#999" },

  btnText: { color: "#fff", fontWeight: "700" },

  addBtn: {
    marginTop: 10,
    backgroundColor: "#4D96FF",
    paddingVertical: 10,
    borderRadius: 8,
  },

  addBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  addProductBtn: {
    marginTop: 8,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchUsers, updateUser, deleteUser } from './database';
import type { User } from './database';

export default function UserManage() {
  const [list, setList] = useState<User[]>([]);
  const [mode, setMode] = useState<'user' | 'admin'>('user'); // <-- 2 MÀN

  // ---- Load danh sách user ----
  const load = async () => {
    const users = await fetchUsers();
    setList(users);
  };

  useEffect(() => {
    load();
  }, []);

  // ---- Đổi giữa admin/user ----
  const updateRole = async (item: User) => {
    const newRole = item.role === 'admin' ? 'user' : 'admin';
    await updateUser({ ...item, role: newRole });
    load();
  };

  // ---- Xoá user ----
  const removeUser = async (id: number) => {
    await deleteUser(id);
    load();
  };

  // ---- Lọc theo màn ----
  const filteredList = list.filter((u) => u.role === mode);

return (
  <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f6fa" }}>

    {/* ---------------- SWITCH BUTTON ---------------- */}
    <View style={{ flexDirection: "row", marginBottom: 18 }}>
      {["user", "admin"].map((t) => (
        <TouchableOpacity
          key={t}
          onPress={() => setMode(t as any)}
          style={{
            flex: 1,
            paddingVertical: 12,
            backgroundColor: mode === t ? "#4a90e2" : "#dfe6e9",
            borderRadius: 10,
            marginRight: t === "user" ? 10 : 0,
            alignItems: "center",
          }}
        >
          <Text style={{ color: mode === t ? "white" : "#2d3436", fontWeight: "bold" }}>
            {t === "user" ? "👤 Users" : "🛡 Admins"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    {/* ---------------- TITLE ---------------- */}
    <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
      {mode === "user" ? "User Accounts" : "Admin Accounts"}
    </Text>

    {/* ---------------- LIST ---------------- */}
    <FlatList
      data={filteredList}
      keyExtractor={(i) => i.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 12,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          {/* USERNAME + ROLE BADGE */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>{item.username}</Text>

            <View
              style={{
                backgroundColor: item.role === "admin" ? "#e74c3c33" : "#0984e333",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: item.role === "admin" ? "#e74c3c" : "#0984e3",
                }}
              >
                {item.role.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* BUTTONS */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            {/* CHANGE ROLE */}
            <TouchableOpacity
              onPress={() => updateRole(item)}
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: "#74b9ff",
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600", color: "white" }}>🔄 Change Role</Text>
            </TouchableOpacity>

            {/* DELETE */}
            <TouchableOpacity
              onPress={() => removeUser(item.id)}
              style={{
                width: 55,
                backgroundColor: "#d63031",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  </View>
);

}

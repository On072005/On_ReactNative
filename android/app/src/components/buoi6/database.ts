import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db: SQLiteDatabase | null = null;

const getDb = async (): Promise<SQLiteDatabase> => {
  if (db) return db;
  db = await SQLite.openDatabase({ name: 'myDatabase.db', location: 'default' });
  return db;
};

// ==================== TYPES ====================

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  categoryId: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
};

// ==================== INITIAL DATA ====================

export const initialCategories: Category[] = [
  { id: 1, name: 'Áo' },
  { id: 2, name: 'Giày' },
  { id: 3, name: 'Balo' },
  { id: 4, name: 'Mũ' },
  { id: 5, name: 'Túi' },
];


const initialProducts: Product[] = [
  { id: 1, name: 'Áo sơ mi', price: 250000, img: 'hinh1.jpg', categoryId: 1 },
  { id: 2, name: 'Giày sneaker', price: 1100000, img: 'hinh1.jpg', categoryId: 2 },
  { id: 3, name: 'Balo thời trang', price: 490000, img: 'hinh1.jpg', categoryId: 3 },
  { id: 4, name: 'Mũ lưỡi trai', price: 120000, img: 'hinh1.jpg', categoryId: 4 },
  { id: 5, name: 'Túi xách nữ', price: 980000, img: 'hinh1.jpg', categoryId: 5 },
];

// ==================== INIT DATABASE ====================

export const initDatabase = async (onSuccess?: () => void): Promise<void> => {
  try {
    const database = await getDb();
    database.transaction(
      (tx) => {
        // Create categories
        tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT)');
        initialCategories.forEach((category) => {
          tx.executeSql('INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)', [
            category.id,
            category.name,
          ]);
        });

        // Create products
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price REAL,
            img TEXT,
            categoryId INTEGER,
            FOREIGN KEY (categoryId) REFERENCES categories(id)
          )`
        );

        initialProducts.forEach((product) => {
          tx.executeSql(
            'INSERT OR IGNORE INTO products (id, name, price, img, categoryId) VALUES (?, ?, ?, ?, ?)',
            [product.id, product.name, product.price, product.img, product.categoryId]
          );
        });

        // Create users
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT
          )`,
          [],
          () => console.log('✅ Users table created'),
          (_, error) => console.error('❌ Error creating users table:', error)
        );

        // Insert default admin
        tx.executeSql(
          `INSERT INTO users (username, password, role)
          SELECT 'admin', '123456', 'admin'
          WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin')`,
          [],
          () => console.log('✅ Admin user added'),
          (_, error) => console.error('❌ Error inserting admin:', error)
        );
      },
      (error) => console.error('❌ Transaction error:', error),
      () => {
        console.log('✅ Database initialized');
        if (onSuccess) onSuccess();
      }
    );
  } catch (error) {
    console.error('❌ initDatabase outer error:', error);
  }
};

// ==================== CATEGORY CRUD ====================

// INSERT CATEGORY
// =========================
export const insertCategory = async (name: string) => {
  try {
    const db = await getDb();

    await db.executeSql(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );

    console.log("✔ Category inserted:", name);
    return true;
  } catch (error) {
    console.error("❌ Error inserting category:", error);
    return false;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const database = await getDb();
    const results = await database.executeSql('SELECT * FROM categories');
    const items: Category[] = [];
    const rows = results[0].rows;
    for (let i = 0; i < rows.length; i++) items.push(rows.item(i));
    return items;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return [];
  }
};

// UPDATE CATEGORY
// =========================
export const updateCategory = async (id: number, newName: string) => {
  try {
    const db = await getDb();

    await db.executeSql(
      'UPDATE categories SET name = ? WHERE id = ?',
      [newName, id]
    );

    console.log('✔ Category updated:', id, newName);
    return true;
  } catch (error) {
    console.error('❌ Error updating category:', error);
    return false;
  }
};

// =========================
// DELETE CATEGORY
// =========================
export const deleteCategory = async (id: number) => {
  try {
    const db = await getDb();

    await db.executeSql('DELETE FROM categories WHERE id = ?', [id]);

    console.log('🗑 Category deleted:', id);
    return true;
  } catch (error) {
    console.error('❌ Error deleting category:', error);
    return false;
  }
};
// ==================== PRODUCT CRUD ====================

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const database = await getDb();
    const results = await database.executeSql('SELECT * FROM products');
    const items: Product[] = [];
    const rows = results[0].rows;
    for (let i = 0; i < rows.length; i++) items.push(rows.item(i));
    return items;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const database = await getDb();
    await database.executeSql(
      'INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)',
      [product.name, product.price, product.img, product.categoryId]
    );
    console.log('✅ Product added');
  } catch (error) {
    console.error('❌ Error adding product:', error);
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const database = await getDb();
    await database.executeSql(
      'UPDATE products SET name = ?, price = ?, categoryId = ?, img = ? WHERE id = ?',
      [product.name, product.price, product.categoryId, product.img, product.id]
    );
    console.log('✅ Product updated with image');
  } catch (error) {
    console.error('❌ Error updating product:', error);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const database = await getDb();
    await database.executeSql('DELETE FROM products WHERE id = ?', [id]);
    console.log('✅ Product deleted');
  } catch (error) {
    console.error('❌ Error deleting product:', error);
  }
};

export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  try {
    const db = await getDb();
    const [results] = await db.executeSql('SELECT * FROM products WHERE categoryId = ?', [
      categoryId,
    ]);
    const products: Product[] = [];
    const rows = results.rows;
    for (let i = 0; i < rows.length; i++) products.push(rows.item(i));
    return products;
  } catch (error) {
    console.error('❌ Error fetching products by category:', error);
    return [];
  }
};

export const searchProductsByNameOrCategory = async (
  keyword: string
): Promise<Product[]> => {
  try {
    const db = await getDb();
    const [results] = await db.executeSql(
      `
        SELECT products.* FROM products
        JOIN categories ON products.categoryId = categories.id
        WHERE products.name LIKE ? OR categories.name LIKE ?
      `,
      [`%${keyword}%`, `%${keyword}%`]
    );

    const products: Product[] = [];
    const rows = results.rows;
    for (let i = 0; i < rows.length; i++) products.push(rows.item(i));
    return products;
  } catch (error) {
    console.error('❌ Error searching products:', error);
    return [];
  }
};

// ==================== USER CRUD (FULL + HOÀN CHỈNH) ====================

// ---- Thêm user ----
export const addUser = async (
  username: string,
  password: string,
  role: 'admin' | 'user'
): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.executeSql(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );
    console.log('✅ User added');
    return true;
  } catch (error) {
    console.error('❌ Error adding user:', error);
    return false;
  }
};

// ---- Cập nhật user ----
export const updateUser = async (user: User): Promise<void> => {
  try {
    const db = await getDb();
    await db.executeSql(
      'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?',
      [user.username, user.password, user.role, user.id]
    );
    console.log('✅ User updated');
  } catch (error) {
    console.error('❌ Error updating user:', error);
  }
};

// ---- Xóa user ----
export const deleteUser = async (id: number): Promise<void> => {
  try {
    const db = await getDb();
    await db.executeSql('DELETE FROM users WHERE id = ?', [id]);
    console.log('✅ User deleted');
  } catch (error) {
    console.error('❌ Error deleting user:', error);
  }
};

// ---- Lấy danh sách user ----
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const db = await getDb();
    const [results] = await db.executeSql('SELECT * FROM users');

    const users: User[] = [];
    const rows = results.rows;

    for (let i = 0; i < rows.length; i++) {
      users.push(rows.item(i) as User);
    }

    return users;
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return [];
  }
};

// ---- Lấy user theo username + password ----
export const getUserByCredentials = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const db = await getDb();
    const [results] = await db.executeSql(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (results.rows.length > 0) return results.rows.item(0) as User;
    return null;
  } catch (error) {
    console.error('❌ Error getting user by credentials:', error);
    return null;
  }
};

// ---- Lấy user theo ID ----
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const db = await getDb();
    const [results] = await db.executeSql('SELECT * FROM users WHERE id = ?', [id]);

    if (results.rows.length > 0) return results.rows.item(0) as User;
    return null;
  } catch (error) {
    console.error('❌ Error getting user by id:', error);
    return null;
  }
};

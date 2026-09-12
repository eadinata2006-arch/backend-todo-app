# Todo App Backend

Backend RESTful API untuk aplikasi Todo List, dibangun menggunakan **Express.js**, **TypeScript**, dan **MySQL**, dengan autentikasi berbasis **JWT** dan password hashing menggunakan **bcrypt**.

## Tech Stack

- Node.js + Express.js
- TypeScript
- MySQL (mysql2)
- JWT (jsonwebtoken) untuk autentikasi
- bcrypt untuk hashing password

## Struktur Folder

```
backend/
├── database.sql          # Script SQL untuk membuat database & tabel
├── .env.example           # Contoh variabel environment
├── package.json
├── tsconfig.json
└── src/
    ├── config/
    │   └── db.ts               # Koneksi pool MySQL
    ├── models/
    │   ├── userModel.ts        # Query terkait tabel users
    │   └── todoModel.ts        # Query terkait tabel todos
    ├── middlewares/
    │   ├── validator.ts        # Validasi input request
    │   └── authMiddleware.ts   # Verifikasi JWT
    ├── controllers/
    │   ├── authController.ts   # Logika register & login
    │   └── todoController.ts   # Logika get & create todo
    ├── routes/
    │   └── api.ts               # Deklarasi seluruh endpoint
    ├── app.ts                   # Konfigurasi Express (middleware global)
    └── server.ts                # Entry point aplikasi
```

## 1. Persiapan (Prerequisites)

Pastikan sudah terinstall di komputer kamu:

- [Node.js](https://nodejs.org/) versi 18 ke atas
- [MySQL](https://www.mysql.com/) (bisa lewat XAMPP/Laragon/MySQL Server standalone)
- [Postman](https://www.postman.com/) (opsional, untuk testing API)

## 2. Clone Repository

```bash
git clone <url-repository-kamu>
cd backend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Konfigurasi Environment Variables

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Lalu sesuaikan isinya dengan konfigurasi MySQL di komputer kamu:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_app

PORT=5000

JWT_SECRET=ganti_dengan_kunci_rahasia_yang_panjang_dan_acak
```

| Variabel      | Keterangan                                              |
| ------------- | -------------------------------------------------------- |
| `DB_HOST`     | Host database MySQL (biasanya `localhost`)                |
| `DB_USER`     | Username MySQL (default XAMPP: `root`)                    |
| `DB_PASSWORD` | Password MySQL (default XAMPP: kosong)                    |
| `DB_NAME`     | Nama database yang dipakai (`todo_app`)                   |
| `PORT`        | Port tempat server Express berjalan                        |
| `JWT_SECRET`  | Kunci rahasia untuk sign & verify JWT (buat yang unik!)    |

## 5. Import Database

Ada dua cara untuk membuat database dan tabel yang dibutuhkan:

### Cara A — Lewat phpMyAdmin

1. Buka phpMyAdmin (misal `http://localhost/phpmyadmin`)
2. Klik tab **Import**
3. Pilih file `database.sql` dari folder project ini
4. Klik **Go** / **Kirim**

### Cara B — Lewat terminal / CLI MySQL

```bash
mysql -u root -p < database.sql
```

Script ini akan otomatis membuat:
- Database `todo_app`
- Tabel `users` (id, username, email, password, created_at)
- Tabel `todos` (id, user_id, task, is_done, created_at)

## 6. Menjalankan Server

### Mode development (auto-reload saat ada perubahan kode)

```bash
npm run dev
```

### Mode production

```bash
npm run build
npm start
```

Kalau berhasil, akan muncul log:

```
Server berjalan di http://localhost:5000
```

## 7. Dokumentasi Endpoint API

Base URL: `http://localhost:5000/api`

| Method | Endpoint         | Deskripsi                          | Perlu Token? |
| ------ | ---------------- | ----------------------------------- | ------------ |
| POST   | `/auth/register` | Registrasi user baru                | Tidak        |
| POST   | `/auth/login`    | Login, mengembalikan JWT token      | Tidak        |
| GET    | `/todos`         | Ambil semua todo milik user login   | Ya           |
| POST   | `/todos`         | Tambah todo baru                    | Ya           |

### Contoh Request

**Register**
```json
POST /api/auth/register
{
  "username": "faishal",
  "email": "faishal@example.com",
  "password": "rahasia123"
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "faishal@example.com",
  "password": "rahasia123"
}
```

Response login akan mengembalikan `token` yang harus dipakai di header `Authorization` untuk endpoint yang butuh login:

```
Authorization: Bearer <token>
```

**Tambah Todo**
```json
POST /api/todos
Header: Authorization: Bearer <token>

{
  "task": "Belajar Express dan TypeScript"
}
```

## 8. Testing dengan Postman

1. Buat request **Login**, kirim, lalu copy nilai `token` dari response
2. Di request lain (`GET /api/todos`, `POST /api/todos`), buka tab **Authorization**, pilih tipe **Bearer Token**, isi dengan token tadi
3. (Opsional) Supaya token ter-copy otomatis setiap login, tambahkan script berikut di tab **Scripts → Post-response** pada request Login:

```javascript
const response = pm.response.json();

if (response.token) {
  pm.globals.set("jwt_token", response.token);
}
```

Lalu di request lain, isi Bearer Token dengan `{{jwt_token}}`.

## Troubleshooting

| Masalah                                  | Kemungkinan Penyebab                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `Token tidak valid atau kadaluarsa`       | Token sudah expired, atau `JWT_SECRET` berubah setelah token diterbitkan     |
| `Unknown column 'created_at'...`          | Struktur tabel di database tidak sesuai `database.sql`, cek ulang import DB  |
| `ER_ACCESS_DENIED_ERROR` saat connect DB  | `DB_USER` / `DB_PASSWORD` di `.env` salah                                    |
| Server tidak bisa start, port dipakai     | Ganti `PORT` di `.env`, atau matikan proses lain yang memakai port tersebut  |

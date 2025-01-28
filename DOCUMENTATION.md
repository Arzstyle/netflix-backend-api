# Netflix Backend API Documentation

---

## **Anggota Kelompok**  
**Kelompok 5 - Project Netflix Backend API**  
| **Nama Anggota**                 | **NIM**       |  
|----------------------------------|---------------|  
| M Akbar Rizky Saputra            | 20230040236   |  
| Siti Rahma Alia                  | 20230040023   |  
| Desti                            | 20230040020   |  


---

## **Pendahuluan** 

### **Deskripsi Proyek**
Netflix Backend API adalah sebuah proyek backend yang dirancang untuk mendukung platform streaming film dan serial televisi. Proyek ini memungkinkan pengelolaan data film, serial, genre, pengguna, serta menyediakan fitur autentikasi, otorisasi, dan pengelolaan akun pengguna. Backend ini dibangun menggunakan teknologi modern untuk memastikan performa, skalabilitas, dan keamanan yang optimal.

Aplikasi ini dirancang bagi pengembang atau tim pengembang yang ingin membangun platform streaming digital yang lengkap. Dengan menyediakan API yang terstruktur dengan baik, proyek ini mempermudah pengelolaan data film, interaksi pengguna, serta integrasi dengan sistem frontend seperti aplikasi web atau mobile.

### **Tujuan Proyek**
1. **Mendukung Pengelolaan Film dan Serial**: Menyediakan endpoint untuk membuat, membaca, memperbarui, dan menghapus data film, serial, serta informasi genre.
2. **Autentikasi dan Autorisasi**: Mengimplementasikan sistem login, registrasi, serta verifikasi pengguna dengan keamanan menggunakan JWT (JSON Web Token).
3. **Efisiensi dan Skalabilitas**: Menerapkan praktik terbaik dalam pengembangan backend agar API dapat menangani lalu lintas data yang besar tanpa menurunkan performa.
4. **Pengelolaan Database yang Efisien**: Database dirancang dengan relasi antar tabel untuk memastikan integritas dan keterhubungan data, seperti antara film dan genre, atau watchlist pengguna.

### **Fitur Utama**
1. Manajemen Film : Pengguna dapat mengakses daftar film atau serial yang tersedia, menambahkan, atau menghapusnya sesuai kebutuhan.
2. Watchlist : Menyediakan fungsi untuk menambahkan atau menghapus film dari daftar tontonan pengguna.
3. Manajemen Genre : Endpoint untuk membuat, membaca, memperbarui, dan menghapus genre yang terhubung dengan film.
4. Sistem Pengguna : Registrasi, login, pengelolaan profil, serta verifikasi akun pengguna.
5. Keamanan : Sistem otentikasi berbasis token untuk memastikan keamanan akses API.
6. Error Handling yang Andal : Memberikan pesan kesalahan yang jelas kepada pengembang untuk mempermudah debugging.

### **Teknologi yang Digunakan**
Node.js & Express: Untuk pengembangan server backend yang cepat, ringan, dan efisien.
MySQL: Sebagai database relasional untuk menyimpan data film, genre, pengguna, dan watchlist.
JWT: Untuk autentikasi berbasis token yang aman.
Postman: Untuk pengujian dan dokumentasi endpoint API selama proses pengembangan.

---

## **Database**
Struktur database ini dirancang untuk memastikan data yang terorganisir, relasi yang jelas antar entitas, serta menjaga integritas data dengan menggunakan kunci utama dan kunci asing. Hal ini memungkinkan implementasi fitur aplikasi Netflix Clone seperti pengelolaan pengguna, daftar tontonan, dan data film secara efisien.

## **Struktur Table**
1. **Table `users`**:
  - Tabel Users menyimpan data pengguna yang terdaftar di aplikasi.
    Kolom Penjelasan:
    - `id`: Kolom kunci utama dengan tipe INT dan AUTO_INCREMENT, digunakan untuk mengidentifikasi setiap pengguna secara unik.
    - `name`: Nama pengguna, wajib diisi (NOT NULL), dengan panjang maksimum 100 karakter.
    - `email`: Email pengguna, wajib diisi (NOT NULL) dan bersifat unik (UNIQUE) untuk mencegah duplikasi.
    - `password`: Kata sandi pengguna yang disimpan dalam bentuk hash, wajib diisi (NOT NULL), dengan panjang maksimum 255 karakter.
    - `created_at`: Waktu pembuatan data pengguna, secara default diisi dengan waktu saat data ditambahkan (CURRENT_TIMESTAMP).
   
  **Contoh Query untuk Tabel `users`**
  ```sql
  CREATE TABLE Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

2. **Table `genres`**:
  - Tabel Genres menyimpan data kategori atau genre film.
    Kolom Penjelasan:
    - `id`: Kolom kunci utama dengan tipe INT dan AUTO_INCREMENT, digunakan untuk mengidentifikasi setiap genre secara unik.
    - `name`: Nama genre, wajib diisi (NOT NULL) dan bersifat unik (UNIQUE) untuk mencegah duplikasi.

     **Contoh Query untuk Tabel `genres`**
    ```sql
    CREATE TABLE Genres (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE
    );
    ```

3. **Table `movies`**:
   - Tabel Movies menyimpan data tentang film yang tersedia di aplikasi.
     Kolom Penjelasan:
     - `id`: Kolom kunci utama dengan tipe INT dan AUTO_INCREMENT, digunakan untuk mengidentifikasi setiap film secara unik.
     - `title`: Judul film, wajib diisi (NOT NULL), dengan panjang maksimum 255 karakter.
     - `description`: Deskripsi film, bersifat opsional (NULL) dan menggunakan tipe data TEXT untuk menyimpan teks panjang.
     - `genre_id`: Kunci asing (FOREIGN KEY) yang merujuk ke kolom id pada tabel Genres. Wajib diisi (NOT NULL) untuk memastikan setiap film memiliki genre.
     - `release_year`: Tahun rilis film, bersifat opsional (NULL), menggunakan tipe data YEAR.
  Relasi:
  => Jika genre terkait dihapus, semua film yang terkait dengan genre tersebut juga akan dihapus (ON DELETE CASCADE).

    **Contoh Query untuk Tabel `movies`**
   ```sql
   CREATE TABLE Movies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      genre_id INT NOT NULL,
      release_year YEAR,
      FOREIGN KEY (genre_id) REFERENCES Genres(id) ON DELETE CASCADE
  );
    ```

5. **Table `Watchlist`**:
   - Tabel Watchlist menyimpan daftar tontonan yang dipersonalisasi untuk setiap pengguna.
     Kolom Penjelasan:
     - `id`: Kolom kunci utama dengan tipe INT dan AUTO_INCREMENT, digunakan untuk mengidentifikasi setiap entri dalam daftar tontonan secara unik.
     - `user_id`: Kunci asing (FOREIGN KEY) yang merujuk ke kolom id pada tabel Users. Wajib diisi (NOT NULL) untuk mengaitkan daftar tontonan dengan pengguna tertentu.
     - `movie_id`: Kunci asing (FOREIGN KEY) yang merujuk ke kolom id pada tabel Movies. Wajib diisi (NOT NULL) untuk mengaitkan daftar tontonan dengan film tertentu.
     - `added_at`: Waktu ketika film ditambahkan ke daftar tontonan, secara default diisi dengan waktu saat data ditambahkan (CURRENT_TIMESTAMP).
  Relasi:
  => Jika pengguna terkait dihapus, semua daftar tontonan mereka juga akan dihapus (ON DELETE CASCADE).
Jika film terkait dihapus, semua daftar tontonan yang mencantumkan film tersebut juga akan dihapus (ON DELETE CASCADE).

    **Contoh Query untuk Tabel `Watchlist`**
   ```sql
   CREATE TABLE Watchlist (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      movie_id INT NOT NULL,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (movie_id) REFERENCES Movies(id) ON DELETE CASCADE
   );
   ```
   
## Relasi Antar Tabel
1. **Users ↔ Watchlist**:
   - user_id pada tabel Watchlist merujuk ke id pada tabel Users.
   - Relasi ini menghubungkan pengguna dengan daftar tontonan mereka.
2. **Movies ↔ Watchlist**:
   - movie_id pada tabel Watchlist merujuk ke id pada tabel Movies.
   - Relasi ini menghubungkan daftar tontonan dengan film tertentu.
3. **Genres ↔ Movies**:
   - genre_id pada tabel Movies merujuk ke id pada tabel Genres.
   - Relasi ini menghubungkan setiap film dengan genre tertentu.

---

### **Kerangka Project**

```
root/
│
├── controllers/
│   ├── genresController.js
│   ├── movieController.js
│   ├── userController.js
│   └── watchlistController.js
│
├── routes/
│   ├── genresRoutes.js
│   ├── movieRoutes.js
│   ├── userRoutes.js
│   └── watchlistRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│
├── db/
│   └── connection.js
│
├── models/
│   └── Watchlist.js
│
├── .env
├── .gitignore
├── server.js
├── package.json
└── package-lock.json
```

---

#### **1. Folder `controllers`**
Folder ini berisi logika utama (business logic) yang mengatur berbagai fitur aplikasi. Setiap file controller menangani fitur tertentu.

  - **`userController.js`**
    Mengelola data pengguna. Fungsi utama:
      - **`register`**:
        Memproses data registrasi pengguna baru.
      - **`login`**:
        Memverifikasi kredensial pengguna dan menghasilkan token JWT.
      - **`getAllUsers`**:
        Mengambil daftar semua user, beserta id, nama, email, dan passowrd.
      - **`getUserById`**:
        Mengambil data user dengan menggunakan id user.
        
  - **`genresController.js`**
    Mengelola data genre film. Fungsi utama:
      - **`getAllGenres`**:
        Mengambil daftar semua genre, berserta ID yang dimiliki oleh genres tersebut.
      - **`getGenreById`**:
        Mengambil data genre dengan menggunakan id genre.
      - **`createGenre`** :
        Menambahkan genre baru.
      - **`updateGenre`** :
        Mengupdate genre, yang menghasilkan genre baru atau colab setiap genre
      - **`deleteGenre`** :
        Menghapus genre.
        
  - **`movieController.js`**
    Menangani pengelolaan data film. Fungsi utama:
      - **`getAllMovies`**:
        Mengambil semua film.
      - **`getMovieById`**:
        Mendapatkan detail film berdasarkan ID.
      - **`createMovie`**:
        Menambahkan film baru.
      - **`updateMovie`**:
        Memperbarui data film.
      - **`deleteMovie`**:
        Menghapus film dari database.
        
  - **`watchlistController.js`**
    File ini bertanggung jawab untuk mengelola logika backend yang terkait dengan fitur "Watchlist". Fitur ini memungkinkan pengguna untuk menambahkan, melihat, atau menghapus film dari daftar tontonan mereka.
      - **`getAllByUserId**`**:
        Mengambil daftar film dalam watchlist pengguna tertentu berdasarkan userId.
      - **`getAllWatchlist`**:
        Mengambil semua data watchlist dari seluruh pengguna di sistem.
      - **`addMovieToWatchlist`**:
        Menambahkan film ke dalam watchlist pengguna.
      - **`removeMovieFromWatchlist`**:
        Menghapus film dari watchlist pengguna tertentu berdasarkan userId dan movieId.

---  

#### **2. Folder `routes`**
Folder ini berisi definisi endpoint API dan menghubungkan endpoint ke controller yang relevan.

  - **`userRoutes.js`**
   Fungsi Utama: Menangani endpoint terkait pengguna, seperti autentikasi dan pengelolaan data pengguna.
      - **`POST /register`**:
        Mendaftarkan pengguna baru.
      - **`POST /login`**:
        Login pengguna dengan memverifikasi kredensial.
      - **`GET /getAllUser`**:
        Mengambil daftar semua pengguna.
      - **`GET /findByEmai`*8:
        Mengambil data pengguna berdasarkan email.
      - **`GET /getUserById/:id`**:
        Mengambil data pengguna berdasarkan id.
      - **`DELETE /deleteUser/:id`**:
        Menghapus data user dengan menggunakan id.
        
  - **`movieRoutes.js`**
    Mendefinisikan rute untuk data genre, seperti:
      - **`Fungsi Utama`**:
        Menangani endpoint untuk pengelolaan data film (CRUD).
      - **`GET /getAll/`**:
        Mengambil daftar semua film.
      - **`GET /getMovieById/:id`**:
        Mengambil detail film berdasarkan id.
      - **`POST /create/`**:
        Menambahkan film baru ke dalam database.
      - **`PUT /update/:id`**:
        Memperbarui data film berdasarkan id.
      - **`DELETE /delete/:id`**:
        Menghapus film dari database berdasarkan id.
        
  - **`genresRoutes.js`**
    Fungsi Utama: Menangani endpoint untuk pengelolaan data genre (CRUD).
      - **`GET /getAllGenres`**:
        Mengambil daftar semua genre.
      - **`GET /getById/:id`**:
        Mengambil detail genre berdasarkan id.
      - **`POST /createGenre/`**:
        Menambahkan genre baru ke dalam database.
      - **`PUT /updateGenre/:id`**:
        Memperbarui data genre berdasarkan id.
      - **`DELETE /deleteGenre/:id`**:
        Menghapus genre dari database berdasarkan id.
        
  - **`watchlistRoutes.js`**
    Fungsi Utama: Menangani endpoint untuk pengelolaan watchlist pengguna. Setiap endpoint dilindungi oleh middleware autentikasi.
      - **`GET /getAllByUserId/:userId`**:
        Mengambil semua film dalam watchlist berdasarkan userId.
      - **`GET /getAllWatchlist`**:
        Mengambil semua data watchlist dari seluruh pengguna.
      - **`POST /addWatchlist`**:
        Menambahkan film ke watchlist pengguna.
      - **`DELETE /removeMovieFromWatchlist/:userId/:movieId`**:
        Menghapus film dari watchlist berdasarkan userId dan movieId.

---

#### **3. Folder `middleware`**
Berisi middleware yang digunakan untuk mengatur logika tambahan sebelum mengakses endpoint.
  - **`authMiddleware.js`**
    Middleware untuk memverifikasi token JWT guna memastikan bahwa pengguna terautentikasi sebelum mengakses rute tertentu.

---

#### **4. Folder `db`**
Folder ini bertanggung jawab mengelola koneksi ke database.
  - connection.js
    Menginisialisasi koneksi ke database menggunakan modul seperti mysql2.

---

#### **5. `models`**
Folder ini berisi model data untuk berinteraksi dengan tabel dalam database.

  - **`Watchlist.js`**
    Fungsi Utama: Mengelola data watchlist pengguna, termasuk menambahkan, membaca, dan menghapus item di watchlist.
      - **`getAllByUserId(userId, callback)`**:
        Mengambil daftar semua film dalam watchlist berdasarkan userId. Data film diambil melalui join dengan tabel movies.
      - **`getAllWatchlist(callback)`**:
        Mengambil seluruh data watchlist dari semua pengguna.
      - **`addMovieToWatchlist(userId, movieId, callback)`**:
        Menambahkan film ke watchlist pengguna setelah memvalidasi keberadaan pengguna, film, dan memastikan film belum ada di watchlist.
      - **`removeMovieFromWatchlist(userId, movieId, callback)`**:
        Menghapus film dari watchlist pengguna berdasarkan userId dan movieId.

 ---  

#### **6. `File .env`**
Berisi konfigurasi lingkungan (environment variables), seperti:
  - Informasi koneksi database (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).
  - Secret key untuk JWT (JWT_SECRET).

---

#### **7. `File .gitignore`**
Berisi daftar file atau folder yang tidak akan disertakan dalam versi kontrol (repository Git), seperti:
  - node_modules/.
  - File .env.

---

#### **8. `File server.js`**
File utama untuk menjalankan aplikasi backend.
  Fungsi utama:
  - Menginisialisasi server menggunakan express.
  - Menyambungkan middleware.
  - Menyambungkan rute API.

---

#### **9. `File package.json`**
Berisi metadata proyek, daftar dependensi, dan skrip untuk menjalankan aplikasi, seperti:
  - npm start: Menjalankan aplikasi.
  - npm install: Menginstal dependensi proyek.

---


### **Penjelasan Endpoint API**

#### **a. User**

Folder `User` digunakan untuk mengelola pengguna, termasuk registrasi, login, dan operasi pengguna seperti mendapatkan daftar pengguna dan informasi pengguna tertentu.

---

#### **1. POST /users/register**
**Deskripsi:**  
Endpoint ini digunakan untuk mendaftarkan pengguna baru. Data yang diperlukan adalah:
- **`username`**: Nama pengguna.
- **`email`**: Alamat email pengguna.
- **`password`**: Kata sandi.

**Contoh Request:**

```json
POST /register
{
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "password": "securepassword123"
}
```

**Respons:**  
Jika berhasil, pengguna akan menerima email verifikasi. Jika gagal, akan mengembalikan pesan error.

**Contoh Respons:**

```json
{
  "message": "User registered successfully!"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/e5e608ad-4125-480e-acf3-f1a5faff366b)


---


#### **2. POST /users/login**
**Deskripsi:**
Endpoint ini digunakan untuk autentikasi pengguna dengan email dan password yang valid.
- **`email`**: Alamat email pengguna.
- **`password`**: Kata sandi.

**Contoh Request:**

```json
POST /login
{
  "email": "janedoe@example.com",
  "password": "securepassword123"
}
```

**Contoh Respons:**  
Jika berhasil, token JWT akan dikembalikan. Jika gagal, pesan error akan ditampilkan.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/62cdf300-3ea9-47d3-b29b-0f439c0f52b8)


---

#### **3. GET /users/findByEmail**
*Deskripsi:**
Endpoint ini digunakan untuk mendapatkan daftar pengguna menggunakan email.

**Contoh Request:**
```
http://localhost:3000/users/getUserbyEmail/abay@example.com
```

**Contoh Respons:**  
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "$2b$10$hashedpassword",
  "created_at": "2023-12-01T10:00:00.000Z"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/098f9b8a-3d9a-4aea-bc89-11d31a1bc08a)

---


#### **4. GET /users/getAllUser**
**Deskripsi:**
Endpoint ini digunakan untuk mendapatkan daftar semua pengguna yang terdaftar di database.

**Contoh Request:**

```
http://localhost:3000/users/getAllUser
```

**Contoh Respons:**  
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.

```json
[
  {
    "id": 1,
    "name": "Jane Doe",
    "email": "janedoe@example.com"
  },
  {
    "id": 2,
    "name": "John Smith",
    "email": "johnsmith@example.com"
  }
]
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/9165d62d-3662-421f-976e-d07dcd444730)


---


#### **5. GET /users/getUserById**
**Deskripsi:**
Endpoint ini digunakan untuk mendapatkan informasi pengguna berdasarkan ID.

**Contoh Request:**

```
http://localhost:3000/users/getUserById/1
```

**Contoh Respons:**
Jika berhasil, data pengguna akan dikembalikan. Jika gagal, pesan error akan ditampilkan.

```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "janedoe@example.com"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/cac2e3fe-6f51-4d4f-9cae-b008014a03ac)


---


#### **6. PUT /users/updateUser**
**Deskripsi:**
Endpoint ini digunakan untuk memperbarui informasi pengguna berdasarkan ID.

**Contoh Request:**

```json
PUT /updateUser/1
{
  "name": "Updated Name",
  "email": "updatedemail@example.com"
}
```

**Contoh Respons:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.

```
{
  "message": "User updated successfully!"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/01531683-9a8e-47a7-819e-a8211a5b010f)


---


#### **7. PUT /users/deleteUser**
**Deskripsi:**
Endpoint ini digunakan untuk menghapus pengguna berdasarkan ID.

**Contoh Request:**
```
http://localhost:3000/users/deleteUser/5
```

**Contoh Respons:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.

```
{
  "message": "User deleted successfully!"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/f9938ceb-8b10-419f-b825-abadf3c847d4)

**Screenshot**
*Tampilkan hasil pengujian setelah delete User:*
![image](https://github.com/user-attachments/assets/a8f7109b-3e32-4fca-99cd-f73229b4eecc)


---


#### **b. movies**

Folder `Movies` digunakan untuk mengelola data film, termasuk mendapatkan semua film, mendapatkan film berdasarkan ID, membuat film baru, memperbarui film, dan menghapus film.

---

#### **8. POST /movies/create**
**Deskripsi:**
Endpoint ini digunakan untuk membuat film baru.

**Contoh Request:**

```json
POST /movies/create
{
  "title": "Avatar",
  "description": "A sci-fi epic",
  "genre_id": 3,
  "release_year": 2009
}
```

**Contoh Respons:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.

```
{
  "message": "Movie created successfully!"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/5bd8f394-d53e-4beb-9cea-82494d778ad4)


---

  
#### **9. GET /movies/getAll**
**Deskripsi:**
Endpoint ini digunakan untuk mendapatkan semua data film.

**Contoh Request:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.

```
http://localhost:3000/movie/getAll/
```

**Contoh Respons:**

```json
[
  {
    "id": 1,
    "title": "Inception",
    "description": "A mind-bending thriller",
    "genre_id": 2,
    "release_year": 2010
  },
  {
    "id": 2,
    "title": "Titanic",
    "description": "A romantic drama",
    "genre_id": 1,
    "release_year": 1997
  }
]
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/dfa9516b-b917-4a16-9015-6513b2e5bbba)


---


#### **10. GET /movies/getMovieById/:id**
**Deskripsi:**
Endpoint ini digunakan untuk mendapatkan data film berdasarkan ID.

**Contoh Request:**
```
http://localhost:3000/movie/getMovieById/1
```

**Contoh Respons:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.

```json
{
  "id": 1,
  "title": "Inception",
  "description": "A mind-bending thriller",
  "genre_id": 2,
  "release_year": 2010
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/85d852f0-3542-40b1-bc58-546c1442d044)


---


#### **11. PUT /movies/update/:id**
**Deskripsi:**
Endpoint ini digunakan untuk memperbarui data film berdasarkan ID.

**Contoh Request:**
```
PUT /movies/update/1
{
  "title": "Inception Updated",
  "description": "An updated mind-bending thriller",
  "genre_id": 2,
  "release_year": 2011
}
```

**Contoh Respons:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.
```
{
  "message": "Movie updated successfully!"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/4a998c1c-6399-41cd-809b-8ccaccddef08)

**Screenshot:**  
*Tampilkan hasil pengujian setalah update*
![image](https://github.com/user-attachments/assets/4d166240-9fff-4243-a9df-637d338e7ba2)


---

#### **12. DELETE /movies/delete/:id**
**Deskripsi:**
Endpoint ini digunakan untuk menghapus data film berdasarkan ID.

**Contoh Request:**
```
http://localhost:3000/movie/delete/23
```
**Contoh Respons:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.

```
{
  "message": "Movie deleted successfully!"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/dfc899e9-9373-44d2-bed6-e672e38c433a)

**Screenshot:**  
*Tampilkan hasil pengujian setelah di delete dan di cek menggunakan id:*
![image](https://github.com/user-attachments/assets/5d80aa9f-e0b0-4c83-8d31-f5fc0ccebe54)


---


#### **c.  Genres**

Folder `Genres` digunakan untuk mengelola data genre film, termasuk mendapatkan semua genre, mendapatkan genre berdasarkan ID, membuat genre baru, memperbarui genre, dan menghapus genre.

---

#### **13. POST /genres/createGenre**
**Deskripsi:**
Endpoint ini digunakan untuk membuat genre baru.

**Contoh Request:**

```json
POST /genres/createGenre
{
  "name": "Comedy"
}
```

**Contoh Respons:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.
```
{
  "message": "Genre created",
  "id": 3
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/4892e1b3-bfb6-4e3a-af87-c8d3620159bd)


---


#### **14. GET /genres/getAllGenres**
**Deskripsi:**
Endpoint ini digunakan untuk mendapatkan semua data genre.

**Contoh Request:**
```
http://localhost:3000/genres/getAllGenres
```

**Contoh Respons:**
Jika berhasil, daftar pengguna akan ditampilkan dalam bentuk array. Jika gagal, pesan error akan dikembalikan.
```json
[
  {
    "id": 1,
    "name": "Action"
  },
  {
    "id": 2,
    "name": "Drama"
  }
]
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/3853d687-4ec9-4894-b871-517e4be36055)


---


#### **15. GET /genres/getById/:id**
**Deskripsi:**
Endpoint ini digunakan untuk mendapatkan data genre berdasarkan ID.

**Contoh Request:**
```
http://localhost:3000/genres/getById/8
```

**Contoh Respons:**
```json
{
  "id": 1,
  "name": "Action"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/eac0795e-eeee-4848-8ce6-8cac58736b46)


---


#### **16. PUT /genres/updateGenre/:id**
**Deskripsi:**
Endpoint ini digunakan untuk memperbarui data genre berdasarkan ID.

**Contoh Request:**
```json
PUT /genres/updateGenre/2
{
  "name": "Thriller"
}
```

**Contoh Respons:**
```json
{
  "message": "Genre updated"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/e58b02d4-51a4-463e-a20f-263c5d2ce0b1)


---


#### **17. DELETE /genres/updateGenre/:id**
**Deskripsi:**
Endpoint ini digunakan untuk menghapus data genre berdasarkan ID.

**Contoh Request:**
```
http://localhost:3000/genres/deleteGenre/8
```

**Contoh Respons:**
```json
{
  "message": "Genre deleted"
}
```

**Screenshot:**  
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/b1171642-dd1a-44cb-bce7-5a1b1f0c5138)

**Screenshot:**  
*Tampilkan hasil pengujian setelah melakukan delete:*
![image](https://github.com/user-attachments/assets/e3f68826-ee5d-484c-9948-ef77c409f22d)


---


#### **d.  Watchlist**
Folder `Watchlist` digunakan untuk mengelola data watchlist pengguna, termasuk mendapatkan semua watchlist, menambah film ke dalam watchlist, dan menghapus film dari watchlist. Semua endpoint dilindungi oleh middleware authMiddleware untuk memastikan hanya pengguna terautentikasi yang dapat mengaksesnya.

---


#### ** 18. POST /watchlist/addWatchlist**
**Deskripsi:**
Endpoint ini digunakan untuk menambahkan film baru ke dalam watchlist pengguna.

**Autentikasi:**
Middleware authMiddleware diperlukan.

**Contoh Request:**
```json
POST /watchlist/addWatchlist
{
  "userId": 1,
  "movieId": 104,
}
```

**Contoh Respons:**
```json
{
  "message": "Movie added to watchlist",
  "watchlistId": 3
}
```

**Screenshot:**  
*Tambahan, untuk menambahkan movie ke daftar watchlist users, harus menggunakan token karena untuk verifikasi sesuai token JWT users seperti pada contoh postman tersebut.*
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/edd0a442-7d16-4262-8268-0ede4549e403)


---


#### ** 19. GET /watchlist/getAllByUserId/:userId**
**Deskripsi:**
Endpoint ini digunakan untuk mendapatkan semua watchlist milik pengguna tertentu berdasarkan userId.

**Autentikasi:**
Middleware authMiddleware diperlukan.

**Contoh Request:**
```
http://localhost:3000/watchlist/getAllByUserId/1
```

**Contoh Respons:**

```json

{
  "id": 6,
  "movie_id": 20,
  "title": "Avatar 2 ",
  "added_at": "2025-01-25T03:57:01.000Z"
}
```

**Screenshot:**  
*Tambahan, untuk mengecek daftar watchlist users, harus menggunakan token karena untuk verifikasi sesuai token JWT users seperti pada contoh postman tersebut.*
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/c8caa485-95ac-4c15-846a-2e0a75f97243)


---


#### ** 20. DELETE /watchlist/removeMovie/:userId/:movieId**
**Deskripsi:**
Endpoint ini digunakan untuk menghapus film dari watchlist pengguna berdasarkan userId dan movieId.

**Autentikasi:**
Middleware authMiddleware diperlukan.

**Contoh Request:**
```
http://localhost:3000/watchlist/removeMovie/1/20
```

**Contoh Respons:**
```
{
  "message": "Movie removed from watchlist"
}
```

**Screenshot:**  
*Tambahan, untuk menghapus daftar watchlist users, harus menggunakan token karena untuk verifikasi sesuai token JWT users seperti pada contoh postman tersebut.*
*Tampilkan hasil pengujian endpoint ini di Postman menggunakan gambar, misalnya:*
![image](https://github.com/user-attachments/assets/9a9ef4bf-3890-49f3-87b2-e4a99236810d)


**[⬆ kembali ke atas](#Netflix-Backend-API-Documentation)**


---


## **Detail Penjelasan Folder Controller** 

Dokumentasi ini mencakup empat file controller: `userController.js`, `movieController.js`, `genresController.js`, dan `watchlistController.js`. Setiap file menangani berbagai operasi terkait entitas yang berbeda seperti pengguna, film, genre, dan watchlist. 


## **User Controller**


### **Import Statements**
- **`bcrypt`**: Digunakan untuk mengenkripsi password secara aman.
- **`jsonwebtoken`**: Digunakan untuk menghasilkan JSON Web Token (JWT) untuk keperluan autentikasi.
- **`Koneksi Database (db)`**: Memberikan akses ke database untuk menjalankan query.

```javascript
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/connection");
```

** Metode dalam Controller ** 
1. `register`
Mengelola pendaftaran pengguna dengan menyimpan data pengguna baru ke dalam database.
`Input`: name, email, password dari req.body.

`Proses`:  - Password dienkripsi menggunakan bcrypt.
           - Data pengguna baru dimasukkan ke tabel Users.
   
`Respons`: - Berhasil: Status 201 dengan pesan sukses.
           - Gagal: Status 500 dengan pesan error.

```javascript
register: async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User registered successfully!" });
  });
};
```


2. `login`
Mengelola proses login pengguna dengan validasi email dan password.

`Input`: email, password dari req.body.

`Proses`: - Mencari pengguna berdasarkan email di tabel Users. 
          - Memverifikasi kecocokan password menggunakan bcrypt.
          - Jika valid, menghasilkan token JWT untuk autentikasi.
          
`Respons`: - Berhasil: JSON berisi token.
           - Gagal: Status 401 untuk kredensial tidak valid, atau 404 jika pengguna tidak ditemukan.
         

``` javascript
login: (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM Users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
};
```


3. `etAllUsers`
Mengambil semua data pengguna dari tabel Users.

`Proses`: Menjalankan query untuk mendapatkan semua pengguna.
`Respons`: Berhasil: Status 200 dengan daftar data pengguna.
         Gagal: Status 500 dengan pesan error.

```javascript
getAllUsers: (req, res) => {
  const sql = "SELECT * FROM Users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
```


4. `findByEmail`
Mencari data pengguna berdasarkan email.

`Input`: email dari req.params.

`Proses`: - Menjalankan query untuk mencari pengguna dengan email tertentu.
 
`Respons`: - Berhasil: Status 200 dengan data pengguna.
         - Gagal: Status 404 jika pengguna tidak ditemukan, atau 500 jika terjadi error.

```javascript
findByEmail: (req, res) => {
  const { email } = req.params;
  const sql = "SELECT * FROM Users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.status(200).json(results[0]);
  });
};
```


5. `getUserById`
Mengambil data pengguna berdasarkan ID.

`Input`: id dari req.params.

`Proses`: - Menjalankan query untuk mendapatkan pengguna berdasarkan ID.

`Respons` Berhasil: - Status 200 dengan data pengguna.
                    - Gagal: Status 404 jika pengguna tidak ditemukan, atau 500 jika terjadi error.

```javascript
getUserById: (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.status(200).json(results[0]);
  });
};
```


`6. updateUser`
Mengupdate data pengguna berdasarkan ID.

`Input`: id dari req.params, name dan email dari req.body.

`Proses`: - Menjalankan query untuk mengupdate data pengguna.

`Respons`: - Berhasil: Status 200 dengan pesan sukses.
         - Gagal: Status 500 dengan pesan error.

```javascript
updateUser: (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE Users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "User updated successfully!" });
  });
};
```


7. `deleteUser`
Menghapus pengguna berdasarkan ID.

`Input`: id dari req.params.

`Proses`: - Menjalankan query untuk menghapus pengguna.

`Respons`: - Berhasil: Status 200 dengan pesan sukses.
           - Gagal: Status 500 dengan pesan error.

```javascript
deleteUser: (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Users WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "User deleted successfully!" });
  });
};
```

---

## ** Movie Controller**

### **Import Statements**
- **`db`**: Koneksi ke database.

```javascript
const db = require("../db/connection");
```

### **Metode**

#### 1. `getAllMovies`
Mengambil semua film dari database.

- **Output**: Array data film.
- **Query**: `SELECT * FROM Movies`.

```javascript
getAllMovies: (req, res) => {
  const sql = "SELECT * FROM Movies";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
},
```

**Penjelasan:**
Fungsi ini menjalankan query SQL SELECT * FROM Movies untuk mengambil semua data film dari tabel Movies.
Jika terjadi error, fungsi akan mengembalikan status 500 dengan pesan error.


#### 2. `getMovieById`
Mengambil data film berdasarkan ID.

- **Input**: `id` (params).
- **Output**: Data film atau pesan error jika tidak ditemukan.
- **Query**: `SELECT * FROM Movies WHERE id = ?`.

```javascript
getMovieById: (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Movies WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Movie not found" });
    res.json(results[0]);
  });
},
```

**Penjelasan:**
Fungsi ini mengambil data film berdasarkan ID yang diterima dari parameter.
Mengembalikan status 404 jika film tidak ditemukan.


#### 3. `createMovie`
Menambahkan film baru ke database.

- **Input**: `title`, `description`, `genre_id`, `release_year`.
- **Output**: Pesan keberhasilan atau error.
- **Query**: `INSERT INTO Movies`.

```javascript
createMovie: (req, res) => {
  const { title, description, genre_id, release_year } = req.body;
  const sql = "INSERT INTO Movies (title, description, genre_id, release_year) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, genre_id, release_year], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Movie created successfully!" });
  });
},
```

**Penjelasan:**
Data film diterima dari req.body kemudian disimpan ke dalam tabel Movies.


#### 4. `updateMovie`
Memperbarui data film berdasarkan ID.

- **Input**: `id` (params), `title`, `description`, `genre_id`, `release_year`.
- **Output**: Pesan keberhasilan atau error.
- **Query**: `UPDATE Movies`.

```javascript
updateMovie: (req, res) => {
  const { id } = req.params;
  const { title, description, genre_id, release_year } = req.body;
  const sql = "UPDATE Movies SET title = ?, description = ?, genre_id = ?, release_year = ? WHERE id = ?";
  db.query(sql, [title, description, genre_id, release_year, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Movie updated successfully!" });
  });
},
```

**Penjelasan:**
Fungsi ini memperbarui data film berdasarkan ID yang diterima dari parameter.


#### 5. `deleteMovie`
Menghapus film berdasarkan ID.

- **Input**: `id` (params).
- **Output**: Pesan keberhasilan atau error.
- **Query**: `DELETE FROM Movies`.

```javascript
deleteMovie: (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Movies WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Movie deleted successfully!" });
  });
},
```

**Penjelasan:**
Fungsi ini menjalankan query DELETE FROM Movies untuk menghapus film berdasarkan ID.

---


## **genres Controller**

### **Import Statements**
- **`db`**: Koneksi ke database.

```javascript
const db = require("../db/connection");
```

### **Metode**

#### 1. `getAllGenres`
Mengambil semua genre dari database.

- **Output**: Array data genre.
- **Query**: `SELECT * FROM Genres`.

```javascript
getAllGenres: (req, res) => {
  const sql = "SELECT * FROM Genres";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
},
```


#### 2. `getGenreById`
Mengambil data genre berdasarkan ID.

- **Input**: `id` (params).
- **Output**: Data genre atau pesan error jika tidak ditemukan.
- **Query**: `SELECT * FROM Genres WHERE id = ?`.

```javascript
getGenreById: (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Genres WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Genre not found" });
    res.status(200).json(results[0]);
  });
},
```

#### 3. `createGenre`
Menambahkan genre baru ke database.

- **Input**: `name`.
- **Output**: Pesan keberhasilan atau error.
- **Query**: `INSERT INTO Genres`.

```javascript
createGenre: (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO Genres (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Genre created", id: result.insertId });
  });
},
```


#### 4. `updateGenre`
Memperbarui data genre berdasarkan ID.

- **Input**: `id` (params), `name`.
- **Output**: Pesan keberhasilan atau error.
- **Query**: `UPDATE Genres`.

```javascript
updateGenre: (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sql = "UPDATE Genres SET name = ? WHERE id = ?";
  db.query(sql, [name, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Genre not found" });
    res.status(200).json({ message: "Genre updated" });
  });
},
```


#### 5. `deleteGenre`
Menghapus genre berdasarkan ID.

- **Input**: `id` (params).
- **Output**: Pesan keberhasilan atau error.
- **Query**: `DELETE FROM Genres`.

```javascript
deleteGenre: (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Genres WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Genre not found" });
    res.status(200).json({ message: "Genre deleted" });
  });
},
```

---


## **watchlist Controller**

### **Import Statements**
- **`Watchlist`**: Model untuk operasi watchlist.
- **`db`**: Koneksi ke database.

```javascript
const Watchlist = require("../models/Watchlist");
const db = require("../db/connection");
```

### **Metode**

#### 1. `getAllByUserId`
Mengambil semua film di watchlist untuk pengguna tertentu.

- **Input**: `userId` (params).
- **Output**: Array data film dalam watchlist.

```javascript
getAllByUserId: (req, res) => {
  const userId = req.params.userId;
  Watchlist.getAllByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
},
```

**Penjelasan:**
Mengambil semua data watchlist berdasarkan userId yang diterima dari parameter.
Jika terjadi error, mengembalikan status 500 dengan pesan error.


#### 2. `addMovieToWatchlist`
Menambahkan film ke watchlist pengguna.

- **Input**: `userId`, `movieId`.
- **Output**: Pesan keberhasilan atau error.
- **Validasi**: Memastikan user dan film ada, serta film belum ada di watchlist.
- **Query**:
  - Periksa user: `SELECT id FROM users WHERE id = ?`.
  - Periksa film: `SELECT id FROM movies WHERE id = ?`.
  - Periksa watchlist: `SELECT id FROM watchlist WHERE user_id = ? AND movie_id = ?`.
  - Tambahkan: `INSERT INTO watchlist`.
 
```javascript
addMovieToWatchlist: (req, res) => {
  const { userId, movieId } = req.body;

  if (!userId || !movieId) {
    return res.status(400).json({ error: "User ID and Movie ID are required" });
  }

  const checkUserQuery = "SELECT id FROM users WHERE id = ?";
  db.query(checkUserQuery, [userId], (err, userResults) => {
    if (err) return res.status(500).json({ error: "Database error when checking user" });
    if (userResults.length === 0) return res.status(404).json({ error: "User not found" });

    const checkMovieQuery = "SELECT id FROM movies WHERE id = ?";
    db.query(checkMovieQuery, [movieId], (err, movieResults) => {
      if (err) return res.status(500).json({ error: "Database error when checking movie" });
      if (movieResults.length === 0) return res.status(404).json({ error: "Movie not found" });

      const checkWatchlistQuery = "SELECT id FROM watchlist WHERE user_id = ? AND movie_id = ?";
      db.query(checkWatchlistQuery, [userId, movieId], (err, watchlistResults) => {
        if (err) return res.status(500).json({ error: "Database error when checking watchlist" });
        if (watchlistResults.length > 0) return res.status(409).json({ error: "Movie already exists in watchlist" });

        const insertWatchlistQuery = "INSERT INTO watchlist (user_id, movie_id, added_at) VALUES (?, ?, CURRENT_TIMESTAMP)";
        db.query(insertWatchlistQuery, [userId, movieId], (err) => {
          if (err) return res.status(500).json({ error: "Database error when adding to watchlist" });
          res.status(201).json({ message: "Movie added to watchlist successfully!" });
        });
      });
    });
  });
},
```

**Penjelasan:**
- Fungsi ini memvalidasi bahwa userId dan movieId disediakan dalam body request.
- Melakukan pengecekan apakah userId dan movieId valid dan eksis di database.
- Menambahkan film ke watchlist jika belum ada di dalamnya.

#### 3. `updateWatchlist`
Memperbarui data dalam watchlist pengguna.

- **Input**: `userId`, `movieId`.
- **Output**: Pesan keberhasilan atau error.

```javascript
updateWatchlist: (req, res) => {
  const userId = req.params.userId;
  const movieId = req.params.movieId;
  Watchlist.updateWatchlist(userId, movieId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
},
```

**Penjelasan:**
- Fungsi ini memperbarui data dalam watchlist berdasarkan userId dan movieId.
- Penerapannya membutuhkan model Watchlist untuk melakukan operasi database.


#### 4. `removeMovieFromWatchlist`
Menghapus film dari watchlist pengguna.

- **Input**: `userId`, `movieId` (params).
- **Output**: Pesan keberhasilan atau error.
- **Query**: `DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?`.

```javascript
removeMovieFromWatchlist: (req, res) => {
  const userId = req.params.userId;
  const movieId = req.params.movieId;
  Watchlist.removeMovieFromWatchlist(userId, movieId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Movie removed from watchlist successfully!" });
  });
},
```


---


##  **Kesimpulan** ##

#### 🎯 **Hasil Utama Proyek**  
Backend API untuk platform Netflix telah berhasil dikembangkan dengan hasil berikut:  
- 🌐 **Struktur Modular** - Komponen terpisah seperti controllers, routes, dan middleware memudahkan pengelolaan kode.  
- 🔒 **Keamanan Handal** - Menggunakan bcrypt untuk hashing password, autentikasi JWT, dan sanitasi input untuk mencegah eksploitasi.  
- 🛠️ **Efisiensi Query Database** - Query parameterized memastikan performa tinggi dan keamanan terhadap SQL injection.  
- 🚀 **Endpoint Konsisten** - RESTful API dengan format respons yang mudah dipahami dan digunakan oleh frontend.  

---

#### 💡 **Fitur Unggulan**  
- 🛡️ **Autentikasi Aman**: Implementasi login dan registrasi dengan hashing password dan validasi JWT.  
- 📂 **Pengelolaan Data Lengkap**: User, film, genre, dan watchlist terintegrasi dalam sistem database dengan performa optimal.  
- 🔗 **Integrasi Fleksibel**: API kompatibel untuk berbagai platform frontend dan mobile.  
- 📈 **Dukungan Skalabilitas**: Desain sistem siap untuk ditingkatkan sesuai kebutuhan aplikasi skala besar.  

---

#### 🔮 **Peluang Pengembangan**  
Masih banyak fitur menarik yang dapat ditambahkan untuk meningkatkan pengalaman pengguna, seperti:  
- ⭐ **Sistem Peringkat Film**: Pengguna dapat memberi bintang atau ulasan pada film.  
- 📊 **Analitik Pengguna**: Data seperti jumlah penonton, durasi menonton, dan tren populer.  
- 💳 **Langganan Premium**: Menambahkan payment gateway untuk fitur eksklusif seperti streaming tanpa iklan.  
- 📝 **Dokumentasi API yang Interaktif**: Menggunakan Swagger atau dokumentasi Postman agar pengembang mudah memahami cara kerja API.  

---

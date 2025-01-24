# Netflix Backend API Documentation

---

### **Deskripsi Proyek**
Netflix Backend API adalah sebuah proyek backend yang dirancang untuk mendukung platform streaming film dan serial televisi. Proyek ini memungkinkan pengelolaan data film, serial, genre, pengguna, serta menyediakan fitur autentikasi, otorisasi, dan pengelolaan akun pengguna. Backend ini dibangun menggunakan teknologi modern untuk memastikan performa, skalabilitas, dan keamanan yang optimal.

Aplikasi ini dirancang bagi pengembang atau tim pengembang yang ingin membangun platform streaming digital yang lengkap. Dengan menyediakan API yang terstruktur dengan baik, proyek ini mempermudah pengelolaan data film, interaksi pengguna, serta integrasi dengan sistem frontend seperti aplikasi web atau mobile.

### **Tujuan Proyek**
1. **Mendukung Pengelolaan Film dan Serial**: Menyediakan endpoint untuk membuat, membaca, memperbarui, dan menghapus data film, serial, serta informasi genre.
2. **Autentikasi dan Autorisasi**: Mengimplementasikan sistem login, registrasi, serta verifikasi pengguna dengan keamanan menggunakan JWT (JSON Web Token).
3. **Efisiensi dan Skalabilitas**: Menerapkan praktik terbaik dalam pengembangan backend agar API dapat menangani lalu lintas data yang besar tanpa menurunkan performa.
4. **Pengelolaan Database yang Efisien**: Database dirancang dengan relasi antar tabel untuk memastikan integritas dan keterhubungan data, seperti antara film dan genre, atau watchlist pengguna.

### **Fitur Utama**
1. Manajemen Film: Pengguna dapat mengakses daftar film atau serial yang tersedia, menambahkan, atau menghapusnya sesuai kebutuhan.
2. Watchlist: Menyediakan fungsi untuk menambahkan atau menghapus film dari daftar tontonan pengguna.
3. Manajemen Genre: Endpoint untuk membuat, membaca, memperbarui, dan menghapus genre yang terhubung dengan film.
4. Sistem Pengguna: Registrasi, login, pengelolaan profil, serta verifikasi akun pengguna.
5. Keamanan: Sistem otentikasi berbasis token untuk memastikan keamanan akses API.
6. Error Handling yang Andal: Memberikan pesan kesalahan yang jelas kepada pengembang untuk mempermudah debugging.

### **Teknologi yang Digunakan**
Node.js & Express: Untuk pengembangan server backend yang cepat, ringan, dan efisien.
MySQL: Sebagai database relasional untuk menyimpan data film, genre, pengguna, dan watchlist.
JWT: Untuk autentikasi berbasis token yang aman.
Postman: Untuk pengujian dan dokumentasi endpoint API selama proses pengembangan.

---

## **DATABASE**
Struktur database ini dirancang untuk memastikan data yang terorganisir, relasi yang jelas antar entitas, serta menjaga integritas data dengan menggunakan kunci utama dan kunci asing. Hal ini memungkinkan implementasi fitur aplikasi Netflix Clone seperti pengelolaan pengguna, daftar tontonan, dan data film secara efisien.

## **STURKTUR TABLE**
1. **Table `users`**:
  - Tabel Users menyimpan data pengguna yang terdaftar di aplikasi.
    Kolom Penjelasan:
    - id: Kolom kunci utama dengan tipe INT dan AUTO_INCREMENT, digunakan untuk mengidentifikasi setiap pengguna secara unik.
    - name: Nama pengguna, wajib diisi (NOT NULL), dengan panjang maksimum 100 karakter.
    - email: Email pengguna, wajib diisi (NOT NULL) dan bersifat unik (UNIQUE) untuk mencegah duplikasi.
    - password: Kata sandi pengguna yang disimpan dalam bentuk hash, wajib diisi (NOT NULL), dengan panjang maksimum 255 karakter.
    - created_at: Waktu pembuatan data pengguna, secara default diisi dengan waktu saat data ditambahkan (CURRENT_TIMESTAMP).
   
  **Contoh Query untuk Tabel `users`**
  CREATE TABLE Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

2. **Table `genres`**:
  - Tabel Genres menyimpan data kategori atau genre film.
    Kolom Penjelasan:
    - id: Kolom kunci utama dengan tipe INT dan AUTO_INCREMENT, digunakan untuk mengidentifikasi setiap genre secara unik.
    - name: Nama genre, wajib diisi (NOT NULL) dan bersifat unik (UNIQUE) untuk mencegah duplikasi.

     **Contoh Query untuk Tabel `genres`**
    CREATE TABLE Genres (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE
    );

3. **Table `movies`**:
   - Tabel Movies menyimpan data tentang film yang tersedia di aplikasi.
     Kolom Penjelasan:
     - id: Kolom kunci utama dengan tipe INT dan AUTO_INCREMENT, digunakan untuk mengidentifikasi setiap film secara unik.
     - title: Judul film, wajib diisi (NOT NULL), dengan panjang maksimum 255 karakter.
     - description: Deskripsi film, bersifat opsional (NULL) dan menggunakan tipe data TEXT untuk menyimpan teks panjang.
     - genre_id: Kunci asing (FOREIGN KEY) yang merujuk ke kolom id pada tabel Genres. Wajib diisi (NOT NULL) untuk memastikan setiap film memiliki genre.
     - release_year: Tahun rilis film, bersifat opsional (NULL), menggunakan tipe data YEAR.
  Relasi:
  => Jika genre terkait dihapus, semua film yang terkait dengan genre tersebut juga akan dihapus (ON DELETE CASCADE).

    **Contoh Query untuk Tabel `movies`**
   CREATE TABLE Movies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      genre_id INT NOT NULL,
      release_year YEAR,
      FOREIGN KEY (genre_id) REFERENCES Genres(id) ON DELETE CASCADE
  );

4. **Table `Watchlist`**:
   - Tabel Watchlist menyimpan daftar tontonan yang dipersonalisasi untuk setiap pengguna.
     Kolom Penjelasan:
     - id: Kolom kunci utama dengan tipe INT dan AUTO_INCREMENT, digunakan untuk mengidentifikasi setiap entri dalam daftar tontonan secara unik.
     - user_id: Kunci asing (FOREIGN KEY) yang merujuk ke kolom id pada tabel Users. Wajib diisi (NOT NULL) untuk mengaitkan daftar tontonan dengan pengguna tertentu.
     - movie_id: Kunci asing (FOREIGN KEY) yang merujuk ke kolom id pada tabel Movies. Wajib diisi (NOT NULL) untuk mengaitkan daftar tontonan dengan film tertentu.
     - added_at: Waktu ketika film ditambahkan ke daftar tontonan, secara default diisi dengan waktu saat data ditambahkan (CURRENT_TIMESTAMP).
  Relasi:
  => Jika pengguna terkait dihapus, semua daftar tontonan mereka juga akan dihapus (ON DELETE CASCADE).
Jika film terkait dihapus, semua daftar tontonan yang mencantumkan film tersebut juga akan dihapus (ON DELETE CASCADE).

    **Contoh Query untuk Tabel `Watchlist`**
   CREATE TABLE Watchlist (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      movie_id INT NOT NULL,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (movie_id) REFERENCES Movies(id) ON DELETE CASCADE
  );

## Relasi Antar Tabel##
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

### **Struktur**

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
│
├── db/
│   └── connection.js
│
├── models/
│   ├── Movie.js
│   ├── User.js
│   └── Watchlist.js
│
│
├── .env
├── .gitignore
├── server.js
├── package.json
└── package-lock.json

---

#### **1. Folder `controllers`**
Folder ini berisi logika utama (business logic) yang mengatur berbagai fitur aplikasi. Setiap file controller menangani fitur tertentu.

  - **userController.js**
    Mengelola data pengguna. Fungsi utama:
      - **register**: Memproses data registrasi pengguna baru.
      - **login**: Memverifikasi kredensial pengguna dan menghasilkan token JWT.
      - **getAllUsers**: Mengambil daftar semua user, beserta id, nama, email, dan passowrd.
      - **getUserById**: Mengambil data user dengan menggunakan id user.
  - **genresController.js**
    Mengelola data genre film. Fungsi utama:
      - **getAllGenres**: Mengambil daftar semua genre, berserta ID yang dimiliki oleh genres tersebut.
      - **getGenreById**: Mengambil data genre dengan menggunakan id genre.
      - **createGenre** : Menambahkan genre baru.
      - **updateGenre** : Mengupdate genre, yang menghasilkan genre baru atau colab setiap genre
      - **deleteGenre** : Menghapus genre.
  - **movieController.js**
    Menangani pengelolaan data film. Fungsi utama:
      - getAllMovies: Mengambil semua film.
      - getMovieById: Mendapatkan detail film berdasarkan ID.
      - createMovie: Menambahkan film baru.
      - updateMovie: Memperbarui data film.
      - deleteMovie: Menghapus film dari database.
  - **watchlistController.js**
    

#### **2. Folder `routes`**
Folder ini berisi definisi endpoint API dan menghubungkan endpoint ke controller yang relevan.

  - **userRoutes.js**
    Mendefinisikan rute untuk autentikasi pengguna, seperti:
      -
      -
  - **movieRoutes.js**
    Mendefinisikan rute untuk data genre, seperti:
      -
      -
      -
      -
      -
  - **genresRoutes.js**
      - 
      -
      -
      -
  - **watchlistRoutes.js**
      -
      -
      -
      -


#### **3. Folder `middleware`**
Berisi middleware yang digunakan untuk mengatur logika tambahan sebelum mengakses endpoint.
- authMiddleware.js
  Middleware untuk memverifikasi token JWT guna memastikan bahwa pengguna terautentikasi sebelum mengakses rute tertentu.

#### **4. Folder `db`**
Folder ini bertanggung jawab mengelola koneksi ke database.
- connection.js
  Menginisialisasi koneksi ke database menggunakan modul seperti mysql2.

#### **5. `models`**
Folder ini berisi model data untuk berinteraksi dengan tabel dalam database.




  
  

   
  
 
   



















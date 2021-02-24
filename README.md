# IF3260-21-Tugas1
Tugas 1 IF3260 - 2D Web-Based CAD

## Deskripsi Program
Aplikasi WebGL ini merupakan aplikasi menggambar model kebutuhan denah yang dibangun menggunakan WebGL murni tanpa library atau framework tambahan. Model yang dapat digambar dengan aplikasi ini terdiri dari garis (line), persegi atau segi empat sama sisi (square), dan poligon (polygon). Model yang dibuat memiliki warna sesuai dengan masukan dari pengguna. Dalam menggunakan aplikasi ini, pengguna dapat melakukan interaksi yang memungkinkan untuk melakukan hal-hal berikut.

- Membuat model
- Menggeser titik simpul dari model dengan mouse
- Mengubah panjang garis
- Mengubah ukuran sisi dari model persegi
- Mengubah warna model dengan input warna
- Menyimpan definisi model (daftar koordinat dan warna model) dalam sebuah file yang dapat dengan mudah diedit
- Membuka file model hasil penyimpanan dengan fitur pada poin sebelumnya

Selain fitur-fitur di atas, aplikasi perlu memudahkan pengguna baru untuk menggunakan aplikasi tanpa harus bertanya. Oleh karena itu, terdapat deskripsi user manual yang dapat dibaca pengguna di halaman web.

Dalam membuat aplikasi, terdapat beberapa asumsi yang digunakan untuk memenuhi kebutuhan pengguna dan aplikasi, seperti:
- Metode input untuk menggambar dan mengubah warna model dibebaskan.
- Pengubahan ukuran atau pergeseran yang perlu dilakukan cukup dengan menggeser sebuah titik simpul.
- Ukuran kanvas dibebaskan.


## Requirements
- Node
- npm installer
- Browser yang men-support webGL (dapat dilihat lewat https://get.webgl.org)

## Cara menjalankan
- Simpan folder project pada alamat lokal di komputer.
- Install library yang dibutuhkan melalui command prompt dengan menggunakan command ‘npm install’ pada direktori root dari project ini.
- Jalankan website menggunakan command ‘npm start’.
- Buka browser untuk menjalankan alamat server yang muncul di command line.

Terdapat fitur help yang akan menjelaskan cara penggunaan aplikasi.

## Author
13518089 - Annisa Rahim

13518098 - Difa Habiba Rahman

13518107 - Chokyi Ozer

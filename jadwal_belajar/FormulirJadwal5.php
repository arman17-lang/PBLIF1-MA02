<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Formulir jadwal belajar</title>
  <link rel="stylesheet" href="style4.css">
  <link rel="stylesheet" href="style5.css">
</head>
<body>
  <header class="topbar">
    <div>
      <h1 class="app-title">Aplikasi daftar tugas dan belajar mahasiswa</h1>
      <p class="muted small">Wireframe desktop / fidelitas rendah</p>
    </div>
    <div class="user">
      <strong>Peter Parker</strong>
      <span class="muted small">Informatika · Semester 3</span>
    </div>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <p class="muted small side-label">Ruang mahasiswa</p>
      <nav>
        <a href="#">Dashboard</a>
        <a href="index.html">Daftar tugas</a>
        <a href="#">Mata kuliah</a>
        <a href="#" class="active" aria-current="page">Jadwal belajar</a>
        <a href="#">Rekap</a>
      </nav>
      <div class="side-foot muted small">
        <p>Semester ganjil 2026/2027</p>
        <p id="today-label"></p>
      </div>
    </aside>

    <main class="content wide">
      <p class="breadcrumb muted small">Jadwal belajar / Formulir jadwal</p>
      <h2 class="page-title">Formulir jadwal belajar</h2>
      <p class="muted">Dua keadaan dari formulir yang sama. * menandai isian wajib.</p>

      <div class="forms" id="forms"></div>

      <p class="hint muted small">
        Validasi: semua isian wajib diisi. Waktu selesai harus setelah waktu mulai. Contoh pesan: ‘Waktu selesai harus setelah 19.00.’ Batal kembali ke jadwal belajar tanpa menyimpan.
      </p>

      <footer class="foot muted small">
        <span>FR-03 · Keadaan statis, bukan interaksi fungsional</span>
        <span>Data contoh · 21 Okt 2026</span>
      </footer>
    </main>
  </div>

  <!-- Satu template dipakai untuk dua keadaan (tambah & edit) -->
  <template id="tpl-form">
    <form class="card jform" novalidate>
      <h3 class="f-title"></h3>
      <p class="muted small f-sub"></p>

      <label>Tanggal *
        <input type="date" name="date" required>
        <span class="help muted small f-day"></span>
        <span class="err" data-err="date" hidden></span>
      </label>

      <div class="row">
        <label>Waktu mulai *
          <select name="start" required></select>
          <span class="err" data-err="start" hidden></span>
        </label>
        <label>Waktu selesai *
          <select name="end" required></select>
          <span class="err" data-err="end" hidden></span>
        </label>
      </div>

      <label>Topik belajar *
        <input type="text" name="topic" placeholder="Masukkan topik belajar" required maxlength="80">
        <span class="err" data-err="topic" hidden></span>
      </label>

      <label>Mata kuliah *
        <select name="course" required></select>
        <span class="help muted small">Pilihan: Algoritma · Basis Data · Statistika</span>
        <span class="err" data-err="course" hidden></span>
      </label>

      <div class="actions">
        <button type="submit" class="btn primary f-submit"></button>
        <button type="button" class="btn f-cancel">Batal</button>
      </div>
      <p class="muted small f-duration"></p>
    </form>
  </template>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <script src="script5.js"></script>
</body>
</html>
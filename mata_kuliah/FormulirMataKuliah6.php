<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Formulir mata kuliah</title>
  <link rel="stylesheet" href="style4.css">
  <link rel="stylesheet" href="style6.css">
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
        <a href="#" class="active" aria-current="page">Mata kuliah</a>
        <a href="formulir-jadwal.html">Jadwal belajar</a>
        <a href="#">Rekap</a>
      </nav>
      <div class="side-foot muted small">
        <p>Semester ganjil 2026/2027</p>
        <p id="today-label"></p>
      </div>
    </aside>

    <main class="content wide">
      <p class="breadcrumb muted small">Mata kuliah / Formulir mata kuliah</p>
      <h2 class="page-title">Formulir mata kuliah</h2>
      <p class="muted">Dua keadaan dari formulir yang sama. * menandai isian wajib.</p>

      <div class="forms" id="forms"></div>

      <p class="hint muted small">
        Validasi: kode dan nama mata kuliah wajib diisi. Contoh pesan kode ganda: ‘Kode IF202 sudah digunakan oleh Basis Data.’ Batal kembali ke daftar mata kuliah tanpa menyimpan.
      </p>

      <footer class="foot muted small">
        <span>FR-01 · Keadaan statis, bukan interaksi fungsional</span>
        <span>Data contoh · 21 Okt 2026</span>
      </footer>
    </main>
  </div>

  <template id="tpl-form">
    <form class="card jform" novalidate>
      <h3 class="f-title"></h3>
      <p class="muted small f-sub"></p>

      <label>Kode mata kuliah *
        <input type="text" name="code" placeholder="Masukkan kode, mis. IF204" required maxlength="10" autocomplete="off">
        <span class="help muted small">Kode harus unik.</span>
        <span class="err" data-err="code" hidden></span>
      </label>

      <label>Nama mata kuliah *
        <input type="text" name="name" placeholder="Masukkan nama mata kuliah" required maxlength="60" autocomplete="off">
        <span class="err" data-err="name" hidden></span>
      </label>

      <div class="row">
        <label>SKS *
          <select name="sks" required></select>
          <span class="err" data-err="sks" hidden></span>
        </label>
        <label>Semester *
          <select name="semester" required></select>
          <span class="err" data-err="semester" hidden></span>
        </label>
      </div>

      <div class="actions">
        <button type="submit" class="btn primary f-submit"></button>
        <button type="button" class="btn f-cancel">Batal</button>
      </div>
      <p class="muted small f-note"></p>
    </form>
  </template>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <script src="script6.js"></script>
</body>
</html>
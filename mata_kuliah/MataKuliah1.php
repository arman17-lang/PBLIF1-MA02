<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mata kuliah · Aplikasi daftar tugas dan belajar mahasiswa</title>
  <link rel="stylesheet" href="style1.css">
</head>
<body>
  <header class="topbar">
    <div>
      <h1 class="app-title">Aplikasi daftar tugas dan belajar mahasiswa</h1>
      <p class="app-sub">Wireframe desktop / fidelitas rendah</p>
    </div>
    <div class="user">
      <strong>Peter Parker</strong>
      <span>Informatika · Semester 3</span>
    </div>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <p class="side-label">Ruang mahasiswa</p>
      <nav>
        <a class="nav-item" href="Dasboard3.html">Dasboard</a>
        <a class="nav-item" href="DaftarTugasDanPencarian2.html">Daftar Tugas</a>
        <a class="nav-item" href="matakuliah1.html">Mata kuliah</a>
        <a class="nav-item" href="JadwalBelajar8.html">Jadwal Belajar</a>
        <a class="nav-item" href="RekapTugas10.html">Rekap</a>
      </nav>
      <div class="side-foot">
        <p>Semester ganjil 2026/2027</p>
        <p id="today"></p>
      </div>
    </aside>

    <main class="content">
      <div class="page-head">
        <div>
          <h2>Mata kuliah</h2>
          <p id="subtitle" class="muted"></p>
        </div>
        <button id="btn-add" class="btn btn-primary">+ Tambah mata kuliah</button>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Kode</th><th>Nama mata kuliah</th><th>SKS</th><th>Jumlah tugas</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>
      </div>

      <section id="detail" class="panel" aria-live="polite"></section>

      <p id="notice" class="notice">
        Mata kuliah yang masih memiliki tugas atau jadwal belajar tidak dapat dihapus; pindahkan atau hapus data terkait terlebih dahulu.
      </p>

      <footer class="foot">
        <span>FR-01 · Data contoh disimpan di browser selama halaman terbuka</span>
        <span id="foot-date"></span>
      </footer>
    </main>
  </div>

  <dialog id="dlg">
    <form id="form" method="dialog" novalidate>
      <h3 id="dlg-title">Tambah mata kuliah</h3>
      <label>Kode mata kuliah
        <input id="f-kode" maxlength="10" placeholder="IF204" required>
      </label>
      <label>Nama mata kuliah
        <input id="f-nama" maxlength="100" placeholder="Sistem Operasi" required>
      </label>
      <div class="row">
        <label>SKS
          <input id="f-sks" type="number" min="1" max="6" value="3" required>
        </label>
        <label>Semester
          <input id="f-sem" type="number" min="1" max="14" value="3" required>
        </label>
      </div>
      <p id="form-error" class="error" hidden></p>
      <div class="actions">
        <button type="button" id="btn-cancel" class="btn">Batal</button>
        <button type="submit" class="btn btn-primary">Simpan</button>
      </div>
    </form>
  </dialog>

  <script src="script1.js"></script>
</body>
</html>

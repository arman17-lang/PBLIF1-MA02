<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Jadwal belajar - Aplikasi daftar tugas dan belajar mahasiswa</title>
  <link rel="stylesheet" href="style4.css">
  <link rel="stylesheet" href="style8.css">
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
      <div class="side-info">
        <p>Semester ganjil 2026/2027</p>
        <p>Rabu, 21 Oktober 2026</p>
      </div>
    </aside>

    <main class="content">
      <div class="page-head">
        <div>
          <h2 class="page-title">Jadwal belajar</h2>
          <p class="page-desc">Atur waktu belajar per topik dan mata kuliah.</p>
        </div>
        <button type="button" class="btn btn-primary" id="btn-tambah">+ Tambah jadwal</button>
      </div>

      <div class="toolbar">
        <div class="week-nav">
          <button type="button" class="btn btn-secondary btn-icon" id="btn-prev" aria-label="Minggu sebelumnya">‹</button>
          <strong id="rentang">19–25 Oktober 2026</strong>
          <button type="button" class="btn btn-secondary btn-icon" id="btn-next" aria-label="Minggu berikutnya">›</button>
          <button type="button" class="btn btn-secondary" id="btn-hari-ini">Hari ini</button>
        </div>
        <p class="meta" id="jumlah">Tampilan daftar · 4 sesi belajar</p>
      </div>

      <div class="table-wrap">
        <table class="schedule">
          <thead>
            <tr>
              <th>Hari / tanggal</th>
              <th>Waktu</th>
              <th>Topik</th>
              <th>Mata kuliah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>
      </div>

      <section class="detail" id="detail" aria-live="polite"></section>

      <p class="validation-note">
        Contoh keadaan Lihat: sesi Review ERD dan relasi tabel dipilih dari daftar.
        Jadwal ini juga ditampilkan pada dashboard dan detail tugas Perancangan ERD.
      </p>

      <footer class="foot">
        <span>FR-03 · Keadaan statis, bukan interaksi fungsional</span>
        <span>Data contoh · 21 Okt 2026</span>
      </footer>
    </main>
  </div>

  <!-- Dialog tambah / edit -->
  <dialog id="dialog">
    <form id="form" class="task-form" novalidate>
      <h3 id="dialog-judul">Tambah jadwal</h3>

      <div class="field">
        <label for="f-topik">Topik *</label>
        <input type="text" id="f-topik" placeholder="Contoh: Latihan query SQL">
        <p class="error" id="f-topik-err" hidden></p>
      </div>

      <div class="field">
        <label for="f-matkul">Mata kuliah *</label>
        <select id="f-matkul">
          <option value="">Pilih mata kuliah</option>
          <option>Algoritma</option>
          <option>Basis Data</option>
          <option>Statistika</option>
        </select>
        <p class="error" id="f-matkul-err" hidden></p>
      </div>

      <div class="field">
        <label for="f-tanggal">Tanggal *</label>
        <input type="date" id="f-tanggal">
        <p class="error" id="f-tanggal-err" hidden></p>
      </div>

      <div class="row">
        <div class="field">
          <label for="f-mulai">Mulai *</label>
          <input type="time" id="f-mulai">
        </div>
        <div class="field">
          <label for="f-selesai">Selesai *</label>
          <input type="time" id="f-selesai">
        </div>
      </div>
      <p class="error" id="f-waktu-err" hidden></p>

      <div class="actions">
        <button type="submit" class="btn btn-primary" id="btn-simpan">Simpan jadwal</button>
        <button type="button" class="btn btn-secondary" id="btn-batal">Batal</button>
      </div>
    </form>
  </dialog>

  <script src="script8.js"></script>
</body>
</html>
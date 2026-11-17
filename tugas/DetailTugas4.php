<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Detail tugas · Perancangan ERD</title>
  <link rel="stylesheet" href="style4.css">
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
        <a class="nav-item" href="Dasboard3.html">Dasboard</a>
        <a class="nav-item" href="DaftarTugasDanPencarian2.html">Daftar Tugas</a>
        <a class="nav-item" href="matakuliah1.html">Mata kuliah</a>
        <a class="nav-item" href="JadwalBelajar8.html">Jadwal Belajar</a>
        <a class="nav-item" href="RekapTugas10.html">Rekap</a>
      </nav>
      <div class="side-foot muted small">
        <p>Semester ganjil 2026/2027</p>
        <p id="today-label"></p>
      </div>
    </aside>

    <main class="content">
      <p class="breadcrumb muted small">Daftar tugas / <span id="crumb"></span></p>
      <h2 class="page-title">Detail tugas</h2>
      <p class="muted">Seluruh informasi tugas dan rencana belajar terkait.</p>

      <div class="grid">
        <section class="card task-card" aria-labelledby="task-title">
          <div class="task-head">
            <h3 id="task-title"></h3>
            <span class="badge" id="task-status"></span>
          </div>
          <hr>
          <dl class="meta">
            <div><dt>Mata kuliah</dt><dd id="task-course"></dd></div>
            <div><dt>Prioritas</dt><dd id="task-priority"></dd></div>
            <div><dt>Tanggal diberikan</dt><dd id="task-given"></dd></div>
            <div><dt>Deadline</dt><dd id="task-deadline"></dd></div>
          </dl>
          <div class="note">
            <p class="muted small">Catatan</p>
            <p id="task-note"></p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-edit">Edit tugas</button>
            <button class="btn" id="btn-delete">Hapus tugas</button>
          </div>
        </section>

        <aside class="side-cards">
          <section class="card countdown" id="countdown-card">
            <h3 id="countdown-title"></h3>
            <p id="countdown-text"></p>
          </section>

          <section class="card">
            <h3>Jadwal belajar terkait</h3>
            <p class="strong" id="study-title"></p>
            <p id="study-date"></p>
            <p id="study-time"></p>
            <button class="btn" id="btn-schedule">Lihat jadwal →</button>
          </section>
        </aside>
      </div>

      <button class="btn back" id="btn-back">← Kembali ke daftar tugas</button>

      <p class="hint muted small">
        Aksi Edit membuka formulir dengan semua nilai tugas terisi. Aksi Hapus menampilkan konfirmasi sebelum tugas dihapus.
      </p>

      <footer class="foot muted small">
        <span>FR-02 · Keadaan statis, bukan interaksi fungsional</span>
        <span>Data contoh · 21 Okt 2026</span>
      </footer>
    </main>
  </div>

  <!-- Dialog edit -->
  <dialog id="dlg-edit">
    <form method="dialog" id="form-edit">
      <h3>Edit tugas</h3>
      <label>Judul tugas <input name="title" required></label>
      <label>Mata kuliah <input name="course" required></label>
      <div class="row">
        <label>Prioritas
          <select name="priority">
            <option>Rendah</option><option>Sedang</option><option>Tinggi</option>
          </select>
        </label>
        <label>Status
          <select name="status">
            <option>Belum dikerjakan</option><option>Dikerjakan</option><option>Selesai</option>
          </select>
        </label>
      </div>
      <div class="row">
        <label>Tanggal diberikan <input type="date" name="given" required></label>
        <label>Deadline <input type="date" name="deadline" required></label>
      </div>
      <label>Catatan <textarea name="note" rows="3"></textarea></label>
      <p class="error" id="edit-error" hidden></p>
      <div class="actions end">
        <button type="button" class="btn" data-close="dlg-edit">Batal</button>
        <button type="submit" class="btn primary">Simpan perubahan</button>
      </div>
    </form>
  </dialog>

  <!-- Dialog konfirmasi hapus -->
  <dialog id="dlg-delete">
    <h3>Hapus tugas ini?</h3>
    <p>Tugas <strong id="del-name"></strong> akan dihapus dan tidak bisa dikembalikan.</p>
    <div class="actions end">
      <button class="btn" data-close="dlg-delete">Batal</button>
      <button class="btn danger" id="btn-confirm-delete">Hapus tugas</button>
    </div>
  </dialog>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>

  <script src="script4.js"></script>
</body>
</html>
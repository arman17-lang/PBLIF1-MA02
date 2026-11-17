<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Formulir tugas - Aplikasi daftar tugas dan belajar mahasiswa</title>
  <link rel="stylesheet" href="style7.css">
</head>
<body>
  <header class="topbar">
    <div>
      <h1 class="app-title">Aplikasi daftar tugas dan belajar mahasiswa</h1>
      <p class="app-sub">Wireframe desktop / fidelitas rendah</p>
    </div>
    <div class="user">
      <strong>Nadia Putri</strong>
      <span>Informatika · Semester 3</span>
    </div>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <p class="side-label">Ruang mahasiswa</p>
      <nav>
        <a href="#">Dashboard</a>
        <a href="#" class="active" aria-current="page">Daftar tugas</a>
        <a href="#">Mata kuliah</a>
        <a href="#">Jadwal belajar</a>
        <a href="#">Rekap</a>
      </nav>
      <div class="side-info">
        <p>Semester ganjil 2026/2027</p>
        <p id="tanggal-hari-ini">Rabu, 21 Oktober 2026</p>
      </div>
    </aside>

    <main class="content">
      <p class="breadcrumb">Daftar tugas / Formulir tugas</p>
      <h2 class="page-title">Formulir tugas</h2>
      <p class="page-desc">Dua keadaan dari formulir yang sama. * menandai isian wajib.</p>

      <div class="forms">
        <!-- FORM TAMBAH TUGAS -->
        <section class="card">
          <h3>Tambah tugas</h3>
          <p class="state-note">Tugas baru · Isian awal kosong</p>

          <form id="form-tambah" class="task-form" novalidate>
            <div class="field">
              <label for="t-judul">Judul tugas *</label>
              <input type="text" id="t-judul" name="judul" placeholder="Masukkan judul tugas">
              <p class="error" id="t-judul-err" hidden></p>
            </div>

            <div class="field">
              <label for="t-matkul">Mata kuliah *</label>
              <select id="t-matkul" name="matkul">
                <option value="" selected>Pilih mata kuliah</option>
                <option>Algoritma</option>
                <option>Basis Data</option>
                <option>Statistika</option>
              </select>
              <p class="hint">Pilihan: Algoritma · Basis Data · Statistika</p>
              <p class="error" id="t-matkul-err" hidden></p>
            </div>

            <div class="row">
              <div class="field">
                <label for="t-diberikan">Tanggal diberikan *</label>
                <input type="date" id="t-diberikan" name="diberikan" value="2026-10-21">
              </div>
              <div class="field">
                <label for="t-deadline">Deadline *</label>
                <input type="date" id="t-deadline" name="deadline">
              </div>
            </div>
            <p class="error" id="t-deadline-err" hidden></p>

            <div class="field">
              <label for="t-prioritas">Prioritas *</label>
              <select id="t-prioritas" name="prioritas">
                <option>Rendah</option>
                <option selected>Sedang</option>
                <option>Tinggi</option>
              </select>
              <p class="hint">Pilihan: Rendah · Sedang · Tinggi</p>
            </div>

            <div class="field">
              <label for="t-status">Status *</label>
              <select id="t-status" name="status">
                <option selected>Belum Mulai</option>
                <option>Dikerjakan</option>
                <option>Selesai</option>
              </select>
              <p class="hint">Pilihan: Belum Mulai · Dikerjakan · Selesai</p>
            </div>

            <div class="field">
              <label for="t-catatan">Catatan</label>
              <textarea id="t-catatan" name="catatan" rows="3" placeholder="Masukkan catatan tugas (opsional)"></textarea>
            </div>

            <div class="actions">
              <button type="submit" class="btn btn-primary">Simpan tugas</button>
              <button type="button" class="btn btn-secondary" data-batal>Batal</button>
            </div>
          </form>
        </section>

        <!-- FORM EDIT TUGAS -->
        <section class="card">
          <h3>Edit tugas</h3>
          <p class="state-note">Data saat ini · Perancangan ERD</p>

          <form id="form-edit" class="task-form" novalidate>
            <div class="field">
              <label for="e-judul">Judul tugas *</label>
              <input type="text" id="e-judul" name="judul" value="Perancangan ERD">
              <p class="error" id="e-judul-err" hidden></p>
            </div>

            <div class="field">
              <label for="e-matkul">Mata kuliah *</label>
              <select id="e-matkul" name="matkul">
                <option value="">Pilih mata kuliah</option>
                <option>Algoritma</option>
                <option selected>Basis Data</option>
                <option>Statistika</option>
              </select>
              <p class="hint">Pilihan: Algoritma · Basis Data · Statistika</p>
              <p class="error" id="e-matkul-err" hidden></p>
            </div>

            <div class="row">
              <div class="field">
                <label for="e-diberikan">Tanggal diberikan *</label>
                <input type="date" id="e-diberikan" name="diberikan" value="2026-10-15">
              </div>
              <div class="field">
                <label for="e-deadline">Deadline *</label>
                <input type="date" id="e-deadline" name="deadline" value="2026-10-22">
              </div>
            </div>
            <p class="error" id="e-deadline-err" hidden></p>

            <div class="field">
              <label for="e-prioritas">Prioritas *</label>
              <select id="e-prioritas" name="prioritas">
                <option>Rendah</option>
                <option>Sedang</option>
                <option selected>Tinggi</option>
              </select>
              <p class="hint">Pilihan: Rendah · Sedang · Tinggi</p>
            </div>

            <div class="field">
              <label for="e-status">Status *</label>
              <select id="e-status" name="status">
                <option>Belum Mulai</option>
                <option selected>Dikerjakan</option>
                <option>Selesai</option>
              </select>
              <p class="hint">Pilihan: Belum Mulai · Dikerjakan · Selesai</p>
            </div>

            <div class="field">
              <label for="e-catatan">Catatan</label>
              <textarea id="e-catatan" name="catatan" rows="3" placeholder="Masukkan catatan tugas (opsional)">Buat ERD sistem perpustakaan. Minimal 5 entitas, relasi, dan kardinalitas. Kumpulkan dalam PDF.</textarea>
            </div>

            <div class="actions">
              <button type="submit" class="btn btn-primary">Simpan perubahan</button>
              <button type="button" class="btn btn-secondary" data-batal>Batal</button>
            </div>
          </form>
        </section>
      </div>

      <div id="pesan" class="toast" role="status" aria-live="polite" hidden></div>

      <p class="validation-note">
        Validasi: judul dan mata kuliah wajib diisi. Deadline tidak boleh sebelum tanggal diberikan.
        Pesan di bawah isian: 'Deadline harus sama atau setelah tanggal diberikan.'
        Batal kembali ke Daftar tugas tanpa menyimpan.
      </p>

      <footer class="foot">
        <span>FR-02 · Keadaan statis, bukan interaksi fungsional</span>
        <span>Data contoh · 21 Okt 2026</span>
      </footer>
    </main>
  </div>

  <script src="script7.js"></script>
</body>
</html>
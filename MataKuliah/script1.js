const STATUS = ["Belum Mulai", "Dikerjakan", "Selesai"];
const DEFAULT_NOTICE =
  "Mata kuliah yang masih memiliki tugas atau jadwal belajar tidak dapat dihapus; pindahkan atau hapus data terkait terlebih dahulu.";

let courses = [
  { id: 1, kode: "IF201", nama: "Algoritma", sks: 3, semester: 3, jadwal: 1,
    tugas: [
      { judul: "Pseudocode pencarian", status: "Selesai" },
      { judul: "Analisis kompleksitas", status: "Dikerjakan" },
      { judul: "Latihan rekursi", status: "Belum Mulai" },
    ] },
  { id: 2, kode: "IF202", nama: "Basis Data", sks: 3, semester: 3, jadwal: 2,
    tugas: [
      { judul: "Perancangan ERD", status: "Selesai" },
      { judul: "Latihan query SQL", status: "Dikerjakan" },
      { judul: "Normalisasi tabel", status: "Belum Mulai" },
    ] },
  { id: 3, kode: "IF203", nama: "Statistika", sks: 2, semester: 3, jadwal: 1,
    tugas: [
      { judul: "Ringkasan distribusi data", status: "Dikerjakan" },
      { judul: "Soal peluang", status: "Belum Mulai" },
    ] },
];
let selectedId = 2;
let nextId = 4;
let editingId = null;
let showTasks = false;

const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const byId = (id) => courses.find((c) => c.id === id);

function setNotice(text, warn = false) {
  const n = $("#notice");
  n.textContent = text;
  n.classList.toggle("warn", warn);
}

function renderTable() {
  const body = $("#tbody");
  if (!courses.length) {
    body.innerHTML = '<tr><td class="empty" colspan="5">Belum ada mata kuliah. Pilih "+ Tambah mata kuliah" untuk memulai.</td></tr>';
  } else {
    body.innerHTML = courses.map((c) => `
      <tr data-id="${c.id}" class="${c.id === selectedId ? "selected" : ""}">
        <td class="kode">${esc(c.kode)}</td>
        <td>${esc(c.nama)}</td>
        <td>${c.sks}</td>
        <td>${c.tugas.length}</td>
        <td>
          <button class="link" data-act="view">Lihat</button><span class="sep">·</span>
          <button class="link" data-act="edit">Edit</button><span class="sep">·</span>
          <button class="link" data-act="delete">Hapus</button>
        </td>
      </tr>`).join("");
  }
  $("#subtitle").textContent = `${courses.length} mata kuliah terdaftar pada semester ganjil 2026/2027.`;
}

function renderDetail() {
  const c = byId(selectedId);
  const box = $("#detail");
  if (!c) {
    box.innerHTML = '<p class="muted">Pilih "Lihat" pada salah satu mata kuliah untuk melihat detailnya.</p>';
    return;
  }
  const counts = STATUS.map((s) => [s, c.tugas.filter((t) => t.status === s).length]).filter(([, n]) => n > 0);
  const summary = c.tugas.length
    ? `${c.tugas.length} tugas: ${counts.map(([s, n]) => `${n} ${s}`).join(", ")} · ${c.jadwal} jadwal belajar terkait`
    : `Belum ada tugas · ${c.jadwal} jadwal belajar terkait`;
  const names = c.tugas.length ? c.tugas.map((t) => esc(t.judul)).join(" · ") : "Belum ada tugas";

  box.innerHTML = `
    <h3>Detail mata kuliah · ${esc(c.nama)}</h3>
    <div class="fields">
      <div><small>Kode mata kuliah</small><strong>${esc(c.kode)}</strong></div>
      <div><small>Nama mata kuliah</small><strong>${esc(c.nama)}</strong></div>
      <div><small>SKS</small><strong>${c.sks}</strong></div>
      <div><small>Semester</small><strong>${c.semester}</strong></div>
    </div>
    <p class="info">Tugas terkait: ${names}</p>
    <p class="info muted">${summary}</p>
    ${showTasks && c.tugas.length ? `<ul class="task-list">${c.tugas.map((t) =>
      `<li>${esc(t.judul)}<span class="tag">${t.status}</span></li>`).join("")}</ul>` : ""}
    <div class="actions">
      <button class="btn btn-primary" data-act="edit">Edit mata kuliah</button>
      <button class="btn" data-act="delete">Hapus mata kuliah</button>
      <button class="btn" data-act="tasks">${showTasks ? "Sembunyikan tugas" : "Lihat tugas terkait →"}</button>
    </div>`;
}

function render() { renderTable(); renderDetail(); }

function selectCourse(id) {
  selectedId = id;
  showTasks = false;
  const c = byId(id);
  setNotice(`Contoh keadaan Lihat: ${c.nama} dipilih dari tabel. ${DEFAULT_NOTICE}`);
  render();
}

function deleteCourse(id) {
  const c = byId(id);
  if (c.tugas.length || c.jadwal) {
    setNotice(`${c.nama} tidak dapat dihapus karena masih memiliki ${c.tugas.length} tugas dan ${c.jadwal} jadwal belajar. Pindahkan atau hapus data terkait terlebih dahulu.`, true);
    return;
  }
  if (!confirm(`Hapus mata kuliah ${c.nama}?`)) return;
  courses = courses.filter((x) => x.id !== id);
  if (selectedId === id) selectedId = courses[0]?.id ?? null;
  setNotice(`${c.nama} dihapus.`);
  render();
}

/* Dialog tambah / edit */
const dlg = $("#dlg");
function openForm(id = null) {
  editingId = id;
  const c = id ? byId(id) : null;
  $("#dlg-title").textContent = c ? "Edit mata kuliah" : "Tambah mata kuliah";
  $("#f-kode").value = c ? c.kode : "";
  $("#f-nama").value = c ? c.nama : "";
  $("#f-sks").value = c ? c.sks : 3;
  $("#f-sem").value = c ? c.semester : 3;
  $("#form-error").hidden = true;
  dlg.showModal();
  $("#f-kode").focus();
}

$("#form").addEventListener("submit", (e) => {
  
  const kode = $("#f-kode").value.trim().toUpperCase();
  const nama = $("#f-nama").value.trim();
  const sks = Number($("#f-sks").value);
  const semester = Number($("#f-sem").value);
  const err = $("#form-error");
  let msg = "";
  if (!kode || !nama) msg = "Kode dan nama mata kuliah wajib diisi.";
  else if (!Number.isInteger(sks) || sks < 1 || sks > 6) msg = "SKS harus berupa angka 1 sampai 6.";
  else if (!Number.isInteger(semester) || semester < 1) msg = "Semester harus berupa angka minimal 1.";
  else if (courses.some((c) => c.kode === kode && c.id !== editingId)) msg = `Kode ${kode} sudah dipakai mata kuliah lain.`;
  if (msg) { err.textContent = msg; err.hidden = false; return; }

  if (editingId) {
    Object.assign(byId(editingId), { kode, nama, sks, semester });
    setNotice(`${nama} berhasil diperbarui.`);
  } else {
    courses.push({ id: nextId, kode, nama, sks, semester, jadwal: 0, tugas: [] });
    selectedId = nextId++;
    setNotice(`${nama} berhasil ditambahkan.`);
  }
  showTasks = false;
  dlg.close();
  render();
});
$("#btn-cancel").addEventListener("click", () => dlg.close());
$("#btn-add").addEventListener("click", () => openForm());

/* Klik pada tabel dan panel detail */
$("#tbody").addEventListener("click", (e) => {
  const tr = e.target.closest("tr[data-id]");
  if (!tr) return;
  const id = Number(tr.dataset.id);
  const act = e.target.dataset.act;
  if (act === "edit") { selectedId = id; render(); openForm(id); }
  else if (act === "delete") { deleteCourse(id); }
  else { selectCourse(id); }
});

$("#detail").addEventListener("click", (e) => {
  const act = e.target.dataset.act;
  if (!act || !selectedId) return;
  if (act === "edit") openForm(selectedId);
  if (act === "delete") deleteCourse(selectedId);
  if (act === "tasks") { showTasks = !showTasks; renderDetail(); }
});

/* Menu samping selain Mata kuliah belum dibuat */
document.querySelectorAll(".nav-item[data-page]").forEach((b) =>
  b.addEventListener("click", () => setNotice(`Halaman ${b.dataset.page} belum dibuat pada wireframe ini.`)));

/* Tanggal hari ini */
const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
$("#today").textContent = today;
$("#foot-date").textContent = "Data contoh · " + new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

render();
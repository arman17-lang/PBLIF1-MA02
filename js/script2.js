const COURSES = ["Algoritma", "Basis Data", "Statistika"];
const STATUS = ["Belum Mulai", "Dikerjakan", "Selesai"];
const PRIORITAS = ["Rendah", "Sedang", "Tinggi"];
const PRIO_RANK = { Rendah: 1, Sedang: 2, Tinggi: 3 };
const PAGE_SIZE = 8;

let tasks = [
  { id: 1, judul: "Perancangan ERD", mk: "Basis Data", deadline: "2026-10-22", prioritas: "Tinggi", status: "Dikerjakan", catatan: "Buat ERD untuk aplikasi tugas dan jadwal belajar." },
  { id: 2, judul: "Implementasi sorting", mk: "Algoritma", deadline: "2026-10-23", prioritas: "Tinggi", status: "Belum Mulai", catatan: "" },
  { id: 3, judul: "Laporan uji hipotesis", mk: "Statistika", deadline: "2026-10-24", prioritas: "Sedang", status: "Dikerjakan", catatan: "" },
  { id: 4, judul: "Latihan query SQL", mk: "Basis Data", deadline: "2026-10-26", prioritas: "Sedang", status: "Belum Mulai", catatan: "" },
  { id: 5, judul: "Analisis kompleksitas", mk: "Algoritma", deadline: "2026-10-28", prioritas: "Sedang", status: "Dikerjakan", catatan: "" },
  { id: 6, judul: "Latihan regresi", mk: "Statistika", deadline: "2026-10-30", prioritas: "Rendah", status: "Belum Mulai", catatan: "" },
  { id: 7, judul: "Latihan rekursi", mk: "Algoritma", deadline: "2026-10-20", prioritas: "Sedang", status: "Selesai", catatan: "" },
  { id: 8, judul: "Normalisasi tabel", mk: "Basis Data", deadline: "2026-10-19", prioritas: "Sedang", status: "Selesai", catatan: "" },
];
let nextId = 9;
let editingId = null;
let viewingId = null;
let page = 1;
const f = { q: "", mk: "", date: "", day: "", status: "" };

const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const parse = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmt = (iso) => parse(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

/* Isi pilihan */
const opt = (v, t = v) => `<option value="${esc(v)}">${esc(t)}</option>`;
$("#mk").innerHTML = opt("", "Semua mata kuliah") + COURSES.map((c) => opt(c)).join("");
$("#f-mk").innerHTML = COURSES.map((c) => opt(c)).join("");
$("#f-prioritas").innerHTML = PRIORITAS.map((p) => opt(p)).join("");
$("#f-status").innerHTML = STATUS.map((s) => opt(s)).join("");

/* Penyaringan */
function matchDate(t) {
  if (!f.date) return true;
  const d = parse(t.deadline);
  const now = new Date(); now.setHours(0, 0, 0, 0);
  if (f.date === "today") return d.getTime() === now.getTime();
  if (f.date === "week") { const end = new Date(now); end.setDate(end.getDate() + 7); return d >= now && d <= end; }
  if (f.date === "month") return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  if (f.date === "exact") return !f.day || t.deadline === f.day;
  return true;
}
function matchBase(t) {
  return (!f.q || t.judul.toLowerCase().includes(f.q.toLowerCase())) && (!f.mk || t.mk === f.mk) && matchDate(t);
}
function sorted(list) {
  const mode = $("#sort").value;
  const byDate = (a, b) => a.deadline.localeCompare(b.deadline);
  const copy = [...list];
  if (mode === "jauh") return copy.sort((a, b) => byDate(b, a));
  if (mode === "prioritas") return copy.sort((a, b) => PRIO_RANK[b.prioritas] - PRIO_RANK[a.prioritas] || byDate(a, b));
  if (mode === "judul") return copy.sort((a, b) => a.judul.localeCompare(b.judul, "id"));
  const active = copy.filter((t) => t.status !== "Selesai").sort(byDate);
  const done = copy.filter((t) => t.status === "Selesai").sort((a, b) => byDate(b, a));
  return [...active, ...done];
}

function filtersText() {
  const parts = [];
  if (f.q) parts.push(`Judul: “${f.q}”`);
  if (f.mk) parts.push(`Mata kuliah: ${f.mk}`);
  if (f.status) parts.push(`Status: ${f.status}`);
  if (f.date) {
    const label = { today: "Hari ini", week: "7 hari ke depan", month: "Bulan ini" }[f.date];
    if (label) parts.push(`Deadline: ${label}`);
    else if (f.day) parts.push(`Deadline: ${fmt(f.day)}`);
  }
  return parts;
}

/* Render */
function render() {
  const base = tasks.filter(matchBase);
  const list = sorted(base.filter((t) => !f.status || t.status === f.status));

  $("#chips").innerHTML = [["", "Semua", base.length], ...STATUS.map((s) => [s, s, base.filter((t) => t.status === s).length])]
    .map(([v, label, n]) => `<button class="chip" data-status="${esc(v)}" aria-pressed="${f.status === v}">${label} (${n})</button>`).join("");

  $("#count").textContent = `${list.length} tugas ditampilkan`;

  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  page = Math.min(page, pages);
  const start = (page - 1) * PAGE_SIZE;
  const slice = list.slice(start, start + PAGE_SIZE);

  if (slice.length) {
    $("#tbody").innerHTML = slice.map((t) => `
      <tr data-id="${t.id}">
        <td class="judul">${esc(t.judul)}</td>
        <td>${esc(t.mk)}</td>
        <td>${fmt(t.deadline)}</td>
        <td>${t.prioritas}</td>
        <td>${t.status}</td>
        <td>
          <button class="link" data-act="view">Lihat</button><span class="sep">·</span>
          <button class="link" data-act="edit">Edit</button><span class="sep">·</span>
          <button class="link" data-act="delete">Hapus</button>
        </td>
      </tr>`).join("");
  } else if (!tasks.length) {
    $("#tbody").innerHTML = '<tr><td class="empty" colspan="6"><p>Belum ada tugas.</p><p>Pilih “+ Tambah tugas” untuk memulai.</p></td></tr>';
  } else {
    const msg = f.q ? `Pencarian: “${esc(f.q)}” · Tidak ada tugas ditemukan.` : "Tidak ada tugas yang cocok dengan filter.";
    $("#tbody").innerHTML = `<tr><td class="empty" colspan="6"><p>${msg}</p><p>Coba kata kunci lain atau reset pencarian dan filter.</p><button class="link" data-act="reset">Reset pencarian dan filter →</button></td></tr>`;
  }

  $("#range").textContent = list.length
    ? `Menampilkan ${start + 1}–${start + slice.length} dari ${list.length} tugas`
    : "Menampilkan 0 tugas";
  $("#pages").innerHTML =
    `<button data-page="${page - 1}" ${page === 1 ? "disabled" : ""}>‹ Sebelumnya</button>` +
    Array.from({ length: pages }, (_, i) => `<button data-page="${i + 1}" ${i + 1 === page ? 'aria-current="page"' : ""}>${i + 1 === page ? `[ ${i + 1} ]` : i + 1}</button>`).join("") +
    `<button data-page="${page + 1}" ${page === pages ? "disabled" : ""}>Berikutnya ›</button>`;

  const active = filtersText();
  $("#summary").textContent = active.length
    ? `${active.join(" · ")} — ${list.length ? `${list.length} hasil${list.length <= 3 ? ": " + list.map((t) => t.judul).join(", ") : ""}` : "tidak ada tugas ditemukan"}.`
    : `Tidak ada filter aktif. Menampilkan seluruh tugas (${tasks.length}).`;
}

function flash(text, warn = false) {
  const el = $("#flash");
  el.textContent = text;
  el.hidden = false;
  el.classList.toggle("warn", warn);
}

/* Filter */
function resetFilters() {
  Object.assign(f, { q: "", mk: "", date: "", day: "", status: "" });
  $("#q").value = ""; $("#mk").value = ""; $("#date").value = ""; $("#day").value = "";
  $("#day-wrap").hidden = true;
  page = 1;
  render();
}
$("#q").addEventListener("input", (e) => { f.q = e.target.value.trim(); page = 1; render(); });
$("#q").addEventListener("keydown", (e) => { if (e.key === "Enter") { f.q = e.target.value.trim(); page = 1; render(); } });
$("#mk").addEventListener("change", (e) => { f.mk = e.target.value; page = 1; render(); });
$("#date").addEventListener("change", (e) => {
  f.date = e.target.value;
  $("#day-wrap").hidden = f.date !== "exact";
  if (f.date !== "exact") { f.day = ""; $("#day").value = ""; }
  page = 1; render();
});
$("#day").addEventListener("change", (e) => { f.day = e.target.value; page = 1; render(); });
$("#sort").addEventListener("change", () => { page = 1; render(); });
$("#btn-search").addEventListener("click", () => { f.q = $("#q").value.trim(); page = 1; render(); });
$("#btn-reset").addEventListener("click", resetFilters);
$("#chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-status]");
  if (!b) return;
  f.status = b.dataset.status; page = 1; render();
});
$("#pages").addEventListener("click", (e) => {
  const b = e.target.closest("[data-page]");
  if (!b || b.disabled) return;
  page = Number(b.dataset.page); render();
});

/* Aksi pada baris */
$("#tbody").addEventListener("click", (e) => {
  const act = e.target.dataset.act;
  if (act === "reset") return resetFilters();
  const tr = e.target.closest("tr[data-id]");
  if (!tr || !act) return;
  const id = Number(tr.dataset.id);
  if (act === "view") openView(id);
  if (act === "edit") openForm(id);
  if (act === "delete") removeTask(id);
});

function removeTask(id) {
  const t = tasks.find((x) => x.id === id);
  if (!confirm(`Hapus tugas “${t.judul}”?`)) return;
  tasks = tasks.filter((x) => x.id !== id);
  flash(`Tugas “${t.judul}” dihapus.`);
  render();
}

/* Dialog lihat */
const dlgView = $("#dlg-view");
function openView(id) {
  const t = tasks.find((x) => x.id === id);
  viewingId = id;
  $("#v-judul").textContent = t.judul;
  $("#v-list").innerHTML = [["Mata kuliah", t.mk], ["Deadline", fmt(t.deadline)], ["Prioritas", t.prioritas], ["Status", t.status], ["Catatan", t.catatan || "Tidak ada catatan"]]
    .map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
  dlgView.showModal();
}
$("#v-close").addEventListener("click", () => dlgView.close());
$("#v-edit").addEventListener("click", () => { dlgView.close(); openForm(viewingId); });

/* Dialog tambah / edit */
const dlgForm = $("#dlg-form");
function openForm(id = null) {
  editingId = id;
  const t = id ? tasks.find((x) => x.id === id) : null;
  $("#form-title").textContent = t ? "Edit tugas" : "Tambah tugas";
  $("#f-judul").value = t ? t.judul : "";
  $("#f-mk").value = t ? t.mk : (f.mk || COURSES[0]);
  $("#f-deadline").value = t ? t.deadline : toISO(new Date());
  $("#f-prioritas").value = t ? t.prioritas : "Sedang";
  $("#f-status").value = t ? t.status : "Belum Mulai";
  $("#f-catatan").value = t ? t.catatan : "";
  $("#form-error").hidden = true;
  dlgForm.showModal();
  $("#f-judul").focus();
}
$("#btn-add").addEventListener("click", () => openForm());
$("#btn-cancel").addEventListener("click", () => dlgForm.close());
$("#form").addEventListener("submit", (e) => {
  
  const data = {
    judul: $("#f-judul").value.trim(),
    mk: $("#f-mk").value,
    deadline: $("#f-deadline").value,
    prioritas: $("#f-prioritas").value,
    status: $("#f-status").value,
    catatan: $("#f-catatan").value.trim(),
  };
  const err = $("#form-error");
  if (!data.judul) { err.textContent = "Judul tugas wajib diisi."; err.hidden = false; return; }
  if (!data.deadline) { err.textContent = "Deadline wajib diisi."; err.hidden = false; return; }
  if (editingId) {
    Object.assign(tasks.find((x) => x.id === editingId), data);
    flash(`Tugas “${data.judul}” diperbarui.`);
  } else {
    tasks.push({ id: nextId++, ...data });
    flash(`Tugas “${data.judul}” ditambahkan.`);
  }
  dlgForm.close();
  render();
});

/* Menu samping */
document.querySelectorAll(".nav-item[data-page]").forEach((b) =>
  b.addEventListener("click", () => flash(`Halaman ${b.dataset.page} belum dibuat pada wireframe ini.`)));

/* Tanggal */
$("#today").textContent = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
$("#foot-date").textContent = "Data contoh · " + new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

render();
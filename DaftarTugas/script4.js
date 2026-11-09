// Data contoh (sesuai wireframe). "Hari ini" dibuat tetap agar tampilan sama dengan wireframe.
// Untuk memakai tanggal sungguhan, ganti dengan: const TODAY = new Date();
const TODAY = new Date(2026, 9, 21); // 21 Oktober 2026

let task = {
  title: "Perancangan ERD",
  course: "Basis Data (IF202)",
  priority: "Tinggi",
  status: "Dikerjakan",
  given: "2026-10-15",
  deadline: "2026-10-22",
  note: "Buat ERD sistem perpustakaan. Minimal 5 entitas, relasi, dan kardinalitas. Kumpulkan dalam PDF."
};

const study = { title: "Review ERD dan relasi tabel", date: "2026-10-21", time: "19.00–20.30", course: "Basis Data" };

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

const $ = (id) => document.getElementById(id);

// "2026-10-22" -> Date lokal (hindari geser zona waktu)
const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const fmt = (d) => `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
const fmtLong = (d) => `${HARI[d.getDay()]}, ${fmt(d)}`;
const daysBetween = (a, b) => Math.round((b - a) / 86400000);

function render() {
  const deadline = parseDate(task.deadline);
  const left = daysBetween(TODAY, deadline);
  const done = task.status === "Selesai";

  $("crumb").textContent = task.title;
  $("task-title").textContent = task.title;
  $("task-course").textContent = task.course;
  $("task-priority").textContent = task.priority;
  $("task-given").textContent = fmt(parseDate(task.given));
  $("task-deadline").textContent = fmt(deadline);
  $("task-note").textContent = task.note || "–";
  $("today-label").textContent = fmtLong(TODAY);

  const badge = $("task-status");
  badge.textContent = task.status;
  badge.dataset.status = task.status;

  // Kartu hitung mundur
  const card = $("countdown-card");
  card.classList.toggle("late", !done && left < 0);
  card.classList.toggle("done", done);
  const dl = `Deadline ${HARI[deadline.getDay()]}, ${fmt(deadline)}.`;
  if (done) {
    $("countdown-title").textContent = "Selesai";
    $("countdown-text").textContent = `${dl} Tugas sudah selesai.`;
  } else if (left < 0) {
    $("countdown-title").textContent = `Terlambat ${Math.abs(left)} hari`;
    $("countdown-text").textContent = `${dl} Tugas belum selesai.`;
  } else if (left === 0) {
    $("countdown-title").textContent = "Hari ini";
    $("countdown-text").textContent = `${dl} Tugas belum selesai.`;
  } else {
    $("countdown-title").textContent = `${left} hari lagi`;
    $("countdown-text").textContent = `${dl} Tugas belum selesai.`;
  }

  $("study-title").textContent = study.title;
  $("study-date").textContent = fmtLong(parseDate(study.date));
  $("study-time").textContent = `${study.time} · ${study.course}`;
  document.title = `Detail tugas · ${task.title}`;
}

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2400);
}

// Edit: formulir terisi semua nilai tugas
$("btn-edit").addEventListener("click", () => {
  const f = $("form-edit");
  for (const key of ["title", "course", "priority", "status", "given", "deadline", "note"]) {
    f.elements[key].value = task[key];
  }
  $("edit-error").hidden = true;
  $("dlg-edit").showModal();
});

$("form-edit").addEventListener("submit", (e) => {
  const f = e.target;
  if (f.elements.deadline.value < f.elements.given.value) {
    
    const err = $("edit-error");
    err.textContent = "Deadline tidak boleh sebelum tanggal diberikan.";
    err.hidden = false;
    return;
  }
  for (const key of ["title", "course", "priority", "status", "given", "deadline", "note"]) {
    task[key] = f.elements[key].value.trim();
  }
  render();
  toast("Perubahan disimpan");
});

// Hapus: konfirmasi dulu
$("btn-delete").addEventListener("click", () => {
  $("del-name").textContent = task.title;
  $("dlg-delete").showModal();
});

$("btn-confirm-delete").addEventListener("click", () => {
  $("dlg-delete").close();
  toast("Tugas dihapus");
  // Di aplikasi sungguhan: panggil API hapus lalu arahkan ke daftar tugas.
  // location.href = "daftar-tugas.html";
});

// Tombol batal
document.querySelectorAll("[data-close]").forEach((b) =>
  b.addEventListener("click", () => $(b.dataset.close).close())
);

// Navigasi (placeholder)
$("btn-back").addEventListener("click", () => toast("Kembali ke daftar tugas"));
$("btn-schedule").addEventListener("click", () => toast("Membuka jadwal belajar"));
document.querySelectorAll(".sidebar nav a").forEach((a) =>
  a.addEventListener("click", (e))
);

render();
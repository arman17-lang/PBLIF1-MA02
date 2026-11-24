// Tanggal acuan sesuai wireframe (data contoh). Ganti ke new Date() untuk tanggal asli.
const TODAY = new Date(2026, 9, 21);
const WINDOW_DAYS = 3;
const DAY_MS = 86400000;

const MONTHS_FULL = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const COURSES = ["Algoritma", "Basis Data", "Statistika"];

const tasks = [
  { title: "Perancangan ERD",        course: "Basis Data", due: new Date(2026, 9, 22),  status: "Dikerjakan" },
  { title: "Implementasi sorting",   course: "Algoritma",  due: new Date(2026, 9, 23),  status: "Belum Mulai" },
  { title: "Laporan uji hipotesis",  course: "Statistika", due: new Date(2026, 9, 24),  status: "Dikerjakan" },
  { title: "Analisis kompleksitas",  course: "Algoritma",  due: new Date(2026, 9, 28),  status: "Belum Mulai" },
  { title: "Normalisasi tabel",      course: "Basis Data", due: new Date(2026, 9, 30),  status: "Dikerjakan" },
  { title: "Latihan distribusi",     course: "Statistika", due: new Date(2026, 10, 2),  status: "Belum Mulai" },
  { title: "Kuis rekursi",           course: "Algoritma",  due: new Date(2026, 9, 15),  status: "Selesai" },
  { title: "Kuis SQL dasar",         course: "Basis Data", due: new Date(2026, 9, 14),  status: "Selesai" },
];

const $ = (id) => document.getElementById(id);

const fmtLong = (d) => `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
const fmtShort = (d) => `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
const daysLeft = (d) => Math.round((d - TODAY) / DAY_MS);

function badgeClass(status) {
  if (status === "Dikerjakan") return "badge doing";
  if (status === "Selesai") return "badge done";
  return "badge";
}

function renderHeader() {
  const limit = new Date(TODAY.getTime() + WINDOW_DAYS * DAY_MS);
  $("today-side").textContent = fmtLong(TODAY).replace(/^(\w+), (\d+) (\w+)/, "$1, $2 $3");
  $("today-foot").textContent = fmtShort(TODAY).replace(/^(\d+) (\w+)/, "$1 $2");
  $("limit-date").textContent = `${limit.getDate()} ${MONTHS_FULL[limit.getMonth()]} ${limit.getFullYear()}`;
  $("deadline-range").textContent =
    `${TODAY.getDate() + 1}–${limit.getDate()} ${MONTHS_FULL[limit.getMonth()]} ${limit.getFullYear()} · Tugas yang belum selesai · Terdekat lebih dahulu`;
}

function renderStats() {
  const count = (s) => tasks.filter((t) => t.status === s).length;
  const total = tasks.length;
  const done = count("Selesai");
  $("stat-total").textContent = total;
  $("stat-courses").textContent = `${new Set(tasks.map((t) => t.course)).size} mata kuliah`;
  $("stat-todo").textContent = count("Belum Mulai");
  $("stat-doing").textContent = count("Dikerjakan");
  $("stat-done").textContent = done;
  $("stat-percent").textContent = `${total ? Math.round((done / total) * 100) : 0}% dari seluruh tugas`;
}

function upcoming() {
  return tasks
    .filter((t) => t.status !== "Selesai" && daysLeft(t.due) >= 1 && daysLeft(t.due) <= WINDOW_DAYS)
    .sort((a, b) => a.due - b.due);
}

function renderDeadlines() {
  const list = upcoming();
  const body = $("deadline-body");
  body.innerHTML = "";

  $("greeting").textContent = list.length
    ? `Halo, Nadia. Ada ${list.length} tugas dengan deadline dalam ${WINDOW_DAYS} hari ke depan.`
    : `Halo, Nadia. Tidak ada tugas dengan deadline dalam ${WINDOW_DAYS} hari ke depan.`;

  if (!list.length) {
    body.innerHTML = '<tr><td colspan="6" class="empty">Belum ada tugas yang mendekati deadline.</td></tr>';
    return;
  }

  list.forEach((t) => {
    const tr = document.createElement("tr");
    const cells = [t.title, t.course, fmtShort(t.due), `${daysLeft(t.due)} hari lagi`];
    cells.forEach((text) => {
      const td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });

    const tdStatus = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = badgeClass(t.status);
    badge.textContent = t.status;
    tdStatus.appendChild(badge);
    tr.appendChild(tdStatus);

    const tdAction = document.createElement("td");
    const btn = document.createElement("button");
    btn.className = "link-btn";
    btn.textContent = "Lihat →";
    btn.addEventListener("click", () => toast(`Detail tugas: ${t.title}`));
    tdAction.appendChild(btn);
    tr.appendChild(tdAction);

    body.appendChild(tr);
  });
}

function renderCourses() {
  const ul = $("course-list");
  ul.innerHTML = "";
  COURSES.forEach((name) => {
    const items = tasks.filter((t) => t.course === name);
    const done = items.filter((t) => t.status === "Selesai").length;
    const li = document.createElement("li");
    li.innerHTML = `<strong style="font-weight:400"></strong><span>${items.length} tugas · ${done} selesai</span>`;
    li.firstChild.textContent = name;
    ul.appendChild(li);
  });
}

function renderSchedule() {
  $("slot-time").textContent = `19.00–20.30 · ${fmtLong(TODAY).replace(/^(\w+), (\d+) (\w+) (\d+)/, (m, d, n, mo, y) => `${d}, ${n} ${mo.slice(0, 3)} ${y}`)}`;
}

function renderAll() {
  renderHeader();
  renderStats();
  renderDeadlines();
  renderCourses();
  renderSchedule();
}

// Notifikasi singkat
let toastTimer;
function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2200);
}

// Dialog tambah tugas
const dlg = $("dlg");
const form = $("form-add");

$("btn-add").addEventListener("click", () => {
  form.reset();
  dlg.showModal();
});
$("btn-cancel").addEventListener("click", () => dlg.close());

form.addEventListener("submit", () => {
  const data = new FormData(form);
  const [y, m, d] = data.get("due").split("-").map(Number);
  tasks.push({
    title: data.get("title").trim(),
    course: data.get("course"),
    due: new Date(y, m - 1, d),
    status: data.get("status"),
  });
  renderAll();
  toast("Tugas ditambahkan");
});

// Tombol navigasi (placeholder)
document.querySelectorAll("[data-go]").forEach((b) =>
  b.addEventListener("click", () => toast(`Halaman "${b.dataset.go}" belum tersedia`))
);
document.querySelectorAll(".nav-item").forEach((a) =>
  a.addEventListener("click", (e) => {
    
    if (!a.classList.contains("active")) toast(`Halaman "${a.textContent}" belum tersedia`);
  })
);

renderAll();
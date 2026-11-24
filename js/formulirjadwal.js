// "Hari ini" dikunci sesuai data contoh wireframe (21 Oktober 2026).
const TODAY = new Date(2026, 9, 21);
const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const COURSES = ["Algoritma", "Basis Data", "Statistika"];

const pad = (n) => String(n).padStart(2, "0");
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const toMin = (t) => { const [h, m] = t.split(".").map(Number); return h * 60 + m; };

// Waktu dalam format "19.00", setiap 30 menit, 06.00–22.00
const TIMES = [];
for (let m = 6 * 60; m <= 22 * 60; m += 30) TIMES.push(`${pad(Math.floor(m / 60))}.${pad(m % 60)}`);

const $ = (id) => document.getElementById(id);

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2400);
}

function fillSelect(sel, items, placeholder) {
  sel.innerHTML = "";
  sel.append(new Option(placeholder, ""));
  items.forEach((v) => sel.append(new Option(v, v)));
}

// Membuat satu formulir dari template untuk mode "tambah" atau "edit"
function buildForm(mode, initial) {
  const form = $("tpl-form").content.firstElementChild.cloneNode(true);
  const q = (s) => form.querySelector(s);
  const f = form.elements;
  const isEdit = mode === "edit";

  q(".f-title").textContent = isEdit ? "Edit jadwal belajar" : "Tambah jadwal belajar";
  q(".f-sub").textContent = isEdit
    ? `Data saat ini · ${initial.topic}`
    : "Sesi belajar baru · Isian awal kosong";
  q(".f-submit").textContent = isEdit ? "Simpan perubahan" : "Simpan jadwal";

  fillSelect(f.start, TIMES, "Pilih waktu");
  fillSelect(f.end, TIMES, "Pilih waktu");
  fillSelect(f.course, COURSES, "Pilih mata kuliah");

  const setValues = (v) => {
    f.date.value = v.date; f.start.value = v.start; f.end.value = v.end;
    f.topic.value = v.topic; f.course.value = v.course;
    clearErrors(); refresh();
  };
  const blank = { date: toISO(TODAY), start: "", end: "", topic: "", course: "" };
  const base = isEdit ? initial : blank;

  function clearErrors() {
    form.querySelectorAll(".err").forEach((e) => { e.hidden = true; e.textContent = ""; });
    form.querySelectorAll(".invalid").forEach((e) => e.classList.remove("invalid"));
  }
  function showError(name, msg) {
    const e = q(`[data-err="${name}"]`);
    e.textContent = msg; e.hidden = false;
    f[name].classList.add("invalid");
  }

  // Hari mengikuti tanggal, durasi mengikuti waktu
  function refresh() {
    q(".f-day").textContent = f.date.value
      ? `Hari: ${HARI[parseDate(f.date.value).getDay()]} (mengikuti tanggal yang dipilih)`
      : "Hari: – (mengikuti tanggal yang dipilih)";
    const dur = f.start.value && f.end.value ? toMin(f.end.value) - toMin(f.start.value) : 0;
    q(".f-duration").textContent = dur > 0
      ? `Durasi sesi: ${dur} menit.`
      : "Durasi dihitung dari waktu mulai dan selesai.";
  }

  function validate() {
    clearErrors();
    let ok = true;
    const req = { date: "Pilih tanggal.", start: "Pilih waktu mulai.", end: "Pilih waktu selesai.",
                  topic: "Isi topik belajar.", course: "Pilih mata kuliah." };
    for (const [name, msg] of Object.entries(req)) {
      if (!f[name].value.trim()) { showError(name, msg); ok = false; }
    }
    if (f.start.value && f.end.value && toMin(f.end.value) <= toMin(f.start.value)) {
      showError("end", `Waktu selesai harus setelah ${f.start.value}.`);
      ok = false;
    }
    return ok;
  }

  form.addEventListener("input", () => { refresh(); });
  form.addEventListener("change", () => { refresh(); });

  form.addEventListener("submit", (e) => {
    
    if (!validate()) {
      const first = form.querySelector(".invalid");
      if (first) first.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    console.log(isEdit ? "Perubahan disimpan:" : "Jadwal baru disimpan:", data);
    toast(isEdit ? "Perubahan disimpan" : "Jadwal disimpan");
    if (!isEdit) setValues(blank);
    // Di aplikasi sungguhan: kirim ke API lalu arahkan ke jadwal belajar.
  });

  // Batal: kembali ke keadaan awal tanpa menyimpan
  q(".f-cancel").addEventListener("click", () => {
    setValues(base);
    toast("Dibatalkan, tidak ada yang disimpan");
    // location.href = "jadwal-belajar.html";
  });

  setValues(base);
  return form;
}

const forms = $("forms");
forms.append(
  buildForm("add"),
  buildForm("edit", {
    date: "2026-10-21", start: "19.00", end: "20.30",
    topic: "Review ERD dan relasi tabel", course: "Basis Data"
  })
);

$("today-label").textContent =
  `${HARI[TODAY.getDay()]}, ${TODAY.getDate()} ${BULAN[TODAY.getMonth()]} ${TODAY.getFullYear()}`;
document.querySelectorAll(".sidebar nav a[href='#']").forEach((a) =>
  a.addEventListener("click", (e))
);
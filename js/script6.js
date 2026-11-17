const TODAY = new Date(2026, 9, 21); // data contoh: 21 Oktober 2026
const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

// Daftar mata kuliah yang sudah ada (dipakai untuk cek kode unik)
const courses = [
  { code: "IF201", name: "Algoritma", sks: "3", semester: "3" },
  { code: "IF202", name: "Basis Data", sks: "3", semester: "3" },
  { code: "IF203", name: "Statistika", sks: "2", semester: "3" }
];

const SKS = [1, 2, 3, 4, 5, 6];
const SEMESTER = [1, 2, 3, 4, 5, 6, 7, 8];

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

function buildForm(mode, original) {
  const form = $("tpl-form").content.firstElementChild.cloneNode(true);
  const q = (s) => form.querySelector(s);
  const f = form.elements;
  const isEdit = mode === "edit";
  // Mata kuliah yang sedang diedit (referensi ke data di array `courses`)
  const target = isEdit ? courses.find((c) => c.code === original.code) : null;

  q(".f-title").textContent = isEdit ? "Edit mata kuliah" : "Tambah mata kuliah";
  q(".f-sub").textContent = isEdit ? `Data saat ini · ${original.name}` : "Mata kuliah baru · Isian awal kosong";
  q(".f-submit").textContent = isEdit ? "Simpan perubahan" : "Simpan mata kuliah";
  q(".f-note").textContent = isEdit
    ? "Perubahan nama diterapkan pada tugas dan jadwal terkait."
    : "Setelah disimpan, mata kuliah tersedia pada formulir tugas dan jadwal belajar.";

  fillSelect(f.sks, SKS, "Pilih SKS");
  fillSelect(f.semester, SEMESTER, "Pilih semester");

  const blank = { code: "", name: "", sks: "", semester: "3" };

  function clearErrors() {
    form.querySelectorAll(".err").forEach((e) => { e.hidden = true; e.textContent = ""; });
    form.querySelectorAll(".invalid").forEach((e) => e.classList.remove("invalid"));
  }
  function showError(name, msg) {
    const e = q(`[data-err="${name}"]`);
    e.textContent = msg; e.hidden = false;
    f[name].classList.add("invalid");
  }
  function setValues(v) {
    f.code.value = v.code; f.name.value = v.name;
    f.sks.value = v.sks; f.semester.value = v.semester;
    clearErrors();
  }

  function validate() {
    clearErrors();
    let ok = true;
    const code = f.code.value.trim().toUpperCase();

    if (!code) { showError("code", "Isi kode mata kuliah."); ok = false; }
    else {
      const dup = courses.find((c) => c.code.toUpperCase() === code && c !== target);
      if (dup) { showError("code", `Kode ${code} sudah digunakan oleh ${dup.name}.`); ok = false; }
    }
    if (!f.name.value.trim()) { showError("name", "Isi nama mata kuliah."); ok = false; }
    if (!f.sks.value) { showError("sks", "Pilih SKS."); ok = false; }
    if (!f.semester.value) { showError("semester", "Pilih semester."); ok = false; }
    return ok;
  }

  // Hapus pesan error saat isian diperbaiki
  form.addEventListener("input", (e) => {
    const err = q(`[data-err="${e.target.name}"]`);
    if (err) { err.hidden = true; e.target.classList.remove("invalid"); }
  });

  form.addEventListener("submit", (e) => {
    
    if (!validate()) { const first = form.querySelector(".invalid"); if (first) first.focus(); return; }

    const data = {
      code: f.code.value.trim().toUpperCase(),
      name: f.name.value.trim(),
      sks: f.sks.value,
      semester: f.semester.value
    };
    if (isEdit) {
      Object.assign(target, data);
      f.code.value = data.code;
      q(".f-sub").textContent = `Data saat ini · ${data.name}`;
      toast("Perubahan disimpan");
    } else {
      courses.push(data);
      setValues(blank);
      toast("Mata kuliah disimpan");
    }
    console.log(isEdit ? "Perubahan disimpan:" : "Mata kuliah baru:", data);
    // Di aplikasi sungguhan: kirim ke API lalu arahkan ke daftar mata kuliah.
  });

  // Batal: kembali ke isian awal tanpa menyimpan
  q(".f-cancel").addEventListener("click", () => {
    setValues(isEdit ? target : blank);
    toast("Dibatalkan, tidak ada yang disimpan");
    // location.href = "daftar-mata-kuliah.html";
  });

  setValues(isEdit ? original : blank);
  return form;
}

$("forms").append(
  buildForm("add"),
  buildForm("edit", courses[1]) // IF202 · Basis Data
);

$("today-label").textContent =
  `${HARI[TODAY.getDay()]}, ${TODAY.getDate()} ${BULAN[TODAY.getMonth()]} ${TODAY.getFullYear()}`;
document.querySelectorAll(".sidebar nav a[href='#']").forEach((a) =>
  a.addEventListener("click", (e))
);
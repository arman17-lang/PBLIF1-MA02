(function () {
  "use strict";

  var MSG_DEADLINE = "Deadline harus sama atau setelah tanggal diberikan.";
  var pesan = document.getElementById("pesan");
  var awal = {}; // nilai awal tiap form, dipakai saat Batal

  function $(id) { return document.getElementById(id); }

  function setError(inputId, errId, text) {
    var el = $(errId);
    var input = $(inputId);
    if (text) {
      el.textContent = text;
      el.hidden = false;
      input.classList.add("invalid-input");
      input.setAttribute("aria-invalid", "true");
    } else {
      el.hidden = true;
      input.classList.remove("invalid-input");
      input.removeAttribute("aria-invalid");
    }
  }

  function validasi(p) {
    var ok = true;

    var judul = $(p + "-judul").value.trim();
    setError(p + "-judul", p + "-judul-err", judul ? "" : "Judul tugas wajib diisi.");
    if (!judul) ok = false;

    var matkul = $(p + "-matkul").value;
    setError(p + "-matkul", p + "-matkul-err", matkul ? "" : "Mata kuliah wajib dipilih.");
    if (!matkul) ok = false;

    var diberikan = $(p + "-diberikan").value;
    var deadline = $(p + "-deadline").value;
    var msg = "";
    if (!diberikan) msg = "Tanggal diberikan wajib diisi.";
    else if (!deadline) msg = "Deadline wajib diisi.";
    else if (deadline < diberikan) msg = MSG_DEADLINE; // format YYYY-MM-DD bisa dibandingkan sebagai teks
    setError(p + "-deadline", p + "-deadline-err", msg);
    if (msg) ok = false;

    return ok;
  }

  function tampilPesan(text) {
    pesan.textContent = text;
    pesan.hidden = false;
  }

  function simpanNilaiAwal(form) {
    awal[form.id] = Array.prototype.map.call(form.elements, function (el) {
      return el.value;
    });
  }

  function pulihkan(form, prefix) {
    Array.prototype.forEach.call(form.elements, function (el, i) {
      if (awal[form.id][i] !== undefined && el.tagName !== "BUTTON") el.value = awal[form.id][i];
    });
    ["judul", "matkul", "deadline"].forEach(function (f) {
      setError(prefix + "-" + f, prefix + "-" + f + "-err", "");
    });
  }

  function pasang(formId, prefix, teksSukses) {
    var form = $(formId);
    simpanNilaiAwal(form);

    form.addEventListener("submit", function (e) {
      
      if (validasi(prefix)) {
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        console.log("Data tugas:", data);
        tampilPesan(teksSukses);
        // Di aplikasi nyata: kirim `data` ke server / simpan ke localStorage di sini.
      } else {
        pesan.hidden = true;
      }
    });

    form.querySelector("[data-batal]").addEventListener("click", function () {
      pulihkan(form, prefix);
      tampilPesan("Dibatalkan. Kembali ke Daftar tugas tanpa menyimpan.");
      // Di aplikasi nyata: window.location.href = "daftar-tugas.html";
    });

    // Hapus pesan error saat pengguna mengubah isian
    form.addEventListener("input", function () {
      if (!pesan.hidden) pesan.hidden = true;
      if (form.querySelector(".invalid-input")) validasi(prefix);
    });
  }

  pasang("form-tambah", "t", "Tugas berhasil disimpan.");
  pasang("form-edit", "e", "Perubahan berhasil disimpan.");
})();
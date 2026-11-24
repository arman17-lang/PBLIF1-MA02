(function () {
  "use strict";

  var HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var KODE_MATKUL = { "Basis Data": "IF202" };
  var HARI_INI = "2026-10-21";

  var data = [
    { id: 1, tanggal: "2026-10-21", mulai: "19:00", selesai: "20:30", topik: "Review ERD dan relasi tabel", matkul: "Basis Data" },
    { id: 2, tanggal: "2026-10-22", mulai: "16:00", selesai: "17:30", topik: "Implementasi sorting", matkul: "Algoritma" },
    { id: 3, tanggal: "2026-10-23", mulai: "19:00", selesai: "20:00", topik: "Review uji hipotesis", matkul: "Statistika" },
    { id: 4, tanggal: "2026-10-24", mulai: "10:00", selesai: "11:30", topik: "Latihan query SQL", matkul: "Basis Data" }
  ];
  var nextId = 5;
  var selectedId = 1;
  var editingId = null;

  function $(id) { return document.getElementById(id); }

  /* ---------- Tanggal & waktu ---------- */
  function parse(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function toIso(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var t = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + t;
  }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function mondayOf(d) { var x = new Date(d); var dow = (x.getDay() + 6) % 7; x.setDate(x.getDate() - dow); return x; }
  function tglPendek(iso) { var d = parse(iso); return HARI[d.getDay()] + ", " + d.getDate() + " " + BULAN[d.getMonth()].slice(0, 3) + " " + d.getFullYear(); }
  function tglPanjang(iso) { var d = parse(iso); return HARI[d.getDay()] + ", " + d.getDate() + " " + BULAN[d.getMonth()] + " " + d.getFullYear(); }
  function jam(t) { return t.replace(":", "."); }
  function menit(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }
  function durasi(s) { return menit(s.selesai) - menit(s.mulai); }

  var weekStart = mondayOf(parse(HARI_INI));

  function labelRentang() {
    var a = weekStart, b = addDays(weekStart, 6);
    if (a.getMonth() === b.getMonth()) return a.getDate() + "–" + b.getDate() + " " + BULAN[b.getMonth()] + " " + b.getFullYear();
    return a.getDate() + " " + BULAN[a.getMonth()].slice(0, 3) + " – " + b.getDate() + " " + BULAN[b.getMonth()].slice(0, 3) + " " + b.getFullYear();
  }

  function sesiMinggu() {
    var awal = toIso(weekStart), akhir = toIso(addDays(weekStart, 6));
    return data
      .filter(function (s) { return s.tanggal >= awal && s.tanggal <= akhir; })
      .sort(function (a, b) { return (a.tanggal + a.mulai).localeCompare(b.tanggal + b.mulai); });
  }

  /* ---------- Render ---------- */
  function el(tag, text, cls) {
    var e = document.createElement(tag);
    if (text !== undefined) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }

  function tombolAksi(label, aksi, id) {
    var b = el("button", label, "link-btn");
    b.type = "button";
    b.addEventListener("click", function (ev) { ev.stopPropagation(); aksi(id); });
    return b;
  }

  function render() {
    var list = sesiMinggu();
    $("rentang").textContent = labelRentang();
    $("jumlah").textContent = "Tampilan daftar · " + list.length + " sesi belajar";

    var tbody = $("tbody");
    tbody.textContent = "";

    if (!list.length) {
      var tr0 = el("tr"), td0 = el("td", "Belum ada sesi belajar minggu ini. Pilih + Tambah jadwal untuk membuat sesi.", "kosong");
      td0.colSpan = 5;
      tr0.appendChild(td0);
      tbody.appendChild(tr0);
    }

    list.forEach(function (s) {
      var tr = el("tr");
      if (s.id === selectedId) tr.className = "selected";
      tr.appendChild(el("td", tglPendek(s.tanggal), "tgl"));
      tr.appendChild(el("td", jam(s.mulai) + "–" + jam(s.selesai)));
      tr.appendChild(el("td", s.topik));
      tr.appendChild(el("td", s.matkul));

      var aksi = el("td", "", "aksi");
      aksi.appendChild(tombolAksi("Lihat", pilih, s.id));
      aksi.appendChild(el("span", "·", "sep"));
      aksi.appendChild(tombolAksi("Edit", bukaEdit, s.id));
      aksi.appendChild(el("span", "·", "sep"));
      aksi.appendChild(tombolAksi("Hapus", hapus, s.id));
      tr.appendChild(aksi);

      tr.addEventListener("click", function () { pilih(s.id); });
      tbody.appendChild(tr);
    });

    renderDetail();
  }

  function renderDetail() {
    var box = $("detail");
    box.textContent = "";
    var s = data.find(function (x) { return x.id === selectedId; });
    var tampil = s && sesiMinggu().indexOf(s) !== -1;

    if (!tampil) {
      box.appendChild(el("p", "Pilih sesi dari daftar untuk melihat detail jadwal.", "kosong-detail"));
      return;
    }

    box.appendChild(el("h3", "Detail jadwal · " + s.topik));

    var dl = el("dl", "", "detail-grid");
    function item(label, nilai) {
      var d = el("div");
      d.appendChild(el("dt", label));
      d.appendChild(el("dd", nilai));
      dl.appendChild(d);
    }
    var kode = KODE_MATKUL[s.matkul] ? " (" + KODE_MATKUL[s.matkul] + ")" : "";
    item("Hari / tanggal", tglPanjang(s.tanggal));
    item("Waktu mulai–selesai", jam(s.mulai) + "–" + jam(s.selesai) + " (" + durasi(s) + " menit)");
    item("Mata kuliah", s.matkul + kode);
    box.appendChild(dl);

    var act = el("div", "", "actions");
    var be = el("button", "Edit jadwal", "btn btn-primary"); be.type = "button";
    var bh = el("button", "Hapus jadwal", "btn btn-secondary"); bh.type = "button";
    be.addEventListener("click", function () { bukaEdit(s.id); });
    bh.addEventListener("click", function () { hapus(s.id); });
    act.appendChild(be); act.appendChild(bh);
    box.appendChild(act);
  }

  /* ---------- Aksi ---------- */
  function pilih(id) { selectedId = id; render(); }

  function hapus(id) {
    var s = data.find(function (x) { return x.id === id; });
    if (!s || !confirm("Hapus jadwal \"" + s.topik + "\"?")) return;
    data = data.filter(function (x) { return x.id !== id; });
    if (selectedId === id) selectedId = null;
    render();
  }

  /* ---------- Navigasi minggu ---------- */
  $("btn-prev").addEventListener("click", function () { weekStart = addDays(weekStart, -7); render(); });
  $("btn-next").addEventListener("click", function () { weekStart = addDays(weekStart, 7); render(); });
  $("btn-hari-ini").addEventListener("click", function () { weekStart = mondayOf(parse(HARI_INI)); render(); });

  /* ---------- Dialog tambah / edit ---------- */
  var dialog = $("dialog");

  function setError(inputId, errId, text) {
    var e = $(errId), i = $(inputId);
    e.hidden = !text;
    e.textContent = text || "";
    i.classList.toggle("invalid-input", !!text);
  }

  function resetError() {
    setError("f-topik", "f-topik-err", "");
    setError("f-matkul", "f-matkul-err", "");
    setError("f-tanggal", "f-tanggal-err", "");
    setError("f-selesai", "f-waktu-err", "");
  }

  function bukaTambah() {
    editingId = null;
    $("dialog-judul").textContent = "Tambah jadwal";
    $("f-topik").value = "";
    $("f-matkul").value = "";
    $("f-tanggal").value = toIso(weekStart <= parse(HARI_INI) && parse(HARI_INI) <= addDays(weekStart, 6) ? parse(HARI_INI) : weekStart);
    $("f-mulai").value = "19:00";
    $("f-selesai").value = "20:00";
    resetError();
    dialog.showModal();
    $("f-topik").focus();
  }

  function bukaEdit(id) {
    var s = data.find(function (x) { return x.id === id; });
    if (!s) return;
    editingId = id;
    $("dialog-judul").textContent = "Edit jadwal";
    $("f-topik").value = s.topik;
    $("f-matkul").value = s.matkul;
    $("f-tanggal").value = s.tanggal;
    $("f-mulai").value = s.mulai;
    $("f-selesai").value = s.selesai;
    resetError();
    dialog.showModal();
    $("f-topik").focus();
  }

  $("btn-tambah").addEventListener("click", bukaTambah);
  $("btn-batal").addEventListener("click", function () { dialog.close(); });

  $("form").addEventListener("submit", function (e) {
    
    resetError();
    var ok = true;

    var topik = $("f-topik").value.trim();
    var matkul = $("f-matkul").value;
    var tanggal = $("f-tanggal").value;
    var mulai = $("f-mulai").value;
    var selesai = $("f-selesai").value;

    if (!topik) { setError("f-topik", "f-topik-err", "Topik wajib diisi."); ok = false; }
    if (!matkul) { setError("f-matkul", "f-matkul-err", "Mata kuliah wajib dipilih."); ok = false; }
    if (!tanggal) { setError("f-tanggal", "f-tanggal-err", "Tanggal wajib diisi."); ok = false; }
    if (!mulai || !selesai) { setError("f-selesai", "f-waktu-err", "Waktu mulai dan selesai wajib diisi."); ok = false; }
    else if (menit(selesai) <= menit(mulai)) { setError("f-selesai", "f-waktu-err", "Waktu selesai harus setelah waktu mulai."); ok = false; }

    if (!ok) return;

    if (editingId === null) {
      data.push({ id: nextId, tanggal: tanggal, mulai: mulai, selesai: selesai, topik: topik, matkul: matkul });
      selectedId = nextId++;
    } else {
      var s = data.find(function (x) { return x.id === editingId; });
      s.tanggal = tanggal; s.mulai = mulai; s.selesai = selesai; s.topik = topik; s.matkul = matkul;
      selectedId = editingId;
    }

    // Pindah ke minggu yang memuat sesi tersebut agar langsung terlihat
    weekStart = mondayOf(parse(tanggal));
    dialog.close();
    render();
  });

  render();
})();
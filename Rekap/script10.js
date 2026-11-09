(function () {
  "use strict";

  var STATUS = ["Belum Mulai", "Dikerjakan", "Selesai"];
  var MATKUL = ["Algoritma", "Basis Data", "Statistika"];

  // Data contoh: 8 tugas (satu baris = satu tugas)
  var tugas = [
    { matkul: "Algoritma",  status: "Belum Mulai" },
    { matkul: "Algoritma",  status: "Dikerjakan" },
    { matkul: "Algoritma",  status: "Selesai" },
    { matkul: "Basis Data", status: "Belum Mulai" },
    { matkul: "Basis Data", status: "Dikerjakan" }, // Perancangan ERD
    { matkul: "Basis Data", status: "Selesai" },
    { matkul: "Statistika", status: "Belum Mulai" },
    { matkul: "Statistika", status: "Dikerjakan" }
  ];

  function $(id) { return document.getElementById(id); }
  function el(tag, text, cls) {
    var e = document.createElement(tag);
    if (text !== undefined) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }
  function hitung(matkul, status) {
    return tugas.filter(function (t) {
      return (!matkul || t.matkul === matkul) && (!status || t.status === status);
    }).length;
  }
  // 37.5 -> "37,5", 25 -> "25"
  function persen(n, total) {
    var p = total ? (n / total) * 100 : 0;
    return String(Math.round(p * 10) / 10).replace(".", ",");
  }

  var total = tugas.length;
  var jumlah = {};
  STATUS.forEach(function (s) { jumlah[s] = hitung(null, s); });

  /* Ringkasan */
  $("ringkasan").textContent = "Ringkasan seluruh " + total + " tugas pada " + MATKUL.length +
    " mata kuliah · Semester ganjil 2026/2027.";

  /* Kartu */
  var stats = $("stats");
  function kartu(label, nilai, sub) {
    var d = el("div", "", "stat");
    d.appendChild(el("p", label, "label"));
    d.appendChild(el("p", String(nilai), "value"));
    d.appendChild(el("p", sub, "sub"));
    stats.appendChild(d);
  }
  kartu("Total tugas", total, "Seluruh mata kuliah");
  STATUS.forEach(function (s) {
    kartu(s, jumlah[s], persen(jumlah[s], total) + "% dari seluruh tugas");
  });

  /* Tabel */
  var tbody = $("tbody");
  MATKUL.forEach(function (m) {
    var tr = el("tr");
    tr.appendChild(el("td", m));
    STATUS.forEach(function (s) { tr.appendChild(el("td", String(hitung(m, s)), "num")); });
    tr.appendChild(el("td", String(hitung(m)), "num"));
    var aksi = el("td");
    var a = el("a", "Lihat tugas →");
    a.href = "index.html?matkul=" + encodeURIComponent(m);
    aksi.appendChild(a);
    tr.appendChild(aksi);
    tbody.appendChild(tr);
  });

  var foot = el("tr");
  foot.appendChild(el("th", "Total"));
  STATUS.forEach(function (s) { foot.appendChild(el("th", String(jumlah[s]), "num")); });
  foot.appendChild(el("th", String(total), "num"));
  foot.appendChild(el("th", ""));
  $("tfoot").appendChild(foot);

  /* Batang distribusi */
  var kelas = { "Belum Mulai": "light", "Dikerjakan": "mid", "Selesai": "" };
  STATUS.forEach(function (s) {
    var row = el("div", "", "bar-row");
    row.appendChild(el("span", s));
    var track = el("div", "", "bar-track");
    var fill = el("div", "", "bar-fill " + kelas[s]);
    fill.style.width = (total ? (jumlah[s] / total) * 100 : 0) + "%";
    track.appendChild(fill);
    row.appendChild(track);
    row.appendChild(el("span", String(jumlah[s]), "bar-val"));
    $("bars").appendChild(row);
  });

  /* Progres */
  var selesai = jumlah["Selesai"];
  $("progres-judul").textContent = selesai + " dari " + total + " tugas selesai";
  $("progres-isi").style.width = (total ? (selesai / total) * 100 : 0) + "%";
  $("progres").setAttribute("aria-valuenow", Math.round(total ? (selesai / total) * 100 : 0));
  $("progres-ket").textContent = persen(selesai, total) + "% selesai · " + (total - selesai) +
    " tugas masih perlu dituntaskan.";
})();
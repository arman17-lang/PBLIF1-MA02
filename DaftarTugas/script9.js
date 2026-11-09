(function () {
  "use strict";

  var PESAN_BATAL = "Dialog ditutup. Tidak ada data yang dihapus.";

  document.querySelectorAll("[data-panel]").forEach(function (panel) {
    var dialog = panel.querySelector(".dialog-box");
    var hasil = panel.querySelector(".hasil");
    var teks = panel.querySelector(".hasil-teks");
    var ulang = panel.querySelector('[data-aksi="ulang"]');

    function tampilHasil(pesan) {
      teks.textContent = pesan;
      dialog.hidden = true;
      hasil.hidden = false;
      ulang.focus();
    }

    function tampilDialog() {
      hasil.hidden = true;
      dialog.hidden = false;
      var pertama = dialog.querySelector(".btn-secondary");
      if (pertama) pertama.focus();
    }

    panel.addEventListener("click", function (e) {
      var tombol = e.target.closest("[data-aksi]");
      if (!tombol) return;
      var aksi = tombol.getAttribute("data-aksi");

      if (aksi === "batal") tampilHasil(PESAN_BATAL);
      else if (aksi === "hapus" || aksi === "info") tampilHasil(tombol.getAttribute("data-pesan"));
      else if (aksi === "ulang") tampilDialog();
    });

    // Esc menutup dialog yang sedang tampil tanpa menghapus data
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !dialog.hidden) tampilHasil(PESAN_BATAL);
    });
  });
})();
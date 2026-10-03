// L'adresse n'apparaît jamais en clair dans le HTML : elle est assemblée au clic / au chargement.
document.addEventListener("click", function (e) {
  var a = e.target.closest("a[data-u]");
  if (!a) return;
  e.preventDefault();
  var s = a.dataset.s ? "?subject=" + encodeURIComponent(a.dataset.s) : "";
  location.href = "mailto:" + a.dataset.u + "@" + a.dataset.d + s;
});
document.querySelectorAll("a[data-show]").forEach(function (a) {
  a.textContent = a.dataset.u + "@" + a.dataset.d;
});

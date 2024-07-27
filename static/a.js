document.addEventListener("DOMContentLoaded", function () {
  const folders = document.querySelectorAll(".folder");

  for (let i = 0; i < folders.length; i++) {
    folders[i].addEventListener("click", function () {
      this.classList.toggle("open");
      let ul = this.nextElementSibling;

      if (ul) {
        ul.style.display = ul.style.display === "none" ? "block" : "none";
      }
    });

    let ul = folders[i].nextElementSibling;

    if (ul) {
      ul.style.display = "none";
    }
  }
});
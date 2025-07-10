// toast.js
console.log("toast file");

import { showToast } from "./dashboard.js";

window.initToast = function () {
  const toast = document.getElementById("toast");

  if (!toast) {
    console.warn("Toast element not found");
    return;
  }

  function holdToast(state) {
    console.log(toast);
    showToast("hold")
  }

};

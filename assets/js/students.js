  function confirmDelete(button) {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا الطالب؟")) {
      const row = button.closest("tr");
      row.remove();
    }
  }

  function editRow(button) {
    const row = button.closest("tr");
    const editableCells = row.querySelectorAll(".editable");

    editableCells.forEach((cell) => {
      const value = cell.innerText;
      cell.innerHTML = `<input class="w-full border px-2 py-1 rounded" value="${value}" />`;
    });

    // استبدال أيقونة التعديل بالحفظ
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    button.onclick = () => saveRow(button);
  }

  function saveRow(button) {
    const row = button.closest("tr");
    const editableCells = row.querySelectorAll(".editable");

    editableCells.forEach((cell) => {
      const input = cell.querySelector("input");
      if (input) cell.innerText = input.value;
    });

    // استبدال أيقونة الحفظ مرة أخرى بالتعديل
    button.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    button.onclick = () => editRow(button);
  }

  function viewStudent(name, nationality, language) {
    const modal = document.getElementById("viewModal");
    const content = document.getElementById("modalContent");

    content.innerHTML = `
      <strong>الاسم:</strong> ${name}<br />
      <strong>الجنسية:</strong> ${nationality}<br />
      <strong>اللغة:</strong> ${language}
    `;

    modal.classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("viewModal").classList.add("hidden");
  }
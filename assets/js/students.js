// student row deleting
  function confirmDelete(button) {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا الطالب؟")) {
      const row = button.closest("tr");
      row.remove();
    }
  }

  // show student
  function renderLevelBar(container, currentLevel) {
    container.innerHTML = "";
    const bar = document.createElement("div");
    bar.className = "flex flex-1 items-center justify-between w-full";

    for (let i = 1; i <= 16; i++) {
      const segment = document.createElement("span");
      segment.className = `flex-1 h-1 ${i <= currentLevel ? "bg-blue-600" : "bg-gray-300"} relative`;

      const circle = document.createElement("span");
      circle.className = "absolute -top-2 left-0 w-5 h-5 bg-white border shadow-md text-xs font-bold rounded-full flex items-center justify-center";
      circle.textContent = i;

      segment.appendChild(circle);
      bar.appendChild(segment);
    }

    container.appendChild(bar);
  }

  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-render-level]').forEach(el => {
      const level = parseInt(el.dataset.level) || 1;
      renderLevelBar(el, level);
    });
  });



  // edit student data button 
  document.getElementById('edit-toggle-btn').addEventListener('click', function (e) {
    e.preventDefault();

    const form = document.querySelector('#student-profile form');

    // تأكد إن كل العناصر input, select, textarea إلخ مش disabled (يعني جاهزة للتعديل)
    form.querySelectorAll('input, select, textarea').forEach((el) => {
      el.removeAttribute('disabled');
      el.classList.remove('pointer-events-none', 'bg-gray-100', 'text-gray-500');
    });

    // أظهر زر الحفظ إن كان مخفي
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.classList.remove('hidden');

    // إخفاء زر التعديل الأساسي
    this.classList.add('hidden');
  });
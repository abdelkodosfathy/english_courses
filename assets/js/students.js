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
  // document.getElementById('edit-toggle-btn').addEventListener('click', function (e) {
  //   e.preventDefault();

  //   const form = document.querySelector('#student-profile form');

  //   // تأكد إن كل العناصر input, select, textarea إلخ مش disabled (يعني جاهزة للتعديل)
  //   form.querySelectorAll('input, select, textarea').forEach((el) => {
  //     el.removeAttribute('disabled');
  //     el.classList.remove('pointer-events-none', 'bg-gray-100', 'text-gray-500');
  //   });

  //   // أظهر زر الحفظ إن كان مخفي
  //   const submitBtn = form.querySelector('button[type="submit"]');
  //   submitBtn.classList.remove('hidden');

  //   // إخفاء زر التعديل الأساسي
  //   this.classList.add('hidden');
  // });

   const form = document.getElementById("student-profile-view");
  const editBtn = document.getElementById("editBtn");
  const maleLabel = document.getElementById("radio-male");
  const femaleLabel = document.getElementById("radio-female");
  const actionButtons = document.getElementById("actionButtons");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // Save original values to restore them on cancel
  let originalValues = {};

  editBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Store original values
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      originalValues[input.name || input.id || input.type] = input.value;
      input.disabled = false;
    });

    maleLabel.disabled = false;
    femaleLabel.disabled = false;
    
    // Show file input section
    const hiddenImageInput = form.querySelector("div.hidden.relative");
    if (hiddenImageInput) hiddenImageInput.classList.remove("hidden");

    // Toggle buttons
    editBtn.classList.add("hidden");
    actionButtons.classList.remove("hidden");
    maleLabel.classList.remove("hidden");
    maleLabel.querySelector('input').classList.remove("appearance-none");

    femaleLabel.classList.remove("hidden");
    femaleLabel.querySelector('input').classList.remove("appearance-none");
  });

cancelBtn.addEventListener("click", function () {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    const key = input.name || input.id || input.type;

    // if (originalValues[key] !== undefined) {
    //   input.value = originalValues[key];
    // }

    input.disabled = true;

    // إخفاء الراديو اللي مش مطابق لقيمة النوع الحالي
    if (input.name === "gender") {
      const label = input.closest("label");
      const inputValue = input.getAttribute("value");
      const currentGender = input.getAttribute("data-gender");

      console.log(inputValue);
      
      if (input.value !== currentGender) {
        label.classList.add("hidden");
      } else {
        label.classList.remove("hidden");
      }

      input.classList.add("appearance-none");
    }
  });
  // إخفاء input صورة الجواز لو ظهر
  const hiddenImageInput = form.querySelector(".relative");
  if (hiddenImageInput && !hiddenImageInput.classList.contains("hidden")) {
    hiddenImageInput.classList.add("hidden");
  }

  // إرجاع الأزرار
  editBtn.classList.remove("hidden");
  actionButtons.classList.add("hidden");
});


  saveBtn.addEventListener("click", function () {
    // Normally you'd send data to the server here

    // Disable inputs again after saving
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => input.disabled = true);

    maleLabel.disabled = false;
    femaleLabel.disabled = false;
    
    // Toggle buttons back
    editBtn.classList.remove("hidden");
    actionButtons.classList.add("hidden");
    maleLabel.classList.add("hidden");
    femaleLabel.classList.add("hidden");

    
  });

  function handleImageChange(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("passport-preview");
    const placeholder = document.getElementById("placeholder");

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.classList.remove("hidden");
        placeholder.classList.add("hidden");
      };
      reader.readAsDataURL(file);
    }
  }


  // registerAttendance section 
  function registerAttendance() {
  const course = document.getElementById("courseSelect").value;
  const level = document.getElementById("levelSelect").value;
  const teacher = document.getElementById("teacherSelect").value;
  const time = document.getElementById("lectureTime").value;
  const studentId = document.getElementById("studentIdInput").value.trim();

  if (!studentId || !time) {
    alert("يرجى إدخال كود الطالب وتحديد توقيت المحاضرة.");
    return;
  }

  const tbody = document.getElementById("attendanceTableBody");

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td class="p-3">${course}</td>
    <td class="p-3">${level}</td>
    <td class="p-3">${teacher}</td>
    <td class="p-3">${new Date(time).toLocaleString('ar-EG')}</td>
    <td class="p-3">${studentId}</td>
    <td class="p-3">
      <button class="text-red-600 hover:text-red-800" onclick="this.closest('tr').remove()">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  `;
  tbody.appendChild(tr);

  // تصفير الإدخال بعد الإضافة
  document.getElementById("studentIdInput").value = "";
}

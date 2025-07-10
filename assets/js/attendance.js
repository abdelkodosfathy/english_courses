// function registerAttendance() {
//   const studentIdInput = document.getElementById("studentIdInput");
//   const attendanceTableBody = document.getElementById("attendanceTableBody");
//   const studentId = studentIdInput.value.trim();

//   if (!studentId) {
//     alert("يرجى إدخال رقم الطالب");
//     return;
//   }

//   // بيانات ثابتة للمستوى والكورس
//   const course = "لغة إنجليزية";
//   const level = "متوسط";

//   // التاريخ الحالي
//   const now = new Date();
//   const formattedDate = now.toLocaleString("ar-EG");

//   // إنشاء صف جديد
//   const row = document.createElement("tr");
//   row.innerHTML = `
//     <td class="p-3">${course}</td>
//     <td class="p-3">${level}</td>
//     <td class="p-3">${formattedDate}</td>
//     <td class="p-3">${studentId}</td>
//     <td class="p-3">
//       <button class="text-red-600 hover:text-red-800" onclick="this.closest('tr').remove()">
//         <i class="fa-solid fa-trash"></i>
//       </button>
//     </td>
//   `;

//   // إضافة الصف للجدول
//   attendanceTableBody.appendChild(row);

//   // تفريغ الحقل بعد الإضافة
//   studentIdInput.value = "";
// }


function showToast(message = "Row added successfully!", color="green") {
  const toast = document.getElementById("toast");
  const progress = document.getElementById("toast-progress");
  // progress.style.backgroundColor = color;
  // progress.classList.add("bg-blue-500")
  // Set message
  toast.textContent = message;
  toast.appendChild(progress); // ensure it stays inside
  toast.classList.remove("hidden");

  // Animate in
  toast.classList.remove("toast-exit");
  toast.classList.add("toast-enter");

  // Reset progress bar
  progress.style.width = '100%';
  progress.style.transition = 'none';
  void progress.offsetWidth; // reflow
  progress.style.transition = 'width 3s linear';
  progress.style.width = '0%';

  // Animate out after 3s
  setTimeout(() => {
    toast.classList.remove("toast-enter");
    toast.classList.add("toast-exit");

    // Then hide it after animation ends
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 300); // match animation duration
  }, 3000);
}
// registerAttendance section 
function registerAttendanceOne() {
  const time = document.getElementById("lectureTime");
  const studentInput = document.getElementById("studentIdInput");

  const timeValue = time?.value;
  const studentId = studentInput?.value.trim();

  
  if (!timeValue) {
    showToast('يجب تحديد الوقت','red');
    time.classList.add('border-red-500');
    // remove the red border if user add data 
    time.addEventListener("change",(e)=>{
      e.target.classList.remove('border-red-500')
    })
  } else if (!studentId) {
    showToast('يجب ادخال كود الطالب', 'red');
    studentInput.classList.add('border-red-500');

    // remove the red border if user add data 
    studentInput.addEventListener("change",(e)=>{
      e.target.classList.remove('border-red-500')
    })
    return;
  }
}
function registerAttendanceTwo() {
  const studentInput = document.getElementById("studentIdInput");
  const studentId = studentInput?.value.trim();

  if (!studentId) {
    showToast('يجب ادخال كود الطالب', 'red');
    studentInput.classList.add('border-red-500');
    
    // remove the red border if user add data 
    studentInput.addEventListener("change",(e)=>{
      e.target.classList.remove('border-red-500')
    })
    return;
  }
}
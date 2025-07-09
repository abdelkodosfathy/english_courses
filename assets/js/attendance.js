function registerAttendance() {
  const studentIdInput = document.getElementById("studentIdInput");
  const attendanceTableBody = document.getElementById("attendanceTableBody");
  const studentId = studentIdInput.value.trim();

  if (!studentId) {
    alert("يرجى إدخال رقم الطالب");
    return;
  }

  // بيانات ثابتة للمستوى والكورس
  const course = "لغة إنجليزية";
  const level = "متوسط";

  // التاريخ الحالي
  const now = new Date();
  const formattedDate = now.toLocaleString("ar-EG");

  // إنشاء صف جديد
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="p-3">${course}</td>
    <td class="p-3">${level}</td>
    <td class="p-3">${formattedDate}</td>
    <td class="p-3">${studentId}</td>
    <td class="p-3">
      <button class="text-red-600 hover:text-red-800" onclick="this.closest('tr').remove()">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  `;

  // إضافة الصف للجدول
  attendanceTableBody.appendChild(row);

  // تفريغ الحقل بعد الإضافة
  studentIdInput.value = "";
}

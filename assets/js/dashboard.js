// const attendanceBtn = document.getElementById("attendance-btn");
// const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
// const sutdentsBtn = document.getElementById("students-btn");
// const langBtn = document.getElementById("lang-btn");
// const coursesBtn = document.getElementById("courses-btn");
// const teachersBtn = document.getElementById("teachers-btn");

// const btnArr = [
//   attendanceBtn,
//   sidebarToggleBtn,
//   sutdentsBtn,
//   langBtn,
//   coursesBtn,
//   teachersBtn,
// ];

// btnArr.forEach((element) => {
//   if (element) {
//     element.addEventListener("click", (e) => {
//       console.log("Clicked:", e.target);
//     });
//   }
// });

let sidebarCollapsed = false;  // false = expanded (w-48), true = collapsed (w-20)
let studentId = 1, teacherId = 1, courseId = 1, attendanceId = 1, scheduleId = 1;
const students = [], teachers = [], scheduleList = [];

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const labels = document.querySelectorAll(".tab-label");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const subMenus = document.querySelectorAll(".sub-menu");

  const toggleIcon = document.getElementById("sidebar-toggle-icon");
  const parentButton = toggleIcon.parentElement.parentElement;  // gets the <button> element that wraps the icon
  

  if (sidebarCollapsed) {
    toggleIcon.style.transform = "rotate(0deg)";

    parentButton.classList.remove('justify-center')
    parentButton.classList.add('justify-end')
    console.log(parentButton);

    // Expand sidebar
    sidebar.classList.remove("w-20");
    sidebar.classList.add("w-48");
    labels.forEach(label => label.classList.remove("hidden"));
    tabBtns.forEach(btn => {
      btn.classList.remove("justify-center");
      btn.classList.add("justify-start");
    });
    sidebarCollapsed = false;
  } else {
    toggleIcon.style.transform = "rotate(180deg)";
    console.log(parentButton);
    parentButton.classList.remove('justify-end')
    parentButton.classList.add('justify-center')
    
    // Collapse sidebar
    sidebar.classList.add("w-20");
    sidebar.classList.remove("w-48");
    labels.forEach(label => label.classList.add("hidden"));
    tabBtns.forEach(btn => {
      btn.classList.remove("justify-start");
      btn.classList.add("justify-center");
    });
    subMenus.forEach(menu => {
      menu.classList.add("max-h-0");
      menu.classList.remove("max-h-40");
    });
    sidebarCollapsed = true;
  }
}

function toggleSubMenu(id) {
  const menu = document.getElementById(id);
  const isCollapsed = menu.classList.contains('max-h-0');

  // Collapse all others
  document.querySelectorAll('.sub-menu').forEach(sub => {
    sub.classList.add('max-h-0');
    sub.classList.remove('max-h-40');
  });

  // Expand the selected one if it was collapsed
  if (isCollapsed) {
    menu.classList.remove('max-h-0');
    menu.classList.add('max-h-40');
  }

  // Expand sidebar if collapsed
  if (sidebarCollapsed) {
    toggleSidebar();
  }

  // Active tab button logic
  const tabBtns = document.querySelectorAll(".tab-btn");
  const targetPrefix = id.split("-")[0];
  tabBtns.forEach(btn => {
    const btnPrefix = btn.id?.split("-")[0];
    if (btnPrefix === targetPrefix) {
      btn.classList.add("bg-blue-900", "text-white");
    } else {
      btn.classList.remove("bg-blue-900","text-white");
    }
  });
}

function addStudent() {
  const name = document.getElementById("student-name").value;
  const level = document.getElementById("student-level").value;
  const phone = document.getElementById("student-phone").value;

  const id = `s-${studentId++}`;
  students.push({ id, name });

  const tbody = document.getElementById("students-table-body");
  tbody.innerHTML += `<tr><td class="p-2">${id}</td><td class="p-2">${name}</td><td class="p-2">${level}</td><td class="p-2">${phone}</td><td class="p-2"><button class='text-blue-600 hover:underline' onclick='editRow(this)'>Edit</button></td></tr>`;
  showToast("Student added");
  populateStudentCheckboxes(); // update attendance options
}
function filterStudents() {
  const search = document.getElementById("student-search").value.toLowerCase();
  const rows = document.querySelectorAll("#students-table-body tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(search) ? "" : "none";
  });
}

function addTeacher() {
  const name = document.getElementById("teacher-name").value;
  const phone = document.getElementById("teacher-phone").value;

  const id = `t-${teacherId++}`;
  teachers.push({ id, name });

  const tbody = document.getElementById("teachers-table-body");
  tbody.innerHTML += `<tr><td class="p-2">${id}</td><td class="p-2">${name}</td><td class="p-2">${phone}</td><td class="p-2"><button class='text-blue-600 hover:underline' onclick='editRow(this)'>Edit</button></td></tr>`;
  showToast("Teacher added");
  populateTeacherSelect(); // update attendance teacher
}

function addCourse() {
  const name = document.getElementById("course-name").value;
  const duration = document.getElementById("course-duration").value;
  const tbody = document.getElementById("courses-table-body");
  tbody.innerHTML += `
    <tr>
      <td class="p-2">${courseId++}</td>
      <td class="p-2">${name}</td>
      <td class="p-2">${duration}</td>
      <td class="p-2">
        <button class='text-blue-600 hover:underline' onclick='editRow(this)'>Edit</button>
      </td>
    </tr>`;
  showToast();
}

function editRow(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");

  if (button.textContent === "Edit") {
    // Convert text to input fields
    for (let i = 1; i < cells.length - 1; i++) {
      const value = cells[i].textContent;
      cells[i].innerHTML = `<input class="p-1 border rounded w-full" value="${value}" />`;
    }
    button.textContent = "Save";
  } else {
    // Save inputs back to text
    for (let i = 1; i < cells.length - 1; i++) {
      const input = cells[i].querySelector("input");
      cells[i].textContent = input.value;
    }
    button.textContent = "Edit";
    showToast("Row updated successfully!");
  }
}

function showToast(message = "Row added successfully!") {
  const toast = document.getElementById("toast");
  const progress = document.getElementById("toast-progress");

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

function addAttendance() {
  const date = document.getElementById("attendance-date").value;
  const teacher = document.getElementById("attendance-teacher").value;
  const studentInput = document.getElementById("student-autocomplete").value;
  if (!studentInput) return;

  const studentId = studentInput.split(" - ")[0];

  const tbody = document.getElementById("attendance-table-body");
  tbody.innerHTML += `
    <tr>
      <td class="p-2">${attendanceId++}</td>
      <td class="p-2">${studentId}</td>
      <td class="p-2">${date}</td>
      <td class="p-2">Present (By ${teacher})</td>
    </tr>
  `;

  showToast("Attendance marked");
  document.getElementById("student-autocomplete").value = "";
}

function addSchedule() {
  const course = document.getElementById("schedule-course").value;
  const teacher = document.getElementById("schedule-teacher").value;
  const day = document.getElementById("schedule-day").value;
  const time = document.getElementById("schedule-time").value;

  if (!course || !teacher || !day || !time) return alert("Please fill all fields");

  const tbody = document.getElementById("schedule-table-body");
  tbody.innerHTML += `
    <tr>
      <td class="p-2">${scheduleId++}</td>
      <td class="p-2">${course}</td>
      <td class="p-2">${teacher}</td>
      <td class="p-2">${day}</td>
      <td class="p-2">${time}</td>
    </tr>
  `;

  showToast("Schedule added!");
  document.getElementById("schedule-time").value = "";
}


function populateStudentAutocomplete() {
  const dataList = document.getElementById("student-list");
  dataList.innerHTML = "";
  students.forEach(student => {
    const option = document.createElement("option");
    option.value = `${student.id} - ${student.name}`;
    dataList.appendChild(option);
  });
}

function populateTeacherSelect() {
  const select = document.getElementById("attendance-teacher");
  select.innerHTML = `<option disabled selected>Select Teacher</option>`;
  teachers.forEach(teacher => {
    const option = document.createElement("option");
    option.value = teacher.id;
    option.textContent = `${teacher.id} - ${teacher.name}`;
    select.appendChild(option);
  });
}

function populateScheduleDropdowns() {
  const courseSelect = document.getElementById("schedule-course");
  const teacherSelect = document.getElementById("schedule-teacher");

  courseSelect.innerHTML = `<option disabled selected>Select Course</option>`;
  teacherSelect.innerHTML = `<option disabled selected>Select Teacher</option>`;

  courses.forEach(course => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = `${course.id} - ${course.name}`;
    courseSelect.appendChild(option);
  });

  teachers.forEach(teacher => {
    const option = document.createElement("option");
    option.value = teacher.id;
    option.textContent = `${teacher.id} - ${teacher.name}`;
    teacherSelect.appendChild(option);
  });
}


function toggleLang() {
  const page = document.querySelector("html");
  const lang = page.getAttribute("lang");
  if (lang === "ar") {
    page.setAttribute("lang", "en");
  } else if (lang === "en") {
    page.setAttribute("lang", "ar");
  }
  console.log("becomes: ", lang);
}

window.onload = () => {
  document.getElementById("attendance-date").value = new Date().toISOString().slice(0, 16);
  populateStudentAutocomplete();
  populateTeacherSelect();
};

const scheduleToday = [
  {
    time: "9:00 AM",
    duration: "1h",
    teacher: "أ. أحمد محمد",
    room: 5,
    language: "عربية",
    level: "المستوى الأول"
  },
  {
    time: "10:30 AM",
    duration: "1h",
    teacher: "أ. سلمى علي",
    room: 3,
    language: "عربية",
    level: "المستوى الثاني"
  },
  {
    time: "12:00 PM",
    duration: "45 دقيقة",
    teacher: "أ. مازن يوسف",
    room: 2,
    language: "إنجليزية",
    level: "المستوى الثالث"
  },
  {
    time: "1:15 PM",
    duration: "1h",
    teacher: "أ. نسرين عبد الله",
    room: 4,
    language: "فرنسية",
    level: "المستوى الأول"
  },
  {
    time: "3:00 PM",
    duration: "1h",
    teacher: "أ. خالد حسن",
    room: 1,
    language: "عربية",
    level: "المستوى الرابع"
  }
];

function scrollToHour(hour) {
  // إزالة highlight من كل العناصر المحددة مسبقًا
  const markedElements = document.getElementsByClassName('highlight');
  Array.from(markedElements).forEach(el => {
    el.classList.remove("highlight");
  });

  // إضافة highlight للعناصر الجديدة
  const cleanHour = hour.replace(/\s/g, '');
  const targetElements = document.querySelectorAll(`#hour-${cleanHour}`);
  targetElements.forEach(el => {
    el.classList.add("highlight");
  });

  // تمرير للعنصر الأول المطابق
  const el = document.getElementById(`hour-${cleanHour}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


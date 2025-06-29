let studentId = 1, teacherId = 1, courseId = 1, attendanceId = 1;
const students = [], teachers = [];


function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(div => {
    div.classList.add('hidden');
  });
  document.getElementById(tabId).classList.remove('hidden');
}

function toggleSubMenu(id) {
  document.getElementById(id).classList.toggle('hidden');
  const subMenus = document.querySelectorAll(".sub-menu");
  subMenus.forEach(btn => {
    if (btn.id !== id) {
      btn.classList.add("hidden");
    }
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const labels = document.querySelectorAll(".tab-label");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const subMenus = document.querySelectorAll(".sub-menu");

  const isCollapsed = sidebar.classList.contains("w-20");

  if (isCollapsed) {
    sidebar.classList.remove("w-20");
    sidebar.classList.add("w-48");
    labels.forEach(label => label.classList.remove("hidden"));
    tabBtns.forEach(btn => {
      btn.classList.remove("justify-center");
      btn.classList.add("justify-start");
    });
  } else {
    sidebar.classList.add("w-20");
    sidebar.classList.remove("w-48");
    labels.forEach(label => label.classList.add("hidden"));
    tabBtns.forEach(btn => {
      btn.classList.remove("justify-start");
      btn.classList.add("justify-center");
    });
    subMenus.forEach(btn => {
      btn.classList.add("hidden");
    });
  }
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

window.onload = () => {
  showTab('students-table');
  document.getElementById("attendance-date").value = new Date().toISOString().slice(0, 16);
  populateStudentAutocomplete();
  populateTeacherSelect();
};

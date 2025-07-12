function showToast(message = "Row added successfully!", color="green") {
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
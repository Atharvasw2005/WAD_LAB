// Load students when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
});

function loadStudents() {
    const studentsContainer = document.getElementById('studentsContainer');
    const students = JSON.parse(localStorage.getItem('students')) || [];
    
    if (students.length === 0) {
        studentsContainer.innerHTML = `
            <div class="no-data">
                <h2>No Students Registered Yet</h2>
                <p>Click the button above to register a new student.</p>
            </div>
        `;
        return;
    }
    
    // Display students in reverse order (newest first)
    studentsContainer.innerHTML = students.reverse().map((student, index) => `
        <div class="student-card">
            <div class="card-header">
                <div class="student-name">${student.firstName} ${student.lastName}</div>
                <button onclick="deleteStudent(${student.id})" class="delete-btn">Delete</button>
            </div>
            <div class="student-info">
                <div class="info-item">
                    <span class="info-label">Email</span>
                    <span class="info-value">${student.email}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Phone</span>
                    <span class="info-value">${student.phone}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Date of Birth</span>
                    <span class="info-value">${formatDate(student.dob)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Gender</span>
                    <span class="info-value">${student.gender}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Address</span>
                    <span class="info-value">${student.address}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">City</span>
                    <span class="info-value">${student.city}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">State</span>
                    <span class="info-value">${student.state}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Pincode</span>
                    <span class="info-value">${student.pincode}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Course</span>
                    <span class="info-value">${student.course}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Semester</span>
                    <span class="info-value">${student.semester}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Username</span>
                    <span class="info-value">${student.username}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Registered On</span>
                    <span class="info-value">${student.registeredOn}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(student => student.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to delete all student records? This action cannot be undone.')) {
        localStorage.removeItem('students');
        loadStudents();
        alert('All student records have been deleted.');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

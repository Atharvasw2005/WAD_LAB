// Get form and all input elements
const form = document.getElementById('registrationForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const dob = document.getElementById('dob');
const address = document.getElementById('address');
const city = document.getElementById('city');
const state = document.getElementById('state');
const pincode = document.getElementById('pincode');
const course = document.getElementById('course');
const semester = document.getElementById('semester');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const terms = document.getElementById('terms');

// Real-time validation on blur
firstName.addEventListener('blur', () => validateFirstName());
lastName.addEventListener('blur', () => validateLastName());
email.addEventListener('blur', () => validateEmail());
phone.addEventListener('blur', () => validatePhone());
dob.addEventListener('blur', () => validateDOB());
address.addEventListener('blur', () => validateAddress());
city.addEventListener('blur', () => validateCity());
state.addEventListener('change', () => validateState());
pincode.addEventListener('blur', () => validatePincode());
course.addEventListener('change', () => validateCourse());
semester.addEventListener('change', () => validateSemester());
username.addEventListener('blur', () => validateUsername());
password.addEventListener('blur', () => validatePassword());
confirmPassword.addEventListener('blur', () => validateConfirmPassword());

// Password matching validation
password.addEventListener('input', () => {
    if (confirmPassword.value !== '') {
        validateConfirmPassword();
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        saveToLocalStorage();
    }
});

// Form reset
form.addEventListener('reset', function() {
    clearAllErrors();
    setTimeout(() => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
    }, 10);
});

// Validation Functions
function validateFirstName() {
    const value = firstName.value.trim();
    if (value === '') {
        setError('firstName', 'First name is required');
        return false;
    } else if (value.length < 2) {
        setError('firstName', 'First name must be at least 2 characters');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError('firstName', 'First name can only contain letters');
        return false;
    } else {
        setSuccess('firstName');
        return true;
    }
}

function validateLastName() {
    const value = lastName.value.trim();
    if (value === '') {
        setError('lastName', 'Last name is required');
        return false;
    } else if (value.length < 2) {
        setError('lastName', 'Last name must be at least 2 characters');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError('lastName', 'Last name can only contain letters');
        return false;
    } else {
        setSuccess('lastName');
        return true;
    }
}

function validateEmail() {
    const value = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        setError('email', 'Email is required');
        return false;
    } else if (!emailRegex.test(value)) {
        setError('email', 'Please enter a valid email address');
        return false;
    } else {
        setSuccess('email');
        return true;
    }
}

function validatePhone() {
    const value = phone.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    
    if (value === '') {
        setError('phone', 'Phone number is required');
        return false;
    } else if (!phoneRegex.test(value)) {
        setError('phone', 'Please enter a valid 10-digit phone number');
        return false;
    } else {
        setSuccess('phone');
        return true;
    }
}

function validateDOB() {
    const value = dob.value;
    
    if (value === '') {
        setError('dob', 'Date of birth is required');
        return false;
    }
    
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        setError('dob', 'You must be at least 18 years old');
        return false;
    } else if (age > 100) {
        setError('dob', 'Please enter a valid date of birth');
        return false;
    } else {
        setSuccess('dob');
        return true;
    }
}

function validateGender() {
    const genderInputs = document.getElementsByName('gender');
    let isChecked = false;
    
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            isChecked = true;
            break;
        }
    }
    
    if (!isChecked) {
        document.getElementById('genderError').textContent = 'Please select a gender';
        return false;
    } else {
        document.getElementById('genderError').textContent = '';
        return true;
    }
}

function validateAddress() {
    const value = address.value.trim();
    
    if (value === '') {
        setError('address', 'Address is required');
        return false;
    } else if (value.length < 10) {
        setError('address', 'Address must be at least 10 characters');
        return false;
    } else {
        setSuccess('address');
        return true;
    }
}

function validateCity() {
    const value = city.value.trim();
    
    if (value === '') {
        setError('city', 'City is required');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError('city', 'City name can only contain letters');
        return false;
    } else {
        setSuccess('city');
        return true;
    }
}

function validateState() {
    const value = state.value;
    
    if (value === '') {
        setError('state', 'Please select a state');
        return false;
    } else {
        setSuccess('state');
        return true;
    }
}

function validatePincode() {
    const value = pincode.value.trim();
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    
    if (value === '') {
        setError('pincode', 'Pincode is required');
        return false;
    } else if (!pincodeRegex.test(value)) {
        setError('pincode', 'Please enter a valid 6-digit pincode');
        return false;
    } else {
        setSuccess('pincode');
        return true;
    }
}

function validateCourse() {
    const value = course.value;
    
    if (value === '') {
        setError('course', 'Please select a course');
        return false;
    } else {
        setSuccess('course');
        return true;
    }
}

function validateSemester() {
    const value = semester.value;
    
    if (value === '') {
        setError('semester', 'Please select a semester');
        return false;
    } else {
        setSuccess('semester');
        return true;
    }
}

function validateUsername() {
    const value = username.value.trim();
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    
    if (value === '') {
        setError('username', 'Username is required');
        return false;
    } else if (!usernameRegex.test(value)) {
        setError('username', 'Username must be 4-20 characters (letters, numbers, underscore only)');
        return false;
    } else {
        setSuccess('username');
        return true;
    }
}

function validatePassword() {
    const value = password.value;
    
    if (value === '') {
        setError('password', 'Password is required');
        return false;
    } else if (value.length < 8) {
        setError('password', 'Password must be at least 8 characters');
        return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
        setError('password', 'Password must contain uppercase, lowercase, number and special character');
        return false;
    } else {
        setSuccess('password');
        return true;
    }
}

function validateConfirmPassword() {
    const value = confirmPassword.value;
    
    if (value === '') {
        setError('confirmPassword', 'Please confirm your password');
        return false;
    } else if (value !== password.value) {
        setError('confirmPassword', 'Passwords do not match');
        return false;
    } else {
        setSuccess('confirmPassword');
        return true;
    }
}

function validateTerms() {
    if (!terms.checked) {
        document.getElementById('termsError').textContent = 'You must agree to the terms and conditions';
        return false;
    } else {
        document.getElementById('termsError').textContent = '';
        return true;
    }
}

function validateForm() {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isDOBValid = validateDOB();
    const isGenderValid = validateGender();
    const isAddressValid = validateAddress();
    const isCityValid = validateCity();
    const isStateValid = validateState();
    const isPincodeValid = validatePincode();
    const isCourseValid = validateCourse();
    const isSemesterValid = validateSemester();
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();
    
    return isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && 
           isDOBValid && isGenderValid && isAddressValid && isCityValid && 
           isStateValid && isPincodeValid && isCourseValid && isSemesterValid &&
           isUsernameValid && isPasswordValid && isConfirmPasswordValid && isTermsValid;
}

function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.add('error');
    field.classList.remove('success');
    errorElement.textContent = message;
}

function setSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.add('success');
    field.classList.remove('error');
    errorElement.textContent = '';
}

function clearAllErrors() {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
}

// Local Storage Functions
function saveToLocalStorage() {
    // Get selected gender
    const genderInputs = document.getElementsByName('gender');
    let selectedGender = '';
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            selectedGender = genderInputs[i].value;
            break;
        }
    }
    
    // Create student object
    const student = {
        id: Date.now(),
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        dob: dob.value,
        gender: selectedGender,
        address: address.value.trim(),
        city: city.value.trim(),
        state: state.value,
        pincode: pincode.value.trim(),
        course: course.value,
        semester: semester.value,
        username: username.value.trim(),
        registeredOn: new Date().toLocaleString()
    };
    
    // Get existing students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    // Add new student
    students.push(student);
    
    // Save back to localStorage
    localStorage.setItem('students', JSON.stringify(students));
    
    // Show success message
    alert('Registration successful! You will be redirected to view all registered students.');
    
    // Reset form
    form.reset();
    clearAllErrors();
    
    // Redirect to display page
    setTimeout(() => {
        window.location.href = 'display.html';
    }, 1000);
}

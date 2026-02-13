const form = document.getElementById('registrationForm');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const dob = document.getElementById('dob');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');


// ✅ Prevent letters in phone
phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/\D/g, '');
});


// ✅ Show / Hide Password
togglePassword.addEventListener('click', () => {

    if (password.type === 'password') {
        password.type = 'text';
        togglePassword.textContent = 'Hide';
    } else {
        password.type = 'password';
        togglePassword.textContent = 'Show';
    }

});


// ✅ Validation Functions

function validateFirstName() {
    const value = firstName.value.trim();

    if (value === '') {
        setError('firstName', 'First name is required');
        return false;
    } 
    else if (value.length < 2) {
        setError('firstName', 'Minimum 2 characters required');
        return false;
    } 
    else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError('firstName', 'Name cannot contain numbers');
        return false;
    } 
    else {
        setSuccess('firstName');
        return true;
    }
}

function validateLastName() {
    const value = lastName.value.trim();

    if (value === '') {
        setError('lastName', 'Last name is required');
        return false;
    } 
    else if (value.length < 2) {
        setError('lastName', 'Minimum 2 characters required');
        return false;
    } 
    else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError('lastName', 'Name cannot contain numbers');
        return false;
    } 
    else {
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
    } 
    else if (!emailRegex.test(value)) {
        setError('email', 'Invalid email format');
        return false;
    } 
    else {
        setSuccess('email');
        return true;
    }
}

function validatePhone() {
    const value = phone.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;

    if (value === '') {
        setError('phone', 'Mobile number required');
        return false;
    } 
    else if (!phoneRegex.test(value)) {
        setError('phone', 'Must be 10 digits & start with 6-9');
        return false;
    } 
    else {
        setSuccess('phone');
        return true;
    }
}

function validateDOB() {
    const value = dob.value;

    if (value === '') {
        setError('dob', 'DOB is required');
        return false;
    }

    const birthDate = new Date(value);
    const today = new Date();

    if (birthDate > today) {
        setError('dob', 'DOB cannot be future date');
        return false;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        setError('dob', 'Must be at least 18 years old');
        return false;
    } 
    else if (age > 60) {
        setError('dob', 'Age must be less than 60');
        return false;
    } 
    else {
        setSuccess('dob');
        return true;
    }
}

function validateUsername() {
    const value = username.value.trim();

    if (value === '') {
        setError('username', 'Username required');
        return false;
    } 
    else if (value.length < 4) {
        setError('username', 'Minimum 4 characters');
        return false;
    } 
    else {
        setSuccess('username');
        return true;
    }
}

function validatePassword() {
    const value = password.value;

    if (value === '') {
        setError('password', 'Password required');
        return false;
    } 
    else if (value.length < 6) {
        setError('password', 'Minimum 6 characters');
        return false;
    } 
    else {
        setSuccess('password');
        return true;
    }
}

function validateConfirmPassword() {
    const value = confirmPassword.value;

    if (value === '') {
        setError('confirmPassword', 'Confirm your password');
        return false;
    } 
    else if (value !== password.value) {
        setError('confirmPassword', 'Passwords do not match');
        return false;
    } 
    else {
        setSuccess('confirmPassword');
        return true;
    }
}


// ✅ Form Submit
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const isValid =
        validateFirstName() &&
        validateLastName() &&
        validateEmail() &&
        validatePhone() &&
        validateDOB() &&
        validateUsername() &&
        validatePassword() &&
        validateConfirmPassword();

    if (isValid) {
        alert("Registration Successful 🎉");
        form.reset();
        clearStyles();
    }
});


// ✅ Helper Functions

function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');

    field.classList.add('error');
    field.classList.remove('success');
    error.textContent = message;
}

function setSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');

    field.classList.add('success');
    field.classList.remove('error');
    error.textContent = '';
}

function clearStyles() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
}

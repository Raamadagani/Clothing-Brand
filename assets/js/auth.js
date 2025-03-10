// Store users in localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Signup Logic
document.getElementById('signup-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("This email is already registered.");
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registration successful! Please log in.");
    window.location.href = 'login.html';
});

// Login Logic
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Invalid email or password. Please try again.");
        return;
    }

    // Create session
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    alert(`Welcome back, ${user.name}!`);
    window.location.href = '../index.html'; // Redirect to homepage
});

// Logout Logic
function logout() {
    localStorage.removeItem('loggedInUser');
    alert("You have successfully logged out.");
    window.location.href = 'login.html';
}

// Display Profile (Optional)
function displayUserProfile() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        document.getElementById('user-profile').innerHTML = `
            <p>Welcome, ${user.name}</p>
            <button onclick="logout()">Logout</button>
        `;
    }
}
// Admin Credentials
const ADMIN_CREDENTIALS = {
    email: 'admin@brand.com',
    password: 'admin123'
};

// Admin Login Logic
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('loggedInUser', JSON.stringify({ email: email }));
        alert("Admin Login Successful! Redirecting to Dashboard.");
        window.location.href = 'admin.html';
    } else {
        alert("Invalid email or password.");
    }
});

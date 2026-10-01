
const API_URL = "http://localhost:5000/api";


// =====================================
// REGISTER
// =====================================

async function registerUser(name, email, password) {

    try {

        const response = await fetch(
            `${API_URL}/auth/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Registration failed"
            );
        }

        alert("Registration successful!");

        return data;

    } catch (error) {

        console.error(error);

        alert(error.message);

        return null;
    }
}


// =====================================
// LOGIN
// =====================================

async function loginUser(email, password) {

    try {

        const response = await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Login failed"
            );
        }

        // Save token
        localStorage.setItem(
            "token",
            data.token
        );

        // Save user
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        alert("Login successful!");

        return data;

    } catch (error) {

        console.error(error);

        alert(error.message);

        return null;
    }
}


// =====================================
// CREATE BLOG
// =====================================

async function createBlog(
    title,
    category,
    image,
    content
) {

    try {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "Please login before creating a blog."
            );

            return null;
        }

        const response = await fetch(
            `${API_URL}/blogs`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    "Authorization":
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    title,
                    category,
                    image,
                    content
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to create blog"
            );

        }

        alert(
            "Blog created successfully!"
        );

        return data;

    } catch (error) {

        console.error(error);

        alert(error.message);

        return null;
    }
}


// =====================================
// GET ALL BLOGS
// =====================================

async function getBlogs() {

    try {

        const response = await fetch(
            `${API_URL}/blogs`
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load blogs"
            );

        }

        return data;

    } catch (error) {

        console.error(error);

        alert(error.message);

        return [];
    }
}


// =====================================
// GET LOGGED-IN USER
// =====================================

function getCurrentUser() {

    const user =
        localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {

        return JSON.parse(user);

    } catch {

        return null;
    }
}


// =====================================
// LOGOUT
// =====================================

function logoutUser() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logged out successfully");

    location.reload();
}

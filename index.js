
let blogs =
    JSON.parse(
        localStorage.getItem("blogPosts")
    ) || [];


let users =
    JSON.parse(
        localStorage.getItem("blogUsers")
    ) || [];


let currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );



/* ==========================================
   DEFAULT DATA
========================================== */

if (blogs.length === 0) {

    blogs = [

        {
            id: 1,

            title:
                "Getting Started With Web Development",

            category:
                "Web Development",

            content:
                "Web development is one of the most exciting fields in technology. HTML creates structure, CSS provides styling and JavaScript adds functionality.",

            image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",

            author:
                "BlogHub",

            userId:
                null,

            likes:
                12,

            date:
                new Date().toLocaleDateString()
        },


        {
            id: 2,

            title:
                "Why JavaScript Is Important",

            category:
                "Programming",

            content:
                "JavaScript is a powerful programming language used to create interactive websites and modern web applications.",

            image:
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",

            author:
                "BlogHub",

            userId:
                null,

            likes:
                8,

            date:
                new Date().toLocaleDateString()
        },


        {
            id: 3,

            title:
                "Artificial Intelligence And The Future",

            category:
                "AI",

            content:
                "Artificial Intelligence is changing the way people work, learn and build products. Developers can use AI tools to improve productivity.",

            image:
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",

            author:
                "BlogHub",

            userId:
                null,

            likes:
                20,

            date:
                new Date().toLocaleDateString()
        }

    ];

    saveBlogs();
}



/* ==========================================
   SAVE BLOGS
========================================== */

function saveBlogs() {

    localStorage.setItem(
        "blogPosts",
        JSON.stringify(blogs)
    );

}



/* ==========================================
   SAVE USERS
========================================== */

function saveUsers() {

    localStorage.setItem(
        "blogUsers",
        JSON.stringify(users)
    );

}



/* ==========================================
   SHOW PAGE
========================================== */

function showPage(pageId) {

    if (
        (pageId === "dashboard" ||
         pageId === "create")
        &&
        !currentUser
    ) {

        alert("Please login first.");

        pageId = "login";

    }


    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document
        .getElementById(pageId)
        .classList.add("active");


    window.scrollTo(0, 0);


    updateNavigation();


    if (pageId === "home") {

        displayBlogs(blogs);

    }


    if (pageId === "dashboard") {

        displayDashboard();

    }

}



/* ==========================================
   REGISTER
========================================== */

function register(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;


    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;

    }


    const existingUser =
        users.find(
            user => user.email === email
        );


    if (existingUser) {

        alert("Email already registered!");

        return;

    }


    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password

    };


    users.push(newUser);

    saveUsers();


    alert(
        "Registration successful! Please login."
    );


    document
        .querySelector("#register form")
        .reset();


    showPage("login");

}



/* ==========================================
   LOGIN
========================================== */

function login(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const user =
        users.find(
            user =>
                user.email === email &&
                user.password === password
        );


    if (!user) {

        alert(
            "Invalid email or password!"
        );

        return;

    }


    currentUser = user;


    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );


    alert("Login successful!");


    document
        .querySelector("#login form")
        .reset();


    showPage("dashboard");

}



/* ==========================================
   LOGOUT
========================================== */

function logout() {

    currentUser = null;

    localStorage.removeItem(
        "currentUser"
    );


    alert(
        "You have been logged out."
    );


    showPage("home");

}



/* ==========================================
   NAVIGATION
========================================== */

function updateNavigation() {

    const navLogin =
        document.getElementById("navLogin");

    const navRegister =
        document.getElementById("navRegister");

    const navLogout =
        document.getElementById("navLogout");

    const navDashboard =
        document.getElementById("navDashboard");

    const navCreate =
        document.getElementById("navCreate");


    if (currentUser) {

        navLogin.style.display =
            "none";

        navRegister.style.display =
            "none";

        navLogout.style.display =
            "inline";

        navDashboard.style.display =
            "inline";

        navCreate.style.display =
            "inline";

    }

    else {

        navLogin.style.display =
            "inline";

        navRegister.style.display =
            "inline";

        navLogout.style.display =
            "none";

        navDashboard.style.display =
            "inline";

        navCreate.style.display =
            "inline";

    }

}



/* ==========================================
   DISPLAY BLOGS
========================================== */

function displayBlogs(blogList) {

    const container =
        document.getElementById(
            "blogContainer"
        );


    container.innerHTML = "";


    if (blogList.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    No blogs found
                </h3>

                <p>
                    Try searching for something else.
                </p>

            </div>

        `;

        return;

    }


    blogList.forEach(blog => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "blog-card";


        const image =
            blog.image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80";


        const shortContent =
            blog.content.length > 120
                ?
                blog.content.substring(0,120)
                + "..."
                :
                blog.content;


        card.innerHTML = `

            <img
                src="${image}"
                alt="${blog.title}"
                class="blog-image"
            >


            <div class="blog-content">

                <span class="category">
                    ${blog.category}
                </span>


                <h3>
                    ${blog.title}
                </h3>


                <p>
                    ${shortContent}
                </p>


                <div class="blog-meta">

                    <span>
                        By ${blog.author}
                    </span>

                    <span>
                        ${blog.date}
                    </span>

                </div>


                <div style="margin-top:15px;">

                    <button
                        class="like-btn"
                        onclick="likeBlog(${blog.id})"
                    >
                        ❤️ ${blog.likes}
                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}



/* ==========================================
   SEARCH BLOGS
========================================== */

function searchBlogs() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filteredBlogs =
        blogs.filter(blog =>

            blog.title
                .toLowerCase()
                .includes(search)

            ||

            blog.category
                .toLowerCase()
                .includes(search)

            ||

            blog.content
                .toLowerCase()
                .includes(search)

        );


    displayBlogs(filteredBlogs);

}



/* ==========================================
   LIKE BLOG
========================================== */

function likeBlog(id) {

    const blog =
        blogs.find(
            blog => blog.id === id
        );


    if (blog) {

        blog.likes++;

        saveBlogs();

        displayBlogs(blogs);

    }

}



/* ==========================================
   CREATE BLOG
========================================== */

function createBlog(event) {

    event.preventDefault();


    if (!currentUser) {

        alert(
            "Please login first."
        );

        showPage("login");

        return;

    }


    const title =
        document
            .getElementById("blogTitle")
            .value
            .trim();


    const category =
        document
            .getElementById("blogCategory")
            .value;


    const image =
        document
            .getElementById("blogImage")
            .value
            .trim();


    const content =
        document
            .getElementById("blogContent")
            .value
            .trim();


    const newBlog = {

        id: Date.now(),

        title: title,

        category: category,

        image: image,

        content: content,

        author: currentUser.name,

        userId: currentUser.id,

        likes: 0,

        date:
            new Date()
                .toLocaleDateString()

    };


    blogs.unshift(newBlog);


    saveBlogs();


    alert(
        "Blog published successfully!"
    );


    document
        .querySelector("#create form")
        .reset();


    showPage("dashboard");

}



/* ==========================================
   DASHBOARD
========================================== */

function displayDashboard() {

    if (!currentUser) {

        showPage("login");

        return;

    }


    document
        .getElementById("userName")
        .textContent =
        currentUser.name;


    const myBlogList =
        blogs.filter(
            blog =>
                blog.userId === currentUser.id
        );


    document
        .getElementById("totalBlogs")
        .textContent =
        myBlogList.length;


    const totalLikes =
        myBlogList.reduce(
            (total, blog) =>
                total + blog.likes,
            0
        );


    document
        .getElementById("totalLikes")
        .textContent =
        totalLikes;


    const container =
        document.getElementById(
            "myBlogs"
        );


    container.innerHTML = "";


    if (myBlogList.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    You haven't created any blogs yet.
                </h3>

                <p>
                    Start sharing your ideas with the world.
                </p>

                <br>

                <button
                    class="btn"
                    onclick="showPage('create')"
                >
                    Create Your First Blog
                </button>

            </div>

        `;

        return;

    }


    myBlogList.forEach(blog => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "blog-card";


        const image =
            blog.image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80";


        card.innerHTML = `

            <img
                src="${image}"
                alt="${blog.title}"
                class="blog-image"
            >


            <div class="blog-content">

                <span class="category">
                    ${blog.category}
                </span>


                <h3>
                    ${blog.title}
                </h3>


                <p>
                    ${blog.content.substring(0,100)}
                    ${blog.content.length > 100 ? "..." : ""}
                </p>


                <div class="blog-meta">

                    <span>
                        ❤️ ${blog.likes}
                    </span>

                    <span>
                        ${blog.date}
                    </span>

                </div>


                <div style="margin-top:15px;">

                    <button
                        class="delete-btn"
                        onclick="deleteBlog(${blog.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}



/* ==========================================
   DELETE BLOG
========================================== */

function deleteBlog(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmDelete) {
        return;
    }


    blogs =
        blogs.filter(
            blog => blog.id !== id
        );


    saveBlogs();


    displayDashboard();


    alert(
        "Blog deleted successfully."
    );

}



/* ==========================================
   INITIALIZE
========================================== */

updateNavigation();

displayBlogs(blogs);

// Login Functionality
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("complete-box");
    const logoutBtn = document.getElementById("logoutBtn");

    // Check if the login form exists (Login Page)
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            // Hardcoded credentials (for testing)
            const validUsername = "admin";
            const validPassword = "Jobs@123#";

            if (username === validUsername && password === validPassword) {
                localStorage.setItem("loggedIn", "true"); // Save login state
                window.location.href = "Dashboard.html" // Redirect to dashboard
            } else {
                document.getElementById("error-message").textContent = "Invalid username or password!";
            }
        });
    }
// Logout Functionality
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedIn"); // Remove login session
            window.location.href = "DashboardLogin.html"; // Redirect to login page
    });
}



    // Redirect to login page if not logged in (Dashboard Page)
    if (window.location.pathname.includes("Dashboard.html")) {
        if (!localStorage.getItem("loggedIn")) {
            window.location.href = "DashboardLogin.html"; // Redirect if not logged in
        }
    }
});

//Load Pages when clicking on sidebar buttons
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                document.querySelector('.content').innerHTML = data;
                document.querySelector('.dashboard-home').style.display ="none";            
        }).catch(error => console.error('Error loading page:', error));
    }


//function to reload dashboard content when clicking on Dashboard. 
function showDashboard() {
    document.querySelector('.content').innerHTML = ""; // Clear loaded content
    document.querySelector('.dashboard-home').style.display = "block"; // Show home section
}

//toggle button
const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    contentArea = body.querySelector(".content")

    sidebar.classList.remove("close"); // Ensure sidebar is open initially
    toggle.addEventListener("click",()=>{
        sidebar.classList.toggle("close"); 
        contentArea.classList.toggle("collapse-content"); 
    })

    if(sidebar.classList.contains("close")){
        contentArea.classList.add("collapse-content");
    }else{
        contentArea.classList.remove("collapse-content");
    }

    //functionn for staying link active.
    function setActive(element) {
        const navLinks = document.querySelectorAll('.nav-link');
    
        // Remove active class and hide indicators
        navLinks.forEach(link => {
            link.classList.remove('active');
            const indicator = link.querySelector('.active-indicator');
            if (indicator) indicator.style.display = 'none';
        });
    
        // Set active and show indicator
        element.parentElement.classList.add('active');
        const indicator = element.querySelector('.active-indicator');
        if (indicator) indicator.style.display = 'inline-block';
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        const navLinks = document.querySelectorAll('.nav-link');
    
        navLinks.forEach(link => {
            link.classList.remove('active');
            const indicator = link.querySelector('.active-indicator');
            if (indicator) indicator.style.display = 'none';
        });
    });
    
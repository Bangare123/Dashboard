document.addEventListener("DOMContentLoaded", function () {
  // ------------------ LOGIN LOGIC ------------------ //
  const loginForm = document.getElementById("complete-box");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // let username = document.getElementById("username").value;
      // let password = document.getElementById("password").value;

      // const validUsername = "admin";
      // const validPassword = "Jobs@123#";

      //   if (username === validUsername && password === validPassword) {
      //     localStorage.setItem("loggedIn", "true");
      //     window.location.href = "Dashboard.html";
      //   } else {
      //     document.getElementById("error-message").textContent =
      //       "Invalid username or password!";
      //   }
      localStorage.setItem("loggedIn", "true");
      window.location.href = "Dashboard.html";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedIn");
      window.location.href = "DashboardLogin.html";
    });
  }

  if (window.location.pathname.includes("Dashboard.html")) {
    if (!localStorage.getItem("loggedIn")) {
      window.location.href = "DashboardLogin.html";
    }
  }

  // ------------------ SIDEBAR TOGGLE ------------------ //
  const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    contentArea = body.querySelector(".content");

  sidebar.classList.remove("close");

  toggle?.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    contentArea.classList.toggle("collapse-content");
  });

  if (sidebar.classList.contains("close")) {
    contentArea.classList.add("collapse-content");
  } else {
    contentArea.classList.remove("collapse-content");
  }

  // ------------------ NAV LINK ACTIVE HANDLING ------------------ //
  const navLinks = document.querySelectorAll(".nav-link");

  // Clear all nav link active state on page load
  navLinks.forEach((link) => {
    link.classList.remove("active");
    const indicator = link.querySelector(".active-indicator");
    if (indicator) indicator.style.display = "none";

    // Now set up click event
    link.addEventListener("click", function () {
      navLinks.forEach((l) => {
        l.classList.remove("active");
        const i = l.querySelector(".active-indicator");
        if (i) i.style.display = "none";
      });

      this.classList.add("active");
      const activeIndicator = this.querySelector(".active-indicator");
      if (activeIndicator) activeIndicator.style.display = "inline-block";
    });
  });

  // ------------------ LOAD CONTENT PAGES ------------------ //
  window.loadContent = function (page) {
    fetch(page)
      .then((response) => response.text())
      .then((data) => {
        document.querySelector(".content").innerHTML = data;
        document.querySelector(".dashboard-home").style.display = "none";
        attachCardClickListeners(); // Re-attach card logic after new content loads
      })
      .catch((error) => console.error("Error loading page:", error));
  };

  window.showDashboard = function () {
    document.querySelector(".content").innerHTML = "";
    document.querySelector(".dashboard-home").style.display = "block";
  };

  // ------------------ FULLSCREEN CARD IMAGE VIEW ------------------ //
  function attachCardClickListeners() {
    const cards = document.querySelectorAll(".clickbtn");
    const fullscreen = document.getElementById("fullscreen");
    const fullscreenImg = document.getElementById("fullscreen-img");

    if (cards && fullscreen && fullscreenImg) {
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          const imgSrc = card.getAttribute("data-img");
          fullscreenImg.src = imgSrc;
          fullscreen.style.display = "flex";
        });
      });
    }
  }

  window.closeFullscreen = function () {
    const fullscreen = document.getElementById("fullscreen");
    if (fullscreen) fullscreen.style.display = "none";
  };

  // Attach once for existing content
  attachCardClickListeners();
});

// Dynamic Header and Footer Injections

document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar Injection
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (navbarPlaceholder) {
        const currentPath = window.location.pathname;
        const pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1);

        const isActive = (href) => {
            // Match page names directly (e.g. index.html) or default to index.html if empty
            if (pageName === "" || pageName === "index.php") {
                return href === "index.html" ? "active" : "";
            }
            return pageName === href || pageName === href.replace(".html", ".php") ? "active" : "";
        };

        navbarPlaceholder.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <div class="logo">My Portfolio</div>
                    <ul class="nav-links">
                        <li><a href="index.html" class="${isActive('index.html')}">Home</a></li>
                        <li><a href="about.html" class="${isActive('about.html')}">About</a></li>
                        <li><a href="projects.html" class="${isActive('projects.html')}">Projects</a></li>
                        <li><a href="contact.html" class="${isActive('contact.html')}">Contact</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }

    // 2. Footer Injection
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer>
                <div class="container">
                    <p>&copy; ${new Date().getFullYear()} Portfolio Website. Built with Premium Design.</p>
                </div>
            </footer>
        `;
    }
});

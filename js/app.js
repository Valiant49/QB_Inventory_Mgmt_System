
const contentArea = document.getElementById("content-area");

// Load a page into the content area
async function loadPage(url, addToHistory = true) {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Page not found");
        }

        const html = await response.text();

        // Replace the main content
        contentArea.innerHTML = html;

        // Update browser history
        if (addToHistory) {
            history.pushState({ page: url }, "", `?page=${url}`);
        }

        // Update active navigation link
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.toggle(
                "active",
                new URL(link.href).pathname === new URL(url, location.href).pathname
            );
        });

    } catch (error) {
        contentArea.innerHTML = `
            <h1>Error</h1>
            <p>Unable to load the requested page.</p>
        `;

        console.error(error);
    }
}

// Handle sidebar navigation
document.addEventListener("click", event => {

    const link = event.target.closest(".nav-link");

    if (!link) return;

    // Allow normal browser behavior for external links, etc.
    if (
        event.ctrlKey || event.metaKey ||
        event.shiftKey || event.altKey ||
        link.target === "_blank"
    ) return;

    event.preventDefault();

    loadPage(link.href);
});

// Handle browser back and forward buttons
window.addEventListener("popstate", () => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");

    if (page) {
        loadPage(page, false);
    }
});

// Initial page
loadPage("pages/dashboard.html", false);

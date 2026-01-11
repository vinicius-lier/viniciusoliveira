(() => {
    const body = document.body;
    body.classList.add("js-enabled");

    const mobileMenu = document.getElementById("mobileMenu");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (!mobileMenu || !sidebar || !overlay) {
        return;
    }

    const closeMenu = () => {
        mobileMenu.setAttribute("aria-expanded", "false");
        sidebar.classList.remove("is-open");
        overlay.classList.remove("is-visible");
    };

    const openMenu = () => {
        mobileMenu.setAttribute("aria-expanded", "true");
        sidebar.classList.add("is-open");
        overlay.classList.add("is-visible");
    };

    mobileMenu.addEventListener("click", () => {
        const isExpanded = mobileMenu.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener("click", closeMenu);

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
})();

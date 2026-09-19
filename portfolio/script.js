(() => {
    const body = document.body;
    body.classList.add("js-enabled");

    const mobileMenu = document.getElementById("mobileMenu");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (mobileMenu && sidebar && overlay) {
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
    }

    // Scroll spy: keeps exactly one sidebar link marked "active" at a time,
    // in sync with clicks, scrolling, direct hash links and reloads.
    const hashLinks = Array.from(document.querySelectorAll('.sidebar__link[href^="#"]'));
    const trackedSections = hashLinks
        .map((link) => ({ link, section: document.getElementById(link.getAttribute("href").slice(1)) }))
        .filter((entry) => entry.section);

    if (trackedSections.length) {
        const setActiveId = (id) => {
            hashLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        };

        let suppressObserver = false;
        let resumeObserverTimer = null;

        const observer = new IntersectionObserver(
            (entries) => {
                if (suppressObserver) {
                    return;
                }
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );

        trackedSections.forEach(({ section }) => observer.observe(section));

        const lastSectionId = trackedSections[trackedSections.length - 1].section.id;

        window.addEventListener("scroll", () => {
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            if (atBottom) {
                setActiveId(lastSectionId);
            }
        }, { passive: true });

        hashLinks.forEach((link) => {
            link.addEventListener("click", () => {
                const targetId = link.getAttribute("href").slice(1);
                suppressObserver = true;
                setActiveId(targetId);
                window.clearTimeout(resumeObserverTimer);
                resumeObserverTimer = window.setTimeout(() => {
                    suppressObserver = false;
                }, 700);
            });
        });

        window.addEventListener("hashchange", () => {
            const targetId = window.location.hash.slice(1);
            if (document.getElementById(targetId)) {
                setActiveId(targetId);
            }
        });

        const initialId = window.location.hash ? window.location.hash.slice(1) : "home";
        setActiveId(document.getElementById(initialId) ? initialId : trackedSections[0].section.id);
    }
})();

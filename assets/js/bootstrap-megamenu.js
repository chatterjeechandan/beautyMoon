document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const toggleBtn = document.querySelector(".navbar-toggler");

    const overlay = getOrCreate(".side-menu-overlay", "div", {
        className: "side-menu-overlay",
        parent: body,
    });

    const sideMenu = getOrCreate("#side-menu", "div", {
        id: "side-menu",
        parent: body,
    });

    setupCloseButton(sideMenu);
    setupToggleButton();
    setupOverlayClick();
    setupResizeWatcher();
    setupDesktopDropdownHover();
    setupMobileSearchToggle();

    // ------------------------------
    // Utility + Setup Functions
    // ------------------------------

    function getOrCreate(selector, tag, { className = "", id = "", parent = document.body }) {
        let el = document.querySelector(selector);
        if (!el) {
            el = document.createElement(tag);
            if (className) el.className = className;
            if (id) el.id = id;
            parent.appendChild(el);
        }
        return el;
    }

    function setupCloseButton(container) {
        const closeBtn = document.createElement("button");
        closeBtn.classList.add("close");
        closeBtn.innerHTML = `<span aria-hidden="true">×</span>`;
        closeBtn.addEventListener("click", e => {
            e.preventDefault();
            slideOut();
        });

        const contents = document.createElement("div");
        contents.classList.add("contents");

        container.append(closeBtn, contents);
    }

    function setupToggleButton() {
        if (!toggleBtn) return;
        toggleBtn.addEventListener("click", e => {
            e.preventDefault();
            if (body.classList.contains("side-menu-visible")) {
                slideOut();
                return;
            }

            const menuContent = navbarCollapse.innerHTML;
            sideMenu.querySelector(".contents").innerHTML = menuContent;
            initSubmenuLogic(sideMenu);
            slideIn();
        });
    }

    function setupOverlayClick() {
        overlay.addEventListener("click", slideOut);
    }

    function setupResizeWatcher() {
        window.addEventListener("resize", () => {
            const isVisible = body.classList.contains("side-menu-visible");
            const isCollapsed = !navbarCollapse.classList.contains("show");

            if (isCollapsed && isVisible) {
                sideMenu.style.display = "block";
                overlay.style.display = "block";
            } else {
                sideMenu.style.display = "none";
                overlay.style.display = "none";
            }
        });
    }

    function slideIn() {
        body.classList.add("overflow-hidden");
        sideMenu.style.display = "block";
        setTimeout(() => {
            body.classList.add("side-menu-visible");
            overlay.style.display = "block";
            overlay.style.opacity = 1;
        }, 50);
    }

    function slideOut() {
        body.classList.remove("side-menu-visible");
        overlay.style.opacity = 0;
        setTimeout(() => {
            sideMenu.style.display = "none";
            overlay.style.display = "none";
            body.classList.remove("overflow-hidden");
        }, 400);
    }

    function initSubmenuLogic(container) {
        container.querySelectorAll(".dropdown").forEach(dropdown => {
            const toggle = dropdown.querySelector(".dropdown-toggle");
            const submenu = dropdown.querySelector(".dropdown-menu");

            if (toggle && submenu) {
                toggle.classList.add("submenu-toggle");
                toggle.innerHTML = `<i class="fa fa-chevron-left me-2"></i> ${toggle.innerText}`;
                submenu.classList.add("submenu");

                const wrapper = document.createElement("div");
                wrapper.className = "submenu-wrapper d-none";
                wrapper.appendChild(submenu);

                const backBtn = document.createElement("div");
                backBtn.className = "submenu-back fw-bold px-3 py-2";
                backBtn.innerHTML = '<i class="fa fa-chevron-right me-2"></i> חזרה';
                wrapper.prepend(backBtn);

                dropdown.appendChild(wrapper);

                toggle.addEventListener("click", e => {
                    e.preventDefault();
                    wrapper.classList.remove("d-none");
                });

                backBtn.addEventListener("click", () => {
                    wrapper.classList.add("d-none");
                });
            }
        });
    }

    function setupDesktopDropdownHover() {
        document.querySelectorAll(".nav-item.dropdown").forEach(dropdown => {
            const toggle = dropdown.querySelector("[data-bs-toggle='dropdown']");

            dropdown.addEventListener("mouseenter", () => {
                const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
                bsDropdown.show();
            });

            dropdown.addEventListener("mouseleave", () => {
                const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
                bsDropdown.hide();
            });
        });
    }

    function setupMobileSearchToggle() {
        const mobileSearchToggle = document.querySelector(".mobile-search");
        const searchBox = document.querySelector(".search-box");

        if (!mobileSearchToggle || !searchBox) return;

        mobileSearchToggle.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                searchBox.classList.toggle("d-none");
                searchBox.classList.toggle("d-block");
            }
        });
    }
});

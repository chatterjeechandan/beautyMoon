document.addEventListener("DOMContentLoaded", function() {
        var body = document.body;
        var navbar = document.querySelector('.navbar');
        var navbarCollapse = document.querySelector('.navbar-collapse');
    
        // Check if the overlay already exists, if not, create it
        var overlay = document.querySelector('.side-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('side-menu-overlay');
            body.appendChild(overlay);
        }
    
        // Check if the side menu already exists, if not, create it
        var sideMenu = document.querySelector('#side-menu');
        if (!sideMenu) {
            sideMenu = document.createElement('div');
            sideMenu.id = 'side-menu';
            body.appendChild(sideMenu);
    
            var closeButton = document.createElement('button');
            closeButton.classList.add('close');
            closeButton.innerHTML = '<span aria-hidden="true">×</span>';
            sideMenu.appendChild(closeButton);
    
            var sideMenuContents = document.createElement('div');
            sideMenuContents.classList.add('contents');
            sideMenu.appendChild(sideMenuContents);
    
            // Hide the menu when the "x" button is clicked
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                slideOut();
            });
        }
    
        // Configure Slide menu direction
        if (navbar.classList.contains('better-bootstrap-nav-left')) {
            sideMenu.classList.add('side-menu-left');
        }
    
        // This event is triggered when the user clicks the navbar toggle button.
        var toggleButton = document.querySelector('.navbar-toggler');
        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
    
            // Check if the menu is already visible. If so, slide out.
            if (body.classList.contains('side-menu-visible')) {
                slideOut();
                return;
            }
    
            // Copy the navbar contents and add them to our side menu.
            var menuContent = navbarCollapse.innerHTML;
            sideMenu.querySelector('.contents').innerHTML = menuContent;
    
            // Animate the side menu into frame.
            slideIn();
        });
    
        // Hide the menu when the overlay element is clicked.
        overlay.addEventListener('click', function(e) {
            slideOut();
        });
    
        // Listen for changes in the viewport size.
        window.addEventListener('resize', function() {
            if (!navbarCollapse.classList.contains('show') && body.classList.contains('side-menu-visible')) {
                sideMenu.style.display = 'block';
                overlay.style.display = 'block';
            } else {
                sideMenu.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    
        function slideIn() {
            body.classList.add('overflow-hidden');
            sideMenu.style.display = 'block';
            setTimeout(function() {
                body.classList.add('side-menu-visible');
                overlay.style.display = 'block';
                overlay.style.opacity = 1;
            }, 50);
        }
    
        function slideOut() {
            body.classList.remove('side-menu-visible');
            overlay.style.opacity = 0;
            setTimeout(function() {
                sideMenu.style.display = 'none';
                body.classList.remove('overflow-hidden');
                overlay.style.display = 'none';
            }, 400);
        }
    });
    
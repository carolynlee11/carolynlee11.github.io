document.addEventListener("DOMContentLoaded", function() {
    // Load the navbar
    fetch("/navbar.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("navbar-placeholder").innerHTML = data;

        const menuIcon = document.getElementById("menu-icon");
        const closeIcon = document.getElementById("close-icon");
        const navMenu = document.getElementById("nav-menu");

        menuIcon.addEventListener("click", function () {
            navMenu.classList.remove("fade-out");
            navMenu.classList.add("active");
        });

        closeIcon.addEventListener("click", function () {
            navMenu.classList.add("fade-out");

            // Remove the active class after the fade-out animation completes
            setTimeout(() => {
                navMenu.classList.remove("active");
            }, 500); // Match the timeout to the fade-out animation duration
        });

        // Highlight the active page in the navbar
        const navLinks = document.querySelectorAll(".nav-links");
        const currentPath = location.pathname;

        navLinks.forEach((link) => {
            const linkPath = new URL(link.href).pathname;

            // Special case for index.html
            if (
                (currentPath === "/" && linkPath === "/index.html") ||
                currentPath === linkPath
            ) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });

    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showWishMessage();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function showWishMessage() {
        const wishText = document.createElement('div');
        wishText.textContent = "make a wish!";
        wishText.className = 'wish-text';
        document.body.appendChild(wishText);

        // Start the star animation after the text fades out
        setTimeout(() => {
            wishText.remove();
            activateStars();
        }, 4000); // Synchronize with the fade-out animation timing
    }

    function activateStars() {
        for (let i = 0; i < 18; i++) {
            createAndAnimateStar();
        }
    }

    function createAndAnimateStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Randomize star size
        let size = Math.random() * 70 + 40; // Star size between 20px and 50px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Position and delay
        star.style.top = '-100px'; // Start above the screen
        star.style.right = `${Math.random() * 20 - 5}vw`; // Random starting point closer to the right side
        star.style.animationDelay = `${Math.random() * 3}s`; // Random delay up to 2 seconds
    
        document.body.appendChild(star);
    
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    const projectContainers = document.querySelectorAll(".project-container");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    projectContainers.forEach(container => observer.observe(container));
    
    if (location.pathname.includes("play.html")) {
        const playSections = document.querySelectorAll(".project-section, .headersub");
        const playObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in-visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        playSections.forEach((section) => playObserver.observe(section));
    }
    
});

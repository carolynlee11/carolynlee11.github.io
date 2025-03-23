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

    
    const scrollers = document.querySelectorAll(".scroller");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  const fadeSections = document.querySelectorAll(
    ".project-details, .main-content, .pov-statement, .single-image, .poster-images"
);

    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-visible");
                    fadeObserver.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        { threshold: 0.01 } // Trigger when 10% of the element is visible
    );

    fadeSections.forEach((section) => {
        section.classList.add("fade-in"); // Add initial fade-in class
        fadeObserver.observe(section);
    });

    const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".modal .close");

  // Attach click event to all zoomable images
  document.querySelectorAll(".zoomable").forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = "none";
    modalImg.src = "";
  };

  // Optional: Close modal when clicking outside the image
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImg.src = "";
    }
  };

  // Circular Project Navigation
  function createProjectNav() {
    const projects = [
      { title: "Mori", path: "mori.html" },
      { title: "Planet", path: "planet.html" },
      { title: "Skywalk", path: "skywalk.html" },
      { title: "JSL", path: "coming-soon.html" },
      { title: "A*Star", path: "astar.html" },
      { title: "Stanford HCI Group", path: "art-tcg.html" },
    ];
  
    const currentPath = location.pathname.split("/").pop(); // get current filename
    const currentIndex = projects.findIndex((project) => project.path === currentPath);
  
    if (currentIndex === -1) return;
  
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;
  
    const navContainer = document.createElement("div");
    navContainer.className = "project-nav";
  
    const prevLink = document.createElement("a");
    prevLink.href = projects[prevIndex].path;
    prevLink.className = "project-link";
    prevLink.innerHTML = `&lsaquo; ${projects[prevIndex].title}`;
  
    const nextLink = document.createElement("a");
    nextLink.href = projects[nextIndex].path;
    nextLink.className = "project-link";
    nextLink.innerHTML = `${projects[nextIndex].title} &rsaquo;`;
  
    navContainer.appendChild(prevLink);
    navContainer.appendChild(nextLink);
  
    const placeholder = document.getElementById("project-nav-placeholder");
    if (placeholder) {
      placeholder.appendChild(navContainer);
    }
  }
  

  createProjectNav();

});

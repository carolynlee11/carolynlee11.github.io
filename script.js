document.addEventListener("DOMContentLoaded", function() {
    // Load the navbar
    fetch("/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
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
});

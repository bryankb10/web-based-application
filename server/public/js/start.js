document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-game');
    if (window.api) {
        startButton.innerHTML = "Start Game";
    }
    else {
        startButton.innerHTML = "Play as Guest";
    }
    
    // Start game on button click
    startButton.addEventListener('click', startGame);
    
    // Start game on Enter key press
    document.addEventListener('keydown', function(event) {

        if (event.key === 'Enter') {
            startGame();
        }
    });
    
    
    function startGame() {

        // Add fade-out animation
        document.querySelector('.start-screen').style.animation = 'fadeOut 1s forwards';
        
        // Redirect to game page
        if (window.api) {
            setTimeout(() => {
                window.location.href = '/input';
            }, 1000);
        }
        else {
            setTimeout(() => {
                window.location.href = '/game/guest';
            }, 1000);
        }
    }
});

// Optional: Add dramatic lighting effect
function createSpotlights() {
    const lights = document.querySelectorAll('.light');
    lights.forEach((light, index) => {
        light.style.left = `${Math.random() * 100}%`;
        light.style.animationDelay = `${Math.random() * 4}s`;
    });
}

createSpotlights();
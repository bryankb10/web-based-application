document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const playerNameInput = document.getElementById('playerName');

    // Start game on button click
    loginButton.addEventListener('click', startLogin);

    // Start game on Enter key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            startLogin();
        }
    });

    function startLogin() {
        const playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert('Player Name cannot be EMPTY!!');
            return;
        }

        document.querySelector('.input-screen').style.animation = 'fadeOut 1s forwards';

        setTimeout(() => {
            window.location.href = '/game/' + playerName;
        }, 1000);
    }
});

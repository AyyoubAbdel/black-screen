let container = document.querySelector('.container');
let isFullscreen = false;
let currentColor = '';
let originalBackgroundColor = '';

container.addEventListener('click', (event) => {
    if (!isFullscreen && event.target.classList.contains('box')) {
        currentColor = event.target.getAttribute('data-color');
        originalBackgroundColor = document.body.style.backgroundColor;
        enterFullscreen();
    }
});

function enterFullscreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }

    // Change the screen color without affecting the browser or displaying the color boxes
    document.body.style.cssText = `
        background-color: ${currentColor} !important;
        color: transparent !important;
    `;

    // Hide the color boxes
    container.style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    isFullscreen = true;
}

// Exit fullscreen event listener
document.addEventListener('fullscreenchange', exitFullscreen);

function exitFullscreen() {
    if (!document.fullscreenElement) {
        // Restore the original background color
        document.body.style.backgroundColor = originalBackgroundColor;

        // Show the color boxes
        container.style.display = 'flex';
        document.getElementById('footer').style.display = 'flex';
        document.getElementById('footer').style.justifyContent = 'center';
        
        isFullscreen = false;
    }
}

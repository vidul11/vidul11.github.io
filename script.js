window.addEventListener('DOMContentLoaded', () => {
    const lights = document.querySelectorAll('.light');
    const statusText = document.querySelector('.status-text');
    const container = document.getElementById('lights-container');
    const mainContent = document.getElementById('main-content');

    let i = 0;
    const interval = setInterval(() => {
        if (i < lights.length) {
            lights[i].classList.add('on');
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                // LIGHTS OUT
                lights.forEach(l => l.classList.remove('on'));
                statusText.innerText = "LIGHTS OUT AND AWAY WE GO!";
                
                setTimeout(() => {
                    container.style.opacity = '0';
                    mainContent.classList.remove('hidden');
                    document.body.style.overflow = 'auto';
                    setTimeout(() => container.remove(), 1000);
                }, 800);
            }, 1000);
        }
    }, 600); // Speed of lights turning on
});

function updateClock() {
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ":" + 
                       now.getMinutes().toString().padStart(2, '0') + ":" + 
                       now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = timeString;
}
setInterval(updateClock, 1000);
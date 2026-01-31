document.addEventListener('DOMContentLoaded', () => {
    const lights = document.querySelectorAll('.light');
    const statusText = document.querySelector('.status-text');
    const mainContent = document.getElementById('main-content');
    const lightsContainer = document.getElementById('lights-container');

    // 1. Sped up sequence (400ms interval)
    lights.forEach((light, index) => {
        setTimeout(() => {
            light.classList.add('on');
            if (index === lights.length - 1) {
                // Random pause before lights out (between 0.4s and 1s)
                const randomDelay = Math.floor(Math.random() * 600) + 400;
                setTimeout(lightsOut, randomDelay);
            }
        }, (index + 1) * 400); 
    });

    function lightsOut() {
        lights.forEach(light => light.classList.remove('on'));
        statusText.textContent = "LIGHTS OUT! GO!";
        
        setTimeout(() => {
            lightsContainer.style.opacity = '0';
            lightsContainer.style.pointerEvents = 'none';
            mainContent.classList.remove('hidden');
            startClock();
        }, 300);
    }

    function startClock() {
        const clockElement = document.getElementById('clock');
        let startTime = Date.now();
        
        setInterval(() => {
            let elapsed = Date.now() - startTime;
            let m = Math.floor(elapsed / 60000);
            let s = Math.floor((elapsed % 60000) / 1000);
            let ms = Math.floor((elapsed % 1000) / 10);
            
            // Padding ensures the string length never changes, preventing jitter
            clockElement.textContent = 
                `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
        }, 50); // Updated to 50ms to be easier on the browser while remaining smooth
    }
});
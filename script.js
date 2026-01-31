// window.addEventListener('DOMContentLoaded', () => {
//     const lights = document.querySelectorAll('.light');
//     const statusText = document.querySelector('.status-text');
//     const container = document.getElementById('lights-container');
//     const mainContent = document.getElementById('main-content');

//     let i = 0;
//     const interval = setInterval(() => {
//         if (i < lights.length) {
//             lights[i].classList.add('on');
//             i++;
//         } else {
//             clearInterval(interval);
//             setTimeout(() => {
//                 // LIGHTS OUT
//                 lights.forEach(l => l.classList.remove('on'));
//                 statusText.innerText = "LIGHTS OUT AND AWAY WE GO!";
                
//                 setTimeout(() => {
//                     container.style.opacity = '0';
//                     mainContent.classList.remove('hidden');
//                     document.body.style.overflow = 'auto';
//                     setTimeout(() => container.remove(), 1000);
//                 }, 800);
//             }, 1000);
//         }
//     }, 600); // Speed of lights turning on
// });

// function updateClock() {
//     const now = new Date();
//     const timeString = now.getHours().toString().padStart(2, '0') + ":" + 
//                        now.getMinutes().toString().padStart(2, '0') + ":" + 
//                        now.getSeconds().toString().padStart(2, '0');
//     document.getElementById('clock').innerText = timeString;
// }
// setInterval(updateClock, 1000);



document.addEventListener('DOMContentLoaded', () => {
    const lights = document.querySelectorAll('.light');
    const statusText = document.querySelector('.status-text');
    const mainContent = document.getElementById('main-content');
    const lightsContainer = document.getElementById('lights-container');

    // 1. Sequence: Turn lights on one by one (Faster 500ms interval)
    lights.forEach((light, index) => {
        setTimeout(() => {
            light.classList.add('on');
            if (index === lights.length - 1) {
                // 2. Once all lights are on, wait a shorter random time then "Go"
                const randomDelay = Math.floor(Math.random() * 500) + 500; // 0.5s to 1s
                setTimeout(lightsOut, randomDelay);
            }
        }, (index + 1) * 500); 
    });

    function lightsOut() {
        // 3. Clear lights and update text
        lights.forEach(light => light.classList.remove('on'));
        statusText.textContent = "LIGHTS OUT! GO!";
        statusText.style.color = "#00d2be"; // Neon Cyan for the 'Go' signal

        // 4. Reveal Dashboard
        setTimeout(() => {
            lightsContainer.style.opacity = '0';
            lightsContainer.style.pointerEvents = 'none';
            mainContent.classList.remove('hidden');
            startClock();
        }, 400); // Shorter pause before sliding the content up
    }

    // Lap Timer Logic
    function startClock() {
        const clockElement = document.getElementById('clock');
        let startTime = Date.now();
        
        setInterval(() => {
            let elapsed = Date.now() - startTime;
            let m = Math.floor(elapsed / 60000);
            let s = Math.floor((elapsed % 60000) / 1000);
            let ms = Math.floor((elapsed % 1000) / 10);
            clockElement.textContent = 
                `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
        }, 10);
    }
});
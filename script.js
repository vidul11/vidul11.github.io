document.addEventListener('DOMContentLoaded', () => {
    const lights = document.querySelectorAll('.light');
    const lightsContainer = document.getElementById('lights-container');
    const statusText = document.querySelector('.status-text');
    const mainContent = document.getElementById('main-content');

    // 0. Reset Scroll and Lock
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome
    document.body.style.overflow = 'hidden';

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
            document.body.style.overflow = ''; 
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
        }, 50); // Updated to 50ms to be easier on the browser
    }

    // 3. Email Copy Handling
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = "saisuryavidul@gmail.com";
            copyToClipboard(email);
        });
    }

    function copyToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function () {
            showCopyFeedback();
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
            fallbackCopyTextToClipboard(text);
        });
    }

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Ensuring it's not visible
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            if (successful) showCopyFeedback();
            else console.error('Fallback: Copying text command was unsuccessful');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    function showCopyFeedback() {
        const icon = emailLink.querySelector('i');

        // Visual Feedback
        icon.className = 'fa-solid fa-check';
        emailLink.style.color = '#00d2be'; 

        // Reset after 2 seconds
        setTimeout(() => {
            icon.className = 'fa-solid fa-envelope';
            emailLink.style.color = '';
        }, 2000);
    }
});
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.animationPlayState = 'paused';
    observer.observe(section);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Random glitch effect on title
const heroTitle = document.querySelector('.hero-title');
const originalText = 'AI coin.';
const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function glitchText() {
    if (Math.random() > 0.95) {
        let glitched = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() > 0.7 && originalText[i] !== ' ') {
                glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitched += originalText[i];
            }
        }
        heroTitle.textContent = glitched;

        setTimeout(() => {
            heroTitle.textContent = originalText;
        }, 100);
    }
}

setInterval(glitchText, 200);

// Intro animation
window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('mainContent');

    setTimeout(() => {
        intro.classList.add('hidden');
        mainContent.classList.add('visible');
    }, 2000);
});

// Contract address - replace with your actual CA
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE';

// Set CA in the UI
document.getElementById('caAddress').textContent = CONTRACT_ADDRESS;

// Fetch market cap from DexScreener
async function fetchMarketCap() {
    const mcElement = document.getElementById('marketCap');

    if (CONTRACT_ADDRESS.includes('XXXX')) {
        mcElement.textContent = '$0';
        return;
    }

    try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`);
        const data = await response.json();

        if (data && data.pairs && data.pairs.length > 0) {
            const mc = data.pairs[0].marketCap || data.pairs[0].fdv;
            mcElement.textContent = formatMarketCap(mc);
        } else {
            mcElement.textContent = '$0';
        }
    } catch (error) {
        console.log('Could not fetch market cap:', error);
        mcElement.textContent = '$0';
    }
}

function formatMarketCap(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(2) + 'K';
    } else {
        return '$' + value.toFixed(2);
    }
}

// Fetch on load and refresh every 5 seconds
fetchMarketCap();
setInterval(fetchMarketCap, 5000);

// Close tab function
function closeTab() {
    window.close();
    // Fallback if browser blocks window.close()
    setTimeout(() => {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Space Mono,monospace;color:#6B7280;text-align:center;"><p>ok. you can close this tab yourself then.</p></div>';
    }, 100);
}

// Copy CA function
function copyCA() {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
        const btn = document.querySelector('.ca-copy');
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Console message
console.log('%c AI COIN ', 'background: #F5C97A; color: #121212; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c that\'s it. ', 'color: #666; font-size: 14px;');

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 0.5s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Parallax on mascot
const mascotImg = document.querySelector('.mascot-img');
if (mascotImg) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        mascotImg.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Type effect for lore (optional enhancement)
const loreText = document.querySelector('.lore-text');
if (loreText) {
    const text = loreText.textContent;
    loreText.textContent = '';
    loreText.style.visibility = 'visible';

    let typed = false;

    const loreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typed) {
                typed = true;
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        loreText.textContent += text[i];
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }
        });
    }, { threshold: 0.5 });

    loreObserver.observe(loreText);
}

(() => {
    let textEl;
    let headline = 'Headline Headline,';
    let speaker = 'Speaker Speaker';
    let isIntro = false;
    let holdDuration = 4000;

    function init() {
        textEl = document.querySelector('.text');
        textEl.innerHTML = '';

        if (window.location.search) {
            window.location.search.slice(1).split('&').map(x => x.split('=')).forEach(([key, value]) => {
                if (key === 'headline') {
                    headline = decodeURIComponent(value) + ',';
                }
                if (key === 'speaker') {
                    speaker = decodeURIComponent(value);
                }
                if (key === 'intro') {
                    isIntro = !!value
                }
                if (key === 'hold') {
                    holdDuration = parseInt(value);
                }
            })
        }

        console.debug({speaker, headline});

        const headlineEl = document.createElement('span');
        headlineEl.classList.add('headline');
        const speakerEl = document.createElement('span');
        speakerEl.classList.add('speaker');

        Array.from(headline).forEach(letter => {
            const letterEl = document.createElement('span');
            letterEl.classList.add('letter');
            letterEl.innerText = letter;
            headlineEl.appendChild(letterEl);
        })
        Array.from(speaker).forEach(letter => {
            const letterEl = document.createElement('span');
            letterEl.classList.add('letter');
            letterEl.innerText = letter;
            speakerEl.appendChild(letterEl);
        })

        textEl.appendChild(headlineEl);
        textEl.appendChild(document.createTextNode(' '));
        textEl.appendChild(speakerEl);

        const mainTilesEl = document.querySelector('.background .main-tiles');
        mainTilesEl.innerHTML = '';

        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile', 'blue');
            mainTilesEl.appendChild(tile);
        }

        const secondaryTilesEl = document.querySelector('.background .secondary-tiles');
        secondaryTilesEl.innerHTML = '';

        for (let i = 0; i < 17; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (i === 0 || Math.random() > 0.5) {
                tile.classList.add('yellow');
            } else {
                tile.classList.add('green');
            }
            secondaryTilesEl.appendChild(tile);
        }
    }

    async function animate() {
        if (isIntro) {
            await Promise.all([
                slideIn(),
                fadeInText(),
            ]);
        } else {
            await Promise.all([
                fadeIn(),
                fadeInText(),
            ]);
        }
        await new Promise(r => setTimeout(r, holdDuration));
        await Promise.all([
            fadeOut(),
            fadeOutText(),
        ])
    }

    async function slideIn() {
        const tiles = document.querySelectorAll('.tile');

        for (const tile of tiles) {
            tile.style.animationName = `slide-in-${Math.floor(Math.random() * 10)}`;
            tile.style.animationDelay = `${Math.random() * 0.4}s`;
            tile.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
            tile.style.animationIterationCount = 1;
            tile.style.animationTimingFunction = 'ease-in';
        }
        await new Promise(r => setTimeout(r, 600));
        for (const tile of tiles) {
            tile.classList.add('visible');
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    async function fadeIn() {
        const tiles = document.querySelectorAll('.tile');

        for (const tile of tiles) {
            tile.style.animationName = `fade-in`;
            tile.style.animationDelay = `${Math.random() * 0.4}s`;
            tile.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
            tile.style.animationIterationCount = 1;
            tile.style.animationTimingFunction = 'ease-in';
        }
        await new Promise(r => setTimeout(r, 600));
        for (const tile of tiles) {
            tile.classList.add('visible');
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    async function fadeOut() {
        const tiles = document.querySelectorAll('.tile');

        for (const tile of tiles) {
            tile.style.animationName = `fade-out`;
            tile.style.animationDelay = `${Math.random() * 0.4}s`;
            tile.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
            tile.style.animationIterationCount = 1;
            tile.style.animationTimingFunction = 'ease-in';
        }
        await new Promise(r => setTimeout(r, 600));
        for (const tile of tiles) {
            tile.classList.remove('visible');
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    async function fadeInText() {
        const letters = document.querySelectorAll('.letter');

        for (const letter of letters) {
            letter.style.animationName = `fade-in`;
            letter.style.animationDelay = `${Math.random() * 0.4}s`;
            letter.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
            letter.style.animationIterationCount = 1;
            letter.style.animationTimingFunction = 'ease-in';
        }
        await new Promise(r => setTimeout(r, 600));
        for (const tile of letters) {
            tile.classList.add('visible');
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    async function fadeOutText() {
        const letters = document.querySelectorAll('.letter');

        for (const letter of letters) {
            letter.style.animationName = `fade-out`;
            letter.style.animationDelay = `${Math.random() * 0.4}s`;
            letter.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
            letter.style.animationIterationCount = 1;
            letter.style.animationTimingFunction = 'ease-in';
        }
        await new Promise(r => setTimeout(r, 600));
        for (const tile of letters) {
            tile.classList.remove('visible');
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    window.addEventListener('load', async () => {
        init();
        await new Promise(r => setTimeout(r, 1000));
        animate();
    });
})();


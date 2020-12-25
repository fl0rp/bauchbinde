(() => {
    const scheduleUrl = 'https://schedule2.broken.equipment/everything.schedule.json';

    let textEl;
    let headline = '¯\\_(ツ)_/¯';
    let speaker = '';
    let isIntro = false;
    let holdDuration = 4000;
    let room = null;
    let time = null;

    async function getCurrentTalkByRoomName(roomName) {
        let now = Date.now();
        if (time) {
            now = Date.parse(time)
        }

        const response = await fetch(scheduleUrl);
        const data = await response.json();
        const days = data.schedule.conference.days;
        const today = days.find(day => {
            const start = Date.parse(day.day_start);
            const end = Date.parse(day.day_end);
            return now >= start && now <= end;
        });
        if (!today) return false;

        const room = today.rooms[roomName];
        if (!room) return false;

        const talk = room.find(talk => {
            const start = Date.parse(talk.date);
            const [hours, minutes] = talk.duration.split(':');
            const duration = (hours * 60 + minutes) * 60 * 1000;
            const end = start + duration;
            return now >= start && now <= end;
        })
        if (!talk) return false;
        return talk;
    }

    async function init() {
        textEl = document.querySelector('.text');
        textEl.innerHTML = '';

        if (window.location.search) {
            const pairs = window.location.search.slice(1).split('&').map(x => x.split('='));
            for (let pair of pairs) {
                const key = pair.shift();
                const value = decodeURIComponent(pair.join('='));

                if (key === 'headline') {
                    headline = value;
                }
                if (key === 'speaker') {
                    speaker = value;
                }
                if (key === 'intro') {
                    isIntro = !!parseInt(value, 10)
                }
                if (key === 'hold') {
                    holdDuration = parseInt(value, 10);
                }
                if (key === 'theme') {
                    const root = document.querySelector('html');
                    root.className = '';
                    root.classList.add(`theme-${value}`)
                }
                if (key === 'theme') {
                    const root = document.querySelector('html');
                    root.className = '';
                    root.classList.add(`theme-${value}`)
                }
                if (key === 'room') {
                    room = value;
                }
                if (key === 'time') {
                    time = value;
                }
            }
        }

        if (room) {
            const talk = await getCurrentTalkByRoomName(room);
            if (!talk) {
                headline = '¯\\_(ツ)_/¯';
                speaker = '';
            } else {
                headline = talk.title;
                if (talk.persons) {
                    speaker = talk.persons.map(person => person.public_name).join(' / ');
                }
            }
        }
       
        if (speaker) {
            headline += ',';
        }

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
            tile.classList.add('tile', 'large');
            mainTilesEl.appendChild(tile);
        }

        const secondaryTilesEl = document.querySelector('.background .secondary-tiles');
        secondaryTilesEl.innerHTML = '';

        for (let i = 0; i < 17; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (i === 0 || Math.random() > 0.5) {
                tile.classList.add('medium');
            } else {
                tile.classList.add('small');
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
            tile.style.animationIterationCount = '1';
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
            tile.style.animationIterationCount = '1';
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
            tile.style.animationIterationCount = '1';
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
            letter.style.animationIterationCount = '1';
            letter.style.animationTimingFunction = 'ease-in';
        }
        await new Promise(r => setTimeout(r, 600));
        for (const tile of letters) {
            tile.classList.remove('visible');
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    window.addEventListener('load', async () => {
        await init();
        await new Promise(r => setTimeout(r, 1000));
        await animate();
    });
})();

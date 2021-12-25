(() => {
    const scheduleUrl = 'https://schedule2.broken.equipment/everything.schedule.json';

    let isFirstRun = true;
    let autoIntro = false;
    let data = null;
    let textEl;
    let headline = null;
    let speaker = null;
    let isIntro = false;
    let holdDuration = 10;
    let room = null;
    let time = null;
    let startDelay = 1;
    let gracePeriod = 360;
    let interval = null;

    async function getCurrentTalkByRoomName(roomName, offset) {
        if (!offset) {
            offset = 0;
        }
        let now = Date.now() + offset;
        if (time) {
            now = Date.parse(time) + offset;
        }

        if (!offset || !data) {
            const response = await fetch(scheduleUrl);
            data = await response.json();
        }

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
            const [hours, minutes] = talk.duration.split(':').map(s => parseInt(s.trim(), 10));
            const duration = (hours * 60 + minutes) * 60 * 1000;
            const end = start + duration;
            return now >= start && now <= end;
        })
        if (!talk) return false;
        return talk;
    }

    async function init() {
        const root = document.querySelector('html');

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
                if (key === 'autoIntro') {
                    autoIntro = !!parseInt(value, 10)
                }
                if (key === 'hold') {
                    holdDuration = parseInt(value, 10);
                }
                if (key === 'theme') {
                    root.className = '';
                    root.classList.add(`theme-${value}`)
                }
                if (key === 'room') {
                    room = value;
                }
                if (key === 'time') {
                    time = value;
                }
                if (key === 'startdelay') {
                    startDelay = parseInt(value, 10);
                }
                if (key === 'left') {
                    root.style.setProperty('--left', value);
                }
                if (key === 'bottom') {
                    root.style.setProperty('--bottom', value);
                }
                if (key === 'top') {
                    root.style.setProperty('--top', value);
                }
                if (key === 'width') {
                    root.style.setProperty('--width', value);
                }
                if (key === 'gracePeriod') {
                    gracePeriod = parseInt(value, 10);
                }
                if (key === 'interval') {
                    interval = parseInt(value, 10);
                }
            }
        }

        if (room) {
            let offset = gracePeriod * 1000;
            let talk = await getCurrentTalkByRoomName(room);
            if (!talk) {
                talk = await getCurrentTalkByRoomName(room, -offset);
            }
            if (!talk) {
                talk = await getCurrentTalkByRoomName(room, offset);
            }
            if (!talk) {
                headline = null;
                speaker = null;
            } else {
                headline = talk.title;
                if (talk.persons) {
                    speaker = talk.persons.map(person => person.public_name).join(', ');
                }
            }
        }

        if (!headline) {
            return false;
        }

        const headlineEl = document.querySelector('.headline');
        headlineEl.innerHTML = '';
        const speakerEl = document.querySelector('.speaker');
        speakerEl.innerHTML = '';

        console.log('headline', headline);
        console.log('speaker', speaker);

        if (headline) {
            headlineEl  .innerText = headline;
        }
        if (speaker) {
            speakerEl.innerText = speaker;
        }

        return true;
    }

    async function animate() {
        const glitchEl = document.querySelector('.glitch');
        const infoEl = document.querySelector('.info');
        const glitchDuration = 1500;

        glitchEl.classList.add('visible');
        await new Promise(r => setTimeout(r, glitchDuration));
        glitchEl.classList.remove('visible');
        infoEl.classList.add('visible');
        await new Promise(r => setTimeout(r, holdDuration * 1000));
        infoEl.classList.remove('visible');
        glitchEl.classList.add('visible');
        await new Promise(r => setTimeout(r, glitchDuration));
        glitchEl.classList.remove('visible');
    }

    async function cycle() {
        if (await init()) {
            await new Promise(r => setTimeout(r, startDelay * 1000));
            await animate();
        }
        if (interval) {
            setTimeout(cycle, interval * 1000);
            isFirstRun = false;
        }
    }

    window.addEventListener('load', () => {
        cycle();
    });
})();

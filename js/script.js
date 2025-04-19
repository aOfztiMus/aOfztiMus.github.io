const mainAudio = document.getElementById('mainAudio');
const playPauseBtn = document.querySelector('.play-pause');
const playPauseIcon = document.querySelector('.play-pause i');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const seekSlider = document.getElementById('seek-slider');
const currentTimeText = document.querySelector('.current-time');
const durationText = document.querySelector('.duration');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.querySelector('.volume-btn i');
const speedBtn = document.querySelector('.speed-btn');
const speedOptions = document.querySelector('.speed-options');
const speedOptionList = document.querySelectorAll('.speed-options li');
const playlistContainer = document.querySelector('.playlist-container');
const playlistItems = document.querySelectorAll('.playlist li');

let currentMusicIndex = 0;
let isPlaying = false;

// โหลดเพลง
function loadMusic(index) {
    const musicSrc = playlistItems[index].getAttribute('data-src');
    const musicTitle = playlistItems[index].getAttribute('data-title');
    mainAudio.src = musicSrc;
    // คุณอาจต้องการอัปเดตชื่อเพลงที่แสดงผลที่นี่
}

// เล่นเพลง
function playMusic() {
    isPlaying = true;
    mainAudio.play();
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
}

// หยุดเพลง
function pauseMusic() {
    isPlaying = false;
    mainAudio.pause();
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
}

// สลับเล่น/หยุด
playPauseBtn.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
});

// อัปเดตเวลาปัจจุบันและความยาวเพลง
mainAudio.addEventListener('loadeddata', () => {
    const duration = formatTime(mainAudio.duration);
    durationText.textContent = duration;
});

mainAudio.addEventListener('timeupdate', () => {
    const currentTime = formatTime(mainAudio.currentTime);
    currentTimeText.textContent = currentTime;

    const progress = (mainAudio.currentTime / mainAudio.duration) * 100;
    seekSlider.value = progress;
});

// เลื่อนตำแหน่งการเล่น
seekSlider.addEventListener('input', () => {
    const seekTime = (seekSlider.value / 100) * mainAudio.duration;
    mainAudio.currentTime = seekTime;
});

// เปลี่ยนเพลงก่อนหน้า
prevBtn.addEventListener('click', () => {
    currentMusicIndex--;
    if (currentMusicIndex < 0) {
        currentMusicIndex = playlistItems.length - 1;
    }
    loadMusic(currentMusicIndex);
    playMusic();
});

// เปลี่ยนเพลงถัดไป
nextBtn.addEventListener('click', () => {
    currentMusicIndex++;
    if (currentMusicIndex >= playlistItems.length) {
        currentMusicIndex = 0;
    }
    loadMusic(currentMusicIndex);
    playMusic();
});

// ควบคุมระดับเสียง
volumeSlider.addEventListener('input', () => {
    mainAudio.volume = volumeSlider.value;
    if (mainAudio.volume === 0) {
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    }
});

volumeBtn.addEventListener('click', () => {
    if (mainAudio.volume > 0) {
        mainAudio.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        mainAudio.volume = 1;
        volumeSlider.value = 1;
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    }
});

// ควบคุมความเร็วในการเล่น
speedBtn.addEventListener('click', () => {
    speedOptions.classList.toggle('active');
});

speedOptionList.forEach(option => {
    option.addEventListener('click', () => {
        const speed = parseFloat(option.getAttribute('data-speed'));
        mainAudio.playbackRate = speed;
        speedBtn.textContent = speed + 'x';
        speedOptions.classList.remove('active');
    });
});

// จัดการเมื่อเพลงจบ
mainAudio.addEventListener('ended', () => {
    nextBtn.click(); // เล่นเพลงถัดไปอัตโนมัติ
});

// คลิกที่รายการเพลง
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentMusicIndex = index;
        loadMusic(currentMusicIndex);
        playMusic();
    });
});

// ฟังก์ชันสำหรับแปลงเวลาเป็นรูปแบบ mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// โหลดเพลงแรกเมื่อหน้าเว็บโหลด
loadMusic(currentMusicIndex);

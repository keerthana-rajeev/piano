const whiteKey = ['z','x','c','v','b','n','m'];
const blackKey = ['s','d','f','g','h'];
const keys = document.querySelectorAll(".key");
const sounds = document.querySelectorAll(".sound");
keys.forEach((key, index) => {
    key.addEventListener('click', function(){
        sounds[index].currentTime = 0;
        sounds[index].play();
        key.classList.add('active');
        sounds[index].addEventListener('ended', function(){
            key.classList.remove('active');
        });
    });
});
const visual = document.querySelector('.visuals');
const colors = ["#ccc", "#333"];
document.addEventListener('keydown', e =>{
    const enteredkey = e.key;
    if(e.repeat){
        return;
    }
    const whiteIndex = whiteKey.indexOf(enteredkey);
    const blackIndex = blackKey.indexOf(enteredkey);
    if(whiteIndex == 0){
        sounds[whiteIndex].currentTime = 0;
        sounds[whiteIndex].play();
        createBubble(whiteIndex);
    }
    if(whiteIndex == 1){
        sounds[whiteIndex+1].currentTime = 0;
        sounds[whiteIndex+1].play();
        createBubble(whiteIndex);
    }
    if(whiteIndex == 2){
        sounds[whiteIndex+2].currentTime = 0;
        sounds[whiteIndex+2].play();
        createBubble(whiteIndex);
    }
    if(whiteIndex == 3){
        sounds[whiteIndex+2].currentTime = 0;
        sounds[whiteIndex+2].play();
        createBubble(whiteIndex);
    }
    if(whiteIndex == 4){
        sounds[whiteIndex+3].currentTime = 0;
        sounds[whiteIndex+3].play();
        createBubble(whiteIndex);
    }
    if(whiteIndex == 5){
        sounds[whiteIndex+4].currentTime = 0;
        sounds[whiteIndex+4].play();
        createBubble(whiteIndex);
    }
    if(whiteIndex == 6){
        sounds[whiteIndex+5].currentTime = 0;
        sounds[whiteIndex+5].play();
        createBubble(whiteIndex);
    }
    if(blackIndex == 0){
        sounds[blackIndex+1].currentTime = 0;
        sounds[blackIndex+1].play();
        createBubble1(blackIndex);
    }
    if(blackIndex == 1){
        sounds[blackIndex+2].currentTime = 0;
        sounds[blackIndex+2].play();
        createBubble1(blackIndex);
    }
    if(blackIndex == 2){
        sounds[blackIndex+4].currentTime = 0;
        sounds[blackIndex+4].play();
        createBubble1(blackIndex);
    }
    if(blackIndex == 3){
        sounds[blackIndex+5].currentTime = 0;
        sounds[blackIndex+5].play();
        createBubble1(blackIndex);
    }
    if(blackIndex == 4){
        sounds[blackIndex+6].currentTime = 0;
        sounds[blackIndex+6].play();
        createBubble1(blackIndex);
    }
});
const createBubble = (index) =>{
    const ball = document.createElement("div");
    visual.appendChild(ball);
    ball.style.backgroundColor = colors[0];
    ball.style.animation = "jump 1s ease";
    ball.addEventListener('animationend', function(){
        visual.removeChild(ball);
    });
};
const createBubble1 = (index) =>{
    const ball = document.createElement("div");
    visual.appendChild(ball);
    ball.style.backgroundColor = colors[1];
    ball.style.animation = "jump 1s ease-in-out";
    ball.addEventListener('animationend', function(){
        visual.removeChild(ball);
    });
};
const chunks = [];

// We will set this to our MediaRecorder instance later.
let recorder = null;

// We'll save some html elements here once the page has loaded.
let audioElement = null;
let startButton = null;
let stopButton = null;

/**
 * Save a new chunk of audio.
 * @param  {MediaRecorderEvent} event 
 */
const saveChunkToRecording = (event) => {
    chunks.push(event.data);
};

/**
 * Save the recording as a data-url.
 * @return {[type]}       [description]
 */
const saveRecording = () => {
    const blob = new Blob(chunks, {
        type: 'audio/mp4; codecs=opus'
    });
    const url = URL.createObjectURL(blob);

    audioElement.setAttribute('src', url);
};

/**
 * Start recording.
 */
const startRecording = () => {
    recorder.start();
};

/**
 * Stop recording.
 */
const stopRecording = () => {
    recorder.stop();
};


// Wait until everything has loaded
(function() {
    audioElement = document.querySelector('.js-audio');
    startButton = document.querySelector('.js-start');
    stopButton = document.querySelector('.js-stop');
    
    // We'll get the user's audio input here.
    navigator.mediaDevices.getUserMedia({
        audio: true // We are only interested in the audio
    }).then(stream => {
        // Create a new MediaRecorder instance, and provide the audio-stream.
        recorder = new MediaRecorder(stream);

        // Set the recorder's eventhandlers
        recorder.ondataavailable = saveChunkToRecording;
        recorder.onstop = saveRecording;
    });

    // Add event listeners to the start and stop button
    startButton.addEventListener('mouseup', startRecording);
    stopButton.addEventListener('mouseup', stopRecording);
})();

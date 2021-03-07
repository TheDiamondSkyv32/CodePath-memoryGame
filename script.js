//global variables

const clueHoldTime = 1000; // how long to hold each clue's light/sound 
const cluePauseTime = 333; // interval to pause in-between clues
const nextClueWaitTime = 1550; // how long to wait before starting playback of the clue sequence

const Easy = 5;
const Medium = 8;
const Hard = 12;
const Very_Hard = 16;
const Extreme = 20;
const European_Extreme = 25;

var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var difficultySelected = false;
var currDifficulty = 0;
var speedModifier = 0.9;
var tempClueholdTime = 1;
var strikeCounter = 0;
var strikeLimit = 3;
var soundFileToPlay = "";


function startGame(){
  if (!difficultySelected){
    alert("Please select a difficulty first!");
    return;
  }
  
  progress = 0;
  gamePlaying = true;
  generatePattern(currDifficulty);
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame(){
  // the game variables
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  pattern = [];
  strikeCounter = 0;
  tempClueholdTime = 1;
  soundFileToPlay = "";
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost...");
}

function winGame(){
  stopGame();
  alert("Nice job. You won!");
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit");
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit");
}

function playSingleClue(btn){
  if(gamePlaying == true){
    tempClueholdTime = clueHoldTime*(speedModifier)**progress + 225; // change speed in-between clues
    lightButton(btn);
    
    //console.log(btn);
    //console.log(document.getElementById("button"+btn).value);
    testPlayAudio(document.getElementById("button"+btn).value);
    setTimeout(clearButton, tempClueholdTime, btn); //setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playSound(btn){
  if(gamePlaying == true){
      tempClueholdTime = clueHoldTime*(speedModifier)**progress + 225; // change speed in-between clues
      lightButton(btn);
      //playTone(btn, tempClueholdTime); // playTone(btn, clueHoldTime);
      setTimeout(clearButton, tempClueholdTime, btn); //setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; // set delay to initial wait time  
  for( let i = 0; i <= progress; i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime * (speedModifier)**progress + 200; // Giving at least 200 milliseconds 
    delay += cluePauseTime;
  }
}

function testPlayAudio(soundFile){
  // console.log(soundFile);
  // console.log(sound);
  document.getElementById(soundFile).playbackRate = 1 * (speedModifier)**progress;
  document.getElementById(soundFile).load();
  document.getElementById(soundFile).play();

}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  
  if (pattern[guessCounter] == btn){
    // Correct Guess: continue playing
    if (guessCounter == progress){
      // we've hit the end of the sequence, check for win 
      if (progress == pattern.length - 1){
        winGame();
      }
      else{
        progress++;
        soundFileToPlay = "";
        playClueSequence();
      }
    }else{
      guessCounter +=1;
      // Checks next guess, user has not guessed incorrectly yet
    }
  }else{
    strikeCounter += 1;
    if (strikeCounter == strikeLimit){
      alert("Game Over! You are out of guesses!");
      stopGame();
      return;
    }
    alert("Strike " + strikeCounter + "! " + "You have " + (strikeLimit-strikeCounter) + " strikes left!");
    soundFileToPlay = "";
    playClueSequence();
    // any incorrect guesses result in an instant loss
  }
}

function generatePattern(numPatterns){
  for( let i = 0; i < numPatterns; i++){
    pattern.push(Math.floor((Math.random() * 6) + 1));
  }
  console.log(pattern);
}

function alertDifficulty(difficulty){
  //console.log(difficulty);
  document.getElementById("current_difficulty").innerHTML = "Current Difficulty: " + difficulty;
  alert("You have selected the following difficulty: " + difficulty);
}

function setDifficulty(difficulty){
  currDifficulty = difficulty;
  difficultySelected = true;
  //console.log(currDifficulty);
}









/*
// No longer needed || outdated



// Sound synthesis functions
const freqMap = {
  1:  700.6,
  2:  740.6,
  3:  780.2,
  4:  820.2,
  5:  860.6,
  6:  900.9,
};


// Page initialization
// Init sound synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function playTone(btn, len){
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function(){
    stopTone();
  },len);
}

function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}

function stopTone(){
    g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
    tonePlaying = false;
}

function startSound(){
  context.resume();
  document.getElementById("startSoundbtn").classList.add("hidden");
  document.getElementById("stopSoundbtn").classList.remove("hidden");
}

function stopSound(){
  context.suspend();
  document.getElementById("startSoundbtn").classList.remove("hidden");
  document.getElementById("stopSoundbtn").classList.add("hidden");
}
*/
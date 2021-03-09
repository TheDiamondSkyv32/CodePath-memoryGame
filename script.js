
const clueHoldTime = 1000; // how long to hold each clue's light/sound 
const cluePauseTime = 100; // interval to pause in-between clues
const nextClueWaitTime = 1550; // how long to wait before starting playback of the clue sequence

// Num waves or levels for the difficulties
const Easy = 5;
const Medium = 8;
const Hard = 12;
const Very_Hard = 16;
const Extreme = 20;
const European_Extreme = 25;

var progress = 0; // how far we have progressed into the clue sequence; the 'level'
var guessCounter = 0;
var tempClueholdTime = 1; // temp variable for ClueHoldTime modification, default value 1
var strikeCounter = 0;
var strikeLimit = 3;    // max number of strikes allowed
var speedModifier = 1.05; // percent to modify speed after each-turn for PLAYBACK
var speedModifierClue = 0.95;
var currentSpeed = 1;

var gamePlaying = false;
var difficultySelected = false;

var currDifficulty = "";  // HTML sets this to a string when selected 
var winText =  "Nice job. You won!";
var loseText = "You are out of strikes! Game Over. You lose...";

var pattern = [];


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
  gamePlaying = false;
  pattern = [];
  strikeCounter = 0;
  tempClueholdTime = 1;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

function loseGame(){
  stopGame();
  loseGameAudio();
  setTimeout(alert, 500, loseText); // give sound time to play before alerting
}

function winGame(){
  stopGame();
  winGameAudio();
  setTimeout(alert, 1000, winText); 
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit");
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit");
}

function playSingleClue(btn){
  if(gamePlaying == true){
    tempClueholdTime = clueHoldTime*(speedModifierClue)**progress + 225; // change speed in-between clues
    lightButton(btn);
    playAudio(document.getElementById("button"+btn).value);
    setTimeout(clearButton, tempClueholdTime, btn); 
  }
}


function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; // set delay to initial wait time  
  for( let i = 0; i <= progress; i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // timeout to play clue
    delay += clueHoldTime * (speedModifierClue)**progress + 200; // 200 millisecond flat value ALWAYS 
    delay += cluePauseTime;
  }
}

function playAudio(soundFile){
  if(document.getElementById(soundFile).paused == false){
      document.getElementById(soundFile).load();
      document.getElementById(soundFile).playbackRate = currentSpeed;
      document.getElementById(soundFile).play();
  }
  else{
  document.getElementById(soundFile).playbackRate = 1 * (speedModifier)**progress; // modify audio speeds depending on speed modifier and progress
  currentSpeed = 1 * speedModifier**progress;
  document.getElementById(soundFile).play();
  }
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  
  if (pattern[guessCounter] == btn){ // Correct Guess: continue playing
    
    if (guessCounter == progress){  // guess was correct, check for win condition
      
      if (progress == pattern.length - 1){ // reaching the end == win
        winGame();
      }
      else{
        progress++;
        playClueSequence();
      }
    }else{
      guessCounter +=1;  // Update guessCounter to move onto next clue 
      
    }
  }else{
    strikeCounter += 1;  //user incorrectly guessed, check for loss condition
    if (strikeCounter == strikeLimit){ 
      loseGame();
      stopGame();
      return;
    }
    
    alert("Strike " + strikeCounter + "! " + "You have " + (strikeLimit-strikeCounter) + " strikes left!");  // user has strikeLimit guesses
    playClueSequence();
  }
}

function generatePattern(numPatterns){ // generates random pattern from 0-6 and shoves it inside pattern
  for( let i = 0; i < numPatterns; i++){
    pattern.push(Math.floor((Math.random() * 6) + 1));
  }
  console.log(pattern); // a little bonus for the user
}

function alertDifficulty(difficulty){
  document.getElementById("current_difficulty").innerHTML = "Current Difficulty: " + difficulty; // handles the HTML current difficulty 
  alert("You have selected the following difficulty: " + difficulty);
}

function setDifficulty(difficulty){
  currDifficulty = difficulty;
  difficultySelected = true;
}

function winGameAudio(){
  document.getElementById("winGameSound").load();
  document.getElementById("winGameSound").play();
}

function loseGameAudio(){
  document.getElementById("loseGameSound").load();
  document.getElementById("loseGameSound").play();
}


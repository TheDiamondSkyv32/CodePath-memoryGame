# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Doron Griffin-Tann

Time spent: 15.5 hours spent in total

Link to project: (https://glitch.com/edit/#!/global-proximal-anorak)

## Required Functionality

The following **required** functionality is complete:

[x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
[x] "Start" button toggles between "Start" and "Stop" when clicked. 
[x] Game buttons each light up and play a sound when clicked. 
[x] Computer plays back sequence of clues including sound and visual cue for each button
[x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
[x] User wins the game after guessing a complete pattern
[x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!

## Video Walkthrough

Here's a walkthrough of implemented user stories:
<br><img src="http://g.recordit.co/2aI1PINT79.gif" width=1200, height=800>

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

https://www.w3schools.com/js/js_random.asp

https://stackoverflow.com/questions/16025138/call-two-functions-from-same-onclick

https://www.w3schools.com/js/js_htmldom_html.asp

https://www.w3schools.com/cssref/pr_background-image.asp

https://minecraft.gamepedia.com/Sound

https://www.w3schools.com/tags/av_met_load.asp

https://www.w3schools.com/cssref/pr_text_text-decoration.asp

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)

I've faced quite a bit of problems in creating this submission.  Having little or barely any experience in CSS, HTML, and Javascript, the first few hours were purely following the CodePath guide while trying to understand the key concepts rather than blindly copying the code.  

One challenge that I faced was the optional feature "Game button sound is more complex than a single tone" and most likely single handedly occupied most of my time trying to debug and fix.  The problem was that on starting the game and playing the clue sequence, the function that I created that is responsible was trying to access a null property that I was certain that I had set in other functions.  Turns out,the code I was assuming worked and giving correct results was NOT activating at all in the manner that I assumed.  Instead, the code only ran when the user actively clicked the images but not when the computer selected the images.  To first find the problem, I placed numerous console.log print statements to check the variables and what values they were holding and figured out the reason some variables were printing null is because when calling document.getElementById(soundFile), it wasn't looking at the proper variable and looking back earlier in my code, I passed in an Id like getElementById("btn"+btn) whereas my new code didn't have this type of variable passed in the parameters.  By adding test values into the button id and successfully retrieving them, I was able to point the code in the right direction which solved the null variable problem and let my code work as expected.  


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
On a scale from one to ten, how would this submission pale in comparison to other web projects (a one being barely, and a ten being heavily)?  For me, this project was more so learning the languages presented while also trying to actively create something during the learning process.  I feel that I overcome the learning curve, this project became much more fluid and I spent less and less time in a stump because I had an idea of what I needed and where it would be located.It's a similar feeling to a mechanic looking at his toolbox filled to the brim with tools—to the untrained/ignorant eye, it seems overwhelming and confusing but to the mechanic, he knows what each tool's purpose is and precisely the one he's looking for.  Rather than seeing 30 plus tools all at once, he sees individual tools.  Another question I have is does learning web development get harder from this point on or remain stagnant in difficulty (or becoming even easier)?  The learning curve I experienced was not too entirely rough and was actually enjoyable at times.  The only truly difficult portion was debugging code which had a very simple solution once you traced the function calls and variables to see what was holding me up.  


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
If I had a few more hours to work on this project, I would most likely add in the clock feature that limits how much time the user has to answer and cleaning up the code.  This being my first real delve into Javascript, HTML, and CSS, I know for certain that in my code, some solutions that I used could be implemented more clearly and effectively so as not to unnecessarily take CPU cycles.  For the clock feature, it was not a priority task to be implemented for me because my submission is such that as the game naturally goes on, it becomes much, much more difficult due to increased memorization requires, faster clue sequences, and less time to hear the clues.  Forcing the user to make a make would be a bit overkill, in my opinion, but it definitely can be a feature that I add in the future with an option to toggle it on or off.The last feature that I would implement given more time is a button or a slider that adjusts the clue playback speed.  My way of thinking about this is if a user becomes very adept with my game, they would want to spend less time agonizing at the beginning just to get to the harder, faster portion of the game and with potentially less guesses.  With the option to change the clue playback speed from the beginning, it truly allows the user to play as they see fit and their own skill level.  



## License

    Copyright Doron Griffin-Tann

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

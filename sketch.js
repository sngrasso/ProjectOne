/*************************************************************************
    (*)iSpy - and Interactive State Machine Game
          (*)by Stephanie Grasso

    (*)Overview - small follow your own adventure state machine game with 
    a lean toward understanding digital safety online. 
 
    ---------------------------------------------------------------------
    (*)Notes: 
     (1) Really long code base
     (2) could be better optimized in some areas
     (3) extended feature - secret character after collecting all tips
**************************************************************************/
//globals
var drawFunction;
var timer;

// asset arrays
var assets = ['computer.png', 'muffin.png', 'street.jpg', 'roco.png', 'doors.png',
              'phone.png', 'duck.png', 'train.jpg', 'backdoor.png', 'gold.png',
              'silver.png', 'bronze.png', 'virus.png', 'front.png'];
var instructions = [];
var images = [];

// dialogue box placement settings 
var dialogueBoxPadding = 50;
var dialogueBoxOffset = 350;
var dialogueBoxRadius = 5;

var dialogueTextSet = dialogueBoxPadding + 50;
var dialogueTextY = dialogueBoxOffset + 150;

// roco placement settings
var rocoOffsetX = 800;
var rocoOffsetY = 600;

// speech box placement settings 
var speechBoxX = 50;
var speechBoxY = 50;
var speechBoxSizeW = 550;
var speechBoxSizeH = 650;

// universal padding convention
var padding = 100;

// variables for tracking certain states
var dailTracker = 0;
var dailTrackerMax = 4;
var spamDoor = 0;
var spamDoorMax = 4;
var spamVirus = 0;
var spamVirusMax = 30;
var virus = 0; 

// health bar states
var healthBarW = 500;
var healthBarH = 35;

// keypad placement
var keypadMinX = 750;
var keypadMaxX = 800;

var keypadMinY = 247;
var keypadMaxY = 300;

// station area
var stationMinX = 325;
var stationMaxX = 675;

var stationMinY = 45;
var stationMaxY = 395;


// preload function for loading our images and instructions
function preload() {
    var i;
    for (var i = 0; i < assets.length; i++) {
        images[i] = loadImage('assets/' + assets[i]);
    }
    instructions = loadStrings("instructions.txt");
    print(instructions)
}

// Setup code goes here
function setup() {

    let cnv = createCanvas(1000, 800);
    cnv.position(width / 4, 0);

    textSize(30);
    textAlign(CENTER);
    imageMode(CENTER);

    timer = new Timer(8000);

    drawFunction = drawWelcome;

    print("setting up sketch");
}

// Draw code goes here
function draw() {

    background(186, 207, 255);
    drawFunction();

}

//========= Start of all Function variable blocks, In chronological numerical order =========

// Welcome Screen
drawWelcome = function () {
    drawFrontBox();
    textAlign(CENTER);
    textSize(80)
    text("iSPY", width / 2, padding * 3);
    textSize(30);
    text("Press [SPACE] to start", width / 2, height / 2);
}

// Instruction Screen
drawInstructions = function () {
    fill(255);
    noStroke();
    textAlign(CENTER);
    // image of ROCO
    image(images[3], rocoOffsetX, rocoOffsetY);

    // set speech bubble
    rect(speechBoxX, speechBoxY, speechBoxSizeW, speechBoxSizeH, 10);

    // add all instruction text
    textSize(20);
    fill("blue")
    textAlign(LEFT);
    for (var i = 0; i < instructions.length - 1; i++) {
        text(instructions[i], speechBoxX + 10, (30 * i) + padding)
    }
    textSize(30);
    textAlign(RIGHT);
}

///***ALL ROOM ONE RELATED FUNCTIONS (INCLUDES ALT)***///

// Room One - choice based question 
drawRoomOne = function () {
    image(images[1], width / 2, height / 4 + padding);
    universalFormat();

    text("On the way to the checkpoint you bump into a stranger\n" +
        "They ask very PERSONAL questions about your work...\n\n" +
        "(1) do not trust them\n\n(2) give them your information", dialogueTextSet, dialogueTextY);

    fill("blue");
    text("Digi Tip - (T)\n", padding / 2, padding / 2);
}

// Room One [ALT] - linear based question 
drawRoomOneAlt = function () {
    image(images[7], width / 2, 220);
    universalFormat();

    text("Bad Idea! The CAT from before has now started running after\n" +
        "you. Hide in the nearest public station to get them off our tail\n\n" +
        "[Click on station]", dialogueTextSet, dialogueTextY);

    fill("blue");
    text("Digi Tip - (T)\n", padding / 2, padding / 2);
}

// Hint -> Room One: Don't trust strangers with your private information
drawHintOne = function () {
    image(images[1], width / 2, height / 4 + padding);
    universalFormat();

    text("Never give away your personal information to strangers!\n" +
        "especially to strangers online\n\n(B) for back", dialogueTextSet, dialogueTextY);
}

// Hint -> Room One[A:T]: Block people who are giving you a hard time
drawHintOneAlt = function () {
    image(images[7], width / 2, 220);
    universalFormat();

    text("If someone online is constantly following you or harassing\n" +
        "you and won't stop, BLOCK them! If they keep coming\n" +
        "back tell a trusted adult about it to take action.\n\n(B) for back", dialogueTextSet, dialogueTextY);
}

///***ALL ROOM 2 RELATED FUNCTIONS (INCLUDES ALT)***///

// Room Two - choice based question 
drawRoomTwo = function () {
    image(images[1], width / 2, height / 4 + padding);
    universalFormat();

    text("Your suspisions were correct...turns out ITS AN ENEMY SPY!!!\n" +
        "Quick take action!\n\n" +
        "(1) Call the agency for backup\n\n(2) do nothing", dialogueTextSet, dialogueTextY);

    fill("blue");
    text("Digi Tip - (T)\n", 50, 50);
}

// Hint -> Room Two: importance of calling for help
drawHintTwo = function () {
    image(images[1], width / 2, height / 4 + padding);
    universalFormat();

    text("If someone online makes you uncomfortable call an adult\n" + 
        "and talk to them about how you feel.\n\n(B) for back", dialogueTextSet, dialogueTextY);
}

// Room Two (Task) - click to call number on phone
drawDailPhone = function () {
    image(images[5], width / 2, height / 2);

    if (dailTracker >= dailTrackerMax) {
        dailTracker = 0;
        drawFunction = drawRoomThree;
    }

    text("dial (click) the buttons on the phone to call for backup (4 times)", padding, padding / 2);
}

// Room Two [ALT] - linear choice question
drawRoomTwoAlt = function () {
    image(images[6], width / 2, height / 4 + padding);
    universalFormat();

    text("Look! It's DUCK a senior agent from the agency!\n" +
        "It looks like they're here to help rescue you!\n" +
        "Follow them to get back on track.\n\n(1) Follow them", dialogueTextSet, dialogueTextY);
}

///***ALL ROOM 3 RELATED FUNCTIONS (INCLUDES ALT)***///

// Room Three (Task) - scan key card over key pad
drawRoomThree = function () {
    image(images[4], width / 2, height / 4 + padding);
    rect(mouseX - 25, mouseY - 25, 75, 50, 5);
    universalFormat();

    text("Luckily Backup was able to come in on time.\n" +
        "And we were able to escape. Let's use this ID\n" +
        "we stole from CAT and get inside the enemy base\n\n" +
        "[Hover the ID card over the keypad]\n", dialogueTextSet, dialogueTextY);

    if ((mouseX >= keypadMinX && mouseX <= keypadMaxX) && (mouseY >= keypadMinY && mouseY <= keypadMaxY)) {
        drawFunction = drawRoomFour;
    }
}

// Room Three (Task) [ALT] - Spamming keys to break doors
drawRoomThreeAlt = function () {
    image(images[8], width / 2, height / 4 + padding);
    universalFormat();

    // health bar
    rect(padding * 2.5, padding / 4, healthBarW, healthBarH);
    fill("red");
    rect(padding * 2.5, padding / 4, healthBarW - (spamDoor * padding), healthBarH);
    fill(255);

    text("DUCK takes you to the back door of the enemy spy's building.\n" +
        "The door seems weak lets kick it in the get inside!!\n\n" +
        "(B) keep clicking 'B' until the door opens\n", dialogueTextSet, dialogueTextY);

    text("\tHealth:\n", padding, padding / 2);
}

///***ALL ROOM FOUR RELATED FUNCTIONS (INCLUDES ALT)***///

// Room Four - choice based question 
drawRoomFour = function () {
    image(images[0], width / 2, height / 4);
    universalFormat();

    text("Phew! Almost got the file. Now we need to choose a STRONG\n" +
        "password to finish the download.\n\n" +
        "(1) 12345\n\n(2) JsdD3*!", dialogueTextSet, dialogueTextY);

    fill("blue");
    text("Digi Tip - (T)\n", padding / 2, padding / 2);
}

// Room Four [ALT] - linear choice based question
drawRoomFourAlt = function () {
    image(images[0], width / 2, height / 4);
    universalFormat();

    text("Phew! We've almost got what we need. But Oh No! We\n" +
        "forgot the name of the file. Now we'll have to download files\n" +
        "at random. This could crash the system are you sure??\n\n" +
        "(1) I'm Sure", dialogueTextSet, dialogueTextY);

    fill("blue");
    text("Digi Tip - (T)\n", padding / 2, padding / 2);
}

// Hint -> Room Four: Password Strength and Safe Keeping
drawHintFour = function () {
    image(images[0], width / 2, height / 4);
    universalFormat();

    text("When making passwords make them unique but memorable!\n" +
        "Remember to save your passwords in a safe place and\n" +
        "never share them with other people outside of\n" +
        "family members that you trust.\n\n(B) for back", dialogueTextSet, dialogueTextY);
}

// Hint -> Room Four[ALT]: Caution Downloading files from the internet, Virus Awareness
drawHintFourAlt = function () {
    image(images[0], width / 2, height / 4);
    universalFormat();

    text("Ask permission before downloading unknown files from\n" +
        "off the internet. You could end up infecting your computer\n" +
        "with a virus!!\n\n(B) for back", dialogueTextSet, dialogueTextY);
}

///***FIFTH ROOM (ALT ONLY)***///

// Room Five (Task) [ALT] - Spamming key under the time limit
drawRoomFiveAlt = function () {
    // animation
    push();
    rectMode(CENTER);
    translate(width/2, height/2);
    rotate(virus);
    image(images[12], 0, 0);
    pop();

    // update rotate
    virus = virus + (spamVirus/200);

    // related text for task     
    text("[Spam X]", padding - 50, padding * 2);
    text("# hits: " + spamVirus, width / 2 - 60, padding * 1.5);
    text("Time Remaining: " + Math.round(timer.getRemainingTime()), width / 2 + padding, padding * 1.5);
    textSize(40);
    fill("blue");
    text("KILL THE VIRUS!!!", padding - 50, padding * 1.5);
    fill(255);
    textSize(30);

    // checks end result of task
    if (spamVirus < spamVirusMax && timer.expired()) {
        drawFunction = drawGameOver;
    } 
    else if (spamVirus >= spamVirusMax && timer.expired()) {
        drawFunction = drawOkayRoom;
    }
}

///*****FINAL ENDING ROOMS*****///

// First Ending -- Best Ending
drawFinalRoom = function () {
    image(images[9], width / 2, height / 4);
    universalFormat();

    text("NICE WORK Junior Agent now we have all of the SUPER \n" +
        "SECRET FILES all thanks to you!!!!\n\n" +
        "(Y) Restart game\n\n(N) Return to Home", dialogueTextSet, dialogueTextY);
}

// Second Ending -- Nice Ending
drawOkayRoom = function () {
    image(images[10], width / 2, height / 4);
    universalFormat();

    text("Not too shabby Junior Agent! Now we have some of the\n" +
        "SECRET FILES. Thanks for the help!\n\n" +
        "(Y) Restart game\n\n(N) Return to Home", dialogueTextSet, dialogueTextY);
}

// Third Ending -- Worst Ending
drawGameOver = function () {
    image(images[11], width / 2, height / 4);
    universalFormat();

    text("It's okay Junior Agent... We all messup sometimes\n" +
        "Would you like to try again?\n" +
        "(Y) Restart game\n\n(N) Return to Home", dialogueTextSet, dialogueTextY);
}
//========= End of all Function variable blocks, In chronological numerical order =========

// keyTyped() -- handles all user keyboard input which desides which room 
//               user needs to be taken to next. 
function keyTyped() {

    ///*****MAIN ROOMS*****///
    // HOME SCREEN //
    if (drawFunction == drawWelcome) {
        if (key == ' ') {
            drawFunction = drawInstructions;
        }
        return;
    }

    // INTRO SCREEN //
    if (drawFunction == drawInstructions) {
        endingTracker = 0;
        if (key == ' ') {
            drawFunction = drawRoomOne;
        }
        return;
    }

    ///*****MAIN ROOMS*****///

    // MAIN ROOM ONE //
    if (drawFunction == drawRoomOne) {
        switch (key) {
            case '1':
                drawFunction = drawRoomTwo;
                break;
            case '2':
                endingTracker = endingTracker + 1;
                drawFunction = drawRoomOneAlt;
                break;
            case 'T':
            case 't':
                drawFunction = drawHintOne;
                break;
        }
        return;
    }

    // HINT 1 SCREEN //
    if (drawFunction == drawHintOne) {

        switch (key) {
            case 'B':
            case 'b':
                drawFunction = drawRoomOne;
                break;
        }

        return;
    }

    // MAIN ROOM TWO //
    if (drawFunction == drawRoomTwo) {

        switch (key) {
            case '1':
                drawFunction = drawDailPhone;
                break;
            case '2':
                drawFunction = drawRoomOneAlt;
                break;
            case 'T':
            case 't':
                drawFunction = drawHintTwo;
                break;
        }

        return;
    }

    // HINT 2 SCREEN //
    if (drawFunction == drawHintTwo) {

        switch (key) {
            case 'B':
            case 'b':
                drawFunction = drawRoomTwo;
                break;
        }

        return;
    }

    // MAIN ROOM FOUR //
    if (drawFunction == drawRoomFour) {
        switch (key) {
            case '1':
                drawFunction = drawOkayRoom;
                break;
            case '2':
                drawFunction = drawFinalRoom;
                break;
            case 'T':
            case 't':
                drawFunction = drawHintFour;
                break;

        }
        return;
    }

    // HINT 4 SCREEN //
    if (drawFunction == drawHintFour) {

        switch (key) {
            case 'B':
            case 'b':
                drawFunction = drawRoomFour;
                break;
        }

        return;
    }

    ///*****ALT ROOMS*****///

    // ALT ROOM ONE //
    if (drawFunction == drawRoomOneAlt) {

        switch (key) {
            case 'T':
            case 't':
                drawFunction = drawHintOneAlt;
                break;
        }

        return;
    }

    // HINT 1 SCREEN //
    if (drawFunction == drawHintOneAlt) {

        switch (key) {
            case 'B':
            case 'b':
                drawFunction = drawRoomOneAlt;
                break;
        }

        return;
    }

    // ALT ROOM TWO //
    if (drawFunction == drawRoomTwoAlt) {

        switch (key) {
            case '1':
                drawFunction = drawRoomThreeAlt;
                break;
        }

        return;
    }

    // ALT ROOM THREE //
    if (drawFunction == drawRoomThreeAlt) {
        // spamming 'b' to break door
        switch (key) {
            case 'B':
            case 'b':
                spamDoor = spamDoor + 1;
                break;
        }
        // if door reaches max spams go to next room
        if (spamDoor > spamDoorMax) {
            spamDoor = 0;
            drawFunction = drawRoomFourAlt;
        }

        return;
    }

    // ALT ROOM FOUR //
    if (drawFunction == drawRoomFourAlt) {

        switch (key) {
            case '1':
                drawFunction = drawRoomFiveAlt;
                spamVirus = 0;
                timer.start();
                break;
            case 'T':
            case 't':
                drawFunction = drawHintFourAlt;
                break;
        }

        return;
    }

    // HINT 4 ALT SCREEN //
    if (drawFunction == drawHintFourAlt) {

        switch (key) {
            case 'B':
            case 'b':
                drawFunction = drawRoomFourAlt;
                break;
        }

        return;
    }

    // ALT ROOM 5 //
    if (drawFunction == drawRoomFiveAlt) {

        switch (key) {
            case 'X':
            case 'x':
                spamVirus = spamVirus + 1;
                break;
        }

        return;
    }

    ///*****FINAL ROOMS*****///

    // FINAL ROOM //
    if (drawFunction == drawFinalRoom || drawFunction == drawOkayRoom || drawFunction == drawGameOver) {

        switch (key) {
            case 'Y':
            case 'y':
                drawFunction = drawInstructions;
                break;
            case 'N':
            case 'n':
                drawFunction = drawWelcome;
                break;
        }

        return;
    }
}

function mousePressed() {
    // DIAL ROOM //
    if (drawFunction == drawDailPhone) {
        if (dailTracker < dailTrackerMax) {
            dailTracker = dailTracker + 1;
            return;
        }
    }

    // ROOM ONE ALT //
    if (drawFunction == drawRoomOneAlt) {
        if ((mouseX >= stationMinX && mouseX <= stationMaxX) && (mouseY >= stationMinY && mouseY <= stationMaxY)) {
            drawFunction = drawRoomTwoAlt;
        }
    }
}

// dialogueBox() -- draws the dialogue Box for each page //
function dialogueBox() {
    fill(72, 67, 204);
    rect(dialogueBoxPadding, height - dialogueBoxOffset, width - padding, padding * 3, dialogueBoxRadius);
}

// universalFormat() -- formatting universal to several function calls //
function universalFormat() {
    dialogueBox();
    fill(255);
    noStroke();
    textAlign(LEFT);
}

function drawFrontBox() {
    rectMode(CENTER);
    fill(255);
    rect(width/2, height/2 - padding, padding * 5, padding * 3.5, 5);
    fill(194, 206, 255);
    rect(width/2, height/2 - padding, padding * 4.5, padding * 3, 5);
    fill(255);
    rectMode(CORNER);
}

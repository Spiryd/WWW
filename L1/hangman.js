//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const restartButton = document.getElementById("restart-game-button")
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let words = [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
    "Hedgehog", 
    "Rhinoceros", 
    "Squirrel", 
    "Panther", 
    "Walrus", 
    "Zebra",
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Dominica",
];

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Block all the Buttons
const blocker = () => {
    let letterButtons = document.querySelectorAll(".letters");
    //disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = () => {
    //initially hide letters, clear previous word
    userInputSection.innerText = "";

    //choose random word
    chosenWord = words[Math.floor(Math.random() * words.length)];
    chosenWord = chosenWord.toUpperCase();

    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    //Display each element as span
    userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    winCount = 0;
    count = 0;
    //Initially erase all content and hide letteres and new game button
    userInputSection.innerHTML = "";
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    generateWord();

    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //character button click
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            //if array contains clciked value replace the matched dash with letter else dram on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    //if character in array is same as clicked button
                    if (char === button.innerText) {
                        //replace dash with letter
                        dashes[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        //if winCount equals word lenfth
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            //block all buttons
                            blocker();
                        }
                    }
                });
            } else {
                //lose count
                count += 1;
                //for drawing man
                drawMan(count);
                //Count==6 because head,body,left arm, right arm,left leg,right leg
                if (count == 10) {
                    resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            //disable clicked button
            button.disabled = true;
        });
        letterContainer.append(button);
    }

    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
};

//Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    const gallows1 = () => {
        drawLine(10, 130, 130, 130);
    };

    const gallows2 = () => {
        drawLine(10, 10, 10, 131);
    };

    const gallows3 = () => {
        drawLine(10, 10, 70, 10);
    };

    const gallows4 = () => {
        drawLine(70, 10, 70, 20);
    };

    //clear frame
    const initialDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };

    return { initialDrawing, gallows1, gallows2, gallows3, gallows4, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
    let {gallows1, gallows2, gallows3, gallows4, head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            gallows1();
            break;
        case 2:
            gallows2();
            break;
        case 3:
            gallows3();
            break;
        case 4:
            gallows4();
            break;
        case 5:
            head();
            break;
        case 6:
            body();
            break;
        case 7:
            leftArm();
            break;
        case 8:
            rightArm();
            break;
        case 9:
            leftLeg();
            break;
        case 10:
            rightLeg();
            break;
        default:
            break;
    }
};

//New Game
newGameButton.addEventListener("click", initializer);
restartButton.addEventListener("click", initializer);
window.onload = initializer;
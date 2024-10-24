console.log("Script Running");

// Object to hold horse data
let horses = {
    blue: {
        position: 1,
        button: document.querySelector("#blue-button"),
        horse: document.querySelector("#blue-horse"),
    },
    pink: {
        position: 1,
        button: document.querySelector("#pink-button"),
        horse: document.querySelector("#pink-horse"),
    },
    brown: {
        position: 1,
        button: document.querySelector("#brown-button"),
        horse: document.querySelector("#brown-horse"),
    },
};

const winnerDiv = document.querySelector("#winner");
const restartButton = document.createElement("button");
restartButton.innerHTML = "Restart Game";
restartButton.id = "restart-button";
restartButton.style.display = "none"; // Initially hide the restart button
document.body.insertBefore(restartButton, document.querySelector(".container"));

const changePosition = (horse, position) => {
    horse.style.setProperty('grid-column', position);
};

// Advance function for all horses
const advance = (e) => {
    const color = e.target.value;
    horses[color].position += 1;
    changePosition(horses[color].horse, horses[color].position);
    horses[color].horse.alt = `${color} horse at position ${horses[color].position} out of 5`; // Update alt text
    checkWinner(horses[color].position, color);
};

// Check for a winner
const checkWinner = (position, color) => {
    if (position === 5) {
        winnerDiv.innerHTML = `${color.charAt(0).toUpperCase() + color.slice(1)} is the Winner!`;
        winnerDiv.style.backgroundColor = color; // Set background color of winner
        disableAllButtons();
        restartButton.style.display = "block"; // Show the restart button
    }
};

// Disable all buttons
const disableAllButtons = () => {
    Object.values(horses).forEach(horse => {
        horse.button.disabled = true;
    });
};

// Restart the game
const restartGame = () => {
    Object.values(horses).forEach(horse => {
        horse.position = 1; // Reset position
        changePosition(horse.horse, horse.position); // Reset horse position in UI
        horse.button.disabled = false; // Re-enable buttons
    });
    winnerDiv.innerHTML = ""; // Clear winner message
    winnerDiv.style.backgroundColor = ""; // Reset background color
    restartButton.style.display = "none"; // Hide restart button
};

// Generate random number and display it
const stepsButton = document.createElement("button");
stepsButton.innerHTML = "Steps";
document.body.insertBefore(stepsButton, document.querySelector(".container"));
const stepsDiv = document.createElement("div");
stepsDiv.id = "steps";
document.body.insertBefore(stepsDiv, document.querySelector(".container"));

stepsButton.addEventListener("click", () => {
    let randomNumber = Math.floor(Math.random() * 3);
    stepsDiv.innerHTML = randomNumber;
});

// Event listeners for the horses
Object.values(horses).forEach(horse => {
    horse.button.addEventListener("click", advance);
});

// Event listener for the restart button
restartButton.addEventListener("click", restartGame);

// Generate color for chosen horse
const colorButton = document.createElement("button");
colorButton.innerHTML = "Color";
document.body.insertBefore(colorButton, document.querySelector(".container"));
const chosenHorseDiv = document.createElement("div");
chosenHorseDiv.id = "chosen-horse";
document.body.insertBefore(chosenHorseDiv, document.querySelector(".container"));

colorButton.addEventListener("click", () => {
    const randomColorIndex = Math.floor(Math.random() * 3);
    const colors = ["blue", "pink", "brown"];
    chosenHorseDiv.innerHTML = colors[randomColorIndex].charAt(0).toUpperCase() + colors[randomColorIndex].slice(1);
});

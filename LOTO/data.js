let playersNumbers = []; // Definicija playersNumbers

document.addEventListener("DOMContentLoaded", function() {
    document.body.style.backgroundImage = "url(cover.jpg)";
    document.body.style.backgroundSize = "cover";
    generateNumberImages();
    document.getElementById("startButton").style.display = "none";
    document.getElementById("startButton").addEventListener("click", function() {
        startPrint(playersNumbers); 
    });
    document.getElementById("restartButton").addEventListener("click", restartPrint);
});

function generateNumberImages() {
    let numbersContainer = document.createElement("div");
    numbersContainer.id = "numberContainer";
    document.getElementById("container").appendChild(numbersContainer);

    for (let i = 1; i <= 39; i++) {
        let img = document.createElement("img");
        img.src = "img/" + i + ".png";
        img.classList.add("number-image");
        img.dataset.number = i;
        numbersContainer.appendChild(img);

        img.addEventListener("click", function() {
            toggleNumber(this.dataset.number);
        });
    }
}

function toggleNumber(number) {
    let index = playersNumbers.indexOf(number);
    if (index === -1) {
        if (playersNumbers.length < 7) {
            playersNumbers.push(number);
            displaySelectedNumbers();
        }
    } else {
        playersNumbers.splice(index, 1);
        displaySelectedNumbers();
    }
}

function displaySelectedNumbers() {
    let selectedNumbersElement = document.getElementById("selectedNumbers");
    selectedNumbersElement.innerHTML = "";
    playersNumbers.forEach(number => {
        let img = document.createElement("img");
        img.src = "img/" + number + ".png";
        img.classList.add("selected-number");
        img.dataset.number = number;
        selectedNumbersElement.appendChild(img);
    });
    if (playersNumbers.length === 7) {
        document.getElementById("startButton").style.display = "block";
        document.getElementById("numberContainer").style.display = "none";
    } else {
        document.getElementById("startButton").style.display = "none";
        document.getElementById("numberContainer").style.display = "flex";
    }
}

function startPrint(playersNumbers) {       
    let guessedNumbers = 0;

    if (!Array.isArray(playersNumbers)) {
        playersNumbers = [];
    }

    let numeration = 0;
    let drawnNumbers = [];

    function print() {
        if (numeration < 7) { // Završavamo izvlačenje nakon 7 brojeva
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 39) + 1;
            } while (drawnNumbers.includes(randomNumber));
            drawnNumbers.push(randomNumber);

            let imgUrl = "img/" + randomNumber + ".png";

            let image = new Image();
            image.src = imgUrl;
            image.classList.add("image");

            document.getElementById("printNumber").innerHTML = "";
            document.getElementById("printNumber").appendChild(image);

            if (playersNumbers.includes(randomNumber)) {
                guessedNumbers++;
            }

            image.onload = function () {
                image.style.display = "block";
                document.getElementById("allNumbers").appendChild(image.cloneNode(true));

                if (++numeration == 7) {
                    showRestartButton();
                    setTimeout(function() {
                        alert("You guessed " + guessedNumbers + " selected numbers.");
                    }, 100);
                } else {
                    setTimeout(print, 1000);
                }
            };
        }
    }

    function showRestartButton() {
        document.getElementById("restartButton").style.display = "block";
    }

    numeration = 0;
    drawnNumbers = [];
    guessedNumbers = 0;
    document.getElementById("startButton").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("allNumbers").innerHTML = "";
    print();
}

function restartPrint() {
    document.getElementById("startButton").style.display = "block";
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("allNumbers").innerHTML = "";
    numeration = 0;
    document.getElementById("printNumber").innerHTML = "";
    drawnNumbers = []; 
}


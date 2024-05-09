let playersNumbers; 
document.addEventListener("DOMContentLoaded", function() {
    document.body.style.backgroundImage = "url(cover.jpg)";
    document.body.style.backgroundSize = "cover";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("startButton").addEventListener("click", function() {
        startPrint(playersNumbers); 
    });
    document.getElementById("restartButton").addEventListener("click", restartPrint);
    document.getElementById("confirmButton").addEventListener("click", confirmNumbers);
});

function confirmNumbers() {
    let numbersInput = document.getElementById("numbers").value;    
    let numbers = numbersInput.split(",").map(number => parseInt(number.trim()));
    
    if (numbers.length !== 7) {
        alert("You must enter exactly 7 numbers.");
        return;
    }

    for (let number of numbers) {
        if (isNaN(number) || number < 1 || number > 39) {
            alert("All numbers entered must be in the range 1 to 39.");
            return;
        }
    }

    playersNumbers = numbers;

    document.getElementById("selectionOfNumbers").innerHTML = "Selected numbers: " + numbers.join(", ");
    document.getElementById("startButton").style.display = "block";
        
}


function startPrint(playersNumbers) {       
    let numbers = [];
    let guessedNumbers = [];

    if (!Array.isArray(playersNumbers)) {
        playersNumbers = [];
    }


    if (numbers.length === 0) {
        for (let i = 0; i < 7; i++) {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 39) + 1;
            } while (numbers.includes(randomNumber));
            numbers.push(randomNumber);
        }
    }

    let numeration = 0;
        
    for (let i = 1; i <= 39; i++) {
        numbers.push(i);
    }

    function print() {
        if (numeration < numbers.length) {
            let randomNumeration = Math.floor(Math.random() * numbers.length);
            let pulledOut = numbers.splice(randomNumeration, 1)[0];

            let imgUrl = "img/" + pulledOut + ".png";

            let image = new Image();
            image.src = imgUrl;
            image.classList.add("image");

            document.getElementById("printNumber").innerHTML = "";
            document.getElementById("printNumber").appendChild(image);

            if (playersNumbers.includes(pulledOut)) {
                guessedNumbers.push(pulledOut);
            }

            image.onload = function () {
                image.style.display = "block";
                document.getElementById("allNumbers").appendChild(image.cloneNode(true));

                if (++numeration == 7) {
                    showRestartButton();
                    setTimeout(function() {
                        alert("You guessed it " + guessedNumbers.length + " selected numbers.");
                    }, 100);
                   } 
                else {
                    setTimeout(print, 1000);
                }
                                                
            };
        }
    }

    function showRestartButton() {
        document.getElementById("restartButton").style.display = "block";
    }

    numeration = 0;
    guessedNumbers = [];
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
}
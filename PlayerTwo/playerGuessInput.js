const answer = "Cat"
var lives = 5

const isCorrectGuess = () => {
    const userGuess = String(document.getElementById("guess-entry").value)
    console.log(userGuess)

    if(lives == 0) {
        alert("You've run out of lives :(")
        return
    }

    if (!userGuess) {
        document.getElementById("input-result").innerHTML = "Make sure you input a guess before pressing submit"
    } else if((userGuess.toLowerCase()).includes(answer.toLowerCase())) {
        document.getElementById("input-result").innerHTML = "correct!"
        displayPreviousGuesses(userGuess)
    } else {
        document.getElementById("input-result").innerHTML = "incorrect"
        lives -= 1
        displayLivesRemaining()
        displayPreviousGuesses(userGuess)
    }
}

const displayPreviousGuesses = (lastGuess) => {
    if(!lastGuess) {
        return
    } else {
        var newGuessItem = document.createElement("li")
        newGuessItem.appendChild(document.createTextNode(lastGuess))

        document.getElementById("previous-guesses").appendChild(newGuessItem)
    }
}

const displayLivesRemaining = () => {
    document.getElementById('lives').innerHTML = "lives: " + lives
}
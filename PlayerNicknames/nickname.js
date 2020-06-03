const validateNickname = () => {
    // this checks that there is at least one character a-z and no special characters
    const acceptedNickame = /(?!.*[!@?£$%^&*();:'",.<>])[a-z]+/i


    const nickname = document.getElementById("nickname").value
    console.log(nickname)
    document.getElementById("nickname").innerHTML = ""

    if (acceptedNickame.test(nickname)) {
        console.log("valid")
        document.getElementById("input-result").innerHTML = "Valid nickname"
    } else {
        document.getElementById("input-result").innerHTML = "Invalid nickname, please make sure you have at least one letter in your nickname"
    }


}
var timer;
var timerDuration = 30; // player currently has 30 seconds to guess :)

// this is a really simple eample of using a web worker
// normally web workers should be used for actions that need a lot of proccessing in the CPU
// webworkers can eecute most things in js except for changing DOM elements or accessing the "window" object

timer = setInterval(() => {

    postMessage(timerDuration);


    if (timerDuration == 0) {

        stopTimer();

    } else {

        timerDuration -= 1;
    }

}, 1000)

const stopTimer = () => {
    clearInterval(timer);
}





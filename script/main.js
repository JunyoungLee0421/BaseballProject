pvpBtnHandler = function(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href="./pvp_menu.html"
        } else {
            window.location.href = "./login.html"
        }
    })
}

instructionBtnHandler = function(){
    window.location.href="./instruction.html"
}

practiceBtnHandler = function(){
    window.location.href="./practice.html"
}

setup = function(){
    console.log("mainpage")
}

$(document).ready(setup);
createRoomBtn = function(){
    window.location.href = "pvp_create_room.html"
}

setup = function(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // do something
            console.log(user.uid)
        } else {
            window.location.href = "./login.html"
        }
    })
    console.log("pvp_menu.js")
}

$(document).ready(setup);
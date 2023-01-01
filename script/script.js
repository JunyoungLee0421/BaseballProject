logout = function(){
    const auth = firebase.auth();
    auth.signOut()
        .then(() => {
            window.location.assign("main.html");
        })
        .catch((error) => {
            console.log("An error happened:" + error)
        })
}

setup = function(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user){
            $("#login_Btn").html(`<button onclick='logout()'>Logout</button>`)
        }
    })
}

$(document).ready(setup);
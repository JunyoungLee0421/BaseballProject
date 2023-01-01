var currentUser;

function createBtnHandler(){
    var form = document.forms.createRoomform;
    const room_name = form.querySelector("input[name=roomName]").value;
    const digit_type = form.querySelector("input[name=digitType]:checked").value;
    
    var roomRef = db.collection("rooms");
    if (room_name != ""){
        roomRef.add({
            users: currentUser,
            room_name: room_name,
            digit_type: digit_type,
        }).then(function (docRef) {
            window.location.assign("pvp_matching.html?id=" + docRef.id)
        }).catch(function (err){
            console.log("Error occurs: " + err);
        })
    } else {
        alert("Room name is required")
    }
}


function cancelBtnHandler(){
    alert("Creating a room is cancelled")
    window.location.assign("pvp_menu.html")
}


setup = function(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = user.uid;
        }
    })
    $("#createBtn").click(createBtnHandler);
    $("#cancelBtn").click(cancelBtnHandler)
}

$(document).ready(setup);
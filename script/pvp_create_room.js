var currentUser;

function createBtnHandler(){
    var form = document.forms.createRoomform;
    const room_name = form.querySelector("input[name=roomName]").value;
    const digit_type = form.querySelector("input[name=digitType]:checked").value;
    var roomid = Math.random().toString().substr(2, 8);

    db.collection("rooms").doc(roomid).set({
        users: firebase.firestore.FieldValue.arrayUnion(currentUser),
        room_name: room_name,
        digit_type: digit_type,
    }, {merge: true}).then(doc => {
        window.location.assign("pvp_matching.html?id=" + roomid)
    })
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
var currentUser;

createRoomBtn = function(){
    window.location.href = "pvp_create_room.html"
}

reloadBtn = function(){
    location.reload();
}

displayRoom = function(){
    db.collection("rooms")
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                var docid = doc.id;
                var room_name = doc.data().room_name;
                var digit_type = doc.data().digit_type;
                let newcard = roomCardTemplate.content.cloneNode(true);
                newcard.querySelector(".room-name").innerHTML = room_name
                newcard.querySelector(".digit-type").innerHTML = `${digit_type} digit`
                newcard.querySelector(".join-btn").setAttribute("docid", docid);
                document.getElementById("rooms-go-here").appendChild(newcard);
            })
        })
}

$("body").on('click', '.join-btn', function() {
    var docid = $(this).attr("docid");
    setRoomdata(docid);
    db.collection("rooms").doc(docid).set(
        {
            users: firebase.firestore.FieldValue.arrayUnion(currentUser),
        },
        {
            merge: true
        }
    ).then(() => {
        window.location.assign("pvp_matching.html")
    })
})

setRoomdata = function(id){
    localStorage.setItem("roomID", id);
}

setup = function(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            displayRoom();
            currentUser = user.uid
            console.log(currentUser)
        } else {
            window.location.href = "./login.html"
        }
    })
    console.log("pvp_menu.js")
}

$(document).ready(setup);
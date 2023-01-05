var digit_type;
var currentUser;


quitRoom = function(){
    let params = new URL(window.location.href);
    let docid = params.searchParams.get("id");
    db.collection("rooms").doc(docid).delete().then(() => {
        window.location.assign("pvp_menu.html")
    })
}

checkusers = function(){
    let params = new URL(window.location.href);
    let docid = params.searchParams.get("id");
    db.collection("rooms").doc(docid)
        .onSnapshot((doc) => {
            let users = doc.data().users;
            console.log(users.length)
            if (users.length == 2){
                $("#loading").css('display', 'none')
                $("#setNumber").css('display', 'block')
            }
        })
}


setnumber = function(){
    let params = new URL(window.location.href);
    let docid = params.searchParams.get("id");
    console.log(digit_type)
    var inputNumber = $("#setnumber").val();
    if (checklength(inputNumber) && checkrepeat(inputNumber)){
        db.collection("rooms").doc(docid).update({
            [currentUser]: inputNumber
        }).then(() => {
            $("#setNumber").css('display', 'none')
            $("#wrapper").css('display', 'block')
        })
    } else {
        alert(`Number must be ${digit_type} digits and has no repeating digits`)
    }
}


checklength = function(inputNumber){
    return inputNumber.length == digit_type
}

checkrepeat = function(inputNumber){
    return !/(\w).*\1/i.test(inputNumber)
}


setup = function(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = user.uid;
        }
    })
    let params = new URL(window.location.href);
    let docid = params.searchParams.get("id");
    db.collection("rooms").doc(docid).get().then(((snap) => {
        digit_type = snap.data().digit_type
    }))

    $("#quit_game").removeAttr('href')
    $("#quit_game").attr('onclick', 'quitRoom()')
    $("#quit_room").click(quitRoom)
    checkusers()
}

$(document).ready(setup);
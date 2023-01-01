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
                // do something
            }
        })
}

setup = function(){
    $("#quit_room").click(quitRoom)
    checkusers()
}

$(document).ready(setup);
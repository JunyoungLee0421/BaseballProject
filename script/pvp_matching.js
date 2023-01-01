quitRoom = function(){
    let params = new URL(window.location.href);
    let docid = params.searchParams.get("id");
    db.collection("rooms").doc(docid).delete().then(() => {
        window.location.assign("pvp_menu.html")
    })
}

setup = function(){
    $("#quit_room").click(quitRoom)
}

$(document).ready(setup);
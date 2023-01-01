function createBtnHandler(){
    var form = document.forms.createRoomform;
    const room_name = form.querySelector("input[name=roomName]").value;
    const digit_type = form.querySelector("input[name=digitType]:checked").value;
    if (room_name != ""){
        console.log(room_name)
        console.log(digit_type)
    } else {
        alert("Room name is required")
    }
}



function cancelBtnHandler(){
    alert("Creating a room is cancelled")
    window.location.assign("pvp_menu.html")
}


setup = function(){
    console.log("pvp_create_room.js")
    $("#createBtn").click(createBtnHandler);
    $("#cancelBtn").click(cancelBtnHandler)
}

$(document).ready(setup);
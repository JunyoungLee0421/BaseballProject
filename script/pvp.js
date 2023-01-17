var counter = 1;
var currentUser;
var myNum;
var opNum;
var myturn;


initializeGame = function(){
    let params = new URL(window.location.href);
    let docid = params.searchParams.get("id");
    db.collection("rooms")
        .doc(docid)
        .collection("ingame")
        .doc('initialNumbers')
        .get()
        .then((snap) => {
            
            const sortObject = obj => Object.keys(obj).sort().reduce((res, key) => (res[key] = obj[key], res), {});
            const numbers = sortObject(snap.data().initialNumbers)
            console.log(numbers)
            var counter = 0;

            for (let i in numbers){
                if (i == currentUser){
                    myNum = numbers[i]
                    if (counter == 0){
                        myturn = true;
                    } else {
                        myturn = false;
                    }
                } else {
                    opNum = numbers[i]
                }
                counter += 1
            }
            console.log(myturn)
            console.log('mynum: ' + myNum)
            console.log('opnum: ' + opNum);
            initializeturn(docid)
            displayMemo(myNum.length)
            turn(docid)
        })
    
}


initializeturn = function(docid){
    console.log(myturn)
    db.collection("rooms")
        .doc(docid)
        .collection("ingame")
        .doc('turn')
        .set({
            [currentUser]: myturn
        }, {merge: true})
}


displayMemo = function(digit){
    $("#memo_result").empty()
    var result = ""
    var counter = 1 
    result += "<br>"
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < digit; j ++){
            result += `<button class="memo_btn" id="memo_${counter}" onclick="checkNum(${counter})">${i}</button>`
            counter += 1
        }
        result += "<br>"
    }
    $("#memo_result").append(result)
}

checklength = function(guess_num) {
    return guess_num.length == myNum.length
}

checkrepeat = function(guess_num){
    return !/(\w).*\1/i.test(guess_num)
}


inputnumberBtnHandler = function(guess_num){
    console.log(guess_num)
    var strike = 0;
    var ball = 0;
    var hint = ""
    var guess_list = Array.from(guess_num)
    var secret_numlist = Array.from(opNum)

    for (var i = 0; i < opNum.length; i++){
        if (guess_list[i] == secret_numlist[i]){
            strike += 1
        } else if (secret_numlist.includes(guess_list[i])){
            ball += 1
        } else {
            // do something
        }
    }
    
    if (strike == 0 && ball == 0){
        hint = 'OUT'
    } else if (strike == opNum.length){
        hint = `${strike}S`
        homerun()
    } else {
        hint = `${strike}S${ball}B`
    }

    $("#result").append(`
        <tr>
            <th>${counter}</th>
            <td>${guess_num}</td>
            <td>${hint}</td>
        </tr>
    `)
    counter += 1
}


// turn = function(docid){
//     db.collection("rooms")
//         .doc(docid)
//         .collection("ingame")
//         .doc('turn')
//         .onSnapshot((doc) => {
//             var turns = doc.data();
//             var temp;
//             for (let i in turns){
//                 if (i == currentUser){
//                     temp = turns[i]
//                 }
//             }

//             if (temp == true){
//                 $("#inputfield").css('display', 'block')
//                 $("#waiting_status").css('display', 'none')
//                 $("#inputnumberBtn").click(function() {
//                     guess_num = $("#inputnumber").val()
//                     if (checklength(guess_num) && checkrepeat(guess_num)){
//                         inputnumberBtnHandler(guess_num)
//                         // myturn == false
//                         changeturn(docid, false)
//                     } else {
//                         alert(`Number must be ${digit_type} digits and has no repeating digits`)
//                         console.log("Invalid input")
//                     }
//                 })
//             } else {
//                 $("#inputfield").css('display', 'none')
//                 $("#waiting_status").css('display', 'block')
//                 // tempfun(docid, true)
//             }
//         });
    
    // if (myturn == true){
    //     $("#inputfield").css('display', 'block')
    //     $("#waiting_status").css('display', 'none')
    //     $("#inputnumberBtn").click(function() {
    //         guess_num = $("#inputnumber").val()
    //         if (checklength(guess_num) && checkrepeat(guess_num)){
    //             inputnumberBtnHandler(guess_num)
    //             myturn == false
    //         } else {
    //             alert(`Number must be ${digit_type} digits and has no repeating digits`)
    //             console.log("Invalid input")
    //         }
    //     })
    // } else {
    //     $("#inputfield").css('display', 'none')
    //     $("#waiting_status").css('display', 'block')
    // }
// }


// changeturn = function(docid, status){
//     db.collection("rooms")
//         .doc(docid)
//         .collection("ingame")
//         .doc("turn")
//         .update({
//             [currentUser]: status,
//         }, {merge: true})
    
    
// }

// tempfun = function(docid, status){
//     db.collection("rooms")
//         .doc(docid)
//         .collection("ingame")
//         .doc('turn')
//         .onSnapshot((doc) => {
//             var temp = doc.data().currentUser
//             for (let i in doc.data()){
//                 if (i != currentUser && i == false){
//                     changeturn(docid, status)
//                 }
//             }
//         })
// }


checkNum = function(classNum){
    $(`#memo_${classNum}`).css({'text-decoration-line': 'line-through', 'background-color': '#eab3b3', 'color': '#772c2c', 'border': '1px solid #c77a7a'})
    $(`#memo_${classNum}`).attr('onclick', `greencheckNum(${classNum})`)
}


greencheckNum = function(classNum){
    $(`#memo_${classNum}`).css({'text-decoration-line': 'none', 'background-color': '#e2f4e1', 'color': '#3c9d39', 'border': '1px solid #89c77a'})
    $(`#memo_${classNum}`).attr('onclick', `undocheckNum(${classNum})`)
}


undocheckNum = function(classNum){
    $(`#memo_${classNum}`).css({'text-decoration-line': 'none', 'background-color': '#e1ecf4', 'color': '#39739d', 'border': '1px solid #7aa7c7'})
    $(`#memo_${classNum}`).attr('onclick', `checkNum(${classNum})`)
}


openMemo = function(){
    $("#popup").css('display', 'block')
    $(".openBtn").css('display', 'none')
    
}


closeMemo = function(){
    $("#popup").css('display', 'none')
    $(".openBtn").css('display', 'block')
}


setup = function(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = user.uid;
            initializeGame()
        }
    })

    
}

$(document).ready(setup);
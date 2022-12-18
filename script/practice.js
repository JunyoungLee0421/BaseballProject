let counter = 1;
let generated_number;
let selected_type;

setRandomNumber = function(digit) {

    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    var generated_number = "";

    for (var i = 0; i < digit; i++) {
        var temp = String(Math.floor(Math.random() * numbers.length));
        generated_number = generated_number + numbers[temp];
        numbers.splice(Number(temp), 1);
    }
    displayMemo(digit)

    return generated_number
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


refreshMemo = function(){
    displayMemo(selected_type)
}


inputnumberBtnHandler = function(guess_num) {
    console.log(generated_number)
    var strike = 0;
    var ball = 0;
    var hint = ""
    var guess_list = Array.from(guess_num)
    var secret_numlist = Array.from(generated_number)

    for (var i = 0; i < generated_number.length; i++){
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
    } else if (strike == generated_number.length){
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


homerun = function(){
    $("#gameend_modal_body").html(`<p>${counter}회에 성공`)
    $("#staticBackdrop").modal('show');
}


checklength = function(guess_num) {
    return guess_num.length == selected_type
}

checkrepeat = function(guess_num){
    return !/(\w).*\1/i.test(guess_num)
}


$("#digitType_box").change(function() {
    counter = 0
    selected_type = $("input[name='digitType']:checked").val();
    generated_number = setRandomNumber(Number(selected_type))
    $("#result").empty()
})


openMemo = function(){
    $("#popup").css('display', 'block')
    $(".openBtn").css('display', 'none')
    
}

closeMemo = function(){
    $("#popup").css('display', 'none')
    $(".openBtn").css('display', 'block')
}


restart = function(){
    location.reload();
}


setup = function(){
    selected_type = $("input[name='digitType']:checked").val();
    generated_number = setRandomNumber(3)
    $("#inputnumberBtn").click(function() {
        guess_num = $("#inputnumber").val()
        if (checklength(guess_num) && checkrepeat(guess_num)){
            inputnumberBtnHandler(guess_num)
        } else {
            alert(`Number must be ${selected_type} digits and has no repeating digits`)
            console.log("Invalid input")
        }
    })
}

$(document).ready(setup);
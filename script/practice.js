let counter = 0;

setRandomNumber = function(digit) {

    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    var generated_number = "";

    for (var i = 0; i < digit; i++) {
        var temp = String(Math.floor(Math.random() * numbers.length));
        generated_number = generated_number + numbers[temp];
        numbers.splice(Number(temp), 1);
    }

    return generated_number
}

inputnumberBtnHandler = function(generated_num, guess_num) {
    var strike = 0;
    var ball = 0;
    var hint = ""
    var guess_list = Array.from(guess_num)
    var secret_numlist = Array.from(generated_num)

    for (var i = 0; i < generated_num.length; i++){
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
    } else {
        hint = `${strike}S ${ball}B`
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

setup = function(){
    generated_number = setRandomNumber(3)
    $("#inputnumberBtn").click(function() {
        guess_num = $("#inputnumber").val()
        inputnumberBtnHandler(generated_number, guess_num)
    })


    $("#digitType_box").change(function() {
        counter = 0
        selected_type = $("input[name='digitType']:checked").val();
        generated_number = setRandomNumber(Number(selected_type))
        $("#result").empty()
    })
}

$(document).ready(setup);
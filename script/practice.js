setRandomNumber = function(digit) {

    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    var generated_number = "";

    for (var i = 0; i < digit; i++) {
        var temp = String(Math.floor(Math.random() * numbers.length));
        generated_number = generated_number.concat(numbers[temp]);
        numbers.splice(Number(temp), 1);
        console.log(numbers)
    }

    return generated_number
}

inputnumberBtnHandler = function(num) {
    // console.log(num)
}

setup = function(){
    generated_number = setRandomNumber(3)


    $("#digitType_box").change(function() {
        selected_type = $("input[name='digitType']:checked").val();
        generated_number = setRandomNumber(Number(selected_type))
        $("#result").empty()
    })
}

$(document).ready(setup);
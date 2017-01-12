$(document).ready(function(){
    var actualElementValue = '';
    var numbers = [];
    var operators = [];

    function myCalculator(keyCode){
        var keyValue = '';
        switch (keyCode) {
            case 67://C
                resetValues();
                break;
            case 83://S
                if(actualElementValue.charAt(0) == '-'){
                    $('#screen-bottom').html(actualElementValue.replace(/-/g,''));
                    actualElementValue = $('#screen-bottom').html();
                }else{
                    $('#screen-bottom').html('-' + $('#screen-bottom').html());
                    actualElementValue = $('#screen-bottom').html();
                }
                break;
            case 82://R
                if (numbers.length == 0 && $('#screen-bottom').html().length == 0) {
                    alert('you can´t do that oparation without a first element');
                }else {
                    numbers.push($('#screen-bottom').html());
                    actualElementValue = '';
                    operators.push('root');
                    $('#screen-top').append($('#screen-bottom').html() + ' root ');
                    $('#screen-bottom').html('');
                }
                console.log(numbers);
                console.log(operators);
                break;
            case 88://x
                if (numbers.length == 0 && $('#screen-bottom').html().length == 0) {
                    numbers.push(0);
                    operators.push('*');
                    $('#screen-top').append('0' + ' * ');
                    actualElementValue += '';
                    $('#screen-bottom').html('');
                }else {
                    numbers.push(parseFloat($('#screen-bottom').html()));
                    actualElementValue = '';
                    operators.push('*');
                    $('#screen-top').append($('#screen-bottom').html() + ' * ');
                    $('#screen-bottom').html('');
                }
                console.log(numbers);
                console.log(operators);
                break;
            case 68:///
                if (numbers.length == 0 && $('#screen-bottom').html().length == 0) {
                    numbers.push(0);
                    operators.push('/');
                    $('#screen-top').append('0' + ' / ');
                    actualElementValue += '';
                    $('#screen-bottom').html('');
                }else {
                    numbers.push(parseFloat($('#screen-bottom').html()));
                    actualElementValue = '';
                    operators.push('/');
                    $('#screen-top').append($('#screen-bottom').html() + ' / ');
                    $('#screen-bottom').html('');
                }
                console.log(numbers);
                console.log(operators);
                break;
            case 187://+
                if (numbers.length == 0 && $('#screen-bottom').html().length == 0) {
                    numbers.push(0);
                    operators.push('+');
                    $('#screen-top').append('0' + ' + ');
                    actualElementValue += '';
                    $('#screen-bottom').html('');
                }else {
                    numbers.push(parseFloat($('#screen-bottom').html()));
                    actualElementValue = '';
                    operators.push('+');
                    $('#screen-top').append($('#screen-bottom').html() + ' + ');
                    $('#screen-bottom').html('');
                }
                console.log(numbers);
                console.log(operators);
                break;
            case 189://-
                if (numbers.length == 0 && $('#screen-bottom').html().length == 0) {
                    numbers.push(0);
                    operators.push('-');
                    $('#screen-top').append('0' + ' - ');
                    actualElementValue += '';
                    $('#screen-bottom').html('');
                }else {
                    numbers.push(parseFloat($('#screen-bottom').html()));
                    actualElementValue = '';
                    operators.push('-');
                    $('#screen-top').append($('#screen-bottom').html() + ' - ');
                    $('#screen-bottom').html('');
                }
                console.log(numbers);
                console.log(operators);
                break;
            case 13://=
                if ($('#screen-bottom').html() == '' && numbers.length != 0) {
                    operators.pop();
                    console.log(numbers);
                    console.log(operators);
                    resolve();
                } else {
                    if ($('#screen-bottom').html() != '') {
                        numbers.push(parseFloat($('#screen-bottom').html()));
                        $('#screen-top').append($('#screen-bottom').html());
                        $('#screen-bottom').html('');
                        console.log(numbers);
                        console.log(operators);
                        resolve();
                    }

                }
                break;
            case 116://F5
                break;
            case 118://F7
                break;
            case 119://F8
                break;
            case 120://F9
                break;
            case 190://dot
                if (validateDot(actualElementValue)) {
                    $('#screen-bottom').append('.');
                }else {
                    alert("You can't capture more than two dots into a number");
                }
                break;
            default:
                keyValue = String.fromCharCode(keyCode);
                $("#screen-bottom").append(actualElementValue.concat(keyValue));
                console.log(actualElementValue);

        }

    }

    function resolve(){
        var result = 0;
        while (operators.length) {
            var operator = operators.shift();
            switch (operator) {
                case '+':
                    result = numbers.shift() + numbers.shift();
                    numbers.unshift(result);
                    break;
                case '-':
                    result = numbers.shift() - numbers.shift();
                    numbers.unshift(result);
                    break;
                case '*':
                    result = numbers.shift() * numbers.shift();
                    numbers.unshift(result);
                    break;
                case '/':
                    result = numbers.shift() / numbers.shift();
                    numbers.unshift(result);
                    break;
                default:

            }

        }
        $('#screen-bottom').html(numbers.shift());
    }

    function validateDot(number){
        if((number.split(".").length - 1) == 1){
            return false;
        }else {
            return true;
        }
    }

    function resetValues(){
        $('#screen-top').html('');
        $('#screen-bottom').html('');
        actualElementValue = '';
        numbers = [];
        operators = [];
    }

    function validateInput(keyCode){
        if ((keyCode >= 48 && keyCode <= 57) //0-9
            || (keyCode === 88 ||keyCode === 187) // x and +
            || (keyCode === 189 || keyCode === 68) // - and /
            || (keyCode === 67 || keyCode === 82 || keyCode === 83) //C,R,S
            || (keyCode === 8 || keyCode === 13) // backspace and enter
            || (keyCode === 116 || (keyCode >= 118 && keyCode <= 120)) //F5,F7-F9
            || (keyCode === 190)){ // dot
            return true;
        }
        return false;
    }

    $(document).keydown(function(e){
        if (validateInput(e.which)) {
            myCalculator(e.which);
        }
    });
});

$(document).ready(function(){
    var actualElementValue = '';
    var numbers = [];
    var operators = [];
    var memory = 0;

    function myCalculator(keyCode){
        var keyValue = '';
        switch (keyCode) {
            case 67://C
                resetValues();
                clearScreens();
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
                operationSign('root');
                break;
            case 88://x
                operationSign('*');
                break;
            case 68:///
                operationSign('/');
                break;
            case 187://+
                operationSign('+');
                break;
            case 189://-
                operationSign('-');
                break;
            case 13://=
                if ($('#screen-bottom').html() == '' && numbers.length != 0) {
                    operators.pop();
                    resolve();
                    $('#screen-top').html('');
                    resetValues();
                } else {
                    if ($('#screen-bottom').html() != '') {
                        numbers.push(parseFloat($('#screen-bottom').html()));
                        resolve();
                        $('#screen-top').html('');
                        resetValues();
                    }

                }
                break;
            case 116://F5
                break;
            case 118://F7
                $('#screen-bottom').html(memory)
                break;
            case 119://F8
                memory = 0;
                break;
            case 120://F9
                memory += parseFloat($('#screen-bottom').html());
                break;
            case 190://dot
                if (validateDot($('#screen-bottom').html())) {
                    $('#screen-bottom').append('.');
                }else {
                    alert("You can't capture more than two dots into a number");
                }
                break;
            default:
                keyValue = String.fromCharCode(keyCode);
                $("#screen-bottom").append(actualElementValue.concat(keyValue));

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
                case 'root':
                    var root = numbers.shift();
                    var n = numbers.shift();
                    result = Math.pow(n, 1/root);
                    numbers.unshift(result);
                    break;
                default:

            }

        }
        $('#screen-bottom').html(numbers.shift());
    }

    function operationSign(sign){
        if (sign === 'root') {
            if (numbers.length == 0 && $('#screen-bottom').html().length == 0) {
                alert('you can´t do that oparation without a first element');
            }else {
                numbers.push(parseFloat($('#screen-bottom').html()));
                actualElementValue = '';
                operators.push(sign);
                $('#screen-top').append($('#screen-bottom').html() + ' '+ sign + ' ');
                $('#screen-bottom').html('');
            }
        } else {
            if (numbers.length == 0 && $('#screen-bottom').html().length == 0) {
                numbers.push(0);
                operators.push(sign);
                $('#screen-top').append('0' + ' '+ sign + ' ');
                actualElementValue += '';
                $('#screen-bottom').html('');
            }else {
                numbers.push(parseFloat($('#screen-bottom').html()));
                actualElementValue = '';
                operators.push(sign);
                $('#screen-top').append($('#screen-bottom').html() + ' '+ sign + ' ');
                $('#screen-bottom').html('');
            }
        }
    }

    function validateDot(number){
        if((number.split(".").length - 1) == 1){
            return false;
        }else {
            return true;
        }
    }

    function clearScreens(){
        $('#screen-top').html('');
        $('#screen-bottom').html('');
    }

    function resetValues(){
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

    $('#one,#two,#three,#four,#five,'
     +'#six,#seven,#eight,#nine,#zero,'
     +'#dot,#sign,#divide,#multiply,'
     +'#minus,#plus,#root,#equals,#clear,'
     +'#del,#mrecall,#mclear,#mplus').click(function(){
        var codes = {
            zero:48, one:49, two:50,
            three:51, four:52, five:53,
            six:54, seven:55, eight:56,
            nine:57, dot:190, sign:83,
            divide:68, multiply:88, minus:189,
            plus:187, root:82, equals:13, clear:67,
            mrecall:118, mclear:119, mplus:120
        };
        //$('#screen-bottom').append($(this).html());
        myCalculator(codes[$(this).attr('id')]);
		//myCalculator(numbersCodes[key]);
	});

});

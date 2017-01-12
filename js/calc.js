var calculator = new function() {
    var self = this;
    self.number1 = 0;
    self.number2 = 0;
    self.result = 0;
    self.isNotModified1 = true;
    self.isNotModified2 = true;
    self.operation = "";

    self.capture = function(keyValue){
        var symbols = ['+','-','*','c','='].toString();

        if ((typeof keyValue == "number" || keyValue == ".") && self.isNotModified1 && self.operation == "") {
            if((document.getElementById("screen").innerHTML.split(".").length - 1) == 1){
                self.moreThanTwoDotsAlert();
            }else{
                document.getElementById("screen").innerHTML += keyValue;
                self.number1 = parseFloat(document.getElementById("screen").innerHTML);
            }
        }else if ((symbols.split(keyValue).length - 1) == 1) {
            switch(keyValue) {
                case 'c':
                    self.reinitializedValues();
                    self.clearScreen();
                    break;
                case '=':
                    self.isNotModified2 = false;
                    if (self.elementsValidations()) {
                        self.result = self.makeOperation(self.operation);
                        console.log(self.result);
                        document.getElementById("screen").innerHTML = self.result;
                        self.reinitializedValues();
                    }
                    break;
                default:
                    self.isNotModified1 = false;
                    self.operation = keyValue;
                    self.clearScreen();
            }
        }else if ((typeof keyValue == "number" || keyValue == ".") && self.isNotModified2 && self.operation != "") {
            if((document.getElementById("screen").innerHTML.split(".").length - 1) == 1){
                self.moreThanTwoDotsAlert();
            }else{
                document.getElementById("screen").innerHTML += keyValue;
                self.number2 = parseFloat(document.getElementById("screen").innerHTML);
            }
        }
    }

    self.moreThanTwoDotsAlert = function () {
        alert("You can't capture more than two dots into a number")
    }

    self.clearScreen = function() {
        document.getElementById("screen").value = "";
        console.log(self.number1);
        console.log(self.number2);
        console.log(self.operation);
    }

    self.reinitializedValues = function() {
        self.number1 = 0;
        self.number2 = 0;
        self.isNotModified1 = true;
        self.isNotModified2 = true;
        self.result = 0;
        self.operation = "";
    }

    self.elementsValidations = function () {
        if (!self.isNotModified1 && !self.isNotModified2 && self.operation != "") {
            return true;
        }else {
            return false;
        }
    }

    self.makeOperation = function (ope) {
        switch (ope) {
            case '+':
                return self.number1 + self.number2;
                break;
            case '-':
                return self.number1 - self.number2;
                break;
            case '*':
                return self.number1 * self.number2;
                break;
            default:

        }
    }

}

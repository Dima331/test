
const formText = (function () {
    return {
        init: function () {

            const formInput = document.querySelectorAll(".window-product__price-text_input");
            for (var i = 0; i < formInput.length; i++) {
                formInput[i].addEventListener("keydown", function (e) {
                    let isDigit = false;
                    let isControl = false;
                    if (e.key >= 0 || e.key <= 9) {
                        isDigit = true;
                    }
                    if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Backspace" || e.key == "Delete") {
                        isControl = true;
                    }
                    if (isDigit == false &&  isControl == false) {
                        e.preventDefault();
                    }
                });

            }
        },
    };
}());
module.exports = formText;
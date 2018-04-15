const $ = require('jquery');
const window = (function () {
    return {
        init: function () {
            $(document).ready(function () {
                $('#modal1').click(function (e) {
                    if (!$(".mask-container").hasClass("display")) {
                        $(".mask-container").addClass("display")
                    }
                    e.preventDefault();
                    $(".basket__item-message").addClass("visuallyhidden");
                    $('#modal1').parent(".price").siblings(".basket__item-message").toggleClass("visuallyhidden");
                });
                $('#modal2').click(function (e) {
                    if (!$(".mask-container").hasClass("display")) {
                        $(".mask-container").addClass("display")
                    }
                    e.preventDefault();
                    $(".basket__item-message").addClass("visuallyhidden");
                    $('#modal2').parent(".price").siblings(".basket__item-message").toggleClass("visuallyhidden");
                });
                $('#modal3').click(function (e) {
                    if (!$(".mask-container").hasClass("display")) {
                        $(".mask-container").addClass("display")
                    }
                    e.preventDefault();
                    $(".basket__item-message").addClass("visuallyhidden");
                    $('#modal3').parent(".price").siblings(".basket__item-message").toggleClass("visuallyhidden");
                });
                $('.window-product__button-back').click(function (e) {
                    if ($(".mask-container").hasClass("display")) {
                        $(".mask-container").removeClass("display")
                    }
                    $(".basket__item-message").addClass("visuallyhidden");
                });
                $('.window-product__button-save').click(function (e) {
                    if ($(".mask-container").hasClass("display")) {
                        $(".mask-container").removeClass("display")
                    }
                    $(".basket__item-message").addClass("visuallyhidden");
                });
                $('.mask-container').click(function (e) {
                    e.preventDefault();
                    if ($(".basket__item-message").hasClass("visuallyhidden")) {
                        $(".basket__item-message").addClass("visuallyhidden");
                    }
                    if ($(".mask-container").hasClass("display")) {
                        $(".mask-container").removeClass("display")
                    }
                });
            });
        },
    };
}());
module.exports = window;
const $ = require('jquery');
const vue = (function () {
    return {
        init: function () {

            new Vue({
                el: '.basket-content',
                data: {
                    checkedNames: [],
                    check: 0,
                    windowCheck: [true, true, true],
                    window: [],
                    lines: [{
                        line1: false,
                        line2: true,
                        line3: true,
                    }],
                    item: [{
                        image: "assets/images/content/item1.png",
                        info: "Нож складной WENGER Evolution ,'Автобус',13 функций, 85 мм.WEN",
                        priseOne: 990,
                        number: 1,
                        priseFull: 990
                    },
                    {
                        image: "assets/images/content/item2.png",
                        info: "Рюкзак WENGER «NEO»",
                        priseOne: 5550,
                        number: 1,
                        priseFull: 5550
                    },
                    {
                        image: "assets/images/content/item3.png",
                        info: "Перьевая ручка Waterman Hemisphere Essential, перо: нержавеющая сталь. WATERMAN",
                        priseOne: 11110,
                        number: 1,
                        priseFull: 11110
                    }],
                    nds: 0,
                    fullPrise: 0,
                    Itog: 0,
                    tmpPrice: [{
                        tempOne: 0,
                        tempFull: 0,
                        num: 1
                    },
                    {
                        tempOne: 0,
                        tempFull: 0,
                        num: 1
                    },
                    {
                        tempOne: 0,
                        tempFull: 0,
                        num: 1
                    }],
                    error: true
                },
                methods: {
                    quantityCheck: function (checkedNames) {
                        var tmp = checkedNames.length;

                        this.check = tmp;
                        return this.check;

                    },
                    reset: function (checkedNames) {
                        var a = checkedNames.reverse()
                        function sDecrease(i, ii) {
                            if (i > ii)
                                return -1;
                            else if (i < ii)
                                return 1;
                            else
                                return 0;
                        }
                        a.sort(sDecrease);
                        for (var i = 0; i < a.length; i++) {
                            var ui = a[i];
                            ui = Number(ui);
                            Vue.delete(this.item, ui);
                        }
                        checkedNames.length = 0;
                        this.check = 0;
                        return this.check;

                    },
                    interval: function () {
                        var sum = 0;
                        for (var i = 0; i < this.item.length; i++) {
                            var a = this.item[i].priseFull;
                            sum += a;
                        }
                        this.fullPrise = sum;
                        this.nds = sum * 0.18;
                        this.Itog = this.nds + this.fullPrise;
                        //var yu;
                        //yu = this.fullPrise + '';
                        //var tom = yu.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1');
                        //this.fullPrise = tom;
                        return this.fullPrise;

                    },
                    minus: function (tmp) {
                        if (this.tmpPrice[tmp].num < 2) {
                            return
                        }
                        this.tmpPrice[tmp].num = this.tmpPrice[tmp].num - 1;
                    },
                    plus: function (tmp) {
                        if (typeof this.tmpPrice[tmp].num == 'string') {
                            this.tmpPrice[tmp].num = + this.tmpPrice[tmp].num;
                        }
                        this.tmpPrice[tmp].num = this.tmpPrice[tmp].num + 1;
                    },
                    save: function (tmp) {
                        this.item[tmp].priseOne = this.tmpPrice[tmp].tempOne;
                        this.item[tmp].number = this.tmpPrice[tmp].num;
                        this.item[tmp].priseFull = this.tmpPrice[tmp].tempFull;

                    },
                    windowGoods: function (tmp) {
                        this.tmpPrice[tmp].tempOne = this.item[tmp].priseOne;
                        this.tmpPrice[tmp].num = this.item[tmp].number;
                        this.tmpPrice[tmp].tempFull = this.item[tmp].priseFull;
                    },
                    uno: function (tmp) {
                        this.tmpPrice[tmp].tempFull = this.tmpPrice[tmp].tempOne * this.tmpPrice[tmp].num;
                    }
                }
            });
        },
    };
}());
module.exports = vue;
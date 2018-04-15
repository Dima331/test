
const $ = require('jquery');
const window = require('./common/window.js');
const vue = require('./common/vue.js');
const formText = require('./common/formText.js');

if($('.basket-content').length){
	vue.init();
}

if($('.window-product').length){
	window.init();
}
if($('#text').length){
	formText.init();
}
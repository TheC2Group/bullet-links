var $ = require('jquery');
var BulletLinks = require('../../cjs/bullet-links.js');

var $example1 = $('.Example1');
var bullets1 = new BulletLinks($example1.find('.Bullets'), 6);

bullets1.onUpdate(function (index) {
    $example1.attr('data-index', index + 1);
});

var bullets2 = new BulletLinks('<ul class="Bullets" />', 6, {
    template: '<li {attribute}={status}><a href="#"></a>',
    target: 'a'
}).appendTo('.Example2');


bullets2.onUpdate(function (index) {
    bullets2.$parent.attr('data-index', index + 1);
});

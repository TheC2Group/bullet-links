'use strict';

import $ from 'jquery';

var defaults = {
    template: '<a href="#" {attribute}={status}><span class="Hidden">Go to item {index}</span></a>',
    target: '',
    attribute: 'data-status',
    active: 'active',
    inactive: 'inactive',
    initial: 0
};

// context should be an instance of Bullets
var generateMarkup = function (index) {
    var values = {
        attribute: this.opts.attribute,
        status: (index === this.opts.initial) ? this.opts.active : this.opts.inactive,
        index: index + 1
    };
    return this.opts.template.replace(/{([a-z]+)}/g, function (match, key) {
        return (typeof values[key] === 'undefined') ? match : values[key];
    });
};

// context should be an instance of Bullets
var createHTML = function () {
    var items = [];
    for (var x = 0; x < this.count; x += 1) {
        items.push($(generateMarkup.call(this, x))[0]);
    }
    return $(items);
};

// context should be an instance of Bullets
var emit = function (index) {
    this._listeners.forEach(function (cb) {
        cb(index);
    });
};

// context should be an instance of Bullets
var activate = function (index) {
    if (index === this.index) return;
    this.$items.eq(this.index).attr(this.opts.attribute, this.opts.inactive);
    this.$items.eq(index).attr(this.opts.attribute, this.opts.active);
    this.index = index;
    return this;
};

var bindEvents = function () {
    var self = this;
    if (this.opts.target) {
        this.$items.on('click', this.opts.target, function (e) {
            var index = self.$items.index(e.delegateTarget);
            activate.call(self, index);
            emit.call(self, index);
            e.preventDefault();
        });
    } else {
        this.$items.on('click', function (e) {
            var index = self.$items.index(e.currentTarget);
            activate.call(self, index);
            emit.call(self, index);
            e.preventDefault();
        });
    }
};

var Bullets = function (el, count, options) {
    this.$el = $(el);
    this.count = count;
    this.opts = $.extend({}, defaults, options);
    this._listeners = [];

    this.$items = createHTML.call(this);
    this.$el.append(this.$items);

    this.index = this.opts.initial;

    bindEvents.call(this);
};

Bullets.prototype.setIndex = activate;

Bullets.prototype.onUpdate = function (cb) {
    if (typeof cb !== 'function') return;
    this._listeners.push(cb);
    return this;
};

Bullets.prototype.appendTo = function (selector) {
    this.$parent = $(selector).append(this.$el);
    return this;
};

export default Bullets;

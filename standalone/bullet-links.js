(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BulletLinks = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Bullet Links
 * https://github.com/TheC2Group/bullet-links
 * @version 1.1.0
 * @license MIT (c) The C2 Group (c2experience.com)
 */

'use strict';

var $ = jQuery || require('jquery');

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

module.exports = Bullets;

},{"jquery":undefined}]},{},[1])(1)
});
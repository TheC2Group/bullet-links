bullet-links
============

This module builds a list of bullet links. If the index changes outside of this module, it is important to notify this module of the new index.

ES5 polyfills needed for `Array.forEach`.


To get started
--------------

### CommonJS

```
$ get clone ssh://git@stash.c2mpg.com:7999/c2/bullet-links.git
```

```js
var ArrowButtons = require('./bullet-links');
```

### Browser Global

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="standalone/bullet-links.js"></script>
```


Basic example
-------------

```js
// How many bullet links do you want?
var count = 6;

// This wouldn't be necessary since all these options are the defaults
var options = {
    template: '<a href="#" {attribute}={status}><span class="Hidden">Go to item {index}</span></a>',
    target: '',
    attribute: 'data-status',
    active: 'active',
    inactive: 'inactive',
    initial: 0
};

var bullets = new BulletLinks('#el', count, options);

bullets.onUpdate(function (index) {
    console.log(index); 
});
```js


BulletLinks
------------
Constructor  
@param {jQuery} - element that the bullet links go inside  
@param {Number} - the amount of items you want to generate  
@param {Object} - object to change any of the default options  
@return {Object} - instance of BulletLinks  


.setIndex
---------
@param {Number}  
@return {Object} - instance of BulletLinks  


.onUpdate
---------
@param {Function}  
@return {Object} - instance of BulletLinks  


.appendTo
-------
@param {jQuery} - element you want to append all the bullets and container to
@return {Object} - instance of BulletLinks  


License
-------

MIT © [The C2 Group](https://c2experience.com)

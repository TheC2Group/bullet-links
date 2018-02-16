# bullet-links
> This module builds a list of bullet links. If the index changes outside of this module, it is important to notify this module of the new index.

ES5 polyfills needed for `Array.forEach`.

## To get started
### CommonJS

```
$ npm install c2-bullet-links
```

```js
var BulletLinks = require('c2-bullet-links');
```

### Browser Global

```html
<script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
<script src="iife/bullet-links.js"></script>
```

## Basic example

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
```

## BulletLinks
Constructor<br>@param {jQuery} - element that the bullet links go inside<br>@param {Number} - the amount of items you want to generate<br>@param {Object} - object to change any of the default options<br>@return {Object} - instance of BulletLinks  

## .setIndex
@param {Number}<br>@return {Object} - instance of BulletLinks  

## .onUpdate
@param {Function}<br>@return {Object} - instance of BulletLinks  

## .appendTo
@param {jQuery} - element you want to append all the bullets and container to @return {Object} - instance of BulletLinks  

## License
MIT © [The C2 Group](https://c2experience.com)

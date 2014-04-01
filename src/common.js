/*global require, module*/
/*jslint node: true */
"use strict";
var lodash = require("lodash"),
    $ = require("jquery"),
    settings = require("./settings.js");

module.exports = {
    generateNewTarget: function (targetName) {
        var newTarget = $("<div></div>").attr("class", targetName);
        $("#screen").append(newTarget);
        return newTarget;
    },

    /*The input of degrees it accepts should be represented in angle given in 180 degree*/
    rotateTarget: function (target, degrees) {
        target.css({
        // For webkit browsers: e.g. Chrome
            '-webkit-transform' : 'rotate('  +  degrees  +  'deg)',
        // For Mozilla browser: e.g. Firefox
            '-moz-transform' : 'rotate(' + degrees + 'deg)',
            '-ms-transform' : 'rotate(' + degrees + 'deg)',
            '-o-transform' : 'rotate(' + degrees + 'deg)',
            'transform' : 'rotate(' + degrees + 'deg)',
            'zoom' : 1
        });
    },

    moveTarget: function (target, newPostion) {
        var newCssStyle = lodash.clone(newPostion);
        if (newPostion.left <= 0) {
            newCssStyle.left = 0;
        } else if (newPostion.left >= settings.screenSize.width - settings.bunnySize.width) {
            newCssStyle.left = settings.screenSize.width - settings.bunnySize.width;
        }

        if (newPostion.top <= 0) {
            newCssStyle.top = 0;
        } else if (newPostion.top >= settings.screenSize.height - settings.bunnySize.height) {
            newCssStyle.top = settings.screenSize.height - settings.bunnySize.height;
        }

        newCssStyle = lodash.mapValues(newCssStyle, function (value) {
            return value + "px";
        });
        target.css(newCssStyle);
    },

    //the angle it returns is represented in degrees given in 180, not radians
    //This is originaly for css animate "rotate", it use degree, but for javascript  Math object,
    //it's supposed to use radians
    calculateDegreeToBunny: function (mouseEvent, targetPosition) {
        return Math.atan2((mouseEvent.pageY - targetPosition.top), (event.pageX - targetPosition.left)) * 180 / Math.PI;
    }
};

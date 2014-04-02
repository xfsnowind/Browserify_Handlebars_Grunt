/*global require, module*/
/*jslint node: true */
"use strict";
var lodash = require("lodash"),
    $ = require("jquery"),
    settings = require("./settings.js");

function getTargetDegree(target) {
    var matrix = target.css("-webkit-transform") ||
        target.css("-moz-transform") ||
        target.css("-ms-transform") ||
        target.css("-o-transform") ||
        target.css("transform"),
        angle,
        values,
        a, b;

    if (matrix !== 'none') {
        values = matrix.split('(')[1].split(')')[0].split(',');
        a = values[0];
        b = values[1];
        angle = Math.atan2(b, a);
    } else {
        angle = 0;
    }
    return angle;
}

module.exports = {
    getTargetProperties: function (target, speed) {
        return {
            target: target,
            width: parseInt(target.css("width"), 10),
            height: parseInt(target.css("height"), 10),
            left: parseInt(target.css("left"), 10),
            top: parseInt(target.css("top"), 10),
            degree: getTargetDegree(target),
            speed: speed
        };
    },

    generateNewTarget: function (targetName, originalPosition) {
        var newTarget = $("<div></div>").attr("class", targetName);
        if (originalPosition) {
            newTarget.css(originalPosition);
        }
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
            //ie
            '-ms-transform' : 'rotate(' + degrees + 'deg)',
            //opera
            '-o-transform' : 'rotate(' + degrees + 'deg)',
            'transform' : 'rotate(' + degrees + 'deg)',
            'zoom' : 1
        });
    },

    moveTarget: function (targetProperties) {
        var newCssStyle = targetProperties;
        if (targetProperties.left <= 0) {
            newCssStyle.left = 0;
        } else if (targetProperties.left >= settings.screenSize.width - targetProperties.width) {
            newCssStyle.left = settings.screenSize.width - targetProperties.width;
        }

        if (targetProperties.top <= 0) {
            newCssStyle.top = 0;
        } else if (targetProperties.top >= settings.screenSize.height - targetProperties.height) {
            newCssStyle.top = settings.screenSize.height - targetProperties.height;
        }

        if (targetProperties.target) {
            targetProperties.target.css(newCssStyle);
        }
    },

    //the angle it returns is represented in degrees given in 180, not radians
    //This is originaly for css animate "rotate", it use degree, but for javascript  Math object,
    //it's supposed to use radians
    calculateDegreeToBunny: function (mouseEvent, targetPosition) {
        return Math.atan2((mouseEvent.pageY - targetPosition.top), (mouseEvent.pageX - targetPosition.left)) * 180 / Math.PI;
    }
};

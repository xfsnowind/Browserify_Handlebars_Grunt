/*global require*/
/*jslint node: true*/
'use strict';
var $ = require("jquery"),
    common = require("./common"),
    moveDistance = require("./settings.js").bunnyMoveDistance;

function getBunny() {
    return $("#bunny");
}

function getBunnyPosition(bunny) {
    var bunnyPostion = {
        left: parseInt(bunny.css('left')),
        top: parseInt(bunny.css('top'))
    };
    return {
        37: {
                left: bunnyPostion.left - moveDistance,
                top: bunnyPostion.top
            },
        38: {
                left: bunnyPostion.left,
                top: bunnyPostion.top - moveDistance
            },
        39: {
                left: bunnyPostion.left + moveDistance,
                top: bunnyPostion.top
            },
        40: {
                left: bunnyPostion.left,
                top: bunnyPostion.top + moveDistance
            }
    };
}

function registerKeyEvents() {
    $(document).bind("keydown",function (event) {
        var bunny = getBunny(),
            keyMovementMap = getBunnyPosition(bunny);
        if (13 === event.keyCode) {
            event.preventDefault();
        } else if (keyMovementMap[event.keyCode.toString()]) {
            common.moveTarget.apply(null, [bunny, keyMovementMap[event.keyCode.toString()]]);
        }
    });
}

module.exports = {
    registerKeyEvents: registerKeyEvents
};

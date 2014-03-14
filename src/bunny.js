/*global require, document*/
/*jslint node: true*/
'use strict';
var $ = require("jquery"),
    common = require("./common"),
    moveDistance = require("./settings.js").bunnyMoveDistance,
    bunnySize = require("./settings.js").bunnySize;

function getBunny() {
    return $("#bunny");
}

function getBunnyPosition(bunny) {
    var bunnyPostion = {
        left: parseInt(bunny.css('left'), 10),
        top: parseInt(bunny.css('top'), 10)
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
    $(document).on("keydown", function (event) {
        var bunny = getBunny(),
            keyMovementMap = getBunnyPosition(bunny);
        if (13 === event.keyCode) {
            event.preventDefault();
        } else if (keyMovementMap[event.keyCode.toString()]) {
            common.moveTarget.apply(null, [bunny, keyMovementMap[event.keyCode.toString()]]);
        }
    });
}

function calculateDegreeMouseWithBunny(mouseevent, bunnyCenterPoint) {
    return Math.atan2((mouseevent.pageY - bunnyCenterPoint.top), (mouseevent.pageX - bunnyCenterPoint.left)) * 180 / Math.PI;
}

function registerMouseRotateEvents() {
    $(document).on("mousemove", function (event) {
        var bunny = getBunny(),
            bunnyPostion = {
                left: parseInt(bunny.css('left'), 10),
                top: parseInt(bunny.css('top'), 10)
            },
            degree = calculateDegreeMouseWithBunny(event, {
                left: bunnyPostion.left + bunnySize.width / 2,
                top: bunnyPostion.top + bunnySize.height / 2
            });
        common.rotateTarget(bunny, degree);
    });
}

module.exports = {
    registerKeyEvents: registerKeyEvents,
    registerMouseRotateEvents: registerMouseRotateEvents
};

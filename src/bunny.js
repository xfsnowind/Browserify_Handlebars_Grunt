/*global require, document*/
/*jslint node: true*/
'use strict';
var $ = require("jquery"),
    common = require("./common"),
    bunnySpeed = require("./settings.js").moveBunnySpeed,
    bunnySize = require("./settings.js").bunnySize,
    arrowSpeed = require("./settings.js").arrowSpeed,
    arrowNumber = 0,
    arrowMax = 10000;

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
            left: bunnyPostion.left - bunnySpeed,
            top: bunnyPostion.top
        },
        38: {
            left: bunnyPostion.left,
            top: bunnyPostion.top - bunnySpeed
        },
        39: {
            left: bunnyPostion.left + bunnySpeed,
            top: bunnyPostion.top
        },
        40: {
            left: bunnyPostion.left,
            top: bunnyPostion.top + bunnySpeed
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


//the angle it returns is represented in degrees given in 180, not radians
function calculateDegreeMouseWithBunny(event, bunnyCenterPoint) {
    return Math.atan2((event.pageY - bunnyCenterPoint.top), (event.pageX - bunnyCenterPoint.left)) * 180 / Math.PI;
}

function generateNewArrowNumber() {
    if (arrowNumber >= arrowMax) {
        arrowNumber = 0;
    }
    return arrowNumber + 1;
}

function generateArrow() {
    var screen = $("#screen"),
        uniqueArrowId = generateNewArrowNumber().toString(),
        newArrow = $("<div></div>").attr("id", "arrow-" + uniqueArrowId);

    screen.append(newArrow);
    return newArrow;
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

    $(document).on("click", function (event) {
        var bunny = getBunny(),
            bunnyPostion = {
                left: parseInt(bunny.css('left'), 10),
                top: parseInt(bunny.css('top'), 10)
            },
            arrowDegree = calculateDegreeMouseWithBunny(event, {
                left: bunnyPostion.left + bunnySize.width / 2,
                top: bunnyPostion.top + bunnySize.height / 2
            }),
            arrow = generateArrow();
        common.moveArrow(arrow, {
            left: bunny.css("left"),
            top: bunny.css("top")
        }, {
            degree: arrowDegree / 180 * Math.PI,
            speed: arrowSpeed
        });
    });
}

module.exports = {
    registerKeyEvents: registerKeyEvents,
    registerMouseRotateEvents: registerMouseRotateEvents
};

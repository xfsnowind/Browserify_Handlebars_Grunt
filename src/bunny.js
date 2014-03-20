/*global require, document*/
/*jslint node: true*/
'use strict';
var $ = require("jquery"),
    common = require("./common"),
    settings = require("./settings.js"),
    arrowNumber = 0,
    bunnyNamesArray = ["", "2"];

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
            left: bunnyPostion.left - settings.bunnyMoveSpeed,
            top: bunnyPostion.top
        },
        38: {
            left: bunnyPostion.left,
            top: bunnyPostion.top - settings.bunnyMoveSpeed
        },
        39: {
            left: bunnyPostion.left + settings.bunnyMoveSpeed,
            top: bunnyPostion.top
        },
        40: {
            left: bunnyPostion.left,
            top: bunnyPostion.top + settings.bunnyMoveSpeed
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

function changeImage(target) {
    target.css("background-image", 'url("resources/images/dude2.png")');
    setTimeout(function () {
        target.css("background-image", 'url("resources/images/dude.png")');
    }, 200);
}


//the angle it returns is represented in degrees given in 180, not radians
//This is originaly for css animate "rotate", it use degree, but for javascript  Math object,
//it's supposed to use radians
function calculateDegreeMouseWithBunny(event, bunnyCenterPosition) {
    return Math.atan2((event.pageY - bunnyCenterPosition.top), (event.pageX - bunnyCenterPosition.left)) * 180 / Math.PI;
}

function registerMouseRotateEvents() {
    $(document).on("mousemove", function (event) {
        var bunny = getBunny(),
            bunnyCenterPosition = {
                left: parseInt(bunny.css('left'), 10) + settings.bunnySize.width / 2,
                top: parseInt(bunny.css('top'), 10) + settings.bunnySize.height / 2
            },
            degree = calculateDegreeMouseWithBunny(event, {
                left: bunnyCenterPosition.left,
                top: bunnyCenterPosition.top
            });
        common.rotateTarget(bunny, degree);
    });

    $(document).on("click", function (event) {
        var bunny = getBunny(),
            bunnyCenterPosition = {
                left: parseInt(bunny.css('left'), 10) + settings.bunnySize.width / 2,
                top: parseInt(bunny.css('top'), 10) + settings.bunnySize.height / 2
            },
            arrowDegree = calculateDegreeMouseWithBunny(event, {
                left: bunnyCenterPosition.left,
                top: bunnyCenterPosition.top
            }),
            arrow = common.generateNewTarget("arrow", arrowNumber);
        // changeImage(bunny);
        common.moveArrow(arrow, {
            left: bunnyCenterPosition.left,
            top: bunnyCenterPosition.top
        }, {
            degree: arrowDegree / 180 * Math.PI,
            speed: settings.arrowSpeed
        });
    });
}

module.exports = {
    registerKeyEvents: registerKeyEvents,
    registerMouseRotateEvents: registerMouseRotateEvents
};

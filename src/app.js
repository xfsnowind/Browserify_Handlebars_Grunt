/*global require, setInterval*/
/*jslint node: true*/
// This file is the enterance and controller of the project
"use strict";
var screen = require("./screen"),
    bunny = require("./bunny"),
    mouse = require("./mouse"),
    settings = require("./settings"),
    common = require("./common"),
    gameScore = require("./gamescore");

function keepGenerateMouse() {
    var newMouse = common.generateNewTarget("mouse");
    mouse.move(newMouse, {
        left: settings.screenSize.width - settings.mouseSize.width,
        top:  Math.floor((Math.random() * (settings.screenSize.height - 60 - settings.mouseSize.height)) + 30)
    });
    gameScore.increaseNumberOfMouse();
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

function registerMouseRotateEvents() {
    $(document).on("mousemove", function (event) {
        var bunny = getBunny(),
            bunnyCenterPosition = {
                left: parseInt(bunny.css('left'), 10) + settings.bunnySize.width / 2,
                top: parseInt(bunny.css('top'), 10) + settings.bunnySize.height / 2
            },
            degree = common.calculateDegreeToBunny(event, bunnyCenterPosition);
        common.rotateTarget(bunny, degree);
    });

    $(document).on("click", function (event) {
        var bunny = getBunny(),
            bunnyCenterPosition = {
                left: parseInt(bunny.css('left'), 10) + settings.bunnySize.width / 2,
                top: parseInt(bunny.css('top'), 10) + settings.bunnySize.height / 2
            },
            arrowDegree = common.calculateDegreeToBunny(event, bunnyCenterPosition),
            arrow = common.generateNewTarget("arrow");
        common.rotateTarget(arrow, arrowDegree);
        gameScore.increaseNumberOfArrow();
        moveArrow(arrow, {
            left: bunnyCenterPosition.left,
            top: bunnyCenterPosition.top
        }, {
            degree: arrowDegree / 180 * Math.PI,
            speed: settings.arrowSpeed
        });
    });
}

screen.init();
registerKeyEvents();
bunny.registerMouseRotateEvents();
setInterval(keepGenerateMouse, settings.mouseGenerateInterval);

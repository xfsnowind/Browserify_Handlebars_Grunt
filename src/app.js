/*global require, document, setInterval*/
/*jslint node: true*/
// This file is the enterance and controller of the project
"use strict";
var $ = require("jquery"),
    lodash = require("lodash"),
    lazy = require("lazy.js"),
    screen = require("./screen"),
    Bunny = require("./bunny"),
    mouse = require("./mouse"),
    settings = require("./settings"),
    common = require("./common"),
    gameScore = require("./gamescore");

function shotMouseCallbackFunc(mouse, arrow) {
    mouse.remove();
    arrow.remove();
    screen.addScore();
    gameScore.increaseNumberOfShotMouse();
}

function arrowReachBoundsCallbackFunc(arrow) {
    arrow.remove();
}

function checkAllArrows(allArrows, shotMouseFunc, reachBoundsFunc) {
    return lazy.generate(function () {
        var allTargetProperties = lazy(allArrows).map(common.getTargetProperties);
        return allTargetProperties.filter(function (targetProperties) {
            return Bunny.arrowShotMouse(targetProperties, shotMouseFunc);
        }).filter(function (targetProperties) {
            return Bunny.arrowReachBounds(targetProperties, reachBoundsFunc);
        });
    });
}

function checkAndAnimate() {
    var test = checkAllArrows(Bunny.getAllArrows(), shotMouseCallbackFunc, arrowReachBoundsCallbackFunc);
    test.each(common.moveTarget);

    // lazy(mouse.getAllMice)
    //     .map(getTargetProperties)
    //     .filter(mouse.mouseReachCastle)
    //     .each(common.moveTarget);

    // setTimeout(checkAndAnimate, settings.mouseMoveInterval);
}

function keepGenerateMouse() {
    common.generateNewTarget("mouse");
    gameScore.increaseNumberOfMouse();
}

function registerKeyEvents() {
    $(document).on("keydown", function (event) {
        var bunny = Bunny.getBunny(),
            keyMovementMap = Bunny.getBunnyNewPosition(bunny);
        if (13 === event.keyCode) {
            event.preventDefault();
        } else if (keyMovementMap[event.keyCode.toString()]) {
            common.moveTarget.apply(null, [lodash.assign({target: bunny}, keyMovementMap[event.keyCode.toString()])]);
        }
    });
}

function registerMouseEvents() {
    $(document).on("mousemove", function (event) {
        var bunny = Bunny.getBunny(),
            bunnyCenterPosition = Bunny.getBunnyCenterPosition(bunny),
            degree = common.calculateDegreeToBunny(event, bunnyCenterPosition);
        common.rotateTarget(bunny, degree);
    });

    $(document).on("click", function (event) {
        var bunny = Bunny.getBunny(),
            bunnyCenterPosition = Bunny.getBunnyCenterPosition(bunny),
            arrowDegree = common.calculateDegreeToBunny(event, bunnyCenterPosition),
            arrow = common.generateNewTarget("arrow");
        common.rotateTarget(arrow, arrowDegree);
        gameScore.increaseNumberOfArrow();
    });
}

screen.init();
registerKeyEvents();
registerMouseEvents();
// setInterval(keepGenerateMouse, settings.mouseGenerateInterval);
// checkAndAnimate();
// setTimeout(checkAndAnimate, settings.mouseMoveInterval);
setTimeout(checkAndAnimate, 1000);

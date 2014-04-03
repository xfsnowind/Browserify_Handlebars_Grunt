/*global require, document, setInterval*/
/*jslint node: true*/
// This file is the enterance and controller of the project
"use strict";
var $ = require("jquery"),
    lodash = require("lodash"),
    lazy = require("lazy.js"),
    screen = require("./screen"),
    Bunny = require("./bunny"),
    Mouse = require("./mouse"),
    settings = require("./settings"),
    common = require("./common"),
    gameScore = require("./gamescore"),
    timerGenerateMouse,
    checkAnimation = true;

function shotMouseCallbackFunc(mouse, arrow) {
    mouse.remove();
    arrow.remove();
    gameScore.increaseNumberOfShotMouse();
    screen.showScore(gameScore.getScore());
}

function arrowReachBoundsCallbackFunc(arrow) {
    arrow.remove();
}


//check all the arrows, if shot mouse and reach bounds, call relevant functions
function checkAllArrows(allArrows, shotMouseFunc, reachBoundsFunc, arrowSpeed) {
    var arrows = lazy(lazy(allArrows).toObject().toArray().map(function (arrow) {
        return $(arrow);
    }));
    arrows.map(function (target) {
        return common.getTargetProperties(target, arrowSpeed);
    }).map(function (targetProperties) {
        return Bunny.arrowShotMouse(targetProperties, shotMouseFunc);
    }).compact()
        .filter(function (targetProperties) {
            return Bunny.arrowReachBounds(targetProperties, reachBoundsFunc);
        }).map(Bunny.getArrowNewPosition)
        .each(common.moveTarget);
}

//calculate the accuracy when game over
function calculateAccuracy() {
    var numberOfArrows = gameScore.getNumberOfArrow();
    return 0 === numberOfArrows ? 0 : (gameScore.getNumberOfShotMouse() / numberOfArrows * 100).toFixed(2);
}

function gameOver() {
    checkAnimation = false;
    clearInterval(timerGenerateMouse);
    $(document).off("mousemove").off("click").off("keydown");
    screen.showGameover(gameScore.getScore(), calculateAccuracy(), startGame);
}

function mouseReachCastleCallbackFunc(mouse) {
    mouse.remove();
    gameScore.reduceHealthValueAndCheck(screen.reduceHealth, gameOver);
}

function checkAllMice(allMice, reachCastleFunc, mouseSpeed) {
    var mice = lazy(lazy(allMice).toObject().toArray().map(function (mouse) {
        return $(mouse);
    }));
    mice.map(function (target) {
        return common.getTargetProperties(target, mouseSpeed);
    }).filter(function (targetProperties) {
        return Mouse.reachCastle(targetProperties, reachCastleFunc);
    }).map(Mouse.getMouseNewPosition)
        .each(common.moveTarget);
}

function checkAndAnimate() {
    checkAllArrows(Bunny.getAllArrows(), shotMouseCallbackFunc, arrowReachBoundsCallbackFunc, settings.arrowSpeed);

    checkAllMice(Mouse.getMice(), mouseReachCastleCallbackFunc, settings.mouseSpeed);
    if (checkAnimation) {
        setTimeout(checkAndAnimate, settings.refreshInterval);
    }
}

function generateMouse() {
    common.generateNewTarget("mouse", {
        left: settings.screenSize.width - settings.mouseSize.width,
        top: Math.floor((Math.random() * (settings.screenSize.height - 60 - settings.mouseSize.height)) + 30)
    });
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
            arrow = common.generateNewTarget("arrow", bunnyCenterPosition);
        common.rotateTarget(arrow, arrowDegree);
        gameScore.increaseNumberOfArrow();
    });
}

function startGame() {
    gameScore.init();
    screen.startGame();
    registerKeyEvents();
    registerMouseEvents();
    timerGenerateMouse = setInterval(generateMouse, settings.mouseGenerateInterval);
    checkAnimation = true;
    checkAndAnimate();
}

module.exports = {
    init: function () {
        screen.showStartPage(startGame);
    }
};

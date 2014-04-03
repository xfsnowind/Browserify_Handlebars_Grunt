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
    checkAnimation = true,
    functions = {
        shotMouseCallbackFunc: function (mouse, arrow) {
            mouse.remove();
            arrow.remove();
            gameScore.increaseNumberOfShotMouse();
            screen.showScore(gameScore.getScore());
        },

        arrowReachBoundsCallbackFunc: function (arrow) {
            arrow.remove();
        },

        //check all the arrows, if shot mouse and reach bounds, call relevant functions
        checkAllArrows: function (allArrows, shotMouseFunc, reachBoundsFunc, arrowSpeed) {
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
        },

        //calculate the accuracy when game over
        calculateAccuracy: function () {
            var numberOfArrows = gameScore.getNumberOfArrow();
            return 0 === numberOfArrows ? 0 : (gameScore.getNumberOfShotMouse() / numberOfArrows * 100).toFixed(2);
        },

        gameOver: function () {
            checkAnimation = false;
            clearInterval(timerGenerateMouse);
            $(document).off("mousemove").off("click").off("keydown");
            screen.showGameover(gameScore.getScore(), functions.calculateAccuracy(), functions.startGame);
        },

        mouseReachCastleCallbackFunc: function (mouse) {
            mouse.remove();
            gameScore.reduceHealthValueAndCheck(screen.reduceHealth, functions.gameOver);
        },

        checkAllMice: function (allMice, reachCastleFunc, mouseSpeed) {
            var mice = lazy(lazy(allMice).toObject().toArray().map(function (mouse) {
                return $(mouse);
            }));
            mice.map(function (target) {
                return common.getTargetProperties(target, mouseSpeed);
            }).filter(function (targetProperties) {
                return Mouse.reachCastle(targetProperties, reachCastleFunc);
            }).map(Mouse.getMouseNewPosition)
                .each(common.moveTarget);
        },

        checkAndAnimate: function () {
            functions.checkAllArrows(Bunny.getAllArrows(), functions.shotMouseCallbackFunc, functions.arrowReachBoundsCallbackFunc, settings.arrowSpeed);

            functions.checkAllMice(Mouse.getMice(), functions.mouseReachCastleCallbackFunc, settings.mouseSpeed);
            if (checkAnimation) {
                setTimeout(functions.checkAndAnimate, settings.refreshInterval);
            }
        },

        generateMouse: function () {
            common.generateNewTarget("mouse", {
                left: settings.screenSize.width - settings.mouseSize.width,
                top: Math.floor((Math.random() * (settings.screenSize.height - 60 - settings.mouseSize.height)) + 30)
            });
            gameScore.increaseNumberOfMouse();
        },

        registerKeyEvents: function () {
            $(document).on("keydown", function (event) {
                var bunny = Bunny.getBunny(),
                    keyMovementMap = Bunny.getBunnyNewPosition(bunny);
                if (13 === event.keyCode) {
                    event.preventDefault();
                } else if (keyMovementMap[event.keyCode.toString()]) {
                    common.moveTarget.apply(null, [lodash.assign({target: bunny}, keyMovementMap[event.keyCode.toString()])]);
                }
            });
        },

        registerMouseEvents: function () {
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
        },

        startGame: function () {
            gameScore.init();
            screen.startGame();
            functions.registerKeyEvents();
            functions.registerMouseEvents();
            timerGenerateMouse = setInterval(functions.generateMouse, settings.mouseGenerateInterval);
            checkAnimation = true;
            functions.checkAndAnimate();
        }
    };

module.exports = {
    init: function () {
        screen.showStartPage(functions.startGame);
    }
};

/*global require, module*/
/*jslint node: true */
"use strict";
var $ = require("jquery"),
    settings = require("./settings"),
    healthValue = 194,
    score = 0,
    numberOfShotMouse = 0,
    numberOfMouse = 0,
    numberOfArrow = 0;

module.exports = {
    init: function () {
        healthValue = 194;
        score = 0;
        numberOfMouse = 0;
        numberOfShotMouse = 0;
        numberOfArrow = 0;
    },

    reduceHealthValueAndCheck : function (displayFunc, callbackFunc) {
        healthValue -= settings.healthReducedWhenMouseHitsCastle;
        displayFunc(settings.healthReducedWhenMouseHitsCastle);
        if (healthValue <= 0) {
            callbackFunc();
        }
    },

    getHealthValue: function () {
        return healthValue;
    },

    getScore: function () {
        return score;
    },

    getNumberOfMouse: function () {
        return numberOfMouse;
    },

    increaseNumberOfMouse: function () {
        numberOfMouse += 1;
    },

    getNumberOfShotMouse: function () {
        return numberOfShotMouse;
    },

    increaseNumberOfShotMouse: function () {
        numberOfShotMouse += 1;
        score += settings.scoreWhenShotMouse;
    },

    getNumberOfArrow: function () {
        return numberOfArrow;
    },

    increaseNumberOfArrow: function () {
        numberOfArrow += 1;
    }
};

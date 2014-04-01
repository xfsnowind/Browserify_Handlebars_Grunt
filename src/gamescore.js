/*global require, module*/
/*jslint node: true */
"use strict";
var $ = require("jquery"),
    healthValue = 194,
    score = 0,
    numberOfShotMouse = 0,
    numberOfMouse = 0,
    numberOfArrow = 0;

module.exports = {
    setHealthValue : function (value) {
        healthValue = value;
    },

    getHealthValue: function () {
        return healthValue;
    },

    setScore : function (value) {
        score = value;
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
    },

    getNumberOfArrow: function () {
        return numberOfArrow;
    },

    increaseNumberOfArrow: function () {
        numberOfArrow += 1;
    }
};

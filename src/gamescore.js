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
        numberOfMouse++;
    },

    getNumberOfShotMouse: function () {
        return numberOfShotMouse;
    },

    increaseNumberOfShotMouse: function () {
        numberOfShotMouse++;
    },

    getNumberOfArrow: function () {
        return numberOfArrow;
    },

    increaseNumberOfArrow: function () {
        numberOfArrow++;
    }
};

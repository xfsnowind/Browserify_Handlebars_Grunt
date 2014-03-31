/*global require, module*/
/*jslint node: true */
"use strict";
var $ = require("jquery"),
    healthValue = 194,
    score = 0;

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
    }
};

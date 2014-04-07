/*global require, document*/
/*jslint node: true*/
"use strict";
var $ = require("jquery"),
    lodash = require("lodash"),
    settings = require("./settings"),
    mouseNameArray = ["", "2", "3", "4"];

function changeMouseImageFrequently(mouse) {
    var index = 0;
    setInterval(function () {
        mouse.css("background-image", 'url("resources/images/badguy' + mouseNameArray[index] + '.png")');
        index += 1;
        if (index >= 4) {
            index = 0;
        }
    }, settings.imageChangeInterval);
}

module.exports = {
    change: changeMouseImageFrequently,

    getMice: function () {
        return $("div.mouse");
    },

    reachCastle: function (mouseProperties, reachCastleFunc) {
        var leftOfMouseHead = mouseProperties.left;

        if (leftOfMouseHead <= settings.castleSize.width / 2) {
            reachCastleFunc(mouseProperties.target);
            return false;
        }
        return true;
    },

    getMouseNewPosition: function (mouseProperties) {
        var newCssStyle = {};
        newCssStyle.left = mouseProperties.left - mouseProperties.speed;
        newCssStyle.top = mouseProperties.top;
        newCssStyle.target = mouseProperties.target;
        return newCssStyle;

    }
};

/*global require, document*/
/*jslint node: true*/
"use strict";
var $ = require("jquery"),
    lodash = require("lodash"),
    settings = require("./settings"),
    mouseNameArray = ["", "2", "3", "4"];

function reachCastle(position) {
    var leftOfArrowHead = position.left;

    if (leftOfArrowHead <= settings.castleSize.width / 2) {
        return true;
    }
    return false;
}

function moveMouse(target, position) {
    var newCssStyle = {
            left: parseInt(position.left, 10),
            top: parseInt(position.top, 10)
        };
    if (reachCastle(newCssStyle)) {
        target.remove();
        return;
    }

    newCssStyle = lodash.mapValues(newCssStyle, function (value, key) {
        if ("left" === key) {
            return value - settings.mouseSpeed + "px";
        }

        if ("top" === key) {
            return value + "px";
        }
    });
    target.css(newCssStyle);
    setTimeout(function () {
        moveMouse(target, newCssStyle);
    }, settings.mouseMoveInterval);
}

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
    move: moveMouse
};

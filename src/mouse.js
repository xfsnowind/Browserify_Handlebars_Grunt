/*global require, document*/
/*jslint node: true*/
"use strict";
var $ = require("jquery"),
    mouseNameArray = ["", "2", "3", "4"],
    mouseSize = require("./settings.js").mouseSize,
    imageChangeInterval = require("./settings.js").mouseChangeImageInterval;

function changeMouseImageFrequently(mouse) {
    var index = 0;
    setInterval(function () {
        mouse.css("background-image", 'url("resources/images/badguy' + mouseNameArray[index] + '.png")');
        index += 1;
        if (index >= 4) {
            index = 0;
        }
    }, imageChangeInterval);
}

module.exports = {
    change: changeMouseImageFrequently
};

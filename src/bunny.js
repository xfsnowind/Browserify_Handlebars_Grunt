/*global require*/
/*jslint node: true*/
'use strict';
var $ = require("jquery"),
    common = require("./common"),
    moveDistance = 10;

function getBunny() {
    return $("#bunny");
}

function registerKeyEvents() {
    var bunny = getBunny(),
        keyMovementMap = {
            37: common.moveTarget(bunny, {
                    left: (0 - moveDistance)
                }),
            38: common.moveTarget(bunny, "up", moveDistance),
            39: common.moveTarget(bunny, "right", moveDistance),
            40: common.moveTarget(bunny, "down", moveDistance)
        };
    $.keydown(function (event) {
        if (13 === event.keyCode) {
            event.preventDefault();
        } else {
            keyMovementMap[event.keyCode]();
        }
    });
}


/*global require, setInterval*/
/*jslint node: true*/
// This file is the enterance and controller of the project
"use strict";
var paint = require("./screen"),
    bunny = require("./bunny"),
    mouse = require("./mouse"),
    settings = require("./settings"),
    common = require("./common"),
    index = {
        number: 0
    };

function keepGenerateMouse() {
    var newMouse = common.generateNewTarget("mouse");
    mouse.move(newMouse, {
        left: settings.screenSize.width - settings.mouseSize.width,
        top:  Math.floor((Math.random() * (settings.screenSize.height - 60 - settings.mouseSize.height)) + 30)
    });
}

paint.init();
bunny.registerKeyEvents();
bunny.registerMouseRotateEvents();
setInterval(keepGenerateMouse, settings.mouseGenerateInterval);

/*global require*/
// This file is the enterance and controller of the project

var paint = require("./paint"),
    bunny = require("./bunny");

paint.init();
bunny.registerKeyEvents();
bunny.registerMouseRotateEvents();

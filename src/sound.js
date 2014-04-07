/*global Audio, module*/
/*jslint node: true*/
"use strict";
var path = "resources/audioes/",
    shoot = new Audio(path + "shoot.mp3"),
    explode = new Audio(path + "explode.mp3"),
    moonlight = new Audio(path + "moonlight.mp3"),
    enemy = new Audio(path + "enemy.mp3");

module.exports = {
    playShoot: function () {
        shoot.play();
    },

    playEnemy: function () {
        enemy.play();
    },

    playExplode: function () {
        explode.play();
    },

    playStartMusic: function () {
        moonlight.play();
    },

    stopStartMusic: function () {
        moonlight.pause();
    }
};

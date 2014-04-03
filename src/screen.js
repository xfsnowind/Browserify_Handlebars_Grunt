/*global require, module*/
/*jslint node: true */
"use strict";
var screenTemplate = require("./templateJS/screen"),
    startPageTemplate = require("./templateJS/start"),
    handlebars = require("handlebars"),
    $ = require("jquery"),
    lodash = require("lodash"),
    gameScore = require("./gamescore.js"),
    html;

function fillHTML(nodeId, content) {
    $(nodeId).empty().append(content);
}

module.exports = {
    startGame: function () {
        var castleTopPotisions = [30, 30, 30, 30],
            scores = [],
            leftmostOfhealth = 3;
        lodash.times(gameScore.getHealthValue(), function (n) {
            scores.push({style: 'left:' + (leftmostOfhealth + n) + 'px;'});
        });
        html = screenTemplate({castles: castleTopPotisions, scores: scores});
        fillHTML("#content", html);
    },

    showScore: function (value) {
        $("#score span").text(value);
    },

    reduceHealth: function (value) {
        $("span.health:gt(-" + parseInt(value, 10) + ")").remove();
    },

    showGameover: function (score, accuracy, playAgainCallbackFunc) {
        $("#gameover").css("display", "block");
        $("#gameover span:first").text(score);
        $("#gameover span:last").text(accuracy);
        $("button.restart").click(function () {
            setTimeout(playAgainCallbackFunc, 0);
        });
    },

    showStartPage: function (startGameCallbackFunc) {
        html = startPageTemplate();
        fillHTML("#content", html);
        $("button.start").click(function () {
            setTimeout(startGameCallbackFunc, 0);
        });
    }
};

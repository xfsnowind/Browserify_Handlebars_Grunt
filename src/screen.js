/*global require, module*/
/*jslint node: true */
"use strict";
var screenTemplate = require("./templateJS/screen"),
    handlebars = require("handlebars"),
    $ = require("jquery"),
    lodash = require("lodash"),
    gameScore = require("./gamescore.js"),
    html;

function fillHTML(nodeId, content) {
    $(nodeId).empty().append(content);
}

module.exports = {
    init: function () {
        var castleTopPotisions = [30, 30, 30, 30],
            scores = [],
            leftmostOfhealth = 3;
        lodash.times(gameScore.getHealthValue(), function (n) {
            scores.push({style: 'left:' + (leftmostOfhealth + n) + 'px;'});
        });
        html = screenTemplate({castles: castleTopPotisions, scores: scores});
        fillHTML("#content", html);
    },

    addScore: function () {
        var score = gameScore.getScore();
        score += 100;
        gameScore.setScore(score);
        $("#score span").text(score);
    },

    reduceHealth: function () {
        $("span.health:gt(-20)").remove();
    }
};

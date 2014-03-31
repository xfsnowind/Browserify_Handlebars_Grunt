/*global require, module*/
/*jslint node: true */
"use strict";
var screenTemplate = require("./templateJS/screen"),
    handlebars = require("handlebars"),
    $ = require("jquery"),
    lodash = require("lodash"),
    gameScore = require("./gamescore.js"),
    html;

function fillHealthbar() {
    var healthbar = $("#healthbar").detach(),
        leftmostOfhealth = 3;
    lodash.times(gameScore.getHealthValue(), function (n) {
        healthbar.append($("<span></span>").attr( "class", "health").css("left", leftmostOfhealth + n + "px"));
    });
    healthbar.appendTo("#screen");
}

// handlebars.registerPartial("part", partial);
function fillHTML(nodeId, content) {
    $(nodeId).empty().append(content);
}

module.exports = {
    init: function () {
        var castleTopPotisions = [30, 30, 30, 30],
            content = lodash.map(castleTopPotisions, function (index) {
                return {style: 'top: ' + index + 'px'};
            });
        html = screenTemplate({castles: content});
        fillHTML("#content", html);
        fillHealthbar();
    },

    addScore: function () {
        var score = gameScore.getScore();
        score += 100;
        gameScore.setScore(score);
        $("#score span").text(score);
    }
};

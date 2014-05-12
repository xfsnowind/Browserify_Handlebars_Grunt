/*global require, document*/
/*jslint node: true*/
'use strict';
var $ = require("jquery"),
    lodash = require("lodash"),
    common = require("./common"),
    settings = require("./settings");

function calculateArrowHeadProperty(arrowProperties) {
    //here the degree is supposed to be radians, not degree
    var leftOfArrowHead,
        topOfArrowHead,
        leftOfArrowCenter,
        topOfArrowCenter,
        degree = arrowProperties.degree,
        sinValue = Math.sin(degree),
        cosValue = Math.cos(degree),
        arrowWidth = settings.arrowSize.width,
        arrowHeight = settings.arrowSize.height,
        left = arrowProperties.left,
        top = arrowProperties.top;

    if (degree <= Math.PI / 2 && degree > 0) {
        leftOfArrowHead = left + cosValue * (arrowWidth + settings.arrowSpeed) + sinValue * arrowHeight;
        leftOfArrowCenter = left + cosValue * (arrowWidth + settings.arrowSpeed) / 2 + sinValue * arrowHeight;
        topOfArrowHead = top + sinValue * arrowWidth + cosValue * arrowHeight;
        topOfArrowCenter = top + sinValue * arrowWidth / 2 + cosValue * arrowHeight;
    } else if (degree <= 0 && degree > -Math.PI / 2) {
        leftOfArrowHead = left + cosValue * (arrowWidth + settings.arrowSpeed) + sinValue * arrowHeight;
        leftOfArrowCenter = left + cosValue * (arrowWidth + settings.arrowSpeed) / 2 + sinValue * arrowHeight;
        topOfArrowHead = top + sinValue * settings.arrowSpeed;
        topOfArrowCenter = top + sinValue * settings.arrowSpeed / 2;
    } else if (degree <= -Math.PI / 2) {
        leftOfArrowHead = left;
        leftOfArrowCenter = left / 2;
        topOfArrowHead = top + sinValue * settings.arrowSpeed;
        topOfArrowCenter = top / 2 + sinValue * settings.arrowSpeed;
    } else if (degree > Math.PI / 2) {
        leftOfArrowHead = left;
        leftOfArrowCenter = left / 2;
        topOfArrowHead = top + sinValue * arrowWidth + cosValue * settings.arrowSpeed;
        topOfArrowCenter = top + sinValue * arrowWidth / 2 + cosValue * settings.arrowSpeed;
    }
    return {
        leftOfArrowHead: leftOfArrowHead,
        leftOfArrowCenter: leftOfArrowCenter,
        topOfArrowHead: topOfArrowHead,
        topOfArrowCenter: topOfArrowCenter
    };
}


function changeImage(target) {
    target.css("background-image", 'url("resources/images/dude2.png")');
    setTimeout(function () {
        target.css("background-image", 'url("resources/images/dude.png")');
    }, 200);
}

module.exports = {
    getBunny: function () {
        return $("#bunny");
    },

    getAllArrows: function () {
        return $("div.arrow");
    },

    getBunnyCenterPosition: function (bunny) {
        return {
            left: parseInt(bunny.css('left'), 10) + settings.bunnySize.width / 2,
            top: parseInt(bunny.css('top'), 10) + settings.bunnySize.height / 2
        };
    },

    getBunnyNewPosition: function (bunny) {
        var bunnyPostion = {
            left: parseInt(bunny.css('left'), 10),
            top: parseInt(bunny.css('top'), 10)
        },
            moveToLeft = {
                left: bunnyPostion.left - settings.bunnyMoveSpeed,
                top: bunnyPostion.top
            },
            moveToTop = {
                left: bunnyPostion.left,
                top: bunnyPostion.top - settings.bunnyMoveSpeed
            },
            moveToRight = {
                left: bunnyPostion.left + settings.bunnyMoveSpeed,
                top: bunnyPostion.top
            },
            moveToDown = {
                left: bunnyPostion.left,
                top: bunnyPostion.top + settings.bunnyMoveSpeed
            };

        return {
            // left key
            37: moveToLeft,
            65: moveToLeft,
            // up key
            38: moveToTop,
            87: moveToTop,
            // right key
            39: moveToRight,
            68: moveToRight,
            // down key
            83: moveToDown,
            40: moveToDown
        };
    },

    arrowShotMouse: function arrowShotMouse(arrowProperties, shotMouseFunc) {
        var arrowProperty = calculateArrowHeadProperty(arrowProperties),
            foundMouse,
            mice = $("div.mouse");

        foundMouse = lodash.find(mice, function (mouse) {
            var elem = $(mouse),//.detach(),
                mouseLeft = parseInt(elem.css("left"), 10),
                mouseTop = parseInt(elem.css("top"), 10);
            if ((arrowProperty.leftOfArrowHead >= mouseLeft &&
                 arrowProperty.leftOfArrowHead <= mouseLeft + elem.outerWidth() &&
                 arrowProperty.topOfArrowHead >= mouseTop &&
                 arrowProperty.topOfArrowHead <= mouseTop + elem.outerHeight()) ||
                    (arrowProperty.leftOfArrowCenter >= mouseLeft &&
                     arrowProperty.leftOfArrowCenter <= mouseLeft + elem.outerWidth() &&
                     arrowProperty.topOfArrowCenter >= mouseTop &&
                     arrowProperty.topOfArrowCenter <= mouseTop + elem.outerHeight())) {
                return true;
            }
            return false;
        });
        if (foundMouse) {
            shotMouseFunc(foundMouse, arrowProperties.target);
            return undefined;
        }
        return lodash.assign({
            leftOfArrowHead: arrowProperty.leftOfArrowHead,
            topOfArrowHead: arrowProperty.topOfArrowHead
        }, arrowProperties);
    },

    arrowReachBounds: function (arrowProperties, reachBoundFunc) {
        if (arrowProperties.leftOfArrowHead <= 0 || arrowProperties.leftOfArrowHead >= settings.screenSize.width || arrowProperties.topOfArrowHead <= 0 || arrowProperties.topOfArrowHead >= settings.screenSize.height) {
            reachBoundFunc(arrowProperties.target);
            return false;
        }
        return true;
    },

    getArrowNewPosition: function (arrowProperties) {
        var newCssStyle = {};
        if (arrowProperties.degree) {
            newCssStyle.left = arrowProperties.left + Math.cos(arrowProperties.degree) * arrowProperties.speed;
            newCssStyle.top = arrowProperties.top + Math.sin(arrowProperties.degree) * arrowProperties.speed;
        } else {
            newCssStyle.left = arrowProperties.left + arrowProperties.speed;
            newCssStyle.top = arrowProperties.top + arrowProperties.speed;
        }
        newCssStyle.target = arrowProperties.target;
        return newCssStyle;
    }
};

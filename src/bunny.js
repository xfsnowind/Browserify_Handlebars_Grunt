/*global require, document*/
/*jslint node: true*/
'use strict';
var $ = require("jquery"),
    lodash = require("lodash"),
    common = require("./common"),
    settings = require("./settings"),
    screen = require("./screen"),
    gameScore = require("./gamescore");

function arrowReachBounds(targetProperties) {
    //here the degree is supposed to be radians, not degree
    var degree = targetProperties.degree,
        sinValue = Math.sin(degree),
        cosValue = Math.cos(degree),
        arrowWidth = settings.arrowSize.width,
        arrowHeight = settings.arrowSize.height,
        left = targetProperties.left,
        top = targetProperties.top,
        leftOfArrowHead,
        topOfArrowHead;

    if (degree <= Math.PI / 2 && degree > 0) {
        leftOfArrowHead = left + cosValue * (arrowWidth + settings.arrowSpeed) + sinValue * arrowHeight;
        topOfArrowHead = top + sinValue * arrowWidth + cosValue * arrowHeight;
    } else if (degree <= 0 && degree > -Math.PI / 2) {
        leftOfArrowHead = left + cosValue * (arrowWidth + settings.arrowSpeed) + sinValue * arrowHeight;
        topOfArrowHead = top + sinValue * settings.arrowSpeed;
    } else if (degree <= -Math.PI / 2) {
        leftOfArrowHead = left;
        topOfArrowHead = top + sinValue * settings.arrowSpeed;
    } else if (degree > Math.PI / 2) {
        leftOfArrowHead = left;
        topOfArrowHead = top + sinValue * arrowWidth + cosValue * arrowHeight;
    }

    if (leftOfArrowHead <= 0 || leftOfArrowHead >= arrowWidth || topOfArrowHead <= 0 || topOfArrowHead >= arrowHeight) {
        return false;
    }
    return true;
}

function calculateArrowHeadProperty(targetProperties) {
    var leftOfArrowHead,
        topOfArrowHead,
        leftOfArrowCenter,
        topOfArrowCenter,
        degree = targetProperties.degree,
        sinValue = Math.sin(degree),
        cosValue = Math.cos(degree),
        arrowWidth = settings.arrowSize.width,
        arrowHeight = settings.arrowSize.height,
        left = targetProperties.left,
        top = targetProperties.top;

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

function arrowShotMouse(targetProperties, shotMouseFunc) {
    var arrowProperty = calculateArrowHeadProperty(targetProperties),
        mouse,
        mouses = $("div.mouse");

    mouse = lodash.find(mouses, function () {
        var elem = $(this).detach(),
            offset = elem.offset();
        if ((arrowProperty.leftOfArrowHead >= offset.left &&
             arrowProperty.leftOfArrowHead <= offset.left + elem.outerWidth() &&
             arrowProperty.topOfArrowHead >= offset.top &&
             arrowProperty.topOfArrowHead <= offset.top + elem.outerHeight()) ||
                (arrowProperty.leftOfArrowCenter >= offset.left &&
                 arrowProperty.leftOfArrowCenter <= offset.left + elem.outerWidth() &&
                 arrowProperty.topOfArrowCenter >= offset.top &&
                 arrowProperty.topOfArrowCenter <= offset.top + elem.outerHeight())) {
            return $(this);
        }
    });
    if (mouse) {
        shotMouseFunc(mouse, targetProperties.target);
        return false;
    }
    // $(mouses).each(function () {
    //     var elem = $(this),
    //         offset = elem.offset();
    //     if ((leftOfArrowHead >= offset.left &&
    //          leftOfArrowHead <= offset.left + elem.outerWidth() &&
    //          topOfArrowHead >= offset.top &&
    //          topOfArrowHead <= offset.top + elem.outerHeight()) ||
    //             (leftOfArrowCenter >= offset.left &&
    //              leftOfArrowCenter <= offset.left + elem.outerWidth() &&
    //              topOfArrowCenter >= offset.top &&
    //              topOfArrowCenter <= offset.top + elem.outerHeight())) {
    //         mouse = $(this);
    //     }
    // });

    return true;
}

// function moveArrow(target, position, properties) {
//     var moveX = Math.cos(properties.degree) * settings.arrowSpeed,
//         moveY = sinValuedegree) * settings.arrowSpeed,
//         newCssStyle = {
//             left: parseInt(position.left, 10),
//             top: parseInt(position.top, 10)
//         },
//         mouse = shotMouse(newCssStyle, properties);

//     if (mouse) {
//         mouse.remove();
//         target.remove();
//         screen.addScore();
//         gameScore.increaseNumberOfShotMouse();
//         return;
//     }

//     if (reachBounds(newCssStyle, properties)) {
//         target.remove();
//         return;
//     }

//     newCssStyle = lodash.mapValues(newCssStyle, function (value, key) {
//         if ("left" === key) {
//             return value + moveX + "px";
//         }

//         if ("top" === key) {
//             return value + moveY + "px";
//         }
//     });
//     target.css(newCssStyle);
//     setTimeout(function () {
//         moveArrow(target, newCssStyle, properties);
//     }, settings.arrowMoveInterval);
// }

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
        };
        return {
            37: {
                left: bunnyPostion.left - settings.bunnyMoveSpeed,
                top: bunnyPostion.top
            },
            38: {
                left: bunnyPostion.left,
                top: bunnyPostion.top - settings.bunnyMoveSpeed
            },
            39: {
                left: bunnyPostion.left + settings.bunnyMoveSpeed,
                top: bunnyPostion.top
            },
            40: {
                left: bunnyPostion.left,
                top: bunnyPostion.top + settings.bunnyMoveSpeed
            }
        };
    }
};

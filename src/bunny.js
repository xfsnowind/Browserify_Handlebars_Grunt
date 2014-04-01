/*global require, document*/
/*jslint node: true*/
'use strict';
var $ = require("jquery"),
    lodash = require("lodash"),
    common = require("./common"),
    settings = require("./settings"),
    screen = require("./screen"),
    gameScore = require("./gamescore");

function getBunny() {
    return $("#bunny");
}

function getBunnyPosition(bunny) {
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

function reachBounds(position, properties) {
    //here the degree is supposed to be radians, not degree
    var leftOfArrowHead,
        topOfArrowHead;
    if (properties.degree <= Math.PI / 2 && properties.degree > 0) {
        leftOfArrowHead = position.left + Math.cos(properties.degree) * (settings.arrowSize.width + properties.speed) + Math.sin(properties.degree) * settings.arrowSize.height;
        topOfArrowHead = position.top + Math.sin(properties.degree) * settings.arrowSize.width + Math.cos(properties.degree) * settings.arrowSize.height;
    } else if (properties.degree <= 0 && properties.degree > -Math.PI / 2) {
        leftOfArrowHead = position.left + Math.cos(properties.degree) * (settings.arrowSize.width + properties.speed) + Math.sin(properties.degree) * settings.arrowSize.height;
        topOfArrowHead = position.top + Math.sin(properties.degree) * properties.speed;
    } else if (properties.degree <= -Math.PI / 2) {
        leftOfArrowHead = position.left;
        topOfArrowHead = position.top + Math.sin(properties.degree) * properties.speed;
    } else if (properties.degree > Math.PI / 2) {
        leftOfArrowHead = position.left;
        topOfArrowHead = position.top + Math.sin(properties.degree) * settings.arrowSize.width + Math.cos(properties.degree) * settings.arrowSize.height;
    }

    if (leftOfArrowHead <= 0 || leftOfArrowHead >= settings.screenSize.width || topOfArrowHead <= 0 || topOfArrowHead >= settings.screenSize.height) {
        return true;
    }
    return false;
}

function shotMouse(position, properties) {
    var leftOfArrowHead,
        topOfArrowHead,
        leftOfArrowCenter,
        topOfArrowCenter,
        mouse = false,
        mouses = $("div.mouse");

    if (properties.degree <= Math.PI / 2 && properties.degree > 0) {
        leftOfArrowHead = position.left + Math.cos(properties.degree) * (settings.arrowSize.width + properties.speed) + Math.sin(properties.degree) * settings.arrowSize.height;
        leftOfArrowCenter = position.left + Math.cos(properties.degree) * (settings.arrowSize.width + properties.speed) / 2 + Math.sin(properties.degree) * settings.arrowSize.height;
        topOfArrowHead = position.top + Math.sin(properties.degree) * settings.arrowSize.width + Math.cos(properties.degree) * settings.arrowSize.height;
        topOfArrowCenter = position.top + Math.sin(properties.degree) * settings.arrowSize.width / 2 + Math.cos(properties.degree) * settings.arrowSize.height;
    } else if (properties.degree <= 0 && properties.degree > -Math.PI / 2) {
        leftOfArrowHead = position.left + Math.cos(properties.degree) * (settings.arrowSize.width + properties.speed) + Math.sin(properties.degree) * settings.arrowSize.height;
        leftOfArrowCenter = position.left + Math.cos(properties.degree) * (settings.arrowSize.width + properties.speed) / 2 + Math.sin(properties.degree) * settings.arrowSize.height;
        topOfArrowHead = position.top + Math.sin(properties.degree) * properties.speed;
        topOfArrowCenter = position.top + Math.sin(properties.degree) * properties.speed / 2;
    } else if (properties.degree <= -Math.PI / 2) {
        leftOfArrowHead = position.left;
        leftOfArrowCenter = position.left / 2;
        topOfArrowHead = position.top + Math.sin(properties.degree) * properties.speed;
        topOfArrowCenter = position.top / 2 + Math.sin(properties.degree) * properties.speed;
    } else if (properties.degree > Math.PI / 2) {
        leftOfArrowHead = position.left;
        leftOfArrowCenter = position.left / 2;
        topOfArrowHead = position.top + Math.sin(properties.degree) * settings.arrowSize.width + Math.cos(properties.degree) * settings.arrowSize.height;
        topOfArrowCenter = position.top + Math.sin(properties.degree) * settings.arrowSize.width / 2 + Math.cos(properties.degree) * settings.arrowSize.height;
    }

    $(mouses).each(function () {
        var elem = $(this),
            offset = elem.offset();
        if ((leftOfArrowHead >= offset.left &&
             leftOfArrowHead <= offset.left + elem.outerWidth() &&
             topOfArrowHead >= offset.top &&
             topOfArrowHead <= offset.top + elem.outerHeight()) ||
                (leftOfArrowCenter >= offset.left &&
                 leftOfArrowCenter <= offset.left + elem.outerWidth() &&
                 topOfArrowCenter >= offset.top &&
                 topOfArrowCenter <= offset.top + elem.outerHeight())) {
            mouse = $(this);
        }
    });

    return mouse;
}

function moveArrow(target, position, properties) {
    var moveX = Math.cos(properties.degree) * properties.speed,
        moveY = Math.sin(properties.degree) * properties.speed,
        newCssStyle = {
            left: parseInt(position.left, 10),
            top: parseInt(position.top, 10)
        },
        mouse = shotMouse(newCssStyle, properties);

    if (mouse) {
        mouse.remove();
        target.remove();
        screen.addScore();
        gameScore.increaseNumberOfShotMouse();
        return;
    }

    if (reachBounds(newCssStyle, properties)) {
        target.remove();
        return;
    }

    newCssStyle = lodash.mapValues(newCssStyle, function (value, key) {
        if ("left" === key) {
            return value + moveX + "px";
        }

        if ("top" === key) {
            return value + moveY + "px";
        }
    });
    target.css(newCssStyle);
    setTimeout(function () {
        moveArrow(target, newCssStyle, properties);
    }, settings.arrowMoveInterval);
}

function registerKeyEvents() {
    $(document).on("keydown", function (event) {
        var bunny = getBunny(),
            keyMovementMap = getBunnyPosition(bunny);
        if (13 === event.keyCode) {
            event.preventDefault();
        } else if (keyMovementMap[event.keyCode.toString()]) {
            common.moveTarget.apply(null, [bunny, keyMovementMap[event.keyCode.toString()]]);
        }
    });
}

function changeImage(target) {
    target.css("background-image", 'url("resources/images/dude2.png")');
    setTimeout(function () {
        target.css("background-image", 'url("resources/images/dude.png")');
    }, 200);
}

module.exports = {
    registerKeyEvents: registerKeyEvents,
    registerMouseRotateEvents: registerMouseRotateEvents
};

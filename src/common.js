var lodash = require("lodash"),
    screenSize = require("./settings.js").screenSize,
    bunnySize = require("./settings.js").bunnySize,
    externalFuncs = {
    moveTarget: function (target, newPostion) {
                    if (newPostion.left <= 0) {
                        newPostion.left = 0;
                    } else if (newPostion.left >= screenSize.width - bunnySize.width) {
                        newPostion.left = screenSize.width - bunnySize.width;
                    }

                    if (newPostion.top <= 0) {
                        newPostion.top = 0;
                    } else if (newPostion.top >= screenSize.height - bunnySize.height) {
                        newPostion.top = screenSize.height - bunnySize.height;
                    }

                    lodash.forEach(newPostion, function (value, key) {
                        value += "px";
                    });
                    target.css(newPostion);
                }
};

module.exports = externalFuncs;

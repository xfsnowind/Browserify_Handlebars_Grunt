var lodash = require("lodash"),
    externalFuncs = {
    moveTarget: function (target, newPostion) {
                    if (newPostion.left <= 0) {
                        newPostion.left = 0;
                    }

                    if (newPostion.top <= 0) {
                        newPostion.top = 0;
                    }
                    lodash.forEach(newPostion, function (value, key) {
                        value += "px";
                    });
                    target.css(newPostion);
                }
};

module.exports = externalFuncs;

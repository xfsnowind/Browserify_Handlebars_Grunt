var screenTemplate = require("../templateJS/screen"),
    handlebars = require("handlebars"),
    $ = require("jquery"),
    lodash = require("lodash"),
    html;

// handlebars.registerPartial("part", partial);

function fillHTML(nodeId, content) {
    $(nodeId).empty().append(content);
}

function fillScreen() {
    var castleTopPotisions = [30, 30, 30, 30],
        content = lodash.map(castleTopPotisions, function (index) {
            return {style: 'top: ' + index + 'px'};
        });
    html = screenTemplate({castles: content});
    fillHTML("#content", html);
}

module.exports.init= fillScreen;

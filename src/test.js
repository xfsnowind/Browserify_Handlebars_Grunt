var template = require("../templateJS/template"),
    partial = require("../templateJS/partial"),
    handlebars = require("handlebars"),
    $ = require("jquery");

handlebars.registerPartial("part", partial);

module.exports.test = function () {
    console.log("test");
    $("#template").html(template({title: "title", name: "part"}));
    $("#test").html("ttttt");
};

var template = require("./templateJS/template"),
    partial = require("./templateJS/partial"),
    handlebars = require("handlebars");

handlebars.registerPartial("part", partial);

module.exports.test = function () {
    console.log("test");
    document.body.innerHTML = template({title: "title", name: "part"});
};

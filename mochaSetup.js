const { JSDOM } = require("jsdom");
const Handlebars = require("handlebars");
const fs = require("fs");

const dom = new JSDOM('<div class="app"></div>', {
  url: "http://localhost:3000",
});

global.dom = dom;
global.window = dom.window;

global.document = dom.window.document;
global.DocumentFragment = dom.window.DocumentFragment;

global.FormData = window.FormData;

require.extensions[".hbs"] = function (module, filename) {
  const contents = fs.readFileSync(filename, "utf-8");

  module.exports = Handlebars.compile(contents);
};
require.extensions[".scss"] = function () {
  module.exports = () => ({});
};

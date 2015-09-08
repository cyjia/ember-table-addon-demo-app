'use strict';

var MarkdownProcessor = require('./lib/markdown-processor');
module.exports = {
  name: 'ember-cli-md-template',

  preprocessTree: function(type, tree) {
    if (type === 'template') {
      return MarkdownProcessor(tree);
    }
    return tree;
  }
};

'use strict';

var Filter = require('broccoli-filter');
var RSVP = require('rsvp');
var marked = require('marked');
var renderer = new marked.Renderer();

function MarkdownProcessor(inputTree, options) {
  if (!(this instanceof MarkdownProcessor)) {
    return new MarkdownProcessor(inputTree, options);
  }

  this.inputTree = inputTree;

  renderer.list = function(body, ordered) {
    return body;
  };
  marked.setOptions({renderer: renderer});
}


MarkdownProcessor.prototype = Object.create(Filter.prototype);
MarkdownProcessor.prototype.constructor = MarkdownProcessor;

MarkdownProcessor.prototype.extensions = ['md'];
MarkdownProcessor.prototype.targetExtension = 'hbs';

MarkdownProcessor.prototype.processString = function (markdownString) {
  return new RSVP.Promise(function (resolve, reject) {
    marked(markdownString, function (err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
};

module.exports = MarkdownProcessor;

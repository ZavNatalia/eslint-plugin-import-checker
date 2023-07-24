"use strict";
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "feature sliced relative path checker",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        // example app/entities/Article
        const importTo = node.source.value;
        // example /home/natalia/Domains/production-project/src/entities/Article/model/types/article.ts
        const fromFilename = context.getFilename();

        context.report(node, 'Path checker error')
      }
    };
  },
};

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../');
}


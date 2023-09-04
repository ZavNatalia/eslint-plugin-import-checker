"use strict";

const {isPathRelative} = require("../helpers");

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "import components via public api",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

    const availableLayers = {
      'entities': 'entities',
      'features': 'features',
      'pages': 'pages',
      'widgets': 'widgets'
    }

    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        const importTo = alias ? value.replace(`${alias}/`, '') : value;
        if (isPathRelative(importTo)) {
          return;
        }
        // [entities, articles, model, types]
        const segments = importTo.split('/');
        console.log('segments', segments);
        const layer = segments[0];
        console.log('layer', layer);
        if (!availableLayers[layer]) {
          return;
        }

        const isImportNotFromPublicApi = segments.length > 2;
        if (isImportNotFromPublicApi) {
          context.report(node, 'Absolute import is only allowed from Public API (index.ts)');
        }
      }
    };
  },
};

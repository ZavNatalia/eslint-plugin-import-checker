"use strict";

const path = require("path");
const {isPathRelative} = require("../helpers");

module.exports = {
  meta: {
    type: null,
    docs: {
      description: "feature sliced relative path checker",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [
      {
        type: "object",
        properties: {
          alias: {
            type: "string"
          }
        }
      }
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || "";
    return {
      ImportDeclaration(node) {
        try {
          const value = node.source.value;
          const importTo = alias ? value.replace(`${alias}/`, "") : value;
          const fromFilename = context.getFilename();

          if (shouldBeRelative(fromFilename, importTo)) {
            context.report({
              node,
              message: "Within a single slice, all paths must be relative",
              fix: (fixer) => {
                const normalizedPath = getNormalizedCurrentFilePath(fromFilename)
                    .split('/')
                    .slice(0, -1)
                    .join('/');
                let relativePath = path.relative(normalizedPath, `/${importTo}`);
                if (!relativePath.startsWith('.')) {
                  relativePath = './' + relativePath;
                }
                return fixer.replaceText(node.source, `'${relativePath}'`)
              }
            });
          }
        } catch (e) {
          console.log('Error: ', e);
        }
      }
    };
  },
};

const layers = {
  "shared": "shared",
  "entities": "entities",
  "features": "features",
  "pages": "pages",
  "widgets": "widgets"
}

function getNormalizedCurrentFilePath(currentFilePath) {
  const normalizedPath = path.toNamespacedPath(currentFilePath);
  return normalizedPath?.split("src")[1];
}

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false;
  }

  const toArray = to.split("/");
  const toLayer = toArray[0];
  const toSlice = toArray[1];

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const projectFrom = getNormalizedCurrentFilePath(from);

  const fromArray = projectFrom?.split(/\\|\//)
  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }
  return fromSlice === toSlice && toLayer === fromLayer;
}


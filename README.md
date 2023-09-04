# Import checker plugin

Plugin checks absolute and relative paths in the project

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-import-checker-plugin`:

```sh
npm install eslint-plugin-import-checker-plugin --save-dev
```

## Usage

Add `import-checker-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "import-checker-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "import-checker-plugin/rule-name": ["error", { "alias": "@" }],
        "import-checker-plugin/public-api-imports": ["error", { "alias": "@" }]
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                             | Description                          |
|:-------------------------------------------------| :----------------------------------- |
| [path-checker](docs/rules/path-checker.md)       | Within a single slice, all paths must be relative |
| [public-api-imports](docs/rules/public-api-imports.md) | Absolute import is only allowed from Public API (index.ts) |

<!-- end auto-generated rules list -->



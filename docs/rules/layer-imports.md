# lower layers should be used in higher layers (`layer-imports`)

## Rule Details

A layer can only import underlying layers into itself (shared, entities, features, widgets, pages, app)

Examples of **incorrect** code for this rule:

```js
import { addCommentFormActions, addCommentFormReducer } from "@/features/Article"
```

Examples of **correct** code for this rule:

```js
import { addCommentFormActions, addCommentFormReducer } from "@/shared/Button.tsx"
```

### Options



You can add any alias and ignore import patterns:

    rules: {
        "import-checker-plugin/layer-imports": [
            "error",
            {
                alias: "@",
                ignoreImportPatterns: ["**/StoreProvider"],
            },
        ],
    }


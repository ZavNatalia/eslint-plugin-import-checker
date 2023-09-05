# import components via public api (`public-api-imports`)

## Rule Details

Absolute import is only allowed from Public API (index.ts).

Examples of **incorrect** code for this rule:

```js
import { addCommentFormActions, addCommentFormReducer } from "@/entities/Article/model/slices/addCommentFormSlice"
```
```js
import { addCommentFormActions, addCommentFormReducer } from "@/entities/Article/testing/file.tsx"
```

Examples of **correct** code for this rule:

```js
import { addCommentFormActions, addCommentFormReducer } from "@/entities/Article"
```
```js
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice"
```
```js
import { addCommentFormActions, addCommentFormReducer } from "@/entities/Article/testing"
```

### Options

You can add any alias or test files patterns:

    rules: {
        'import-checker-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.ts', '**/*.story.*', '**/StoreDecorator.tsx'],
            },
        ],
    }

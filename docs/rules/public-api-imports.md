# import components via public api (`public-api-imports`)

## Rule Details

Absolute import is only allowed from Public API (index.ts).

Examples of **incorrect** code for this rule:

```js

import { addCommentFormActions, addCommentFormReducer } from "@/entities/Article/model/slices/addCommentFormSlice"

```

Examples of **correct** code for this rule:

```js
import { addCommentFormActions, addCommentFormReducer } from "@/entities/Article"
```
```js
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice"
```

### Options

You can add any alias:

    rules: {
        "import-checker-plugin/public-api-imports": ["error", {alias: "@"}]
    }

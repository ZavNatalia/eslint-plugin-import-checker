# Feature sliced relative path checker (`import-checker-plugin/path-checker`)

<!-- end auto-generated rule header -->

## Rule Details

Within a single slice, all paths must be relative.

Examples of **incorrect** code for this rule:

```js
import { addCommentFormActions, addCommentFormReducer } from "entities/Article/model/slices/addCommentFormSlice"
```

Examples of **correct** code for this rule:

```js
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice"
```

### Options

You can add any alias:

    rules: {
        "import-checker-plugin/path-checker": ["error", { alias: "@" }]
    }
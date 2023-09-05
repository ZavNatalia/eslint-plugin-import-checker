const rule = require("../../../lib/rules/layer-imports"),
    RuleTester = require("eslint").RuleTester;

const aliasOptions = [
  {
    alias: '@'
  }
]
const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: '/home/natalia/ReactProjects/production-project/src/features/Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/features/Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/app/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/widgets/pages',
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/app/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/index.tsx',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/entities/Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/entities/Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
  ],

  invalid: [
    {
      filename: '/home/natalia/ReactProjects/production-project/src/entities/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
      errors: [{ message: "A layer can only import underlying layers into itself (shared, entities, features, widgets, pages, app)"}],
      options: aliasOptions,
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/features/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "A layer can only import underlying layers into itself (shared, entities, features, widgets, pages, app)"}],
      options: aliasOptions,
    },
    {
      filename: '/home/natalia/ReactProjects/production-project/src/entities/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "A layer can only import underlying layers into itself (shared, entities, features, widgets, pages, app)"}],
      options: aliasOptions,
    },
  ],

});
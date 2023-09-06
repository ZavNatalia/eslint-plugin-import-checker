"use strict";

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: "module"}
});

const aliasOptions = [
  {
    alias: "@"
  }
]

ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "/home/natalia/ReactProjects/production-project/src/entities/file.test.ts",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: "@",
        testFilesPatterns: ["**/*.test.ts", "**/*.test.ts", "**/StoreDecorator.tsx"]
      }],
    },
    {
      filename: "/home/natalia/ReactProjects/production-project/src/entities/StoreDecorator.tsx",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: "@",
        testFilesPatterns: ["**/*.test.ts", "**/*.test.ts", "**/StoreDecorator.tsx"]
      }],
    }
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
      errors: [{messageId: "PUBLIC_ERROR"}],
      options: aliasOptions,
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
    },
    {
      filename: "/home/natalia/ReactProjects/production-project/src/entities/StoreDecorator.tsx",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      errors: [{messageId: "PUBLIC_ERROR"}],
      options: [{
        alias: "@",
        testFilesPatterns: ["**/*.test.ts", "**/*.test.ts", "**/StoreDecorator.tsx"]
      }],
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
    },
    {
      filename: "/home/natalia/ReactProjects/production-project/src/entities/forbidden.ts",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [{messageId: "TESTING_PUBLIC_ERROR"}],
      options: [{
        alias: "@",
        testFilesPatterns: ["**/*.test.ts", "**/*.test.ts", "**/StoreDecorator.tsx"]
      }],
    }
  ],
});

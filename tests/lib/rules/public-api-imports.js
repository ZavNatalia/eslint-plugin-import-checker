/**
 * @fileoverview import components via public api
 * @author Natalia
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

const aliasOptions = [
  {
    alias: '@'
  }
]

ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';",
      errors: [],
    },
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
      errors: [{message: "Absolute import is only allowed from Public API (index.ts)"}],
      options: aliasOptions,
    }
  ],
});

/**
 * @fileoverview feature sliced relative path checker
 * @author Natalia
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: '/home/natalia/ReactProjects/production-project/src/entities/Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [{ message: "Within a single slice, all paths must be relative" }],
      options: [
        {
          alias: '@',
        }
      ]
    },
  ],

  invalid: [
    {
      filename: '/home/natalia/ReactProjects/production-project/src/entities/Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ message: "Within a single slice, all paths must be relative" }],
    },
  ],
});

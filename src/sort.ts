'use strict';
import {
  Range,
  TextDocument,
  TextDocumentWillSaveEvent,
  TextEdit,
  window,
} from 'vscode';
import { extname } from 'path';
import {
  getLanguagesSetting,
  getOnSaveSetting,
  registerWillSaveTextDocument,
  unregisterWillSaveTextDocument,
} from './registration';
import sorts from './sorts';

function sort(document: any) {
//   if (!getLanguagesSetting().some(l => document.languageId.includes(l))) {
//     return;
//   }
  const extension: string = extname(document.fileName).substring(1);

  let text = document.getText().split(/\n/);

  if (extension === 'js' || extension === 'tsx') {
      return sorts[extension](text);
  }
}

function getMaxRange(): Range {
  return new Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
}

export function sortImports() {
  const { activeTextEditor: editor, activeTextEditor: document} = window;

  const sortedText = sort(document);
  if (!sortedText) {
    return;
  }

  return editor!.edit(edit => {
    edit.replace(getMaxRange(), sortedText);
  });
}

export function sortImportsOnSave({
  document,
  waitUntil,
}: TextDocumentWillSaveEvent) {
  const edits = Promise.resolve([new TextEdit(getMaxRange(), sort(document))]);
  waitUntil(edits);
}

export async function saveWithoutSorting() {
  const { document }:any = window.activeTextEditor;

  unregisterWillSaveTextDocument();
  await document.save();
  if (getOnSaveSetting()) {
    registerWillSaveTextDocument();
  }
}
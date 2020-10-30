// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import { commands, ExtensionContext, window, workspace } from "vscode";
import { updateSaveRegistration } from "./registration";
import { saveWithoutSorting, sortImports } from "./sort";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = commands.registerCommand('ts-toc-sort-imports.sortImports', () => {
	// 	// Display a message box to the user
	// 	window.showInformationMessage('Imports was sorted');

	// 	// The code you place here will be executed every time your command is executed

	// });

	context.subscriptions.push(commands.registerCommand('ts-toc-sort-imports.sortImports', sortImports));
    context.subscriptions.push(commands.registerCommand('ts-toc-sort-imports.saveWithoutSorting', saveWithoutSorting));
	// context.subscriptions.push(disposable);

    updateSaveRegistration();
    workspace.onDidChangeConfiguration(updateSaveRegistration);

}

// this method is called when your extension is deactivated
export function deactivate() {}

const vscode = require('vscode');
var gherkin_linter = require('./gherkin_linter')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "featurelint" is now active!');

	let disposable = vscode.commands.registerCommand('extension.featureLint', function () {
		let output = vscode.window.createOutputChannel("Feature Linter");
		var currentFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
		var fileLanguage = vscode.window.activeTextEditor.document.languageId;
		var results = gherkin_linter.lint([currentFilePath]);

		if (fileLanguage == "feature") {
			results.forEach(function (result) {
				output.appendLine(result);
			});

			output.show(true);
		}
	});


	context.subscriptions.push(disposable);

}
exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}

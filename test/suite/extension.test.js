const assert = require('assert');
const { before } = require('mocha');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const myExtension = require('../../extension.js');
var linter = require('../../../gherkin_linter.js');

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
		//vscode.window.activeTextEditor.document.
		vscode.commands.executeCommand('extension.featureLint');
		sleep(10000);

	});

	test('Execute Feature Lint command', () => {
		assert.lengthOf(actual, 1);
		assert.deepEqual(actual[0].errors, expected);
	});
});

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

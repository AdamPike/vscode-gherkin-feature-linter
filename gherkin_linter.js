#!/usr/bin/env node
"use strict";

var program = require('commander');

var linter = require('./src/gherkin-lint/linter.js');

var verifyConfig = require('./src/gherkin-lint/config-verifier');

var logger = require('./src/gherkin-lint/logger.js');

var formatter = require('./src/gherkin-lint/formatters/stylish.js');

var jsonConfig = {
    "allowed-tags": ["off", { "tags": ["@watch", "@wip", "@todo"] }],
    "no-files-without-scenarios": "on",
    "no-unnamed-features": "on",
    "no-unnamed-scenarios": "on",
    "no-dupe-scenario-names": ["on", "in-feature"],
    "no-dupe-feature-names": "off",
    "no-partially-commented-tag-lines": "on",
    "indentation": "off",
    "no-trailing-spaces": "on",
    "new-line-at-eof": ["off", "yes"],
    "no-multiple-empty-lines": "off",
    "no-empty-file": "on",
    "no-scenario-outlines-without-examples": "on",
    "name-length": ["off", { "Feature": 100, "Scenario": 100, "Step": 100 }],
    "no-restricted-tags": ["off", { "tags": ["@watch", "@wip"] }],
    "use-and": "on",
    "no-duplicate-tags": "on",
    "no-superfluous-tags": "on",
    "no-homogenous-tags": "on",
    "one-space-between-tags": "on",
    "no-unused-variables": "on",
    "no-background-only-scenario": "on",
    "no-empty-background": "on",
    "scenario-size": ["on", { "steps-length": { "Background": 6, "Scenario": 15 } }]
}

function lint(files) {
    var additionalRulesDirs = [""];
    var additionalRulesDirs = program.rulesdir;
    var config = getConfiguration(".gherkin-lintrc", additionalRulesDirs);
    var results = linter.lint(files, config, additionalRulesDirs);
    return formatter.printResults(results);
}

function getConfiguration(configPath, additionalRulesDirs) {
    var errors = verifyConfig(jsonConfig, additionalRulesDirs);

    if (errors.length > 0) {
        logger.boldError('Error(s) in configuration file:');
        errors.forEach(function (error) {
            logger.error(`- ${error}`);
        });
        process.exit(1);
    }

    return jsonConfig;
}

module.exports = {
    lint: lint
};
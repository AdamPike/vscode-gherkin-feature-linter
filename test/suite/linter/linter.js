var assert = require('chai').assert;
var linter = require('../../../gherkin_linter.js');
const path = require('path');

describe('Linter', function () {
  it('detects up-to-one-background-per-file violations', function () {
    var file = path.resolve(__dirname, 'MultipleBackgrounds.feature')
    var actual = linter.lint([file]);
    assert.include(actual[0], "9");
    assert.include(actual[0], "Multiple \"Background\" definitions in the same file are disallowed");
    assert.include(actual[0], "up-to-one-background-per-file");
  });

  it('detects no-tags-on-backgrounds violations', function () {
    var file = path.resolve(__dirname, 'TagOnBackground.feature')
    var actual = linter.lint([file]);
    assert.include(actual[0], "4");
    assert.include(actual[0], "Tags on Backgrounds are dissallowed");
    assert.include(actual[0], "no-tags-on-backgrounds");
  });

  it('detects one-feature-per-file violations', function () {
    var file = path.resolve(__dirname, 'MultipleFeatures.feature')
    var actual = linter.lint([file]);
    assert.include(actual[0], "7");
    assert.include(actual[0], "Multiple \"Feature\" definitions in the same file are disallowed");
    assert.include(actual[0], "one-feature-per-file");
  });

  it('detects no-multiline-steps violations', function () {
    var file = path.resolve(__dirname, 'MultilineStep.feature')
    var actual = linter.lint([file]);
    assert.include(actual[0], "9");
    assert.include(actual[0], "Steps should begin with \"Given\", \"When\", \"Then\", \"And\" or \"But\". Multiline steps are dissallowed");
    assert.include(actual[0], "no-multiline-steps");
  });

  it('detects no-multiline-steps violations in backgrounds', function () {
    var file = path.resolve(__dirname, 'MultilineBackgroundStep.feature')
    var actual = linter.lint([file]);
    assert.include(actual[0], "5");
    assert.include(actual[0], "Steps should begin with \"Given\", \"When\", \"Then\", \"And\" or \"But\". Multiline steps are dissallowed");
    assert.include(actual[0], "no-multiline-steps");
  });

  it('detects no-multiline-steps violations in scenario outlines', function () {
    var file = path.resolve(__dirname, 'MultilineScenarioOutlineStep.feature')
    var actual = linter.lint([file]);
    assert.include(actual[0], "9");
    assert.include(actual[0], "Steps should begin with \"Given\", \"When\", \"Then\", \"And\" or \"But\". Multiline steps are dissallowed");
    assert.include(actual[0], "no-multiline-steps");
  });

  it('detects no-examples-in-scenarios violations', function () {
    var file = path.resolve(__dirname, 'ExampleInScenario.feature')
    var actual = linter.lint([file]);
    assert.include(actual[0], "6");
    assert.include(actual[0], "Cannot use \"Examples\" in a \"Scenario\", use a \"Scenario Outline\" instead");
    assert.include(actual[0], "no-examples-in-scenarios");
  });

  it('detects additional violations that happen after the \'no-tags-on-backgrounds\' rule', function () {
    var file = path.resolve(__dirname, 'MultipleViolations.feature')
    var actual = linter.lint([file], {});
    assert.include(actual[0], "13");
    assert.include(actual[0], "Steps should begin with \"Given\", \"When\", \"Then\", \"And\" or \"But\". Multiline steps are dissallowed");
    assert.include(actual[0], "no-multiline-steps");
    assert.include(actual[1], "4");
    assert.include(actual[1], "Tags on Backgrounds are dissallowed");
    assert.include(actual[1], "no-tags-on-backgrounds");
  });

  it('correctly parses files that have the correct Gherkin format', function () {
    var file = path.resolve(__dirname, 'NoViolations.feature')
    var result = linter.lint([file], {});
    assert.lengthOf(result, 0);
  });
});

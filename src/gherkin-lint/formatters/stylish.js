"use strict";

/*eslint no-console: "off"*/
var style = {
  gray: function gray(text) {
    return text;
  },
  underline: function underline(text) {
    return text;
  }
};

function stylizeError(error, maxErrorMsgLength, maxLineChars) {
  var str = '  '; // indent 2 spaces so it looks pretty

  var padding = '    '; //padding of 4 spaces, will be used between line numbers, error msgs and rule names

  var line = error.line.toString(); // add spaces until the line string is as long as our longest line string

  while (line.length < maxLineChars) {
    line += ' ';
  } // print the line number as gray


  str += style.gray(line) + padding;
  var errorMsg = error.message; // add spaces until the message is as long as our longest error message

  while (errorMsg.length < maxErrorMsgLength) {
    errorMsg += ' ';
  } // print the error message in default color and add 2 spaces after it for readability


  str += errorMsg + padding; // print the rule name in gray

  str += style.gray(error.rule);
  return str; // lastly, return our stylish-est string and pretend that this code was never written
}

function stylizeFilePath(filePath) {
  return style.underline(filePath);
}

function getMaxLengthOfField(results, field) {
  var length = 0;
  results.forEach(function (result) {
    result.errors.forEach(function (error) {
      var errorStr = error[field].toString();

      if (errorStr.length > length) {
        length = errorStr.length;
      }
    });
  });
  return length;
}

function printResults(results) {
  var maxErrorMsgLength = getMaxLengthOfField(results, 'message');
  var maxLineChars = getMaxLengthOfField(results, 'line');
  var printResults = [];
  results.forEach(function (result) {
    if (result.errors.length > 0) {
      console.error(stylizeFilePath(result.filePath));
      result.errors.forEach(function (error) {
        printResults.push(stylizeError(error, maxErrorMsgLength, maxLineChars));
        //console.error(stylizeError(error, maxErrorMsgLength, maxLineChars));
      });
      //console.error('\n');
    }
  });
  return printResults;
}

module.exports = {
  printResults: printResults
};
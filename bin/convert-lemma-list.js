#!/usr/bin/env node

'use strict';

var fs = require('fs');
var _ = require('lodash');

var lemmataListRaw = fs.readFileSync(__dirname + '/lemmata_list.py');
var QUE_SUFIX_WHITELIST = require(__dirname + '/../src/data/que-words.json');
var STOP_WORDS = require(__dirname + '/../src/data/stop-words.json');

lemmataListRaw = ('' + lemmataListRaw)
  .split('REPLACEMENT_PATTERNS = ')[1]
// Replace:
// (r'\babalienanda\b', 'abalieno'), -> ["abalienanda", "abalieno"],
  .replace(/\(r'\\b/g, '["')
  .replace(/\\b\', \'/g, '", "')
  .replace(/'\),/g, '"],')
  .replace(/"],\s+\]/g, '"]]');

var lemmataList = JSON.parse(lemmataListRaw);

var processedList = Object.create(null);
var lemmaWordsList = Object.create(null);

// @todo Checkout file from cltk.

var word = '';
var length = lemmataList.length;
for (var i = 0; i < length; i++) {
  // Remove J and V to reduce the number of different keys.
  var key = lemmataList[i][0];
  key = convertJV(key);
  key = removeQue(key);
  key = key.toLowerCase();
  var lemma = lemmataList[i][1];

  if (processedList[key]) {
    processedList[key].push(lemma);
  } else {
    processedList[key] = [lemma];
  }
}

// Remove entries where lemma and word are identical.
// e.g. {'lingua': ['lingua']}
for (word in processedList) {
  if (processedList[word].length === 1 && word === processedList[word][0]) {
    lemmaWordsList[word] = true;
    delete processedList[word];
  }
}

// Remove stop words.
for (word in processedList) {
  if (STOP_WORDS.indexOf(word) > -1) {
    delete processedList[word];
  }
}

// Dedupe lemma of similar words.
for (word in processedList) {
  processedList[word] = _.uniq(processedList[word]);
}

// Sorting arrays for potential better Gzip compression.
for (word in processedList) {
  processedList[word] = processedList[word].sort(function(a, b) {
    return a - b;
  });
}

var jsonData = JSON.stringify(processedList, null, '');
fs.writeFileSync(__dirname + '/../src/data/lemma.json', jsonData);

// Process the list of words that are already lemma.
lemmaWordsList = Object.keys(lemmaWordsList);
jsonData = JSON.stringify(lemmaWordsList, null, '');
fs.writeFileSync(__dirname + '/../src/data/words.json', jsonData);

// @todo Reuse from /lib/j-and-v-converter.js.
function convertJV(string) {
  return string
    .replace(/j/g, 'i')
    .replace(/J/g, 'I')
    .replace(/v/g, 'u')
    .replace(/V/g, 'U');
}

/**
 * Remove the sufix 'que' if not part of the word.
 *
 * @param {String} string
 * @returns {String} string
 */
function removeQue(string) {
  if (QUE_SUFIX_WHITELIST.indexOf(string) > -1) {
    return string;
  }

  return string
    .replace(/que$/, '');
}

const { sortPages } = require('./report');
const { test, expect } = require('@jest/globals');

test('sortPages 2 pages', () => {
  const input = {
    'https://wasgslane.dev/path': 1,
    'https://wasgslane.dev': 3,
  };
  const actual = sortPages(input);
  const expected = [
    ['https://wasgslane.dev', 3],
    ['https://wasgslane.dev/path', 1],
  ];
  expect(actual).toEqual(expected);
});

test('sortPages 5 pages', () => {
  const input = {
    'https://wasgslane.dev/path': 1,
    'https://wasgslane.dev': 3,
    'https://wasgslane.dev/path5': 2,
    'https://wasgslane.dev/path3': 5,
    'https://wasgslane.dev/path2': 7,
  };
  const actual = sortPages(input);
  const expected = [
    ['https://wasgslane.dev/path2', 7],
    ['https://wasgslane.dev/path3', 5],
    ['https://wasgslane.dev', 3],
    ['https://wasgslane.dev/path5', 2],
    ['https://wasgslane.dev/path', 1],
  ];
  expect(actual).toEqual(expected);
});

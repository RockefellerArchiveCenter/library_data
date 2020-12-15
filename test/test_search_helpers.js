const helpers = require('../js/search_helpers.js');

QUnit.module('preProcessQueryTerm');

QUnit.test("Query term without field", assert => {
  assert.equal(helpers.preProcessQueryTerm("foo", ""), "+foo~1");
});
QUnit.test("Query term with field", assert => {
  assert.equal(helpers.preProcessQueryTerm("foo", "bar"), "+bar:foo~1");
});
QUnit.test("Special characters removed from term", assert => {
  assert.equal(helpers.preProcessQueryTerm(":foo\"'~", "baz"), "+baz:foo~1");
});
QUnit.test("No text exists after special characters removed", assert => {
  assert.equal(helpers.preProcessQueryTerm(":\"'~", "foo"), null);
});
QUnit.test("Query term in stop words", assert => {
  assert.equal(helpers.preProcessQueryTerm("had", "feefifo"), "feefifo:had~1");
});

QUnit.module('getQueryVariable');

QUnit.test("query term only", assert => {
  assert.equal(helpers.getQueryVariable("query=banana", "query"), "banana");
});
QUnit.test("empty secondary term", assert => {
  assert.equal(helpers.getQueryVariable("query=banana&field=", "query"), "banana");
});
QUnit.test("empty term", assert => {
  assert.equal(helpers.getQueryVariable("query=banana&field=", "field"), "");
});
QUnit.test("leading question mark", assert => {
  assert.equal(helpers.getQueryVariable("?query=banana", "query"), "banana");
});
QUnit.test("replace plus sign", assert => {
  assert.equal(helpers.getQueryVariable("?query=banana+rama", "query"), "banana rama");
});

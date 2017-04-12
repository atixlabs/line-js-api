// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by line-accounts.js.
import { name as packageName } from "meteor/atixlabs:line-accounts";

// Write your tests here!
// Here is an example.
Tinytest.add('line-accounts - example', function (test) {
  test.equal(packageName, "line-accounts");
});

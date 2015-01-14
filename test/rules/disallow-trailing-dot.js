var Checker = require('../../lib/checker');
var assert = require('assert');

describe('rules/disallow-trailing-comma', function() {
    var checker;

    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
        checker.configure({ disallowTrailingDot: true });
    });

    it('should report trailing dot', function() {
        assert(checker.checkString('someFunction()\n.otherMethod();').getErrorCount() === 0);
        assert(checker.checkString('someFunction().\notherMethod();').getErrorCount() === 1);
    });

    it('should report trailing dot at end of file', function() {
        assert(checker.checkString('someFunction()\n.').getErrorCount() === 1);
        assert(checker.checkString('someFunction().').getErrorCount() === 1);
    });
});

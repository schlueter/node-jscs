/**
 * Disallows trailing period
 *
 * Type: `Boolean`
 *
 * Value: `true`
 *
 * #### Example
 *
 * ```js
 * "disallowTrailingDot": true,
 * ```
 *
 * ##### Valid
 *
 * ```js
 * someLongFunctionNameReturningActionable(withLongParameters)
 *     .someOtherAction();
 * ```
 *
 * ##### Invalid
 *
 * ```js
 * someLongFunctionNameReturningActionable(withLongParameters).
 *     someOtherAction();
 * ```
 */

var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
    configure: function(disallowTrailingDot) {
        assert(
            typeof disallowTrailingDot === 'boolean',
            'disallowTrailingDot option requires boolean value'
        );
        assert(
            disallowTrailingDot === true,
            'disallowTrailingDot option requires true value or should be removed'
        );
    },

    getOptionName: function() {
        return 'disallowTrailingDot';
    },

    check: function(file, errors) {
        file.iterateTokensByType('Punctuator', function(token, i, tokens) {
            if (token.value === '.') {
                var nextToken = tokens[i + 1];
                if (nextToken && nextToken.loc.start.line !== token.loc.end.line) {
                    errors.add(
                        'Dots should be placed on a new line',
                        token.loc.end.line,
                        token.loc.end.column
                    );
                }
            }
        });
    }
};

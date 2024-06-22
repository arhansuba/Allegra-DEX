// A library for performing overflow-safe math, courtesy of DappHub (https://github.com/dapphub/ds-math)

const SafeMathLibrary = {
    add: function(x, y) {
        const z = x + y;
        if (z < x || z < y) {
            throw new Error('ds-math-add-overflow');
        }
        return z;
    },

    sub: function(x, y) {
        const z = x - y;
        if (z > x) {
            throw new Error('ds-math-sub-underflow');
        }
        return z;
    },

    mul: function(x, y) {
        const z = x * y;
        if (y !== 0 && z / y !== x) {
            throw new Error('ds-math-mul-overflow');
        }
        return z;
    }
};

module.exports = SafeMathLibrary;

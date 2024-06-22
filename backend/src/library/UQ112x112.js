// A library for handling binary fixed point numbers (UQ112x112) in JavaScript
// range: [0, 2^112 - 1]
// resolution: 1 / 2^112

const BigNumber = require('bignumber.js');

const UQ112x112Library = {
    Q112: new BigNumber(2).exponentiatedBy(112), // 2^112

    // encode a uint112 as a UQ112x112
    encode: function(y) {
        return new BigNumber(y).multipliedBy(this.Q112).integerValue();
    },

    // divide a UQ112x112 by a uint112, returning a UQ112x112
    uqdiv: function(x, y) {
        return new BigNumber(x).dividedBy(new BigNumber(y)).integerValue();
    }
};

module.exports = UQ112x112Library;

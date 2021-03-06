module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        "jest": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "plugins": ["jest"],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};

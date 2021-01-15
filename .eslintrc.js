module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "settings": {
        "react": {
          "version": "^16.13.1"
        }
      },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
};

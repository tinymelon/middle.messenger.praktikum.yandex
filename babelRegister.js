// eslint-disable-next-line unicorn/prefer-module
const register = require('@babel/register').default;

register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });

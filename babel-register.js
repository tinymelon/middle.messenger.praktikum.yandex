// import {register} from "@babel/register/lib/hook.js";
//
// register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });

const register = require('@babel/register').default;

register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });

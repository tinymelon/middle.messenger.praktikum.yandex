// eslint-disable-next-line unicorn/prefer-module
module.exports = api => {
    // Cache configuration is a required option
    api.cache(false);

    const presets = [
        "@babel/preset-typescript",
        "@babel/preset-env"
    ];

    return { presets };
};

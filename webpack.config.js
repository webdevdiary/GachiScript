const path = require("path");

module.exports = {
    mode: 'production',
    entry: {
        index: "./src/index.ts"
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            '@': path.join(__dirname, './src'),
        },
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ]
    },
    target: "node"
};

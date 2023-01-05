const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { getFilenamesFromPath } = require('./utils/file-utils.js');
const listOfHtmlFiles = getFilenamesFromPath('../../src', 'html');
const entry = listOfHtmlFiles.reduce((entries, fileName) => {
	entries[fileName] = path.join(__dirname, `../src/js/${fileName}.js`);
	return entries;
}, {});
const htmlGenerators = listOfHtmlFiles.reduce((entries, fileName) => {
	entries.push(new HtmlWebpackPlugin({
		inject: true,
        template: `./src/${fileName}.html`,
        filename: `${fileName}.html`,
		chunks: [fileName],
	}));
	return entries;
}, []);

const config ={
    entry,
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist/"),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...htmlGenerators,
    ],
        
}

module.exports = config
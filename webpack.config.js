const path = require("path");
const config = require("./package.json");

const RELEASES_PATH = path.resolve(__dirname, "releases");
const RELEASE_NAME = config.name.replace("@gelight/", "");
const LIBRARY_NAME = "json2sml".toUpperCase();

module.exports = {
    mode: "production",
    entry: "./dist/index.js",
    output: {
        filename: `${RELEASE_NAME}.min.js`,
        path: RELEASES_PATH,
        libraryTarget: "umd",
        library: LIBRARY_NAME,
    },
    resolve: {
        fallback: {
            fs: false,
        },
    },
};

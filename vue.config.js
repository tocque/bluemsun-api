module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    pages: {
        index: {
            title: "",
            template: "public/index.html",
            filename: "index.html",
            entry: "src/main.js"
        },
        editor: {
            title: "",
            template: "public/index.html",
            filename: "editor.html",
            entry: "src/editor/main.ts"
        }
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            preload: 'src/preload.js',
        }
    }
}

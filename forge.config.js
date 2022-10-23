module.exports = {
    plugins: [
        ['@electron-forge/plugin-webpack', {
            mainConfig: './webpack.config.babel.ts',
            renderer: {
                nodeIntegration: true,
                config: './webpack.config.babel.ts',
                entryPoints: {
                    name: "main_window",
                    html: './src/index.html',
                    js: './electron-starter.babel.ts'
                }
            },
        }]
    ]
}
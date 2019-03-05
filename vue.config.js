const path = require('path')

module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-plain-loader'
                }
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@cfg': path.resolve(__dirname, 'src', '_config'),
                '@components': path.resolve(__dirname, 'src', 'components'),
                '@config': path.resolve(__dirname, 'src', '_config', 'config'),
                '@constants': path.resolve(__dirname, 'src', 'constants'),
                '@containers': path.resolve(__dirname, 'src', 'containers'),
                '@css': path.resolve(__dirname, 'src', '_assets', 'css'),
                '@env': path.resolve(__dirname, 'src', '_environments'),
                '@features': path.resolve(__dirname, 'src', 'features'),
                '@fonts': path.resolve(__dirname, 'src', '_assets', 'fonts'),
                '@helpers': path.resolve(__dirname, 'src', 'helpers'),
                '@http': path.resolve(__dirname, 'src', '_config', 'http'),
                '@i18n': path.resolve(__dirname, 'src', '_translate', 'i18n'),
                '@icons': path.resolve(__dirname, 'src', '_assets', 'icons'),
                '@img': path.resolve(__dirname, 'src', '_assets', 'img'),
                '@js': path.resolve(__dirname, 'src', '_assets', 'js'),
                '@mocks': path.resolve(__dirname, 'src', '_config', 'mocks'),
                '@routes': path.resolve(__dirname, 'src', '_config', 'routes'),
                '@utils': path.resolve(__dirname, 'src', 'utils')
            }
        }
    }
}

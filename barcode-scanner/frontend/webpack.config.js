module.exports = {
    entry: [
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['@babel/react'] }
                    }
                ]
            }
        ]
    },
    // module: {
    //     loaders: [{
    //         test: /\.jsx?$/,
    //         exclude: /node_modules/,
    //         loader: 'babel'
    //     }]
    // },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        allowedHosts: ['7402-14-139-38-126.ngrok.io'],
    }
};

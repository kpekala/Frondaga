import * as fs from 'fs';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';

function srcPaths(src: string) {
    return path.join(__dirname, src);
}

const NODE_ENV = process.env.NODE_ENV as ('production' | 'development');
const isEnvProduction = NODE_ENV === 'production';
const isEnvDevelopment = NODE_ENV === 'development';

if (NODE_ENV === undefined) {
    throw new Error(`NODE_ENV must be defined.`);
}

console.log(`Configuring WebPack (${NODE_ENV})`);

function getEnvFilePath(): string {
    const paths = [
        `./.env.${NODE_ENV}.local`,
        `./.env.${NODE_ENV}`,
        './.env.local',
        './.env',
    ];

    for (const path of paths) {
        if (fs.existsSync(path)) {
            return path;
        }
    }

    throw new Error(`No .env file defined.`);
}

module.exports = {
    devtool: isEnvDevelopment ? 'source-map' : false,
    mode: isEnvProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: srcPaths('dist'),
        filename: 'index.js',
    },
    node: { __dirname: false, __filename: false },
    resolve: {
        alias: {
            _: srcPaths('src'),
            _assets: srcPaths('src/assets'),
        },
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.module\.(scss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /^(?!.*?\.module).*\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|png|svg|ico|icns|glb|wav)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        new Dotenv({
            path: getEnvFilePath(),
            systemvars: true,
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true,
        compress: true,
        port: 9000,
    },
};

var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './index.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'bundle.js'
     },
     watch:true,
     module: {
         rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['@babel/env']
                 }
             }
         ]
     },
     stats: {
         colors: true
     }
 };
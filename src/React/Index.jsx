import React from 'react'
import ReactDOM from 'react-dom'

import App from './Components/App'

// Style
import '../../src/index.css'
import './Style/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import toast ,{Toaster} from "react-hot-toast"

ReactDOM.render(<>
        <App/>
        <Toaster/>
 </>,
document.getElementById('rootElement'))

/*
 How i made it to here ?
 
 npx create-electron-app app-name --template=webpack
 npm install --save-dev @babel/core @babel/preset-react babel-loader
 npm install --save react react-dom
 
 Add Code in webpack.rules.js
 npm install --save file-loader url-loader
''' 
 module.exports = [
...
{
test: /\.jsx?$/,
use: {
loader: 'babel-loader',
options: {
exclude: /node_modules/,
presets: ['@babel/preset-react']
}
}
},
];
'''

import mainRect Render File in renderer.js
*/

/*

Packages :-

 npm install react-hot-toast
 npm install reactjs-popup --save

*/
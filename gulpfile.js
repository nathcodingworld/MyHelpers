const {  src , dest } = require("gulp") 
const  uglify = require('gulp-uglify');   
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('sass'));


const helpersOrder = ['./Builder/Builder.js', './Keeper/Keeper.js', './Listener/Listener.js', './Observer/Observer.js', './Setter/Setter.js', './Formater/Formater.js', './Helpers.js']
 
const bundleHP = () => {
    return src(helpersOrder).pipe(uglify()).pipe(concat('MyHelpers.js')).pipe(dest('./dist/js/'))
}

const buildStyles = () => {
    return src('./Styler/styler.scss').pipe(sass().on('error', sass.logError)).pipe(dest('./dist/css/'));
}

exports.bundleHP = bundleHP

exports.buildStyles = buildStyles
const {  src , dest } = require("gulp") 
const  uglify = require('gulp-uglify');   
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('sass'));


const helpersOrder = [
    './Listener/Listener.js', 
    './Observer/Observer.js', 
    './Formater/Formater.js', 
    './Keeper/Keeper.js', 
    './Builder/Builder.js', 
    './Setter/Setter.js', 
    './Helpers.js']
 
const bundleHP = () => {
    return src(helpersOrder).pipe(uglify()).pipe(concat('MyHelpers.js')).pipe(dest('./dist/js/'))
}

const buildStyles = () => {
    return src('./Styler/styler.scss').pipe(sass().on('error', sass.logError)).pipe(dest('./dist/css/'));
}

exports.bundleHP = bundleHP

exports.buildStyles = buildStyles


//gulp bundleHP
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
    './Helpers.js'
]

const dataStructures = [
    './Keeper/DataStructures/Graph.js', 
    './Keeper/DataStructures/LinkedList.js', 
    './Keeper/DataStructures/List.js', 
    './Keeper/DataStructures/Queue.js', 
    './Keeper/DataStructures/Stack.js', 
    './Keeper/DataStructures/Tree.js'
]

const builderExtensions = [
    './Builder/Extensions/Accordion.js', 
    './Builder/Extensions/Card.js', 
    // './Builder/Extensions/Modal.js', 
    // './Builder/Extensions/Tablist.js'
]
 
const bundleHelpers = () => {
    return src(helpersOrder).pipe(uglify()).pipe(concat('MyHelpers.js')).pipe(dest('./dist/js/'))
}
const bundleDataStructures = () => {
    return src(dataStructures).pipe(uglify()).pipe(concat('DataStructures.js')).pipe(dest('./Keeper/'))
}
const bundleBuilderExtensions = () => {
    return src(builderExtensions).pipe(uglify()).pipe(concat('Extensions.js')).pipe(dest('./Builder/'))
}

const buildStyles = () => {
    return src('./Styler/styler.scss').pipe(sass().on('error', sass.logError)).pipe(dest('./dist/css/'));
}

exports.bundleHelpers = bundleHelpers

exports.bundleDataStructures = bundleDataStructures

exports.bundleBuilderExtensions = bundleBuilderExtensions

exports.buildStyles = buildStyles


//gulp bundleHelpers
//gulp bundleDataStructures
//gulp bundleBuilderExtensions

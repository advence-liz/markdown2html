#!/usr/bin/env node
'use strict';
const gulp = require('gulp'),
    markdown = require('gulp-markdown'),
    marked = require('marked'),
    template = require('art-template'),
    path = require('path'),
    fs = require('fs');
var templatePath = path.join(__dirname,'template');

template.defaults.extname=".html";//tempalte默认后缀名改为.html 方便编辑模板不然没有智能提示
template.defaults.root = templatePath;
/**
 * default task
 */

gulp.task('default', function () {
    return gulp.src('./md/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('html'));
});

console.log("run");

var html = template( 'layout', {
    user: {
        name: 'aui'
    }
});
fs.writeFile('demo.html', html, (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
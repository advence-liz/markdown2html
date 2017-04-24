#!/usr/bin/env node
'use strict';
const gulp = require('gulp'),
    markdown = require('gulp-markdown'),
    marked = require('marked'),
    template = require('art-template'),
    path = require('path'),
    fs = require('fs'),
    extname = ".html",
    htmlRoot = "../html/";

var templatePath = path.join('.', 'template');
console.log(__dirname);
console.log(templatePath);
template.defaults.extname = extname;//tempalte默认后缀名改为.html 方便编辑模板不然没有智能提示
template.defaults.root = templatePath;//这个位置是相对根目录的位置，并且当前工作目录移动到子目录npm run template 依然有效
/**
 * default task
 */





/**
 * 定义模板对象
 */
// const extname=".html",
//     htmlRoot="../html/";
class TemplateOption {
    constructor(name, uri) {
        this.name = name;
        this.uri = uri;
    }
}

var option_array = new Array;
option_array = [
    new TemplateOption('code', 'code'),
    new TemplateOption('readme', 'readme')
]
option_array.map(function (elem, index, arr) {
    elem.uri = htmlRoot + elem.uri;
    return elem;
})

//{{include './header.art'}} 
/**
 * 生成临时模板插入主模板
 */


function createTemporaryTemplate(option_array) {
    let temporaryTemplate = '';

    option_array.forEach(function (element) {
         temporaryTemplate = temporaryTemplate+'<section id="'+ element.name+'">' + "{{include '" + element.uri + "'}}"+'</section>'+"\n";
         //temporaryTemplate = temporaryTemplate+"{{include '" + element.uri + "'}}";
    });


    fs.writeFile('./template/temp.html', temporaryTemplate, (err) => {
        if (err) throw err;
        console.log('temp template created!');
        createHTML();
    });

}

/**
 * 生成html
 */
function createHTML() {
    let html = template('layout',{target:option_array});
    fs.writeFile('demo.html', html, (err) => {
        if (err) throw err;
        console.log('demo created!');
    });
}
createTemporaryTemplate(option_array);
//createHTML();

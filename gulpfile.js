#!/usr/bin/env node
'use strict';
const gulp = require('gulp'),
    markdown = require('gulp-markdown'),
    marked = require('marked'),
    template = require('art-template'),
    path = require('path'),
    fs = require('fs'),
    del = require('gulp-clean'),
    concat = require('gulp-concat'),
    args = require('get-gulp-args')(),
    htmlbeautify = require('gulp-html-beautify'),
    templatePath = path.join(__dirname, 'template'),
    exec = require('child_process').exec,
    git = require('gulp-git'),
    Q = require("q");

var index_array = [];
template.defaults.extname = ".html";//tempalte默认后缀名改为.html 方便编辑模板不然没有智能提示
template.defaults.root = templatePath;//这个位置是相对根目录的位置，并且当前工作目录移动到子目录npm run template 依然有效
template.defaults.rules.pop();//去掉标准规则 因为 jsx 代码很容易写出 {{ xxxx}}
gulp.task('del', function () {
    gulp.src('temp/*.html')
        .pipe(del());
});

gulp.task('bootmd2html', ['pull'], function () {
    let md_path = args.path;
    let source_path = path.resolve(__dirname, md_path, '*.md');
    let dist_path = path.resolve(__dirname, 'html', md_path);
    return gulp.src(source_path)
        .pipe(markdown())
        .pipe(htmlbeautify())
        .pipe(gulp.dest(dist_path));
});
/**
 * @desc 将指定路径下的markdown文档转为html然后生成bootstrap风格的API文档
 * @cmd gulp toc --path widget
 */
gulp.task('toc', ['bootmd2html'], function () {
    /**
     * @var sourcePath {String} 源HTML 文件所在目录
     * @var distPath   {String} 合成HTML 文件的输出路径包含文件名
     * @var uri_prefix {String} 源HTML 文件目录相对 模块页的相对路径
     */
    let md_path = args.path;
    let sourcePath = path.resolve(__dirname, 'html', md_path);
    let distPath = path.resolve(__dirname, 'demo', `${md_path}toc.html`);
    try {
        fs.statSync(path.resolve(__dirname, 'demo'));
       
    } catch (error) {
        fs.mkdirSync('demo');
    }

    let uri_prefix = `../html/${md_path}/`;//这个必须是相对路径 

    createHTML(sourcePath, distPath, uri_prefix)

});

function createHTML(sourcePath, distPath, uri_prefix) {
    let files;
    let temp_template = '';//临时模板文件
    files = fs.readdirSync(sourcePath);


    /**
     * @param filename {String} widget.html
     */
    files.forEach(function (filename) {
        let id = filename.slice(0, -5);//由于后缀为html 就这样简单处理了
        let uri = uri_prefix + filename;
        index_array.push({ name: id });

        temp_template += `<section class="bs-docs-section" id="${id}"> <% include ('${uri}')%></section>\n`;

    });

    /**
     * 
     */
    fs.writeFileSync('./temp/toc_temp.html', temp_template);

    console.log('temporary file template created!');
    var html = template('layout', { target: index_array });
    fs.writeFileSync(distPath, html);
    console.log('demo created!');


}

/**
 * @desc 合并指定目录下markdown文档，并转为html，并且存储在临时文件中
 * 
 */
gulp.task('md2html', ['pull'], function () {
    let md_path = args.path;
    return gulp.src(md_path + '/*.md')
        .pipe(concat('ztree_temp.md'))
        .pipe(markdown())
        .pipe(htmlbeautify())
        .pipe(gulp.dest('./temp/'))
});

/**
 * @desc 将指定路径下的markdown文档转为html然后生成ztree风格的API文档
 * @cmd gulp ztree --path widget
 */
gulp.task('ztree', ['md2html'], function () {

    const html = template('ztree_layout', { name: args.path });//第二个空对象必须传
    const distPath = path.resolve(__dirname, 'demo', args.path + 'ztree.html');
    try {
        fs.statSync(path.resolve(__dirname, 'demo'));
       
    } catch (error) {
        fs.mkdirSync('demo');
    }
    fs.writeFileSync(distPath, html);
    console.log(`${args.path}:ztree toc html created!`);

});

gulp.task('htmlbeautify', function () {
    gulp.src('demo/*.html')
        .pipe(htmlbeautify({ indentSize: 2 }))
        .pipe(gulp.dest('pages/'))

})



gulp.task('pull', function () {
    // git.pull('origin', 'master', function (err) {
    //     if (err) throw err;
    // });
});

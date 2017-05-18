#!/usr/bin/env node
'use strict';
const gulp = require('gulp'),
    markdown = require('gulp-markdown'),
    marked = require('marked'),
    template = require('art-template'),
    path = require('path'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    args = require('get-gulp-args')(),
    templatePath = path.join(__dirname, 'template');
   
var index_array = [];
template.defaults.extname = ".html";//tempalte默认后缀名改为.html 方便编辑模板不然没有智能提示
template.defaults.root = templatePath;//这个位置是相对根目录的位置，并且当前工作目录移动到子目录npm run template 依然有效
/**
 * default task
 */

gulp.task('default', function () {
    return gulp.src('./md/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('html'));
});

gulp.task('widget:compile', function () {
    return gulp.src('./widget/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('html/widget'));
});
gulp.task('widget:html', ['widget:compile'], function () {
    /**
     * @var sourcePath {String} 源HTML 文件所在目录
     * @var distPath   {String} 合成HTML 文件的输出路径包含文件名
     * @var uri_prefix {String} 源HTML 文件目录相对 模块页的相对路径
     */
    let sourcePath = path.resolve(__dirname, 'html', 'widget');
    let distPath = path.resolve(__dirname, 'demo', 'widget.html');
    let uri_prefix = '../html/widget/';//这个必须相当路径 

    createHTML(sourcePath,distPath,uri_prefix)
   
});

gulp.task('less:compile', function () {
    return gulp.src('./less/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('html/less'));
});
gulp.task('less:html', ['less:compile'], function () {
    /**
     * @var sourcePath {String} 源HTML 文件所在目录
     * @var distPath   {String} 合成HTML 文件的输出路径包含文件名
     * @var uri_prefix {String} 源HTML 文件目录相对 模块页的相对路径
     */
    let sourcePath = path.resolve(__dirname, 'html', 'less');
    let distPath = path.resolve(__dirname, 'demo', 'less.html');
    let uri_prefix = '../html/less/';//这个必须相当路径 

    createHTML(sourcePath,distPath,uri_prefix)
   
});


/**
 * @desc 合并指定目录下markdown文档，并转为html，并且存储在临时文件中
 * 
 */
gulp.task('md2html', function() {
     let md_path=args.path;
     gulp.src(md_path+'/*.md')
    .pipe(concat('toc.md'))
    .pipe(markdown())
    .pipe(gulp.dest('./temp/'))
});
/**
 * @desc 将合并文件转为，demo页面
 * @cmd gulp ztree --path widget
 */
gulp.task('ztree',['md2html'], function() {
    
      const html = template('ztree_layout',{});//第二个空对象必须传
      const distPath=path.resolve(__dirname,'demo',args.path+'toc.html');
            fs.writeFile(distPath, html, (err) => {
                if (err) throw err;
                console.log('ztree toc html created!');
            });
});




function createHTML(sourcePath,distPath,uri_prefix){
     fs.readdir(sourcePath, function (err, files) {
        let temp_template = '';//临时模板文件
        if (err) {
            console.log(err);
            return;
        }
        /**
         * @param filename {String} widget.html
         */
        files.forEach(function (filename) {
            let id = filename.slice(0, -5);//由于后缀为html 就这样简单处理了
            let uri = uri_prefix+ filename;
            index_array.push({ name: id });

            temp_template += `<section class="bs-docs-section" id="${id}">{{include '${uri}'}}</section>\n`;
        });

        /**
         * 生成临时模板,临时文件可能存在同时操作的问题，但是gulp 依赖的机制应该也不会冲突
         */
        fs.writeFile('./template/temp.html', temp_template, (err) => {
            if (err) throw err;
            console.log('temp template created!');
            var html = template('layout', { target: index_array });
            fs.writeFile(distPath, html, (err) => {
                if (err) throw err;
                console.log('demo created!');
            });
        });
    });
}

//gulp.start('widget:html');







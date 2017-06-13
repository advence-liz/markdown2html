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
    exec = require('child_process').exec;
   
var index_array = [];
template.defaults.extname = ".html";//tempalte默认后缀名改为.html 方便编辑模板不然没有智能提示
template.defaults.root = templatePath;//这个位置是相对根目录的位置，并且当前工作目录移动到子目录npm run template 依然有效
template.defaults.rules.pop()//去掉标准规则
gulp.task('del',function(){
    gulp.src('temp/*.html')
    .pipe(del());
});

gulp.task('bootmd2html', function () {
    let md_path = args.path;
    let source_path= path.resolve(__dirname,md_path,'*.md');
    let dist_path= path.resolve(__dirname,'html',md_path);
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
    let sourcePath = path.resolve(__dirname, 'html',md_path);
    let distPath = path.resolve(__dirname, 'demo',`${md_path}.html`);
    let uri_prefix = `../html/${md_path}/`;//这个必须相当路径 

    createHTML(sourcePath,distPath,uri_prefix)
   
});


/**
 * @desc 合并指定目录下markdown文档，并转为html，并且存储在临时文件中
 * 
 */
gulp.task('md2html',['del'], function() {
     let md_path=args.path;
     gulp.src(md_path+'/*.md')
    .pipe(concat('toc.md'))
    .pipe(markdown())
    .pipe(htmlbeautify())
    .pipe(gulp.dest('./temp/'))
});

/**
 * @desc 将指定路径下的markdown文档转为html然后生成ztree风格的API文档
 * @cmd gulp ztree --path widget
 */
gulp.task('ztree',['md2html'],function() {
    
      const html = template('ztree_layout',{});//第二个空对象必须传
      const distPath=path.resolve(__dirname,'demo',args.path+'toc.html');
            fs.writeFile(distPath, html, (err) => {
                if (err) throw err;
                console.log('ztree toc html created!');
            });
});

gulp.task('htmlbeautify',function(){
    gulp.src('demo/*.html')
    .pipe(htmlbeautify({indentSize: 2}))
    .pipe(gulp.dest('pages/'))

})


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

            // temp_template += `<section class="bs-docs-section" id="${id}">{{include '${uri}'}}</section>\n`;
            temp_template += `<section class="bs-docs-section" id="${id}"> <% include ('${uri}')%></section>\n`;
              
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


/**
 * @desc copy DEMO 站点所需资源
 */
let prometheus3Root=path.join('..','prometheus3');
let reactRoot=path.join('..','react-component');

gulp.task("clean:sources", function () {
    return gulp.src(['prometheus3','react-component'], { read: false }).pipe(del());
});

gulp.task("copy:prometheus",  function () {
    let sources = path.join(prometheus3Root,'dist','**');
    let less = path.join(prometheus3Root,'less','**');
    return gulp.src([sources,less], { base: '..' })
        .pipe(gulp.dest('.'));
})

gulp.task("copy:react",  function () {
    let reactBundle = path.join(reactRoot,'build','**');
    let reactSources = path.join(reactRoot,'sources','**');
    gulp.src([reactBundle,reactSources], { base: '..' })
        .pipe(gulp.dest('.'));
})
gulp.task("copy:sources",['copy:react','copy:prometheus'],function(){
    exec('start http://demo.api.com', function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: ' + error.code);
  }
  console.log('Child Process STDOUT: ' + stdout);
});
})

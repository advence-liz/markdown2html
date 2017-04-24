# Markdown2Html
本工程将markdown文档编译成html文档，并且将编译后的html文档整合为API文档
----------
## Brief
[在线DEMO](https://advence-liz.github.io/markdown2html/index.html)
```bash
$ npm start//执行命令直接运行查看效果

$ npm run restore//下载依赖

$ npm run compile //编译markdown文档

$ npm run build //整合编译后html 文档

$ npm run test //运行测试
```
## 目录结构
- root
  + html //markdown 编辑成html所存放位置
  + md //markdown 原文件所存放位置
  + templateoption.js //配置文件配置将那些html 整合成API 文档
  + gulpfile.js //编辑markdown 逻辑
  + template.js //整合生成的html文档逻辑
  + template //模板存放目录
## Ref
- [art-template](https://github.com/aui/art-template)
- [pygmentize](https://github.com/rvagg/node-pygmentize-bundled)
- [pygmentize segmentfault create pygmentize.css](https://segmentfault.com/a/1190000000661337)
- [highlight.js  看着完美符合gulp markdown 转化出来的文档](https://github.com/isagalaev/highlight.js)
- [highlight sytle](https://highlightjs.org/static/demo/)

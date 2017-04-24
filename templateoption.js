'use strict';

/**
 * markdown 文档配置对象
 * @prop name {String} 生成API 文档后的锚点名称
 * @prop uri {String} markdown 文件名
 * @prop htmlRoot {String} 编辑后的HTML文档相对 template layout 的路径
 */

class TemplateOption {
    constructor(name, uri, htmlRoot) {
        this.name = name;
        this.uri = uri;
        this.htmlRoot = htmlRoot || "../html/";
    }
    setPath() {
        this.uri = this.htmlRoot + this.uri;
        return this;
    }
}


var option_array = [
    new TemplateOption('code', 'code'),
    new TemplateOption('readme', 'readme')
]
/**
 * 生成完整uri
 */
option_array.map(function (elem, index, arr) {
   
    return elem.setPath();
})

module.exports = option_array;
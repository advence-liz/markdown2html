# code test

-------------

## javascript
```javascript
const gulp = require('gulp');
const markdown = require('gulp-markdown');
const marked = require('marked');

/**
 * default task
 */

gulp.task('default', function () {
    return gulp.src('src/*.md')
        .pipe(markdown({
            highlight: function (code, lang) {
                pygmentize({ lang: lang, format: 'html' }, code)
            }
        }))

        .pipe(gulp.dest('dist'));
});
```
## css
```css
div.relative {
    position: relative;
    left: 30px;
    border: 3px solid #73AD21;
}
```
## csharp
```csharp
// Hello1.cs
public class Hello1
{
   public static void Main()
   {
      System.Console.WriteLine("Hello, World!");
   }
}
```
<div class="bs-example" data-example-id="glyphicons-general">
    <div class="btn-toolbar" role="toolbar">
      <div class="btn-group">
        <button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-align-left" aria-hidden="true"></span></button>
        <button type="button" class="btn btn-default" aria-label="Center Align"><span class="glyphicon glyphicon-align-center" aria-hidden="true"></span></button>
        <button type="button" class="btn btn-default" aria-label="Right Align"><span class="glyphicon glyphicon-align-right" aria-hidden="true"></span></button>
        <button type="button" class="btn btn-default" aria-label="Justify"><span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span></button>
      </div>
    </div>
    <div class="btn-toolbar" role="toolbar">
      <button type="button" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star</button>
      <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star</button>
      <button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star</button>
      <button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star</button>
    </div>
  </div>


## bash
```bash
$ npm run install
```
## test example
<div class="bs-example" data-example-id="glyphicons-general">
    <div class="btn-toolbar" role="toolbar">
      <div class="btn-group">
        <button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-align-left" aria-hidden="true"></span></button>
        <button type="button" class="btn btn-default" aria-label="Center Align"><span class="glyphicon glyphicon-align-center" aria-hidden="true"></span></button>
        <button type="button" class="btn btn-default" aria-label="Right Align"><span class="glyphicon glyphicon-align-right" aria-hidden="true"></span></button>
        <button type="button" class="btn btn-default" aria-label="Justify"><span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span></button>
      </div>
    </div>
    <div class="btn-toolbar" role="toolbar">
      <button type="button" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star</button>
      <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star</button>
      <button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star</button>
      <button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star</button>
    </div>
  </div>


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
## bash
```bash
$ npm run install
```



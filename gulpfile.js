const gulp = require('gulp');
const markdown = require('gulp-markdown');
const marked = require('marked');

/**
 * default task
 */

gulp.task('default', function () {
    return gulp.src('./md/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('html'));
});




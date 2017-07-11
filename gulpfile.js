var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

// Compile less to css
gulp.task('less', function () {
    gulp.src("assets/less/style.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest('public/css'));
});

// Watch scss folder for changes
gulp.task('watch', function () {
    gulp.watch("assets/less/*", ['less']);
});

gulp.task('default', ['less']);

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');


// Compile less to css
gulp.task('less', function () {
    gulp.src("assets/less/style.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest('client/css'));
});

// Concatenate/package js files
gulp.task('scripts', function () {
    return gulp.src([
        './node_modules/angular/angular.js',
        './node_modules/jquery/dist/jquery.js',
        './client/js/controllers/*.js',
        './client/js/venues/*.js'
    ])
        .pipe(concat('package.js'))
        .pipe(gulp.dest('./client/js/'));
});


// Watch scss folder for changes
gulp.task('watch', function () {
    gulp.watch("assets/less/*", ['less']);
    gulp.watch("client/js/*", ['scripts'])
});

gulp.task('default', ['less']);

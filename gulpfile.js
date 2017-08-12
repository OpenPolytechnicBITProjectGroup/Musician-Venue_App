var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Compiles less -> css. Creates sourcemaps then minifies.
gulp.task('less', function () {
    gulp.src("client/assets/less/style.less")
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(cssmin().on('error', function (err) {
            console.log(err);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest('client/public/css'));
});

// Concatenate/package js files, creates sourcemaps then minifies.
gulp.task('scripts', function () {
    return gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/angular-route/angular-route.js',
        './node_modules/jquery/dist/jquery.js',
        './client/assets/js/bootstrapper.js',
        './client/assets/js/services/*.js',
        './client/assets/js/directives/*.js',
        './client/assets/js/controllers/*.js',
        './client/assets/js/directives/*.js',
        './client/assets/js/venues/*.js',
        './client/assets/js/routes.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('package.js').on('error', function (err) {
            console.log(err);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({mangle: false}).on('error', function (err) {
            console.log(err);
        }))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest('./client/public/js/'));
});


// Watch scss folder for changes
gulp.task('watch', function () {
    gulp.watch("client/assets/less/*", ['less']);
    gulp.watch("client/assets/js/**/*", ['scripts']) // watches all subdirectories and files in ./assets/js/
});

gulp.task('default', ['watch']);

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');


// Compile less to css
gulp.task('less', function () {
    gulp.src("client/assets/less/style.less")
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
        './client/assets/js/bootstrapper.js',
        './client/assets/js/services/*.js',
        './client/assets/js/controllers/*.js',
        './client/assets/js/venues/*.js'
    ])
        .pipe(concat('package.js'))
        .pipe(gulp.dest('./client/public/js/'));
});


// Watch scss folder for changes
gulp.task('watch', function () {
    gulp.watch("client/assets/less/*", ['less']);
    gulp.watch("client/assets/js/*", ['scripts'])
});

gulp.task('default', ['less']);

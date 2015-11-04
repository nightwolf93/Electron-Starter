var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    path = require('path'),
    coffee = require('gulp-coffee'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat');

gulp.task('watch', function (cb) {
    watch('less/**/*.less', function () {
      gulp.src('less/**/*.less')
        .pipe(plumber())
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./css'));
    });

    watch('coffee/**/*.coffee', function () {
      gulp.src('coffee/**/*.coffee')
        .pipe(plumber())
        .pipe(coffee())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./js'));
    });
});

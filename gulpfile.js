 var gulp = require('gulp'),
     connect = require('gulp-connect'),
     open = require('gulp-open'),
     concat = require('gulp-concat'),
     watch = require('gulp-watch'),
     addsrc = require('gulp-add-src'),
     sourcemaps = require('gulp-sourcemaps'),
     es6transpiler = require('gulp-es6-transpiler'),
     moduleTranspiler = require('gulp-es6-module-transpiler'),
     gutil = require('gulp-util'),
     sass = require('gulp-sass');

 gulp.task('javascript', function () {
     return gulp.src(['src/js/*.js', 'src/js/**/*.js'])
         .pipe(sourcemaps.init())
         .pipe(moduleTranspiler()).on('error', gutil.log)
         .pipe(es6transpiler({
             outputToConsole: true
         })).on('error', gutil.log)
         //.pipe(concat('script.js'))
         .pipe(sourcemaps.write('.'))
         .pipe(addsrc('node_modules/es6-shim/es6-shim.js'))
         .pipe(gulp.dest('.tmp'));
 });

 gulp.task('scss', function () {
     return gulp.src('./src/styles/**/*.scss')
         .pipe(sourcemaps.init())
         .pipe(sass({
             errLogToConsole: true
         }))
         .pipe(concat('style.css'))
         .pipe(sourcemaps.write())
         .pipe(addsrc('src/styles/font/*'))
         .pipe(gulp.dest('./.tmp/styles/'));
 });

 gulp.task('html', function () {
     return gulp.src('./src/templates/*.html')
         .pipe(concat('templates.html'))
         .pipe(gulp.dest('./.tmp'));
 });

  gulp.task('images', function () {
     return gulp.src('./src/images/*.svg')
         .pipe(gulp.dest('./.tmp/images'));
 });


 gulp.task('serve', function () {
     return connect.server({
         root: ['src', '.tmp'],
         port: 8000,
         livereload: true
     });
 });

 gulp.task('watch', function () {
     gulp.watch(['./src/**/*.js'], ['javascript', function () {
         return gulp.src('src').pipe(connect.reload());
  }]);
     gulp.watch(['./src/*.html'], [function () {
         return gulp.src('src').pipe(connect.reload());
  }]);
     gulp.watch(['./src/templates/*.html'], ['html', function () {
         return gulp.src('src').pipe(connect.reload());
  }]);
     gulp.watch(['./src/styles/*.scss'], ['scss', function () {
         return gulp.src('src').pipe(connect.reload());
  }]);
     gulp.watch(['./src/images/*.svg'], ['images', function () {
         return gulp.src('src').pipe(connect.reload());
  }]);

 });

 gulp.task('open', function () {
     return gulp.src('./src/index.html')
         .pipe(open('', {
             url: 'http://localhost:8000',
             src: 'chrome'
         }));
 });

 gulp.task('reload', function () {
     return gulp.src('src').pipe(connect.reload());
 });

 gulp.task('default', ['javascript', 'scss', 'html', 'images', 'watch', 'serve', 'open']);

 function swallowError(error) {
     console.log(error.toString());

     //this.emit('end');
 }
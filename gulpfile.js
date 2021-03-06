'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var server = require('browser-sync').create();
var run = require('run-sequence');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('style', function() {
gulp.src('src/sass/style.scss')
.pipe(plumber())
.pipe(sass())
.pipe(postcss([
autoprefixer({browsers: [
'last 1 version',
'last 2 Chrome versions',
'last 2 Firefox versions',
'last 2 Opera versions',
'last 2 Edge versions'
]}),
mqpacker({
sort: true
})
]))
.pipe(gulp.dest('build/css'))
.pipe(minify())
.pipe(rename('style-min.css'))
.pipe(gulp.dest('build/css'))
.pipe(server.stream());
});

gulp.task('symbols', function() {
  return gulp.src('build/img/*.svg')
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('symbols.svg'))
  .pipe(gulp.dest('build/img'));
})

gulp.task('html', function() {
gulp.src('src/*html')
.pipe(gulp.dest('build'));
});

gulp.task('copy', function() {
return gulp.src([
'src/fonts/**/*.{woff,woff2}',
'src/img/**',
'src/*.html',
'src/js/**'
], {
base: 'src/'
})
.pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
return del('build')
});

gulp.task('deploy', function() {
return gulp.src('./build/**/*')
.pipe(ghPages());
});

gulp.task('build', function(fn) {
run(
'clean',
'copy',
'style',
'symbols',
fn
);
});

gulp.task('serve', function() {
server.init({
server: 'build',
notify: false,
open: true,
ui: false
});

gulp.watch('src/sass/**/*.{scss,sass}', ['style']);
gulp.watch('src/*.html', ['html']).on('change', server.reload);
});

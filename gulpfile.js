var gulp = require('gulp');

// var mysql = require('mysql');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

var bases = {
 app: 'src/',
 dist: 'dist/',
};

var paths = {
 scripts: ['scripts/**/*.js'],
 styles: ['css/**/*.css'],
 html: ['*.html'],
 images: ['images/**/*.png'],
};

// Connect to SQL Database

// gulp.task('sqlconnect', function() {
//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "ventura"
//   });

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });
// })

// Delete the dist directory
gulp.task('clean', function() {
 return gulp.src(bases.dist)
 .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
  gulp.src([
      './src/scripts/app.js'
    ], {cwd: '.'})
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(bases.dist + 'scripts/'));
});

gulp.task('css', ['clean'], function() {
    return gulp.src('./src/scss/app.scss')
    .pipe(sass({
        outputStyle: 'compressed',
    }))
    .pipe(gulp.dest(bases.dist + 'css/'));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function() {
 gulp.src(paths.images, {cwd: bases.app})
 .pipe(imagemin())
 .pipe(gulp.dest(bases.dist + 'images/'));
});

gulp.task('html', ['clean'], function() {
    return gulp.src('./src/*.html')
    .pipe(gulp.dest(bases.dist));
});

// Process scripts and concatenate them into one output file
gulp.task('copy', ['clean'], function() {
  var js = gulp.src('./src/scripts/lib/*.js')
    .pipe(gulp.dest(bases.dist + 'scripts/'));
  var css = gulp.src('./src/css/*.css')
    .pipe(gulp.dest(bases.dist + 'css/'));
  var json = gulp.src('./src/json/*.json')
    .pipe(gulp.dest(bases.dist + 'json/'));
  return (js, css, json);    
});

// Static server
gulp.task('server', function() {
    browserSync.init({
        proxy: "swf.dev"
    });
});

gulp.task('reload', function() {
  browserSync.reload;
});

// A development task to run anytime a file changes
gulp.task('watch', function() {
 gulp.watch('src/**/*', ['clean', 'scripts', 'css', 'imagemin', 'html', 'copy', browserSync.reload]);
});

// Define the default task as a sequence of the above tasks
gulp.task('default', ['clean', 'scripts', 'css', 'imagemin', 'html', 'copy', 'server', 'watch']);